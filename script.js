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

// ── Experience Toggle ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtns = document.querySelectorAll('.experience-toggle-btn');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.experience-card');
            const description = card ? card.querySelector('.experience-description') : null;
            const icon = btn.querySelector('.toggle-icon');
            if (!description) return;
            const isCollapsed = description.classList.contains('collapsed');

            if (isCollapsed) {
                description.classList.remove('collapsed');
                if (icon) icon.style.transform = 'rotate(180deg)';
            } else {
                description.classList.add('collapsed');
                if (icon) icon.style.transform = 'rotate(0deg)';
            }
        });
    });
});
// ─────────────────────────────────────────────────────────────────────────────

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

// ── Project Detail Modal ──────────────────────────────────────────────────────
const projectsData = {
    'drowsiness-detection': {
        title: 'Drowsiness Detection Model',
        github: 'https://github.com/a-muqeet27/Drowsiness-Detection-Model.git',
        description: 'A Drowsiness Detection Model uses Computer Vision and Machine Learning techniques to monitor eye-closure and yawning in real time to identify signs of drowsiness.',
        tools: ['Python', 'OpenCV', 'TensorFlow', 'Keras', 'PyTorch', 'NumPy', 'Pandas'],
        gallery: [
            { src: 'images/Drowsiness Detection Model.png', caption: 'Drowsiness Detection Model Architecture' }
        ],
        highlights: [
            'Real-time eye-closure and yawning monitoring',
            'Computer vision and machine learning based detection',
            'Built with OpenCV, TensorFlow, Keras, and PyTorch'
        ]
    },
    'alert-mate': {
        title: 'Alert Mate',
        badge: 'Final Year Project',
        github: 'https://github.com/a-muqeet27/Alert-Mate-FYP.git',
        description: 'My Final Year Project of Drowsiness Detection System using Mobile Application and Integrated Model that detects drowsiness using Facial Landmarks Techniques.',
        tools: ['Flutter', 'Firebase', 'FastAPI', 'Python', 'OpenCV', 'PyTorch'],
        gallery: [
            { src: 'images/Alert Mate.jpeg', caption: 'Alert Mate Mobile Application' },
            { src: 'images/Drowsiness Detection Model.png', caption: 'Integrated Drowsiness Detection Model' }
        ],
        highlights: [
            'Mobile application for drowsiness detection',
            'Integrated model using facial landmarks techniques',
            'Flutter frontend with Firebase backend integration',
            'FastAPI and Python for model serving and processing'
        ]
    },
    'book-verse': {
        title: 'Book Verse',
        github: 'https://github.com/a-muqeet27/BookVerse.git',
        description: 'BookVerse is a Flutter-based mobile application designed to provide users with a reading experience. The app features to browse, search, and purchase books.',
        tools: ['Flutter', 'Firebase'],
        gallery: [{ src: 'images/Book Verse.png', caption: 'Book Verse App Interface' }],
        highlights: ['Browse, search, and purchase books', 'Flutter-based mobile reading experience', 'Firebase powered backend']
    },
    'perg': {
        title: 'PERG',
        github: 'https://github.com/a-muqeet27/PERG-Parallel-File-Search-.git',
        description: 'Parallel File Search project using GUI which is a parallelized version of the traditional grep tool. It improves search performance across large files or multiple files using multi-threading, making it suitable for real-time log analysis and big data environments.',
        tools: ['HTML', 'JavaFX', 'C++', 'OpenMP'],
        gallery: [{ src: 'images/PERG.png', caption: 'PERG Parallel File Search GUI' }],
        highlights: ['Parallelized grep-style file search', 'Multi-threaded performance for large files', 'GUI built with JavaFX and OpenMP']
    },
    'twitter-replica': {
        title: 'Twitter Replica',
        github: 'https://github.com/a-muqeet27/Twitter-Replica-.git',
        description: 'The Twitter Replica is a DSA-based project that simulates functionalities such as posting tweets, and following users. It uses data structures like stack, queues and linked list to manage users.',
        tools: ['Java', 'JavaFX'],
        gallery: [{ src: 'images/Twitter.jpeg', caption: 'Twitter Replica Application' }],
        highlights: ['Tweet posting and user following simulation', 'Stack, queue, and linked list based user management', 'Java and JavaFX desktop application']
    },
    'oil-inventory': {
        title: 'Oil Inventory Management System',
        github: 'https://github.com/a-muqeet27/Oil-Inventory-Management-System.git',
        description: 'The Oil Inventory Management System is a database project designed to manage oil products, customers, and stock. It uses relational schema to maintain data integrity. SQL queries are implemented while database views provide simplified access to frequently used inventory information.',
        tools: ['MS SQL'],
        gallery: [{ src: 'images/DATABASE DIAGRAM.png', caption: 'Database Schema Diagram' }],
        highlights: ['Manages oil products, customers, and stock', 'Relational schema with SQL queries and views', 'MS SQL Server database project']
    },
    'traffic-signal': {
        title: 'Traffic Signal Recognition',
        github: 'https://github.com/a-muqeet27/Traffic-Signal-Recognition',
        description: 'A traffic signal recognition tool which tells the current signal state when an image is passed to it.',
        tools: ['MATLAB', 'Image Processing'],
        gallery: [{ src: 'images/Traffic.jpeg', caption: 'Traffic Signal Recognition' }],
        highlights: ['Detects traffic signal state from images', 'Image processing with MATLAB']
    }
};

