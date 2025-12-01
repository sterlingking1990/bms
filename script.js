// Mobile Navigation Toggle
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Email Verification Modal

// Enhanced Email Verification Modal
function initEmailVerificationModal() {
    const modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const openAppButton = modal?.querySelector('.btn-primary');
    const modalMessage = modal?.querySelector('p');

    if (!modal || !openAppButton) return;

    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function getAppStoreLink() {
        const userAgent = navigator.userAgent;
        if (/iPhone|iPad|iPod/i.test(userAgent)) {
            return 'https://apps.apple.com/app/brandible'; // Your App Store URL
        } else if (/Android/i.test(userAgent)) {
            return 'https://play.google.com/store/apps/details?id=com.brandiblebms.app'; // Your Play Store URL
        }
        return 'https://brandiblebms.com'; // Fallback
    }

function openAppOrFallback() {
    if (isMobileDevice()) {
        // Try multiple deep link formats
        const deepLinks = [
            'brandiblebms://', // Custom scheme
            'intent://app#Intent;scheme=brandiblebms;package=com.brandiblebms.app;end', // Android Intent
            'https://brandiblebms.com' // Fallback to website
        ];
        
        // Try custom scheme first
        window.location.href = deepLinks[0];
        
        // If still here after 500ms, try Android Intent
        setTimeout(() => {
            if (isAndroid()) {
                window.location.href = deepLinks[1];
            }
        }, 500);
        
        // Final fallback to app store
        setTimeout(() => {
            window.location.href = getAppStoreLink();
        }, 2000);
    } else {
        window.location.href = 'https://brandiblebms.com';
    }
}

function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}

function isIOS() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

    function checkVerificationStatus() {
        const hash = window.location.hash;
        
        if (hash.includes('access_token=') && hash.includes('type=signup')) {
            modal.style.display = "block";
            
            // Update UI based on device
            if (isMobileDevice()) {
                openAppButton.innerHTML = '<i class="fas fa-mobile-alt"></i> Open Brandible App';
                if (modalMessage) {
                    modalMessage.textContent = 'Your email has been successfully verified. Opening the Brandible app...';
                }
            } else {
                openAppButton.innerHTML = '<i class="fas fa-download"></i> Download Brandible App';
                if (modalMessage) {
                    modalMessage.textContent = 'Your email has been successfully verified. Download the Brandible app to continue.';
                }
            }
            
            history.replaceState(null, null, window.location.pathname);
            return true;
        }
        return false;
    }

    // Event handlers
    window.addEventListener('load', function() {
        setTimeout(checkVerificationStatus, 100);
    });

    openAppButton.onclick = function(e) {
        e.preventDefault();
        openAppOrFallback();
    };

    span.onclick = function() {
        modal.style.display = "none";
        openAppOrFallback();
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            openAppOrFallback();
        }
    };
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Don't prevent default for links that have specific classes or IDs
            if (this.classList.contains('nav-link') || this.id === 'get-started') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Navbar Background Change on Scroll
function initNavbarScroll() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    });
}

// Function to open the app or redirect to the Play Store
function openOrDownloadApp() {
    // Attempt to open the app using its custom URL scheme
    window.location.href = 'brandiblebms://app';

    // Set a timeout to redirect to the Play Store if the app doesn't open
    setTimeout(function() {
        // This part runs if the user is still on the page after a short delay
        window.location.href = 'https://play.google.com/store/apps/details?id=com.brandiblebms.app';
    }, 2500);
}

// Form Submission Handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!validateForm(data)) {
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            // Allow Netlify to handle the form submission
            // Netlify will automatically redirect to a success page or display a success message
            // based on your Netlify form settings.
            // For example, you can redirect to a page named 'success.html' after submission.
            // Make sure your Netlify project is configured to receive form submissions.
        });
    }
}

// Form Validation
function validateForm(data) {
    const errors = [];
    
    if (!data['company-name'] || data['company-name'].trim().length < 2) {
        errors.push('Company name must be at least 2 characters long');
    }
    
    if (!data['contact-name'] || data['contact-name'].trim().length < 2) {
        errors.push('Your name must be at least 2 characters long');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.phone || data.phone.trim().length < 10) {
        errors.push('Please enter a valid phone number');
    }
    
    if (!data['campaign-budget']) {
        errors.push('Please select your campaign budget');
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors);
        return false;
    }
    
    return true;
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show Success Message
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'notification success';
    message.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <div>
                <strong>Thank you!</strong>
                <p>We've received your request and will contact you within 24 hours to schedule your free consultation.</p>
            </div>
        </div>
    `;
    
    // Add notification styles
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f0f9ff;
        border: 1px solid #7c3aed;
        border-radius: 8px;
        padding: 20px;
        max-width: 400px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    `;
    
    const notificationContent = message.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: flex-start;
        gap: 15px;
    `;
    
    const icon = message.querySelector('i');
    icon.style.cssText = `
        color: #7c3aed;
        font-size: 1.5rem;
        margin-top: 2px;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        message.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(message)) {
                document.body.removeChild(message);
            }
        }, 300);
    }, 5000);
}

