/* ===========================================
   OMNI DIGITAL MARKETING - CONSOLIDATED JAVASCRIPT
   ===========================================
   
   This file contains all the JavaScript functionality used across
   the OMNI website for better maintainability and consistency.
   
   Table of Contents:
   1. Initialization
   2. Mobile Menu Functionality
   3. Tab Functionality
   4. Modal Functionality
   5. Scroll Animations
   6. Sticky Header Functionality
   7. Form Handling
   8. Utility Functions
   =========================================== */

// ===========================================
// INITIALIZATION
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize loading screen first
    initializeLoadingScreen();
    
    // Initialize mobile optimizations
    initializeMobileOptimizations();
    
    // Initialize all components
    initializeMobileMenu();
    initializeTabs();
    initializeModal();
    initializeScrollAnimations();
    initializeStickyHeader();
    initializeFormHandling();
});

// ===========================================
// PROFESSIONAL LOADING SCREEN
// ===========================================
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (!loadingScreen) return;
    
    function hideLoadingScreen() {
        loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.classList.add('loaded');
        }, 500);
    }
    
    // Hide loading screen when page is fully loaded
    if (document.readyState === 'complete') {
        setTimeout(hideLoadingScreen, 1000);
    } else {
        window.addEventListener('load', () => {
            setTimeout(hideLoadingScreen, 1000);
        });
    }
    
    // Fallback: Hide loading screen after maximum time
    setTimeout(() => {
        if (loadingScreen && !loadingScreen.classList.contains('fade-out')) {
            hideLoadingScreen();
        }
    }, 3000);
}

// ===========================================
// MOBILE OPTIMIZATIONS
// ===========================================
function initializeMobileOptimizations() {
    // Detect touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouch) {
        // Add touch class to body for CSS targeting
        document.body.classList.add('touch-device');
        
        // Prevent double-tap zoom on buttons
        document.addEventListener('touchend', function(e) {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
                e.preventDefault();
                e.target.click();
            }
        }, { passive: false });
        
        // Add subtle touch feedback
        const touchElements = document.querySelectorAll('button, a');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Optimize viewport for mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
        // Prevent horizontal scroll
        document.body.style.overflowX = 'hidden';
        
        // Add mobile class for CSS targeting
        document.body.classList.add('mobile-device');
    }
}

// ===========================================
// MOBILE MENU FUNCTIONALITY
// ===========================================
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuButton || !mobileMenu) return;
    
    mobileMenuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        mobileMenuButton.setAttribute('aria-expanded', String(!isHidden));
        mobileMenuButton.setAttribute('aria-label', isHidden ? 'Open menu' : 'Close menu');
    });
    
    // Close mobile menu when clicking on links
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
            mobileMenuButton.setAttribute('aria-label', 'Open menu');
        });
    });
}

// ===========================================
// TAB FUNCTIONALITY (Why Choose Us Section)
// ===========================================
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabButtons.length === 0 || tabPanes.length === 0) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            if (!tabId) return;

            // Update button styles
            tabButtons.forEach(btn => {
                btn.classList.remove('active', 'text-orange-600', 'border-orange-600');
                btn.classList.add('text-gray-500', 'border-transparent');
            });
            button.classList.add('active', 'text-orange-600', 'border-orange-600');
            button.classList.remove('text-gray-500', 'border-transparent');

            // Update tab panes
            tabPanes.forEach(pane => {
                pane.classList.toggle('hidden', pane.id !== tabId);
                pane.classList.toggle('active', pane.id === tabId);
            });
        });
    });
}

// ===========================================
// MODAL FUNCTIONALITY
// ===========================================
function initializeModal() {
    const modal = document.getElementById('audit-modal');
    const auditForm = document.getElementById('audit-form');
    const successMessage = document.getElementById('form-success-message');

    if (!modal) return;

    // Global modal functions
    window.openModal = function() {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            // Focus first input for accessibility
            const firstField = modal.querySelector('input, textarea, button');
            if (firstField) firstField.focus();
        }
    };

    window.closeModal = function() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            if (auditForm) {
                auditForm.reset();
                auditForm.style.display = 'block';
            }
            if (successMessage) {
                successMessage.classList.add('hidden');
            }
        }
    };
    
    // Modal event listeners
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.closeModal();
        }
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            window.closeModal();
        }
    });

    // Form submission handling
    if (auditForm) {
        auditForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (auditForm.style) {
                auditForm.style.display = 'none';
            }
            if (successMessage) {
                successMessage.classList.remove('hidden');
            }
            setTimeout(window.closeModal, 4000);
        });
    }
}

// ===========================================
// SCROLL ANIMATIONS
// ===========================================
function initializeScrollAnimations() {
    const observeElements = document.querySelectorAll('.observe');
    
    // Only initialize if elements exist
    if (observeElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    observeElements.forEach(el => {
        observer.observe(el);
    });
}

// ===========================================
// STICKY HEADER FUNCTIONALITY
// ===========================================
function initializeStickyHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // At the very top of the page - revert to initial state
        if (currentScrollY <= 10) {
            header.classList.remove('header-hidden');
            header.classList.remove('header-sticky');
            lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
            return;
        }

        // Scrolling DOWN - hide the header
        if (currentScrollY > lastScrollY) {
            header.classList.add('header-hidden');
        } 
        // Scrolling UP - show the header and make it sticky
        else {
            header.classList.remove('header-hidden');
            header.classList.add('header-sticky');
        }
        
        lastScrollY = currentScrollY;
    });
}

// ===========================================
// FORM HANDLING
// ===========================================
function initializeFormHandling() {
    // Handle all forms with enhanced validation
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            if (isValid) {
                // Handle form submission
                handleFormSubmission(form);
            }
        });
    });
}

function handleFormSubmission(form) {
    // Add loading state
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Show success message or redirect
            console.log('Form submitted successfully');
        }, 2000);
    }
}

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

// Smooth scroll to element
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ===========================================
// PERFORMANCE OPTIMIZATIONS
// ===========================================

// Optimize scroll events with throttling
const optimizedScrollHandler = throttle(() => {
    // Handle scroll-based animations and effects
    const scrollY = window.scrollY;
    
    // Update any scroll-dependent elements
    document.querySelectorAll('[data-scroll-effect]').forEach(element => {
        const effect = element.dataset.scrollEffect;
        const offset = element.offsetTop;
        const height = element.offsetHeight;
        
        if (scrollY > offset - window.innerHeight && scrollY < offset + height) {
            element.classList.add('in-view');
        } else {
            element.classList.remove('in-view');
        }
    });
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// ===========================================
// ERROR HANDLING
// ===========================================
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here
});

// ===========================================
// ACCESSIBILITY ENHANCEMENTS
// ===========================================

// Handle keyboard navigation
document.addEventListener('keydown', function(e) {
    // Tab navigation for custom components
    if (e.key === 'Tab') {
        // Ensure focus is visible
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// ===========================================
// EXPORT FUNCTIONS FOR GLOBAL USE
// ===========================================
window.OMNI = {
    openModal: window.openModal,
    closeModal: window.closeModal,
    smoothScrollTo: smoothScrollTo,
    debounce: debounce,
    throttle: throttle,
    isInViewport: isInViewport
};