const projectModal = document.getElementById('project-modal');
let currentGalleryIndex = 0;
let currentProject = null;

function renderGalleryImage(index) {
    if (!currentProject) return;
    const gallery = currentProject.gallery;
    const item = gallery[index];
    const img = document.getElementById('project-modal-image');
    const caption = document.getElementById('project-modal-caption');
    const prevBtn = document.querySelector('.project-modal-prev');
    const nextBtn = document.querySelector('.project-modal-next');

    img.src = item.src;
    img.alt = item.caption || currentProject.title;
    caption.textContent = item.caption || '';

    const showNav = gallery.length > 1;
    prevBtn.classList.toggle('hidden', !showNav);
    nextBtn.classList.toggle('hidden', !showNav);

    document.querySelectorAll('.project-modal-thumb').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project || !projectModal) return;

    currentProject = project;
    currentGalleryIndex = 0;

    document.getElementById('project-modal-title').textContent = project.title;
    document.getElementById('project-modal-description').textContent = project.description;
    document.getElementById('project-modal-github').href = project.github;

    const badge = document.getElementById('project-modal-badge');
    if (project.badge) {
        badge.textContent = project.badge;
        badge.hidden = false;
    } else {
        badge.hidden = true;
    }

    const highlightsList = document.getElementById('project-modal-highlights');
    highlightsList.innerHTML = '';
    (project.highlights || []).forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;
        highlightsList.appendChild(li);
    });

    const toolsWrap = document.getElementById('project-modal-tools');
    toolsWrap.innerHTML = '';
    project.tools.forEach(tool => {
        const span = document.createElement('span');
        span.className = 'tool-badge';
        span.textContent = tool;
        toolsWrap.appendChild(span);
    });

    const thumbsWrap = document.getElementById('project-modal-thumbs');
    thumbsWrap.innerHTML = '';
    if (project.gallery.length > 1) {
        project.gallery.forEach((item, i) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'project-modal-thumb' + (i === 0 ? ' active' : '');
            btn.innerHTML = `<img src="${item.src}" alt="${item.caption || ''}">`;
            btn.addEventListener('click', () => {
                currentGalleryIndex = i;
                renderGalleryImage(i);
            });
            thumbsWrap.appendChild(btn);
        });
    }

    renderGalleryImage(0);
    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';
}

function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
    currentProject = null;
}

document.querySelectorAll('[data-project]').forEach(card => {
    const projectId = card.getAttribute('data-project');

    card.addEventListener('click', (e) => {
        if (e.target.closest('.project-github-link')) return;
        if (e.target.closest('.project-view-btn')) return;
        openProjectModal(projectId);
    });

    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            if (e.target.closest('.project-github-link')) return;
            e.preventDefault();
            openProjectModal(projectId);
        }
    });

    card.querySelector('.project-view-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        openProjectModal(projectId);
    });
});

document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', closeProjectModal);
});

document.querySelector('.project-modal-prev')?.addEventListener('click', () => {
    if (!currentProject) return;
    currentGalleryIndex = (currentGalleryIndex - 1 + currentProject.gallery.length) % currentProject.gallery.length;
    renderGalleryImage(currentGalleryIndex);
});

document.querySelector('.project-modal-next')?.addEventListener('click', () => {
    if (!currentProject) return;
    currentGalleryIndex = (currentGalleryIndex + 1) % currentProject.gallery.length;
    renderGalleryImage(currentGalleryIndex);
});

document.addEventListener('keydown', (e) => {
    if (!projectModal?.classList.contains('active')) return;
    if (e.key === 'Escape') closeProjectModal();
    if (e.key === 'ArrowRight' && currentProject) {
        currentGalleryIndex = (currentGalleryIndex + 1) % currentProject.gallery.length;
        renderGalleryImage(currentGalleryIndex);
    }
    if (e.key === 'ArrowLeft' && currentProject) {
        currentGalleryIndex = (currentGalleryIndex - 1 + currentProject.gallery.length) % currentProject.gallery.length;
        renderGalleryImage(currentGalleryIndex);
    }
});
// ─────────────────────────────────────────────────────────────────────────────