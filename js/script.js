document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // Set active navigation link
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');

        if (question && answer) {
            question.addEventListener('click', () => {
                const isOpen = answer.style.display === 'block';
                
                // Close all other answers
                document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');
                document.querySelectorAll('.faq-question i').forEach(ic => {
                    if(ic) {
                        ic.classList.remove('fa-minus');
                        ic.classList.add('fa-plus');
                    }
                });

                // Open or close the current one
                if (!isOpen) {
                    answer.style.display = 'block';
                    if(icon) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    }
                }
            });
        }
    });
    
    // Property Details Gallery
    const mainImage = document.querySelector('.property-gallery .main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail-images img');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                mainImage.src = this.src;
                
                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Simple EMI Calculator
    const emiForm = document.getElementById('emi-form');
    if (emiForm) {
        emiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const amount = parseFloat(document.getElementById('loan-amount').value) * 100000;
            const interest = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
            const tenure = parseFloat(document.getElementById('loan-tenure').value) * 12;
            
            const emiResultEl = document.querySelector('.emi-result span');

            if (amount > 0 && interest > 0 && tenure > 0) {
                const emi = (amount * interest * Math.pow(1 + interest, tenure)) / (Math.pow(1 + interest, tenure) - 1);
                emiResultEl.textContent = `₹ ${emi.toFixed(0)} / month`;
            } else {
                emiResultEl.textContent = 'Invalid input';
            }
        });
    }

    // Add a simple scroll animation for sections
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

});
