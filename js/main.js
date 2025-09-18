/* ========================================
   MAYVEN WEBSITE JAVASCRIPT
   ======================================== */

// Base path for GitHub Pages
const BASE_PATH = '/mayven-web';

// Wait for DOM to be ready
$(document).ready(function() {
    'use strict';
    
    // Initialize all functionality
    initNavigation();
    initSmoothScroll();
    initRevealAnimations();
    initContactForm();
    initCookieNotice();
    initWhyItMattersToggle();
    
    // Set base path for asset loading if needed
    if (window.location.hostname === 'nicholasrjm.github.io') {
        // Update asset paths for GitHub Pages
        updateAssetPaths();
    }
});

/* ========================================
   NAVIGATION
   ======================================== */

function initNavigation() {
    const menuToggle = $('#menuToggle');
    const menuOverlay = $('#menuOverlay');
    const menuLinks = $('.menu-link');
    const body = $('body');
    
    // Toggle menu
    menuToggle.on('click', function() {
        const isExpanded = menuOverlay.attr('aria-hidden') === 'false';
        
        if (isExpanded) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Close menu when clicking on links
    menuLinks.on('click', function() {
        closeMenu();
    });
    
    // Close menu with Escape key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && menuOverlay.attr('aria-hidden') === 'false') {
            closeMenu();
        }
    });
    
    // Close menu when clicking outside
    menuOverlay.on('click', function(e) {
        if (e.target === this) {
            closeMenu();
        }
    });
    
    function openMenu() {
        menuOverlay.attr('aria-hidden', 'false');
        menuToggle.attr('aria-expanded', 'true');
        body.addClass('menu-open');
        menuOverlay.addClass('active');
        
        // Focus trap
        trapFocus(menuOverlay[0]);
    }
    
    function closeMenu() {
        menuOverlay.attr('aria-hidden', 'true');
        menuToggle.attr('aria-expanded', 'false');
        body.removeClass('menu-open');
        menuOverlay.removeClass('active');
        
        // Return focus to menu toggle
        menuToggle.focus();
    }
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = $('#mainNav');
    
    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.addClass('navbar-hidden');
        } else {
            // Scrolling up
            navbar.removeClass('navbar-hidden');
        }
        
        lastScrollTop = scrollTop;
    });
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */

function initSmoothScroll() {
    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        
        if (target.length) {
            e.preventDefault();
            
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offset().top - offset;
            
            $('html, body').animate({
                scrollTop: targetPosition
            }, 800, 'easeInOutCubic');
        }
    });
    
    // Add easing function
    $.easing.easeInOutCubic = function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    };
}

/* ========================================
   REVEAL ANIMATIONS
   ======================================== */

function initRevealAnimations() {
    // Add reveal class to elements that should animate
    const revealElements = $('.section-title, .section-text, .approach-card, .venture-category, .featured-venture, .contact-form-card');
    revealElements.addClass('reveal');
    
    // Create intersection observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(function(el) {
        observer.observe(el);
    });
}

/* ========================================
   CONTACT FORM
   ======================================== */