// Show Error Message
function showErrorMessage(errors) {
    const message = document.createElement('div');
    message.className = 'notification error';
    message.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-exclamation-circle"></i>
            <div>
                <strong>Please fix the following errors:</strong>
                <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    
    // Add notification styles
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #fef2f2;
        border: 1px solid #dc2626;
        border-radius: 8px;
        padding: 20px;
        max-width: 400px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    `;
    
    const notificationContent = message.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: flex-start;
        gap: 15px;
    `;
    
    const icon = message.querySelector('i');
    icon.style.cssText = `
        color: #dc2626;
        font-size: 1.5rem;
        margin-top: 2px;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        message.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(message)) {
                document.body.removeChild(message);
            }
        }, 300);
    }, 7000);
}

// Counter Animation for Statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            if (element.textContent.includes('%')) {
                element.textContent = Math.floor(start) + '%';
            } else if (element.textContent.includes('+')) {
                element.textContent = Math.floor(start).toLocaleString() + '+';
            } else if (element.textContent.includes('M')) {
                element.textContent = (start / 1000000).toFixed(1) + 'M+';
            } else {
                element.textContent = Math.floor(start).toLocaleString();
            }
            requestAnimationFrame(updateCounter);
        } else {
            // Set final value
            if (element.textContent.includes('%')) {
                element.textContent = target + '%';
            } else if (element.textContent.includes('+')) {
                element.textContent = target.toLocaleString() + '+';
            } else if (element.textContent.includes('M')) {
                element.textContent = (target / 1000000).toFixed(1) + 'M+';
            } else {
                element.textContent = target.toLocaleString();
            }
        }
    }
    
    updateCounter();
}

// Initialize counter animations when stats section is visible
function initCounterAnimations() {
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    let target = 0;
                    
                    if (text.includes('10,000+')) {
                        target = 10000;
                        stat.textContent = '0+';
                    } else if (text.includes('500%')) {
                        target = 500;
                        stat.textContent = '0%';
                    } else if (text.includes('2M+')) {
                        target = 2000000;
                        stat.textContent = '0M+';
                    } else if (text.includes('200+')) {
                        target = 200;
                        stat.textContent = '0+';
                    } else if (text.includes('50M+')) {
                        target = 50000000;
                        stat.textContent = '0M+';
                    }
                    
                    if (target > 0) {
                        animateCounter(stat, target);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    });

    const heroStats = document.querySelector('.hero-stats');
    const aboutStats = document.querySelector('.about-stats');
    
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    if (aboutStats) {
        statsObserver.observe(aboutStats);
    }
}

// Phone Number Formatting
function initPhoneFormatting() {
    const phoneInput = document.querySelector('#phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            // Add Nigerian country code if not present
            if (value.length > 0 && !value.startsWith('234')) {
                if (value.startsWith('0')) {
                    value = '234' + value.substring(1);
                } else if (!value.startsWith('234')) {
                    value = '234' + value;
                }
            }
            
            // Format the number
            if (value.length > 3) {
                value = value.substring(0, 3) + ' ' + value.substring(3);
            }
            if (value.length > 7) {
                value = value.substring(0, 7) + ' ' + value.substring(7);
            }
            if (value.length > 11) {
                value = value.substring(0, 11) + ' ' + value.substring(11);
            }
            
            e.target.value = value;
        });
    }
}

// Intersection Observer for Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .problem-card, .workflow-step, .pricing-card, .stat-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Scroll to Top Button
function initScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    
    // Style the button
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #7c3aed;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
    `;
    
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.background = '#6d28d9';
        this.style.transform = 'translateY(-2px)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.background = '#7c3aed';
        this.style.transform = 'translateY(0)';
    });
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// WhatsApp Status Animation
function initStatusAnimations() {
    const statusStories = document.querySelectorAll('.status-story');
    
    statusStories.forEach((story, index) => {
        // Add viewing animation
        setTimeout(() => {
            story.style.opacity = '1';
            story.style.transform = 'scale(1)';
        }, index * 500);
        
        // Animate view count
        const viewCount = story.querySelector('.story-stats span');
        if (viewCount) {
            setTimeout(() => {
                const currentViews = parseInt(viewCount.textContent.replace(/\D/g, ''));
                let count = 0;
                const increment = currentViews / 50;
                
                const counter = setInterval(() => {
                    count += increment;
                    if (count >= currentViews) {
                        viewCount.innerHTML = `<i class="fas fa-eye"></i> ${currentViews.toLocaleString()} views`;
                        clearInterval(counter);
                    } else {
                        viewCount.innerHTML = `<i class="fas fa-eye"></i> ${Math.floor(count).toLocaleString()} views`;
                    }
                }, 50);
            }, (index * 500) + 1000);
        }
    });

    // Initialize status stories with initial styles
    statusStories.forEach(story => {
        story.style.opacity = '0';
        story.style.transform = 'scale(0.9)';
        story.style.transition = 'all 0.5s ease';
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initEmailVerificationModal();
    initSmoothScrolling();
    initNavbarScroll();
    initFormHandling();
    initCounterAnimations();
    initPhoneFormatting();
    initAnimations();
    initScrollToTop();
    initStatusAnimations();

    // ROI Calculator
    const productCostEl = document.getElementById('productCost');
    const sellingPriceEl = document.getElementById('sellingPrice');
    const coinsEl = document.getElementById('coins');
    const peopleEl = document.getElementById('people');

    const profitPerSaleEl = document.getElementById('profitPerSale');
    const rewardPerPersonNGNEl = document.getElementById('rewardPerPersonNGN');
    const totalCampaignCostEl = document.getElementById('totalCampaignCost');
    const breakEvenUnitsEl = document.getElementById('breakEvenUnits');
    const conversionRateEl = document.getElementById('conversionRate');
    const decisionTextEl = document.getElementById('decisionText');
    const feasibilityEl = document.getElementById('feasibility');

    const costPerCoin = 10;

    const formatCurrency = (val) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            maximumFractionDigits: 0
        }).format(val);
    };

    const formatNumber = (val) => {
        return new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 1
        }).format(val);
    };

    function calculateROI() {
        const productCost = parseFloat(productCostEl.value) || 0;
        const sellingPrice = parseFloat(sellingPriceEl.value) || 0;
        const coins = parseFloat(coinsEl.value) || 0;
        const people = parseFloat(peopleEl.value) || 0;

        const profitPerSale = sellingPrice - productCost;
        const rewardPerPersonNGN = costPerCoin * coins;
        const totalCampaignCost = rewardPerPersonNGN * people;
        const breakEvenUnits = profitPerSale > 0 ? totalCampaignCost / profitPerSale : 0;
        const conversionRate = people > 0 ? (breakEvenUnits / people) * 100 : 0;
        const isFeasible = conversionRate < 3;

        profitPerSaleEl.textContent = formatCurrency(profitPerSale);
        if (profitPerSale >= 0) {
            profitPerSaleEl.classList.remove('loss');
            profitPerSaleEl.classList.add('profit');
        } else {
            profitPerSaleEl.classList.remove('profit');
            profitPerSaleEl.classList.add('loss');
        }

        rewardPerPersonNGNEl.textContent = formatCurrency(rewardPerPersonNGN);
        totalCampaignCostEl.textContent = formatCurrency(totalCampaignCost);
        breakEvenUnitsEl.textContent = `~${Math.ceil(breakEvenUnits)} sales`;
        conversionRateEl.textContent = `${formatNumber(conversionRate)}%`;

        decisionTextEl.innerHTML = `Offer a <strong>${coins} Coin</strong> reward to <strong>${people} people</strong>. You need <strong>${Math.ceil(breakEvenUnits)} sales</strong> (${formatNumber(conversionRate)}%) to be profitable.`;

        if (isFeasible) {
            feasibilityEl.textContent = 'Good starting point. This conversion rate is achievable.';
            feasibilityEl.className = 'feasibility-indicator feasible';
        } else {
            feasibilityEl.textContent = `This requires a high conversion rate of ${formatNumber(conversionRate)}%. Consider reducing the audience size or coin reward.`;
            feasibilityEl.className = 'feasibility-indicator not-feasible';
        }
    }

    if (productCostEl) {
        [productCostEl, sellingPriceEl, coinsEl, peopleEl].forEach(el => {
            el.addEventListener('input', calculateROI);
        });
        calculateROI();
    }
});