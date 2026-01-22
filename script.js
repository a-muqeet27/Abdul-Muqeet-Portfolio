// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const body = document.body;

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
});


navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        body.style.overflow = '';
    });
});


document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        body.style.overflow = '';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; 
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
});

const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

const downloadBtn = document.getElementById('downloadBtn');

downloadBtn.addEventListener('click', () => {
    try {
        const link = document.createElement('a');
        link.href = './Abdul Muqeet\'s Resume.pdf';
        link.download = 'Abdul Muqeet\'s Resume.pdf';
        link.target = '_blank';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        const originalText = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-check"></i> Download Started!';
        downloadBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)';
        
        setTimeout(() => {
            downloadBtn.innerHTML = originalText;
            downloadBtn.style.background = '';
        }, 2000);
    } catch (error) {
        console.error('Download error:', error);
        window.open('./Abdul Muqeet CV.pdf', '_blank');
    }
});


const subtitle = document.querySelector('.subtitle');
const homeSection = document.getElementById('home');
let typingTimeout = null;
let isTyping = false;

function typeText(element, text, speed = 50) {
    return new Promise((resolve) => {
        element.textContent = '';
        element.classList.add('typing');
        let index = 0;
        
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                typingTimeout = setTimeout(type, speed);
            } else {
                element.classList.remove('typing');
                element.classList.add('typing-complete');
                resolve();
            }
        }
        
        type();
    });
}

function resetTypingAnimation() {
    if (subtitle && !isTyping) {
        isTyping = true;
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        
        // Get original text
        const originalText = subtitle.getAttribute('data-text') || subtitle.textContent;
        if (!subtitle.getAttribute('data-text')) {
            subtitle.setAttribute('data-text', originalText);
        }
        
        subtitle.classList.remove('typing', 'typing-complete');
        subtitle.textContent = '';
        
        void subtitle.offsetWidth;
        
        typeText(subtitle, originalText, 50).then(() => {
            isTyping = false;
        });
    }
}

const homeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                resetTypingAnimation();
            }, 300);
        } else {
            if (subtitle && typingTimeout) {
                clearTimeout(typingTimeout);
                isTyping = false;
            }
        }
    });
}, { threshold: 0.3 });

if (homeSection && subtitle) {
    if (!subtitle.getAttribute('data-text')) {
        subtitle.setAttribute('data-text', subtitle.textContent);
    }
    
    homeObserver.observe(homeSection);
    setTimeout(() => {
        resetTypingAnimation();
    }, 500);
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.style.opacity === '0' || entry.target.style.opacity === '') {
                entry.target.style.opacity = '1';
                if (entry.target.classList.contains('education-card')) {
                    entry.target.style.transform = 'translateX(0)';
                } else {
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        } else {
            entry.target.classList.remove('animate');
            if (entry.target.classList.contains('section-title')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
            } else if (entry.target.classList.contains('about-text')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
            } else if (entry.target.classList.contains('tech-item')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px) scale(0.9)';
            } else if (entry.target.classList.contains('project-card')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(50px)';
            } else if (entry.target.classList.contains('education-card')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateX(-50px)';
            } else if (entry.target.classList.contains('experience-card')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
            }
        }
    });
}, observerOptions);

const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => {
    observer.observe(title);
});

const aboutTexts = document.querySelectorAll('.about-text');
aboutTexts.forEach(text => {
    observer.observe(text);
});

const techItems = document.querySelectorAll('.tech-item');
techItems.forEach((item, index) => {
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});


const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.transition = `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`;
    observer.observe(card);
});


const educationCards = document.querySelectorAll('.education-card');
educationCards.forEach((card, index) => {
    card.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
    observer.observe(card);
});


const experienceCards = document.querySelectorAll('.experience-card');
experienceCards.forEach(card => {
    card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(card);
});


function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00d4ff 0%, #0099cc 50%, #0066ff 100%);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 5px 20px rgba(0, 212, 255, 0.4);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px)';
    scrollTopBtn.style.boxShadow = '0 8px 30px rgba(0, 212, 255, 0.6)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
    scrollTopBtn.style.boxShadow = '0 5px 20px rgba(0, 212, 255, 0.4)';
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

const githubLinks = document.querySelectorAll('.project-github-link');
githubLinks.forEach(link => {
    const projectCard = link.closest('.project-card');
    
    link.addEventListener('mouseenter', () => {
        projectCard.classList.add('github-hovered');
    });
    
    link.addEventListener('mouseleave', () => {
        projectCard.classList.remove('github-hovered');
    });
});

console.log('%c👋 Welcome to My Portfolio!', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cFeel free to explore the code and reach out if you have any questions!', 'color: #a0a0b0; font-size: 14px;');

