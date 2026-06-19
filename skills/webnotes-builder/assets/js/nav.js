// Immediately set theme to avoid visual flashing
document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'dark');

// Force CSS reload with cache buster
(function() {
    const cssLink = document.querySelector('link[href*="base.css"]');
    if (cssLink && !cssLink.href.includes('?v=')) {
        cssLink.href = cssLink.href.split('?')[0] + '?v=' + Date.now();
    }
})();

/**
 * nav.js - Modular Navigation & Modern SVG Icons for WebNotes
 */

const SVG_ICONS = {
    home: `<svg viewBox="0 0 24 24"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    folder: `<svg viewBox="0 0 24 24"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>`,
    terminal: `<svg viewBox="0 0 24 24"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>`,
    radio: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="2"/><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>`,
    fork: `<svg viewBox="0 0 24 24"><circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V9"/></svg>`,
    network: `<svg viewBox="0 0 24 24"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M12 8v4"/><path d="M12 12H5v4"/><path d="M12 12h7v4"/></svg>`,
    cpu: `<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 15h3"/><path d="M1 9h3"/><path d="M1 15h3"/></svg>`,
    send: `<svg viewBox="0 0 24 24"><polyline points="22 2 15 22 11 13 2 9 22 2"/><line x1="22" x2="11" y1="2" y2="13"/></svg>`,
    gradCap: `<svg viewBox="0 0 24 24"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>`,
    fileQuestion: `<svg viewBox="0 0 24 24"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9.1 11.8a3 3 0 0 1 5.8 1c0 .95-.3 1.4-1.9 2.2"/><path d="M12 19h.01"/></svg>`,
    zap: `<svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    sun: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 4.93l-1.41 1.41"/></svg>`,
    moon: `<svg viewBox="0 0 24 24"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
    
    // Page section icons
    layout: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>`,
    brain: `<svg viewBox="0 0 24 24"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z"/></svg>`,
    idea: `<svg viewBox="0 0 24 24"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
    settings: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    alert: `<svg viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>`,
    scale: `<svg viewBox="0 0 24 24"><path d="m16 16 3-8 3 8c-.1.3-.4.5-.7.5h-4.6c-.3 0-.6-.2-.7-.5z"/><path d="M12 3v17"/><path d="M3 12h18"/><path d="m2 16 3-8 3 8c-.1.3-.4.5-.7.5H3.7c-.3 0-.6-.2-.7-.5z"/></svg>`,
    gauge: `<svg viewBox="0 0 24 24"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>`,
    shield: `<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    wrench: `<svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    scissors: `<svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="9.8" x2="20" y1="8.2" y2="15.8"/><line x1="9.8" x2="20" y1="15.8" y2="8.2"/></svg>`,
    keyboard: `<svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><line x1="6" x2="6.01" y1="8" y2="8"/><line x1="10" x2="10.01" y1="8" y2="8"/><line x1="14" x2="14.01" y1="8" y2="8"/><line x1="18" x2="18.01" y1="8" y2="8"/><line x1="6" x2="6.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="12" y2="12"/><line x1="7" x2="17" y1="16" y2="16"/></svg>`,
    check: `<svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
};

const emojiToSvgMap = {
    '🏠': SVG_ICONS.home,
    '📂': SVG_ICONS.folder,
    '🐚': SVG_ICONS.terminal,
    '📡': SVG_ICONS.radio,
    '🔀': SVG_ICONS.fork,
    '🌐': SVG_ICONS.network,
    '🧵': SVG_ICONS.cpu,
    '📬': SVG_ICONS.send,
    '📋': SVG_ICONS.gradCap,
    '📝': SVG_ICONS.fileQuestion,
    '⚡': SVG_ICONS.zap,
    '☀️': SVG_ICONS.sun,
    '🌙': SVG_ICONS.moon,
    '🏗️': SVG_ICONS.layout,
    '🏗': SVG_ICONS.layout,
    '🧠': SVG_ICONS.brain,
    '💡': SVG_ICONS.idea,
    '⚙️': SVG_ICONS.settings,
    '⚙': SVG_ICONS.settings,
    '⚠️': SVG_ICONS.alert,
    '⚖️': SVG_ICONS.scale,
    '⚖': SVG_ICONS.scale,
    '🏎️': SVG_ICONS.gauge,
    '🏎': SVG_ICONS.gauge,
    '🛡️': SVG_ICONS.shield,
    '🛡': SVG_ICONS.shield,
    '🛠️': SVG_ICONS.wrench,
    '🛠': SVG_ICONS.wrench,
    '✂️': SVG_ICONS.scissors,
    '✂': SVG_ICONS.scissors,
    '⌨️': SVG_ICONS.keyboard,
    '⌨': SVG_ICONS.keyboard,
    '✅': SVG_ICONS.check
};

// 📝 AGENT: populate one entry per chapter. Pick an SVG_ICONS key that fits each
// chapter's subject. Keep 'index' first; keep 'examprep' and 'quiz' last.
const topics = [
    { id: 'index', title: 'Home', path: 'index.html', icon: SVG_ICONS.home },
    { id: 'topic1', title: '[[CHAPTER_1_TITLE]]', path: 'topic1_[[SLUG]].html', icon: SVG_ICONS.folder },
    // ... one entry per chapter ...
    { id: 'examprep', title: 'Exam Prep', path: 'exam_prep.html', icon: SVG_ICONS.gradCap },
    { id: 'quiz', title: 'Interactive Quiz', path: 'interactive_quiz.html', icon: SVG_ICONS.fileQuestion }
];

function initNav() {
    const navContainer = document.getElementById('site-nav');
    if (!navContainer) return;

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    const logo = document.createElement('a');
    logo.href = 'index.html';
    logo.className = 'nav-logo';
    logo.innerHTML = `<span>${SVG_ICONS.zap}</span> System Programming`;

    const linksContainer = document.createElement('div');
    linksContainer.className = 'nav-links';

    topics.forEach(topic => {
        const link = document.createElement('a');
        link.href = topic.path;
        link.className = 'nav-link';
        if (currentPath === topic.path) {
            link.classList.add('active');
        }
        link.title = topic.title;
        link.innerHTML = `<span>${topic.icon}</span> ${topic.title}`;
        linksContainer.appendChild(link);
    });

    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'nav-actions';

    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger-btn';
    hamburger.innerHTML = '☰';
    hamburger.setAttribute('aria-label', 'Toggle Menu');

    const toggleMenu = () => {
        linksContainer.classList.toggle('show');
        overlay.classList.toggle('show');
    };

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);
    
    actionsContainer.appendChild(hamburger);

    const navWrapper = document.createElement('div');
    navWrapper.className = 'nav-wrapper';
    navWrapper.appendChild(logo);
    navWrapper.appendChild(linksContainer);
    navWrapper.appendChild(actionsContainer);

    navContainer.appendChild(navWrapper);
}

// Simple search for the index page
function initSearch() {
    const searchInput = document.getElementById('topic-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.topic-card');
        cards.forEach(card => {
            const text = card.innerText.toLowerCase();
            card.style.display = text.includes(term) ? '' : 'none';
        });
    });
}

function initTheme() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const actionsContainer = document.querySelector('.nav-actions');
    if (!actionsContainer) return;

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle Theme');
    toggleBtn.innerHTML = currentTheme === 'light' ? SVG_ICONS.moon : SVG_ICONS.sun;

    toggleBtn.addEventListener('click', () => {
        const activeTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        toggleBtn.innerHTML = newTheme === 'light' ? SVG_ICONS.moon : SVG_ICONS.sun;
    });

    const hamburger = actionsContainer.querySelector('.hamburger-btn');
    if (hamburger) {
        actionsContainer.insertBefore(toggleBtn, hamburger);
    } else {
        actionsContainer.appendChild(toggleBtn);
    }
}

function initScrollSpy() {
    const toc = document.querySelector('.toc');
    if (!toc) return;

    const links = Array.from(toc.querySelectorAll('a'));
    if (links.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(l => l.classList.remove('active'));
                const activeLink = links.find(l => l.getAttribute('href') === `#${entry.target.id}`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    
                    // Auto-scroll the TOC horizontally to keep the active link visible
                    const scrollLeft = activeLink.offsetLeft - (toc.clientWidth / 2) + (activeLink.clientWidth / 2);
                    toc.scrollTo({
                        left: Math.max(0, scrollLeft),
                        behavior: 'smooth'
                    });
                }
            }
        });
    }, {
        rootMargin: '-15% 0px -75% 0px',
        threshold: 0
    });

    links.forEach(link => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            // Remove the '#' to get the ID
            const id = targetId.substring(1);
            const section = document.getElementById(id);
            if (section) {
                observer.observe(section);
            }
        }
    });
}

function replacePageEmojis() {
    const selectors = '.sh-icon, .tip-icon, .lbl, .card-title, .hero-label, .topic-num, .alayer, .tip-title, .topic-card h3';
    const elements = document.querySelectorAll(selectors);
    elements.forEach(el => {
        let html = el.innerHTML;
        let changed = false;
        for (const [emoji, svg] of Object.entries(emojiToSvgMap)) {
            if (html.includes(emoji)) {
                html = html.replaceAll(emoji, svg);
                changed = true;
            }
        }
        if (changed) {
            el.innerHTML = html;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initTheme();
    initSearch();
    initScrollSpy();
    replacePageEmojis();
});