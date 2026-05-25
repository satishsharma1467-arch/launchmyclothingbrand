// ===================================================
// 🛡️ Launch My Clothing Brand - Tiered Communication Guard
// ===================================================
// Manages WhatsApp Sourcing Support and direct call consultation limits based on active plans.
// - Guest / Basic (₹399/mo): Both Locked (Nudges to Upgrade)
// - Brand Builder (₹999/mo): WhatsApp Chat Unlocked, Phone Calls Locked
// - Pro Elite (₹1,999/mo): Both WhatsApp Chat and Phone Calls Unlocked

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    
    // Core permission helpers
    function getActivePlan() {
      const session = JSON.parse(localStorage.getItem('lmcb_user') || 'null');
      return localStorage.getItem('lmcb_current_plan') || (session ? session.plan : 'free');
    }

    function checkPermissions() {
      const plan = getActivePlan();
      return {
        hasChat: plan === 'brand_builder' || plan === 'pro_elite',
        hasCall: plan === 'pro_elite'
      };
    }

    // 1. Global Click Event Interceptor
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      if (!link) return;
      
      const href = link.getAttribute('href') || '';
      
      // A. Intercept WhatsApp Chat links
      if (href.includes('wa.me') || href.includes('whatsapp.com') || href === '#whatsapp') {
        // Allow programmatic bypass
        if (link.classList.contains('wa-bypass') || link.getAttribute('data-bypass') === 'true') {
          return;
        }
        
        e.preventDefault();
        const perms = checkPermissions();
        
        if (!perms.hasChat) {
          showCommLockModal('whatsapp');
        } else {
          // Reveal the phone number beautifully on click
          revealWhatsAppNumber();
        }
      }
      
      // B. Intercept Direct calling links
      if (href.startsWith('tel:')) {
        const perms = checkPermissions();
        
        if (!perms.hasCall) {
          e.preventDefault();
          showCommLockModal('call');
        }
      }
    });

    // 2. Sitewide Floating WhatsApp Bubble Override
    function configureFloatingBubble() {
      const bubble = document.getElementById('wa-bubble');
      const link = document.getElementById('wa-link');
      
      if (bubble) {
        // Enforce visible sitewide (overriding default inline hiding scripts)
        bubble.style.cssText = 'display: flex !important; visibility: visible !important; pointer-events: auto !important; position: fixed !important; z-index: 900 !important;';
        
        // Adjust positions based on mobile bottom nav constraints
        if (window.innerWidth <= 768) {
          bubble.style.bottom = '75px';
          bubble.style.right = '1rem';
        } else {
          bubble.style.bottom = '2rem';
          bubble.style.right = '2rem';
        }
        
        // Remote hover tooltip, manage via custom click events
        const tooltip = document.getElementById('wa-tooltip');
        if (tooltip) tooltip.remove();
        
        if (link) {
          link.removeAttribute('target');
          link.setAttribute('href', '#whatsapp');
        }
      }
    }

    // 3. Dynamic Contact Card Swapping (Specifically for contact.html)
    function swapContactCards() {
      const cards = document.querySelectorAll('.contact-card');
      if (cards.length === 0) return;
      
      const perms = checkPermissions();
      const plan = getActivePlan();
      
      cards.forEach(card => {
        const iconEl = card.querySelector('.contact-card-icon');
        if (!iconEl) return;
        const icon = iconEl.textContent.trim();
        const valueContainer = card.querySelector('.contact-card-value');
        if (!valueContainer) return;
        
        if (icon === '💬') {
          // WhatsApp Sourcing Card
          if (perms.hasChat) {
            valueContainer.innerHTML = `
              <a href="#whatsapp" style="color: #C8A951; font-weight: 500; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; border: 1px solid rgba(200,169,81,0.25); padding: 0.4rem 1rem; background: rgba(200,169,81,0.05); transition: background 0.3s; border-radius: 3px;" onmouseover="this.style.background='rgba(200,169,81,0.1)'" onmouseout="this.style.background='rgba(200,169,81,0.05)'">
                💬 +91 87961 58321 &nbsp; <span style="font-size:0.6rem; background:rgba(37,211,102,0.15); color:#25D366; padding:2px 6px; border-radius:2px; letter-spacing:0.05em; font-family:'DM Mono'; font-weight: 500;">ACTIVE</span>
              </a>
            `;
          }
        } else if (icon === '📞') {
          // Direct Calling Card
          if (perms.hasCall) {
            valueContainer.innerHTML = `
              <a href="tel:+918796158321" style="color: #C8A951; font-weight: 500; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; border: 1px solid rgba(200,169,81,0.25); padding: 0.4rem 1rem; background: rgba(200,169,81,0.05); transition: background 0.3s; border-radius: 3px;" onmouseover="this.style.background='rgba(200,169,81,0.1)'" onmouseout="this.style.background='rgba(200,169,81,0.05)'">
                📞 +91 87961 58321 &nbsp; <span style="font-size:0.6rem; background:rgba(200,169,81,0.15); color:#C8A951; padding:2px 6px; border-radius:2px; letter-spacing:0.05em; font-family:'DM Mono'; font-weight: 500;">UNLOCKED</span>
              </a>
            `;
          } else if (plan === 'brand_builder') {
            valueContainer.innerHTML = `
              <div class="phone-locked" style="font-size: 0.8rem; border-color: rgba(200,169,81,0.15); opacity: 0.8; display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.9rem;">
                🔒 Call support reserved for Pro Elite
                <a href="/subscribe.html?plan=pro_elite" style="color:#C8A951; text-decoration:underline; font-weight: 500; margin-left: 0.2rem;">Upgrade →</a>
              </div>
            `;
          }
        }
      });
    }

    // 4. Premium Reveal WhatsApp Modal
    function revealWhatsAppNumber() {
      if (document.getElementById('wa-reveal-modal')) return;
      
      const modal = document.createElement('div');
      modal.id = 'wa-reveal-modal';
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(14,11,6,0.96);z-index:99999;display:flex;align-items:center;justify-content:center;font-family:\'DM Mono\',monospace;color:#F5F0E8;padding:2rem;backdrop-filter:blur(14px);animation:fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);';
      
      if (!document.getElementById('comm-reveal-styles')) {
        const style = document.createElement('style');
        style.id = 'comm-reveal-styles';
        style.textContent = `
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        `;
        document.head.appendChild(style);
      }
      
      modal.innerHTML = `
        <div style="background:#1C1609;border:1px solid rgba(200,169,81,0.35);padding:3.5rem 2.5rem;max-width:500px;width:100%;text-align:center;position:relative;box-shadow:0 25px 60px rgba(200,169,81,0.2);animation:slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);border-radius:3px;">
          <button onclick="this.parentElement.parentElement.remove()" style="position:absolute;top:1.5rem;right:1.5rem;background:none;border:none;color:#F5F0E8;font-size:1.8rem;cursor:pointer;opacity:0.5;transition:opacity 0.2s, transform 0.2s;" onmouseover="this.style.opacity=1;this.style.transform='scale(1.1)'" onmouseout="this.style.opacity=0.5;this.style.transform='scale(1)'">&times;</button>
          <div style="font-size:3.5rem;margin-bottom:1.5rem;text-shadow:0 0 20px rgba(200,169,81,0.3);">✨</div>
          <div style="font-size:0.65rem;letter-spacing:0.3em;text-transform:uppercase;color:#C8A951;margin-bottom:1rem;font-weight:500;">Direct WhatsApp Support</div>
          <h3 style="font-family:\'Cormorant Garamond\',serif;font-size:2.2rem;font-weight:300;margin-bottom:1.2rem;line-height:1.25;color:#F5F0E8;">Official Support Unlocked</h3>
          <p style="font-size:0.8rem;opacity:0.6;line-height:1.8;margin-bottom:1.5rem;max-width:38ch;margin-left:auto;margin-right:auto;">As an active premium member, you have full direct access. Add our number to your contacts or chat instantly:</p>
          
          <div style="background:#0E0B06; border:1px solid rgba(200,169,81,0.25); padding:1rem 1.25rem; font-size:1.35rem; font-weight:500; color:#C8A951; margin-bottom:2.2rem; display:flex; align-items:center; justify-content:center; gap:0.8rem; border-radius:3px; letter-spacing:0.05em; font-family:'DM Mono';">
            <span>💬 +91 87961 58321</span>
            <button onclick="navigator.clipboard.writeText('+918796158321'); const s=this.querySelector('.status'); s.textContent='COPIED'; s.style.background='#25D366'; s.style.color='#0E0B06'; setTimeout(()=>{s.textContent='COPY'; s.style.background='transparent'; s.style.color='#C8A951';},2000)" style="background:transparent; border:1px solid rgba(200,169,81,0.3); color:#C8A951; font-family:'DM Mono'; font-size:0.65rem; padding:4px 8px; cursor:pointer; border-radius:2px; display:inline-flex; align-items:center; gap:4px; font-weight: 500; transition: all 0.2s;">
              <span class="status" style="padding: 2px 4px; border-radius: 1px; transition: all 0.2s;">COPY</span>
            </button>
          </div>
          
          <a href="https://wa.me/918796158321?text=Hi!+I+need+help+with+my+clothing+brand." target="_blank" onclick="this.parentElement.parentElement.remove()" style="display:inline-block;background:linear-gradient(135deg, #E8C96A 0%, #C8A951 50%, #A68230 100%) !important;color:#0E0B06 !important;padding:0.95rem 2.4rem;text-decoration:none;font-weight:600;font-size:0.72rem;letter-spacing:0.15em;text-transform:uppercase;box-shadow:0 6px 20px rgba(200,169,81,0.25);border:1px solid rgba(232, 201, 106, 0.2);transition:all 0.4s cubic-bezier(0.16, 1, 0.3, 1);" onmouseover="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 10px 30px rgba(200,169,81,0.45)\';this.style.filter=\'brightness(1.08)\'" onmouseout="this.style.transform=\'translateY(0)\';this.style.boxShadow=\'0 6px 20px rgba(200,169,81,0.25)\';this.style.filter=\'brightness(1)\'">Open WhatsApp Chat →</a>
        </div>
      `;
      document.body.appendChild(modal);
    }

    // 5. Premium Locked Overlay Modals
    function showCommLockModal(type) {
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(14,11,6,0.96);z-index:99999;display:flex;align-items:center;justify-content:center;font-family:\'DM Mono\',monospace;color:#F5F0E8;padding:2rem;backdrop-filter:blur(14px);animation:fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);';
      
      const isCall = type === 'call';
      const lockIcon = isCall ? '📞' : '💬';
      const headerText = isCall ? 'Direct Phone Consultation' : 'WhatsApp Sourcing Support';
      const subtitleText = isCall ? 'Pro Elite Member Exclusive' : 'Premium Member Exclusive';
      
      const descText = isCall
        ? 'Direct voice calls and instant sizing consulting lines are reserved exclusively for our Pro Elite members.'
        : 'Direct WhatsApp chatting support is an exclusive premium feature for our Brand Builder and Pro Elite members.';
        
      const ctaBtnText = isCall ? 'Unlock Phone Support with Pro Elite' : 'Unlock Chat Support with Premium Plan';
      const planRedirect = isCall ? '?plan=pro_elite' : '?plan=brand_builder';

      overlay.innerHTML = `
        <div style="background:#1C1609;border:1px solid rgba(200,169,81,0.35);padding:3.5rem 2.5rem;max-width:500px;width:100%;text-align:center;position:relative;box-shadow:0 25px 60px rgba(200,169,81,0.2);animation:slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);border-radius:3px;">
          <button onclick="this.parentElement.parentElement.remove()" style="position:absolute;top:1.5rem;right:1.5rem;background:none;border:none;color:#F5F0E8;font-size:1.8rem;cursor:pointer;opacity:0.5;transition:opacity 0.2s, transform 0.2s;" onmouseover="this.style.opacity=1;this.style.transform='scale(1.1)'" onmouseout="this.style.opacity=0.5;this.style.transform='scale(1)'">&times;</button>
          <div style="font-size:3.5rem;margin-bottom:1.5rem;text-shadow:0 0 20px rgba(200,169,81,0.3);">${lockIcon}</div>
          <div style="font-size:0.65rem;letter-spacing:0.3em;text-transform:uppercase;color:#C8A951;margin-bottom:1rem;font-weight:500;">${subtitleText}</div>
          <h3 style="font-family:\'Cormorant Garamond\',serif;font-size:2.2rem;font-weight:300;margin-bottom:1.2rem;line-height:1.25;color:#F5F0E8;">${headerText}</h3>
          <p style="font-size:0.8rem;opacity:0.6;line-height:1.8;margin-bottom:2.5rem;max-width:38ch;margin-left:auto;margin-right:auto;">${descText}</p>
          <a href="/subscribe.html${planRedirect}" style="display:inline-block;background:linear-gradient(135deg, #E8C96A 0%, #C8A951 50%, #A68230 100%) !important;color:#0E0B06 !important;padding:0.95rem 2.4rem;text-decoration:none;font-weight:600;font-size:0.72rem;letter-spacing:0.15em;text-transform:uppercase;box-shadow:0 6px 20px rgba(200,169,81,0.25);border:1px solid rgba(232, 201, 106, 0.2);transition:all 0.4s cubic-bezier(0.16, 1, 0.3, 1);" onmouseover="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 10px 30px rgba(200,169,81,0.45)\';this.style.filter=\'brightness(1.08)\'" onmouseout="this.style.transform=\'translateY(0)\';this.style.boxShadow=\'0 6px 20px rgba(200,169,81,0.25)\';this.style.filter=\'brightness(1)\'">${ctaBtnText} →</a>
        </div>
      `;
      document.body.appendChild(overlay);
    }

    // Run dynamic initializations
    setTimeout(function() {
      configureFloatingBubble();
      swapContactCards();
    }, 120);

  });
})();
