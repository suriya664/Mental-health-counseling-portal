// ============================================
// MENTAL HEALTH COUNSELING PORTAL - JAVASCRIPT
// ============================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== TESTIMONIAL CAROUSEL =====
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        const cards = testimonialCarousel.querySelectorAll('.testimonial-card');
        const dots = testimonialCarousel.querySelectorAll('.carousel-dot');
        let currentIndex = 0;
        
        function showTestimonial(index) {
            cards.forEach((card, i) => {
                card.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showTestimonial(currentIndex);
            });
        });
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            showTestimonial(currentIndex);
        }, 5000);
    }
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== FORM VALIDATION =====
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Create message container
        const messageContainer = document.createElement('div');
        messageContainer.id = 'form-message';
        messageContainer.style.cssText = 'margin-top: 1rem; padding: 1rem; border-radius: 8px; display: none;';
        contactForm.appendChild(messageContainer);
        
        // Real-time validation
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                if (this.style.borderColor === 'rgb(231, 76, 60)') {
                    validateField(this);
                }
            });
        });
        
        function validateField(field) {
            if (field.hasAttribute('required') && !field.value.trim()) {
                field.style.borderColor = '#e74c3c';
                return false;
            }
            
            // Email validation
            if (field.type === 'email' && field.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    field.style.borderColor = '#e74c3c';
                    return false;
                }
            }
            
            // Phone validation
            if (field.type === 'tel' && field.value) {
                const phoneRegex = /^[\d\s\(\)\-\+]+$/;
                if (!phoneRegex.test(field.value) || field.value.replace(/\D/g, '').length < 10) {
                    field.style.borderColor = '#e74c3c';
                    return false;
                }
            }
            
            field.style.borderColor = '';
            return true;
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hide previous messages
            messageContainer.style.display = 'none';
            messageContainer.className = '';
            
            // Validate all fields
            let isValid = true;
            const firstInvalidField = [];
            
            requiredFields.forEach(field => {
                if (!validateField(field)) {
                    isValid = false;
                    if (firstInvalidField.length === 0) {
                        firstInvalidField.push(field);
                    }
                }
            });
            
            if (isValid) {
                // Show success message
                messageContainer.style.display = 'block';
                messageContainer.style.background = '#d4edda';
                messageContainer.style.color = '#155724';
                messageContainer.style.border = '1px solid #c3e6cb';
                messageContainer.textContent = '✓ Thank you! We will contact you within 24 business hours.';
                
                // Scroll to message
                messageContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                
                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    messageContainer.style.display = 'none';
                }, 5000);
            } else {
                // Show error message
                messageContainer.style.display = 'block';
                messageContainer.style.background = '#f8d7da';
                messageContainer.style.color = '#721c24';
                messageContainer.style.border = '1px solid #f5c6cb';
                messageContainer.textContent = '✗ Please fill in all required fields correctly.';
                
                // Focus first invalid field
                if (firstInvalidField.length > 0) {
                    firstInvalidField[0].focus();
                    firstInvalidField[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
    
    // ===== MOBILE MENU TOGGLE (if needed) =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // ===== FADE IN ANIMATIONS ON SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.card, .condition-item, .therapist-card').forEach(el => {
        observer.observe(el);
    });
    
    // ===== FILTER FUNCTIONALITY FOR THERAPISTS PAGE =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const therapistCards = document.querySelectorAll('.therapist-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            therapistCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ===== ACCORDION FOR FAQ =====
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordion = this.parentElement;
            const content = accordion.querySelector('.accordion-content');
            const isActive = accordion.classList.contains('active');
            
            // Close all accordions
            document.querySelectorAll('.accordion').forEach(acc => {
                acc.classList.remove('active');
                acc.querySelector('.accordion-content').style.maxHeight = null;
            });
            
            // Open clicked accordion if it wasn't active
            if (!isActive) {
                accordion.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
    
    // ===== ACTIVE NAV LINK HIGHLIGHTING =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // ===== PHONE NUMBER CLICK TO CALL =====
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            // Analytics tracking could go here
            console.log('Phone number clicked:', this.getAttribute('href'));
        });
    });
    
    // ===== BREATHING CIRCLE INTERACTION =====
    const breathingCircle = document.querySelector('.breathing-circle');
    if (breathingCircle) {
        breathingCircle.addEventListener('click', function() {
            this.style.animationDuration = '3s';
            setTimeout(() => {
                this.style.animationDuration = '4s';
            }, 10000);
        });
    }
    
});

// ===== UTILITY FUNCTIONS =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

