/**
 * nav.js - Modular Navigation for WebNotes
 *
 * 📝 SETUP INSTRUCTIONS FOR THE AGENT:
 *
 * Edit the `topics` array below to list every chapter in this course.
 * Each entry needs:
 *   - id:    unique short identifier (e.g. 'topic1', 'algos', 'graphs')
 *   - title: short name shown in the nav bar (3-4 words max)
 *   - path:  filename of the chapter HTML (e.g. 'topic1_intro.html')
 *   - icon:  single emoji to show next to the title
 *
 * The 'index' entry (Home) and 'quiz' entry (Interactive Quiz) should
 * remain at the start/end. Add chapter entries between them in order.
 */

const topics = [
    { id: 'index', title: 'Home', path: 'index.html', icon: '🏠' },

    // ─── COURSE CHAPTERS — edit this list ───────────────────────────
    // { id: 'topic1', title: 'Chapter 1', path: 'topic1_intro.html',       icon: '📂' },
    // { id: 'topic2', title: 'Chapter 2', path: 'topic2_advanced.html',    icon: '🐚' },
    // ...add one entry per chapter...
    // ─────────────────────────────────────────────────────────────────

    { id: 'quiz', title: 'Interactive Quiz', path: 'interactive_quiz.html', icon: '📝' }
];

function initNav() {
    const navContainer = document.getElementById('site-nav');
    if (!navContainer) return;

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    const logo = document.createElement('a');
    logo.href = 'index.html';
    logo.className = 'nav-logo';
    // 📝 Optional: customize the logo text (course name)
    logo.innerHTML = `<span>⚡</span> Course Notes`;

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

    const navWrapper = document.createElement('div');
    navWrapper.className = 'nav-wrapper';
    navWrapper.appendChild(logo);
    navWrapper.appendChild(linksContainer);

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

document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initSearch();
});
