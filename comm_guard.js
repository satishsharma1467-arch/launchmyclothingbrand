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
      const session = JSON.parse(localStorage.getItem('lmcb_user') || 'null');
      const planStatus = session ? session.plan_status : 'free';
      const plan = getActivePlan();
      
      // Bypassed if admin/manual override or if plan is active
      const isActive = planStatus === 'active' || localStorage.getItem('lmcb_current_plan');
      
      return {
        hasChat: isActive && (plan === 'brand_builder' || plan === 'pro_elite'),
        hasCall: isActive && plan === 'pro_elite'
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

    // 2. Sitewide Floating WhatsApp Bubble Override & Dynamic Injector
    function configureFloatingBubble() {
      let bubble = document.getElementById('wa-bubble');
      let link = document.getElementById('wa-link');
      
      // Dynamic Injector: If the page is missing the WhatsApp bubble HTML markup, create it dynamically!
      if (!bubble) {
        bubble = document.createElement('div');
        bubble.id = 'wa-bubble';
        bubble.innerHTML = `
          <a id="wa-link" href="#whatsapp" style="width:56px;height:56px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(37,211,102,0.35);transition:transform 0.2s;text-decoration:none;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        `;
        document.body.appendChild(bubble);
        link = bubble.querySelector('a');
      }
      
      if (bubble) {
        // Enforce visible sitewide (overriding default inline hiding scripts)
        bubble.style.cssText = 'display: flex !important; visibility: visible !important; pointer-events: auto !important; position: fixed !important; z-index: 900 !important;';
        
        // Adjust positions globally (bottom nav is completely removed now)
        bubble.style.bottom = '2rem';
        bubble.style.right = '2rem';
        
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

    function sanitizeWhatsAppLinks() {
      const allLinks = document.querySelectorAll('a');
      allLinks.forEach(link => {
        const href = link.getAttribute('href') || '';
        // If it's a raw WhatsApp link and not explicitly bypassed, sanitize it
        if ((href.includes('wa.me') || href.includes('whatsapp.com')) && 
            !link.classList.contains('wa-bypass') && 
            link.getAttribute('data-bypass') !== 'true') {
          link.setAttribute('href', '#whatsapp');
          link.removeAttribute('target');
        }
      });
    }

    function updateNavbarSession() {
      const session = JSON.parse(localStorage.getItem('lmcb_user') || 'null');
      if (session) {
        const ctaBtns = document.querySelectorAll('.nav-cta, .cta, #main-nav a[href*="subscribe.html"]');
        ctaBtns.forEach(ctaBtn => {
          ctaBtn.textContent = 'Log Out';
          ctaBtn.setAttribute('href', '#logout');
          
          ctaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (confirm('Are you sure you want to log out?')) {
              localStorage.removeItem('lmcb_user');
              localStorage.removeItem('lmcb_current_plan');
              window.location.href = '/login.html';
            }
          });
        });
      }
    }

    function injectMobileStyles() {
      if (document.getElementById('comm-mobile-styles')) return;
      const style = document.createElement('style');
      style.id = 'comm-mobile-styles';
      style.textContent = `
        html {
          scrollbar-gutter: stable !important;
        }
        nav {
          padding: 1.3rem 4rem !important;
        }
        @media (max-width: 768px) {
          /* Remove the mobile bottom navigation bars with icons entirely */
          .mobile-bottom-nav, .mobile-nav, .mob-nav, .mobile-bottom-bar, .wa-float {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
          /* Reset body bottom padding so content doesn't have an empty gap */
          body {
            padding-bottom: 0px !important;
          }
          /* Ensure the top header and hamburger button work perfectly */
          nav {
            padding: 1rem 1.2rem !important;
          }
          /* Fix floating WhatsApp bubble position since bottom nav is gone */
          #wa-bubble {
            bottom: 2rem !important;
            right: 2rem !important;
          }
        }
        @media (max-width: 1100px) {
          /* Force standard header styling and hamburger visibility */
          nav {
            padding: 1rem 1.2rem !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
          }
          .nav-hamburger {
            display: flex !important;
          }
          .nav-close {
            display: block !important;
          }
          /* Force standard slide-out vertical list styling */
          .nav-links, #main-nav {
            display: none !important;
            position: fixed !important;
            top: 0 !important; left: 0 !important;
            right: 0 !important; bottom: 0 !important;
            background: #0E0B06 !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            overflow-y: auto !important;
            align-items: center !important;
            gap: 1.5rem !important;
            z-index: 999 !important;
            padding: 5rem 2rem 2rem !important;
            border: none !important;
          }
          .nav-links.open, #main-nav.open {
            display: flex !important;
          }
          .nav-links li, #main-nav li {
            list-style: none !important;
            width: 100% !important;
            text-align: center !important;
          }
          .nav-links a, #main-nav a {
            color: #F5F0E8 !important;
            font-size: 1.1rem !important;
            letter-spacing: 0.15em !important;
            opacity: 0.85 !important;
            text-decoration: none !important;
            display: block !important;
            padding: 0.6rem 1rem !important;
            border-bottom: 1px solid rgba(200,169,81,0.1) !important;
            width: 100% !important;
          }
          .nav-links a:hover, #main-nav a:hover {
            color: #C8A951 !important;
            opacity: 1 !important;
          }
          .nav-links .nav-cta, #main-nav .nav-cta {
            background: #C8A951 !important;
            color: #1A1208 !important;
            opacity: 1 !important;
            padding: 0.8rem 2rem !important;
            border: none !important;
            margin-top: 1rem !important;
            border-radius: 3px !important;
            display: inline-block !important;
            width: auto !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Run dynamic initializations
    setTimeout(function() {
      injectMobileStyles();
      sanitizeWhatsAppLinks();
      configureFloatingBubble();
      swapContactCards();
      updateNavbarSession();
    }, 120);

    // Secondary cleanup to catch any slow-loading scripts
    setTimeout(sanitizeWhatsAppLinks, 1000);

  });
})();
