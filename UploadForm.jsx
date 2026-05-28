import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import photoToPatternImg from '../assets/photo_to_pattern.png';

const UploadForm = () => {
  // Form State
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('T-Shirt');
  const [fabric, setFabric] = useState('');
  const [fit, setFit] = useState('Oversized / Drop Shoulder Fit');
  const [desc, setDesc] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState('');

  // Execution States
  const [loading, setLoading] = useState(false);
  const [loaderMsg, setLoaderMsg] = useState('Processing request...');
  const [step, setStep] = useState('form'); // 'form', 'success'

  const RZP_KEY = 'rzp_live_SG0orAX4pL66PR';

  // Dynamic Razorpay Script Loader
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG, or WEBP).');
      return;
    }

    setPhoto(file);
    const reader = new FileReader();
    reader.onload = (event) => setPreview(event.target.result);
    reader.readAsDataURL(file);
  };

  // Helper to handle database insertions on payment success
  const executeDatabaseInsertion = async (imageUrl, rzpPaymentId, orderId) => {
    const specMessage = `
=== PHOTO-TO-PATTERN SPECIFICATION SHEET REQUEST ===
🧑 Customer Name: ${name}
🏢 Brand Name: ${brand || '—'}
📱 WhatsApp Mobile: ${phone}

🎨 Garment Category: ${category}
🧵 Fabric Type: ${fabric}
📐 Fit Structure: ${fit}

📝 Style Description & Details:
${desc}

Design Reference Image: ${imageUrl}

=== TRANSACTION DETAILS ===
💳 Payment Method: Razorpay Gateway (Verified)
💰 Total Charge: ₹199
🔑 Payment Reference ID: ${rzpPaymentId}
🗓 Submitted On: ${new Date().toLocaleString('en-IN')}
`;

    // 1. Update orders status to 'paid' and payment_id in DB
    const { error: updateErr } = await supabase
      .from('orders')
      .update({ status: 'paid', payment_id: rzpPaymentId })
      .eq('id', orderId);

    if (updateErr) {
      console.error("Transaction status update error:", updateErr);
    }

    // 2. Log tech specifications inside 'messages' table
    const messagePayload = {
      name: name,
      email: 'guest@launchmyclothingbrand.com',
      phone: phone,
      subject: `Photo-to-Pattern Style Request: ${category} (${brand || 'Custom'})`,
      message: specMessage,
      received_at: new Date().toISOString()
    };

    const { error: msgErr } = await supabase
      .from('messages')
      .insert([messagePayload]);

    if (msgErr) {
      throw new Error(`Specs logging failed: ${msgErr.message}`);
    }
  };

  // ── LIVE PRODUCTION SUBMISSION (Razorpay Payment Required) ──
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      alert('Please upload a design reference image first!');
      return;
    }

    setLoading(true);
    setLoaderMsg('Uploading design reference image...');

    let imageUrl = '';
    const safeName = photo.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = `phototopattern/${Date.now()}_${safeName}`;

    try {
      // 1. Upload to Supabase Storage files bucket
      const { data: uploadData, error: uploadErr } = await supabase.storage
        .from('files')
        .upload(storagePath, photo, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadErr) {
        throw new Error(`Storage upload failed: ${uploadErr.message}`);
      }

      imageUrl = supabase.supabaseUrl + '/storage/v1/object/public/files/' + storagePath;
      setLoaderMsg('Registering order transaction...');

      // 2. Save initial pending transaction record in 'orders' table
      const orderPayload = {
        plan: 'photo_to_pattern',
        amount: 199,
        payment_id: 'pending_' + Date.now(),
        status: 'pending',
        created_at: new Date().toISOString()
      };

      const { data: insertData, error: insertErr } = await supabase
        .from('orders')
        .insert([orderPayload])
        .select();

      if (insertErr) {
        throw new Error(`Database transaction log failed: ${insertErr.message}`);
      }

      const orderId = insertData[0].id;
      setLoaderMsg('Initializing payment checkout...');

      // 3. Load Razorpay script
      const rzpLoaded = await loadRazorpayScript();
      if (!rzpLoaded) {
        throw new Error('Failed to load Razorpay Checkout script. Check your internet connection.');
      }

      // 4. Open Razorpay ₹199 Payment Gateway
      const rzpOptions = {
        key: RZP_KEY,
        amount: 19900,
        currency: 'INR',
        name: 'Launch My Clothing Brand',
        description: 'Photo to Pattern — Custom Sizing Spec Request',
        prefill: {
          name: name,
          contact: phone
        },
        theme: { color: '#C8A951' },
        handler: async function (response) {
          setLoading(true);
          setLoaderMsg('Finalizing payment validation...');
          try {
            await executeDatabaseInsertion(imageUrl, response.razorpay_payment_id, orderId);
            setLoading(false);
            setStep('success');
          } catch (dbErr) {
            alert(`Payment completed, but specifications registration encountered an issue: ${dbErr.message}. Please contact us on WhatsApp with reference ID: ${response.razorpay_payment_id}`);
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            alert('Payment checkout closed. Complete payment to activate your sizing calculations.');
          }
        }
      };

      const rzp = new window.Razorpay(rzpOptions);
      rzp.open();

    } catch (err) {
      console.error("Submission failed:", err);
      alert(`Submission failed: ${err.message}. Please verify details and try again.`);
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setBrand('');
    setPhone('');
    setCategory('T-Shirt');
    setFabric('');
    setFit('Oversized / Drop Shoulder Fit');
    setDesc('');
    setPhoto(null);
    setPreview('');
    setStep('form');
  };

  if (step === 'success') {
    return (
      <div className="container">
        <div className="form-card scale-up-in" style={{ textAlign: 'center', padding: '4rem 2.5rem' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem', textShadow: '0 0 20px rgba(76,175,80,0.3)' }}>🎉</div>
          <div style={{ fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C8A951', marginBottom: '1rem', fontWeight: 500 }}>Submission Received</div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 300, marginBottom: '1.2rem', lineHeight: 1.25, color: '#F5F0E8' }}>Request Submitted Successfully!</h3>
          <p style={{ fontSize: '0.8rem', opacity: 0.6, lineHeight: 1.8, marginBottom: '2rem', maxWidth: '36ch', marginLeft: 'auto', marginRight: 'auto' }}>
            Your design specifications and garment photo have been uploaded securely. Our expert sizing team will calculate your measurements and contact you directly on your WhatsApp mobile number within 24 hours.
          </p>
          <button onClick={resetForm} className="btn-submit">Submit Another Design →</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Dynamic Hero matching phototopattern.html */}
      <div className="hero">
        <div className="hero-tag">Custom Measurement Service</div>
        <h1>Photo to <em>Pattern</em></h1>
        <p>Upload a photo of any custom garment design. Fill in the style details, fit structure, and fabric type. We will custom-calculate and provide your brand's perfect sizing specification charts.</p>
        <div style={{ maxWidth: '480px', margin: '2rem auto 0', border: '1px solid var(--border)', overflow: 'hidden', background: '#0E0B06', boxShadow: '0 15px 35px rgba(200,169,81,0.08)' }}>
          <img src={photoToPatternImg} alt="Photo to Pattern before and after mockup" style={{ width: '100%', height: 'auto', display: 'block', filter: 'saturate(0.85) contrast(1.02)' }} />
        </div>
      </div>

      {/* Main Form Container */}
      <div className="container">
        <div className="form-card">
          <h2 className="section-title">🎨 Custom Design Submission</h2>

          <form onSubmit={handleFormSubmit}>
            {/* Step 1: Contact Details */}
            <div className="field-row">
              <div className="field">
                <label>Your Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Rahul Sharma" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
              <div className="field">
                <label>Brand Name (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Noir Apparel" 
                  value={brand} 
                  onChange={(e) => setBrand(e.target.value)} 
                />
              </div>
            </div>

            <div className="field">
              <label>WhatsApp Mobile Number * (For Sizing Chart delivery)</label>
              <input 
                type="tel" 
                placeholder="e.g. +91 87961 58321" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required 
              />
            </div>

            {/* Step 2: Technical Specifications */}
            <h2 className="section-title" style={{ marginTop: '2.5rem' }}>🧵 Technical specifications</h2>

            {/* Warning Box */}
            <div className="exclusion-box">
              ⚠️ <strong>Strict Sizing Exclusions:</strong> To prevent measurement misinterpretations, we do NOT accept requests for genuine leather garments, heavy draping styles, swimwear, or lingerie. Please ensure your submission is for standard casual wear, streetwear, denim, or regular dress styles.
            </div>

            <div className="field">
              <label>Garment Category *</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                required
              >
                <option value="T-Shirt">T-Shirt (Crewneck / Oversized)</option>
                <option value="Hoodie">Hoodie / Sweatshirt</option>
                <option value="Jacket">Jacket / Outerwear</option>
                <option value="Pants">Pants / Cargo / Denim</option>
                <option value="Dress">Dress / Womens Gown</option>
                <option value="Custom">Other Custom Design Style</option>
              </select>
            </div>

            <div className="field-row">
              <div className="field">
                <label>Fabric Type *</label>
                <input 
                  type="text" 
                  placeholder="e.g. 240 GSM Knitted Cotton / Heavy Denim" 
                  value={fabric} 
                  onChange={(e) => setFabric(e.target.value)} 
                  required 
                />
              </div>
              <div className="field">
                <label>Body Fit Structure *</label>
                <select 
                  value={fit} 
                  onChange={(e) => setFit(e.target.value)} 
                  required
                >
                  <option value="Oversized / Drop Shoulder Fit">Oversized / Drop Shoulder Fit</option>
                  <option value="Boxy Streetwear Fit">Boxy Streetwear Fit</option>
                  <option value="Relaxed / Casual Fit">Relaxed / Casual Fit</option>
                  <option value="Regular / Standard Fit">Regular / Standard Fit</option>
                  <option value="Slim Fit / Athletic Tailored">Slim Fit / Athletic Tailored</option>
                  <option value="Cropped Fit">Cropped Fit</option>
                  <option value="Skinny / Form-Fitting">Skinny / Form-Fitting</option>
                  <option value="Custom Fit (Detailed in Description Below)">Custom Fit (Detailed in Description Below)</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label>Style Description & Details * (pockets, ribbing, special cuts)</label>
              <textarea 
                placeholder="Describe the style. e.g. Hoodie with high collar neck, thick ribbing, double-layered hood, kangaroo pockets..." 
                value={desc} 
                onChange={(e) => setDesc(e.target.value)} 
                required 
              />
            </div>

            {/* Step 3: Design Reference Image */}
            <h2 className="section-title" style={{ marginTop: '2.5rem' }}>📸 Design Reference Image</h2>
            <div className="field">
              <div className="upload-zone" onClick={() => document.getElementById('photoInput').click()}>
                <div className="upload-icon">🖼</div>
                <div className="upload-text">
                  <strong>Click to upload design image</strong><br />
                  Supports JPG, PNG, WEBP.
                </div>
                <input 
                  id="photoInput" 
                  type="file" 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                  onChange={handleFileChange} 
                />
                {preview && (
                  <div className="upload-preview-wrap" onClick={(e) => e.stopPropagation()}>
                    <img src={preview} className="upload-preview" alt="Garment Preview" />
                    <div style={{ fontSize: '0.6rem', color: 'var(--gold)', marginTop: '0.5rem', opacity: 0.8 }}>
                      ✓ Photo loaded successfully. It will be uploaded securely with your specifications!
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 4: Checkout Pricing Summary */}
            <div className="payment-summary">
              <div className="tier-badge tier-premium">Flat Rate Single Request Add-on</div>
              <div className="summary-row"><span>Custom Photo-to-Pattern sizing measurement</span><span>₹199</span></div>
              <div className="summary-row"><span>Razorpay Cloud Processing</span><span>Included</span></div>
              <div className="summary-row total"><span>Total Amount</span><span>₹199 Only</span></div>
              <div style={{ fontSize: '0.68rem', opacity: 0.65, lineHeight: 1.6, marginTop: '0.8rem', borderTop: '1px dashed rgba(200, 169, 81, 0.15)', paddingTop: '0.6rem', textAlign: 'left' }}>
                ⚠️ <strong>Exception Notice:</strong> Highly complex premium styles (such as heavy draping, genuine leather garments, swimwear, lingerie, structured outerwear, and corset-styled garments) are subject to specialized calculations and additional custom quote adjustments on WhatsApp.
              </div>
            </div>

            {/* Submit Button with loader inside */}
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  {loaderMsg}
                </>
              ) : (
                'Pay ₹199 & Submit Request →'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
