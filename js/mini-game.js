/**
 * ===========================================
 * PRANAV SHARMA - PORTFOLIO V4
 * Bug Hunter Mini-Game Logic (Vanilla JS)
 * ===========================================
 */

(function () {
    'use strict';

    var gameInterval = null;
    var spawnInterval = null;
    var timeLeft = 30;
    var score = 0;
    var isPlaying = false;

    function initMiniGame() {
        var wrapper = document.getElementById('hero-arcade-wrapper');
        if (!wrapper) return;

        renderIdleState(wrapper);
    }

    function renderIdleState(container) {
        isPlaying = false;
        clearInterval(gameInterval);
        clearInterval(spawnInterval);

        container.innerHTML =
            '<div class="arcade-idle-container" id="arcade-idle">' +
                '<!-- Subtle background connectors -->' +
                '<svg class="arcade-connectors-svg" viewBox="0 0 400 350" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                    '<path d="M 60 70 Q 200 120 200 180" stroke="#141412" stroke-width="2" stroke-dasharray="4 4" />' +
                    '<path d="M 330 80 Q 250 140 200 180" stroke="#141412" stroke-width="2" stroke-dasharray="4 4" />' +
                    '<path d="M 70 280 Q 150 240 200 180" stroke="#141412" stroke-width="2" stroke-dasharray="4 4" />' +
                    '<path d="M 330 270 Q 260 230 200 180" stroke="#141412" stroke-width="2" stroke-dasharray="4 4" />' +
                '</svg>' +

                '<!-- Geometric accents -->' +
                '<div class="arcade-geo-dots"></div>' +
                '<div class="arcade-geo-ring"></div>' +
                '<div class="arcade-geo-cross">+</div>' +

                '<!-- Floating developer & bug badges -->' +
                '<div class="arcade-float-badge badge-bug-py"><span>🐛</span> bug.py:42</div>' +
                '<div class="arcade-float-badge badge-404"><span>🐞</span> 404: bug_found</div>' +
                '<div class="arcade-float-badge badge-syntax-err"><span>⚡</span> SyntaxError</div>' +
                '<div class="arcade-float-badge badge-null-ptr"><span>👾</span> null_pointer</div>' +

                '<!-- Scrapbook stickers -->' +
                '<div class="arcade-sticker-hunter">🐛 Bug Hunter</div>' +
                '<div class="arcade-sticker-blitz">30s Sprint ⚡</div>' +

                '<!-- Central PLAY GAME button trigger -->' +
                '<div class="arcade-play-trigger-wrap">' +
                    '<button class="btn-play-game" id="arcade-start-btn" aria-label="Start Bug Hunter Mini-Game">' +
                        '<span>▶ PLAY GAME</span>' +
                    '</button>' +
                    '<div class="arcade-trigger-subtext">Click to start 30s bug hunt</div>' +
                '</div>' +
            '</div>';

        var startBtn = document.getElementById('arcade-start-btn');
        if (startBtn) {
            startBtn.addEventListener('click', startActiveGame);
        }

        // Refresh cursor hover listeners
        if (window.customCursor && window.customCursor.refresh) {
            window.customCursor.refresh();
        }
    }

    function startActiveGame() {
        var container = document.getElementById('hero-arcade-wrapper');
        if (!container) return;

        isPlaying = true;
        timeLeft = 30;
        score = 0;

        container.innerHTML =
            '<div class="arcade-game-container" id="arcade-active">' +
                '<div class="arcade-game-header">' +
                    '<div class="arcade-stat-item">SCORE: <span class="arcade-stat-value" id="arcade-score">0</span></div>' +
                    '<div class="arcade-stat-item">TIME: <span class="arcade-stat-value" id="arcade-time">30s</span></div>' +
                    '<button class="arcade-close-btn" id="arcade-exit-btn" aria-label="Close game and return to portfolio">✕ Exit</button>' +
                '</div>' +
                '<div class="arcade-playfield" id="arcade-playfield" aria-label="Game play area"></div>' +
            '</div>';

        document.getElementById('arcade-exit-btn').addEventListener('click', function () {
            renderIdleState(container);
        });

        var playfield = document.getElementById('arcade-playfield');

        // Countdown timer (30s)
        gameInterval = setInterval(function () {
            timeLeft--;
            var timeEl = document.getElementById('arcade-time');
            if (timeEl) timeEl.textContent = timeLeft + 's';

            if (timeLeft <= 0) {
                endActiveGame(container);
            }
        }, 1000);

        // Spawn rhythm with dynamic difficulty adjustment based on score
        function scheduleNextSpawn() {
            if (!isPlaying) return;
            var delay = Math.max(450, 950 - Math.floor(score / 30) * 100);
            spawnInterval = setTimeout(function () {
                spawnBug(playfield);
                scheduleNextSpawn();
            }, delay);
        }

        spawnBug(playfield);
        scheduleNextSpawn();

        if (window.customCursor && window.customCursor.refresh) {
            window.customCursor.refresh();
        }
    }

    function spawnBug(playfield) {
        if (!isPlaying || !playfield) return;

        var rect = playfield.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        var bugEl = document.createElement('div');
        bugEl.className = 'bug-target';
        bugEl.setAttribute('role', 'button');
        bugEl.setAttribute('aria-label', 'Catch bug');
        bugEl.setAttribute('tabindex', '0');

        // Keep bug inside bounds
        var minX = 40;
        var maxX = Math.max(minX + 10, rect.width - 40);
        var minY = 40;
        var maxY = Math.max(minY + 10, rect.height - 40);

        var posX = Math.random() * (maxX - minX) + minX;
        var posY = Math.random() * (maxY - minY) + minY;

        bugEl.style.left = posX + 'px';
        bugEl.style.top = posY + 'px';

        var bugEmojis = ['🐛', '🐞', '👾', '🐜', '⚡'];
        bugEl.textContent = bugEmojis[Math.floor(Math.random() * bugEmojis.length)];

        function catchBug(e) {
            e.stopPropagation();
            if (!isPlaying || bugEl.dataset.caught) return;
            bugEl.dataset.caught = 'true';

            score += 10;
            var scoreEl = document.getElementById('arcade-score');
            if (scoreEl) scoreEl.textContent = score;

            // Catch animation
            bugEl.style.transform = 'translate(-50%, -50%) scale(1.35)';
            bugEl.style.backgroundColor = 'var(--coral)';
            bugEl.style.opacity = '0';

            setTimeout(function () {
                if (bugEl.parentNode) bugEl.parentNode.removeChild(bugEl);
            }, 180);
        }

        bugEl.addEventListener('click', catchBug);
        bugEl.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                catchBug(e);
            }
        });

        playfield.appendChild(bugEl);

        // Auto remove bug after 2.2 seconds if not caught
        setTimeout(function () {
            if (bugEl.parentNode && !bugEl.dataset.caught) {
                bugEl.parentNode.removeChild(bugEl);
            }
        }, 2200);
    }

    function endActiveGame(container) {
        isPlaying = false;
        clearInterval(gameInterval);
        clearTimeout(spawnInterval);

        var playfield = document.getElementById('arcade-playfield');
        if (!playfield) return;

        playfield.innerHTML = '';

        var overlay = document.createElement('div');
        overlay.className = 'arcade-game-over-overlay';
        overlay.innerHTML =
            '<h3>GAME OVER</h3>' +
            '<p>You caught the bugs and scored <span style="color:var(--acid-lime);font-weight:700;font-size:1.4rem;">' + score + '</span> points!</p>' +
            '<button class="btn-play-game" id="arcade-replay-btn" style="font-size:1.4rem;padding:12px 28px;">' +
                '<span>▶ PLAY AGAIN</span>' +
            '</button>' +
            '<button class="arcade-close-btn" id="arcade-back-btn" style="margin-top:var(--space-md);padding:6px 16px;font-size:0.8rem;">' +
                '← Back to Portfolio' +
            '</button>';

        playfield.appendChild(overlay);

        document.getElementById('arcade-replay-btn').addEventListener('click', startActiveGame);
        document.getElementById('arcade-back-btn').addEventListener('click', function () {
            renderIdleState(container);
        });

        if (window.customCursor && window.customCursor.refresh) {
            window.customCursor.refresh();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMiniGame);
    } else {
        initMiniGame();
    }
})();
