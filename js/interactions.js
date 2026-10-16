/**
 * ===========================================
 * PRANAV SHARMA - PORTFOLIO V2
 * Interactions, Animations & Tab Switching
 * ===========================================
 */

(function () {
    'use strict';

    function initTabs() {
        var tabs = document.querySelectorAll('.project-tab');
        var panels = {
            coding: document.getElementById('coding-projects'),
            video: document.getElementById('video-projects'),
            automation: document.getElementById('automation-projects')
        };

        if (tabs.length === 0) return;

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                var target = tab.getAttribute('data-tab');

                // Update active tab buttons
                tabs.forEach(function (t) {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');

                // Update active panels
                Object.keys(panels).forEach(function (key) {
                    var panel = panels[key];
                    if (!panel) return;
                    if (key === target) {
                        if (key === 'coding') {
                            panel.style.display = 'grid';
                            panel.style.gridTemplateColumns = 'repeat(auto-fill,minmax(min(340px,100%),1fr))';
                            panel.style.gap = 'var(--space-xl)';
                        } else {
                            panel.style.display = 'block';
                            panel.style.gridTemplateColumns = '';
                            panel.style.gap = '';
                        }
                        panel.classList.add('active');
                    } else {
                        panel.style.display = 'none';
                        panel.classList.remove('active');
                    }
                });
            });
        });
    }

    function initMobileNav() {
        var toggle = document.querySelector('.nav-toggle');
        var links = document.getElementById('nav-links');

        if (!toggle || !links) return;

        function closeNav() {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.classList.remove('active');
            links.classList.remove('active');
            document.body.classList.remove('nav-open');
        }

        function openNav() {
            toggle.setAttribute('aria-expanded', 'true');
            toggle.classList.add('active');
            links.classList.add('active');
            document.body.classList.add('nav-open');
        }

        toggle.addEventListener('click', function () {
            var expanded = toggle.getAttribute('aria-expanded') === 'true';
            if (expanded) {
                closeNav();
            } else {
                openNav();
            }
        });

        // Close on link click
        links.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', closeNav);
        });

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeNav();
            }
        });
    }

    function initScrollAnimations() {
        var observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        var observer = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
            observer.observe(el);
        });
    }

    function initActiveNavSpy() {
        var sections = document.querySelectorAll('section[id]');
        var navLinks = document.querySelectorAll('.nav-link');

        if (sections.length === 0 || navLinks.length === 0) return;

        window.addEventListener('scroll', function () {
            var scrollY = window.pageYOffset;

            sections.forEach(function (current) {
                var sectionHeight = current.offsetHeight;
                var sectionTop = current.offsetTop - 100;
                var sectionId = current.getAttribute('id');

                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(function (link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { passive: true });
    }

    window.interactions = {
        init: function () {
            initTabs();
            initMobileNav();
            initScrollAnimations();
            initActiveNavSpy();
        }
    };
})();
