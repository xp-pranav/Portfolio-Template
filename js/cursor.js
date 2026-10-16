/**
 * ===========================================
 * PRANAV SHARMA - PORTFOLIO V3
 * Custom Cursor Implementation
 * Detects dark sections (.bg-dark, .contact-box, .footer, .card-dark)
 * and toggles high-contrast neon styling automatically.
 * ===========================================
 */

(function () {
    'use strict';

    var cursorEl = null;
    var followerEl = null;
    var posX = 0, posY = 0;
    var mouseX = 0, mouseY = 0;
    var enabled = true;

    function init() {
        // Skip on touch devices or if reduced motion is preferred
        if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            enabled = false;
            return;
        }

        // Create cursor elements
        cursorEl = document.createElement('div');
        cursorEl.className = 'custom-cursor';
        document.body.appendChild(cursorEl);

        followerEl = document.createElement('div');
        followerEl.className = 'custom-cursor-follower';
        document.body.appendChild(followerEl);

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);

        refresh();
        loop();
    }

    function onMouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (cursorEl) {
            cursorEl.style.transform = 'translate3d(' + mouseX + 'px, ' + mouseY + 'px, 0)';
        }

        // Detect if cursor is over a dark section/card or modal backdrop
        var target = document.elementFromPoint(mouseX, mouseY);
        if (target && cursorEl && followerEl) {
            var isOverModalContent = target.closest('.project-modal-container');
            var darkContainer = !isOverModalContent && target.closest('.project-modal-overlay, .bg-dark, .contact-box, .footer, .card-dark');
            if (darkContainer) {
                cursorEl.classList.add('on-dark');
                followerEl.classList.add('on-dark');
            } else {
                cursorEl.classList.remove('on-dark');
                followerEl.classList.remove('on-dark');
            }
        }
    }

    function onMouseDown() {
        if (cursorEl) cursorEl.classList.add('active');
        if (followerEl) followerEl.classList.add('active');
    }

    function onMouseUp() {
        if (cursorEl) cursorEl.classList.remove('active');
        if (followerEl) followerEl.classList.remove('active');
    }

    function loop() {
        if (!enabled) return;
        // Smooth lerp for follower
        posX += (mouseX - posX) * 0.18;
        posY += (mouseY - posY) * 0.18;

        if (followerEl) {
            followerEl.style.transform = 'translate3d(' + posX + 'px, ' + posY + 'px, 0)';
        }

        requestAnimationFrame(loop);
    }

    function refresh() {
        if (!enabled) return;

        // Bind hover effects to interactive elements including modal
        var selectors = 'a, button, .project-card, .domain-preview-card, .skill-pill, .interest-tag, .project-modal-close, .project-action-link';
        document.querySelectorAll(selectors).forEach(function (el) {
            if (el.dataset.cursorBound) return;
            el.dataset.cursorBound = 'true';

            el.addEventListener('mouseenter', function () {
                if (cursorEl) cursorEl.classList.add('hover');
                if (followerEl) followerEl.classList.add('hover');
            });
            el.addEventListener('mouseleave', function () {
                if (cursorEl) cursorEl.classList.remove('hover');
                if (followerEl) followerEl.classList.remove('hover');
            });
        });
    }

    window.customCursor = {
        init: init,
        refresh: refresh
    };
})();
