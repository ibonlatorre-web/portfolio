'use strict';

console.log('Sports Portfolio Loaded');

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Logo Click Logic (Reset View)
document.querySelector('.logo').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Hide all gallery sections
    document.querySelectorAll('.gallery-section').forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });
});

// Date & Category Filter Logic
const dateInput = document.getElementById('match-date');
const categoryBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

function filterGallery() {
    const selectedDate = dateInput ? dateInput.value : '';
    const activeBtn = document.querySelector('.filter-btn.active');
    const selectedCategory = activeBtn ? activeBtn.getAttribute('data-category') : 'all';

    galleryItems.forEach(item => {
        const itemDate = item.getAttribute('data-date');
        const itemCategory = item.getAttribute('data-category') || 'all'; // Default to all if not specified

        const dateMatch = !selectedDate || itemDate === selectedDate;
        const categoryMatch = selectedCategory === 'all' || itemCategory === selectedCategory;

        if (dateMatch && categoryMatch) {
            item.style.display = 'block';
            setTimeout(() => item.style.opacity = '1', 10);
        } else {
            item.style.display = 'none';
            item.style.opacity = '0';
        }
    });

}

if (dateInput) {
    dateInput.addEventListener('change', filterGallery);
}

if (categoryBtns) {
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');
            filterGallery();
        });
    });
}


// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.15
});

revealElements.forEach(el => revealObserver.observe(el));


// Section Navigation
function showSection(sectionId) {
    // Hide all gallery sections
    document.querySelectorAll('.gallery-section').forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active'); // Reset reveal animation if needed
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';

        // Trigger reveal animation slightly after display block
        setTimeout(() => {
            targetSection.classList.add('active');
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    }
}


// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');
const closeBtn = document.querySelector('.close-lightbox');

// Delegate event listener for dynamically added gallery items
document.querySelector('.gallery-grid').addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG' && e.target.closest('.gallery-item')) {
        lightbox.style.display = 'flex';
        lightboxImg.src = e.target.src;
        captionText.innerHTML = e.target.alt;
    }
});

// Close Lightbox
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });
}

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target == lightbox) {
        lightbox.style.display = 'none';
    }
});

// Contact Form Handler (Visual only for now)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;

        // Visual Feedback
        btn.innerText = 'ENVIANDO...';
        btn.style.borderColor = '#FF5F00';
        btn.style.color = '#FF5F00';

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                btn.innerText = '¡ENVIADO!';
                btn.style.borderColor = '#00ff00';
                btn.style.color = '#00ff00';
                contactForm.reset();
            } else {
                throw new Error('Error al enviar');
            }
        } catch (error) {
            btn.innerText = 'ERROR';
            btn.style.borderColor = 'red';
            btn.style.color = 'red';
            console.error(error);
        }

        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.borderColor = '';
            btn.style.color = '';
        }, 3000);
    });
}

// Custom Cursor Logic
const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');

window.addEventListener('mousemove', function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows instantly
    if (cursorDot) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
    }

    // Outline follows with slight delay (animation)
    if (cursorOutline) {
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    }
});

// Cursor Hover Effect
const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .gallery-item');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('hovering');
    });
});