function initContactForm() {
    const form = $('#contactForm');
    const alert = $('#formAlert');
    
    form.on('submit', function(e) {
        e.preventDefault();
        
        // Clear previous alerts
        alert.removeClass('alert-success alert-danger').hide();
        
        // Get form data
        const formData = new FormData(this);
        
        // Basic validation
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        const submitBtn = form.find('button[type="submit"]');
        const originalText = submitBtn.text();
        submitBtn.prop('disabled', true).text('SENDING...');
        
        // Submit to Formspree
        fetch(form.attr('action'), {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            if (response.ok) {
                showAlert('success', 'Thank you! Your message has been sent successfully.');
                form[0].reset();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(function(error) {
            console.error('Error:', error);
            showAlert('danger', 'Sorry, there was an error sending your message. Please try again.');
        })
        .finally(function() {
            submitBtn.prop('disabled', false).text(originalText);
        });
    });
    
    function validateForm() {
        let isValid = true;
        
        // Clear previous validation states
        $('.form-control').removeClass('is-invalid');
        $('.invalid-feedback').remove();
        
        // Validate required fields
        form.find('[required]').each(function() {
            const field = $(this);
            const value = field.val().trim();
            
            if (!value) {
                showFieldError(field, 'This field is required.');
                isValid = false;
            } else if (field.attr('type') === 'email' && !isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address.');
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        field.addClass('is-invalid');
        field.after(`<div class="invalid-feedback">${message}</div>`);
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showAlert(type, message) {
        alert.removeClass('alert-success alert-danger')
             .addClass(`alert-${type}`)
             .text(message)
             .show();
        
        // Scroll to alert
        $('html, body').animate({
            scrollTop: alert.offset().top - 100
        }, 500);
    }
}

/* ========================================
   COOKIE NOTICE
   ======================================== */

function initCookieNotice() {
    const cookieNotice = $('#cookieNotice');
    const acceptBtn = $('#acceptCookies');
    
    // Check if cookies were already accepted
    if (localStorage.getItem('cookiesAccepted') === 'true') {
        return;
    }
    
    // Show cookie notice after a delay
    setTimeout(function() {
        cookieNotice.addClass('show');
    }, 2000);
    
    // Accept cookies
    acceptBtn.on('click', function() {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieNotice.removeClass('show');
        
        // Initialize analytics here if needed
        // gtag('config', 'GA_MEASUREMENT_ID');
    });
}

/* ========================================
   WHY IT MATTERS TOGGLE
   ======================================== */

function initWhyItMattersToggle() {
    const toggle = $('#whyItMattersToggle');
    const content = $('#whyItMattersContent');
    
    toggle.on('click', function(e) {
        e.preventDefault();
        
        if (content.is(':visible')) {
            content.slideUp(300);
            toggle.text('+ADD WHY IT MATTERS');
        } else {
            content.slideDown(300);
            toggle.text('-HIDE WHY IT MATTERS');
        }
    });
}

/* ========================================
   UTILITY FUNCTIONS
   ======================================== */

function updateAssetPaths() {
    // Update asset paths for GitHub Pages if needed
    $('img[src^="assets/"]').each(function() {
        const src = $(this).attr('src');
        $(this).attr('src', BASE_PATH + '/' + src);
    });
}

function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
    
    firstFocusableElement.focus();
}

/* ========================================
   PERFORMANCE OPTIMIZATIONS
   ======================================== */

// Lazy load images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(function(img) {
            imageObserver.observe(img);
        });
    }
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        'assets/brand/Mayven Logo.png',
        'assets/brand/Mayven Symbol.png'
    ];
    
    criticalImages.forEach(function(src) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = BASE_PATH + '/' + src;
        document.head.appendChild(link);
    });
}

// Initialize performance optimizations
$(document).ready(function() {
    initLazyLoading();
    preloadCriticalResources();
});

/* ========================================
   ACCESSIBILITY ENHANCEMENTS
   ======================================== */

// Skip to main content functionality
$(document).ready(function() {
    $('.skip-link').on('click', function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            target.focus();
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 500);
        }
    });
});

// Keyboard navigation for custom elements
$(document).ready(function() {
    // Make approach cards focusable
    $('.approach-card').attr('tabindex', '0');
    
    // Add keyboard support for approach cards
    $('.approach-card').on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        }
    });
});

/* ========================================
   ANALYTICS (Placeholder)
   ======================================== */

// Google Analytics 4 setup (uncomment when ready)
/*
function initAnalytics() {
    if (localStorage.getItem('cookiesAccepted') === 'true') {
        // Load Google Analytics
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
    }
}
*/

/* ========================================
   ERROR HANDLING
   ======================================== */

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send this to an error tracking service
});
