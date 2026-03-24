// Project: 4 | Author: 1eee6186-748f-4246-9cdc-3510221ad078 | Generated: 2026-03-24T11:43:20.248Z | Build: #1
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initActiveNavigation();
    initThemeToggle();
    initScrollAnimations();
});

/**
 * Mobile Menu Toggle functionality
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            menuBtn.setAttribute('aria-expanded', isExpanded);
            
            // Prevent scrolling when mobile menu is open
            if (isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }
}

/**
 * Highlights the current active navigational link
 */
function initActiveNavigation() {
    // Extract current page from path. Handle root path defaults to index.html
    let currentPath = window.location.pathname.split('/').pop();
    if (currentPath === '') currentPath = 'index.html';
    
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

/**
 * Dark/Light Theme Toggle Functionality
 */
function initThemeToggle() {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    if (themeToggles.length === 0) return;

    // Check local storage or system preference
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Add click listeners to all instances (for desktop & mobile header)
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', targetTheme);
            localStorage.setItem('theme', targetTheme);
            
            // Dispatch custom event for charts or components that rely on theme changes
            window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: targetTheme } }));
        });
    });
}

/**
 * Scroll reveal animations using Intersection Observer
 */
function initScrollAnimations() {
    // Respect reduced motion query before setting up observer
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) return;

    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Stop observing once animated to avoid re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        scrollObserver.observe(element);
    });
}
