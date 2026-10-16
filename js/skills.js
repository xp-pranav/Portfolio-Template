/**
 * ===========================================
 * PRANAV SHARMA - PORTFOLIO V4
 * Skills Dashboard & Tech Stack Playground Renderer
 * ===========================================
 */

(function () {
    'use strict';

    function renderSkillsDashboard() {
        var container = document.getElementById('skills-container');
        if (!container) return;

        var data = window.portfolioData || {};
        var skills = data.skills || [];
        var exploreItems = data.currentFocus || [
            { id: "01", title: "Coding & Development", status: "Primary Focus", tagColor: "acid" },
            { id: "02", title: "Video Editing", status: "Still Learning", tagColor: "coral" },
            { id: "03", title: "Automation & AI", status: "Still Learning", tagColor: "sky" }
        ];

        if (skills.length === 0) return;

        // Group skills by category
        var categories = {};
        skills.forEach(function (s) {
            if (!categories[s.category]) categories[s.category] = [];
            categories[s.category].push(s);
        });

        var catIcons = {
            'Programming': '&lt;/&gt;',
            'Frontend': '🎨',
            'Tools': '⚙',
            'Video Editing': '🎬',
            'Automation': '⚡'
        };

        // Build HTML for the two-column layout
        var html = '<div class="skills-dashboard-layout animate-on-scroll">';

        // ----------------------------------------
        // LEFT COLUMN: Balanced Category Cards Grid
        // ----------------------------------------
        html += '<div class="skills-left-column">';
        html += '<div class="skills-cards-grid">';

        Object.keys(categories).forEach(function (cat) {
            var catId = cat.toLowerCase().replace(/[^a-z0-9]/g, '-');
            html += '<div class="skill-category-box" data-category-card="' + catId + '">';
            html += '<h3>' + cat + '<span style="font-size:0.75rem;color:var(--muted-grey);font-family:var(--font-mono);">' + (catIcons[cat] || '●') + '</span></h3>';
            html += '<div class="skill-pills">';

            categories[cat].forEach(function (skill) {
                var mappedClass = 'status-learning';
                var s = skill.status ? skill.status.toUpperCase() : '';
                if (s === 'FAMILIAR' || s === 'WORKING WITH') mappedClass = 'status-familiar';
                else if (s === 'PROFICIENT') mappedClass = 'status-proficient';
                else if (s === 'EXPLORING' || s === 'EXPERIMENTING' || s === 'INTERESTED' || s === 'STILL LEARNING') mappedClass = 'status-exploring';

                var skillSlug = skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
                html += '<button type="button" class="skill-pill" data-skill-name="' + escapeHtml(skill.name) + '" data-skill-cat="' + escapeHtml(cat) + '" data-skill-status="' + escapeHtml(skill.status) + '">';
                html += escapeHtml(skill.name);
                html += '<span class="skill-status-tag ' + mappedClass + '">' + escapeHtml(skill.status) + '</span>';
                html += '</button>';
            });

            html += '</div></div>';
        });

        html += '</div></div>'; // End left column

        // ----------------------------------------
        // RIGHT COLUMN: Tech Stack Playground
        // ----------------------------------------
        html += '<div class="skills-right-column">';

        // Area A: Currently Exploring
        html += '<div class="playground-box">';
        html += '<div class="playground-header"><span class="playground-title">🔥 Currently Exploring</span></div>';
        html += '<div class="explore-pills-list">';
        exploreItems.forEach(function (item) {
            html += '<div class="explore-item"><span>' + item.title + '</span> <span style="font-size:0.65rem;background:var(--acid-lime);color:var(--ink-black);padding:2px 6px;font-weight:700;">' + item.status + '</span></div>';
        });
        html += '</div></div>';

        // Area B: Interactive Toolbox Selector
        html += '<div class="playground-box">';
        html += '<div class="playground-header"><span class="playground-title">🧰 Interactive Toolbox Selector</span><span style="font-family:var(--font-mono);font-size:0.7rem;color:var(--muted-grey);">Click tool to inspect</span></div>';
        html += '<div class="toolbox-selector-grid" id="toolbox-selector-grid">';
        skills.forEach(function (skill) {
            html += '<button type="button" class="toolbox-chip" data-toolbox-name="' + escapeHtml(skill.name) + '" data-toolbox-cat="' + escapeHtml(skill.category) + '" data-toolbox-status="' + escapeHtml(skill.status) + '">' + escapeHtml(skill.name) + '</button>';
        });
        html += '</div></div>';

        // Area C: Live Skill Terminal Information Panel
        html += '<div class="skill-terminal-panel">';
        html += '<div class="skill-terminal-header">';
        html += '<span>SKILL_TERMINAL.EXE</span>';
        html += '<button type="button" class="term-reset-btn" id="term-reset-btn">Reset</button>';
        html += '</div>';
        html += '<div class="skill-terminal-body" id="skill-terminal-body">';
        html += '<div class="term-output-title"><span>STATUS: READY</span></div>';
        html += '<div class="term-output-content">Select any skill pill or toolbox chip on the left to inspect proficiency, category data, and specs.</div>';
        html += '</div>';
        html += '</div>';

        html += '</div>'; // End right column
        html += '</div>'; // End dashboard layout

        container.innerHTML = html;

        // ----------------------------------------
        // Interactivity Bindings
        // ----------------------------------------
        var terminalBody = document.getElementById('skill-terminal-body');
        var resetBtn = document.getElementById('term-reset-btn');
        var allSkillPills = container.querySelectorAll('.skill-pill, .toolbox-chip');
        var categoryBoxes = container.querySelectorAll('.skill-category-box');

        function inspectSkill(name, cat, status) {
            // Highlight active pills & chips
            allSkillPills.forEach(function (el) {
                if (el.getAttribute('data-skill-name') === name || el.getAttribute('data-toolbox-name') === name) {
                    el.classList.add('selected');
                } else {
                    el.classList.remove('selected');
                }
            });

            // Highlight corresponding category box
            var catId = cat.toLowerCase().replace(/[^a-z0-9]/g, '-');
            categoryBoxes.forEach(function (box) {
                if (box.getAttribute('data-category-card') === catId) {
                    box.classList.add('active-category');
                } else {
                    box.classList.remove('active-category');
                }
            });

            // Update terminal output panel
            if (terminalBody) {
                terminalBody.innerHTML =
                    '<div class="term-output-title"><span>TOOL SPEC: ' + escapeHtml(name.toUpperCase()) + '</span></div>' +
                    '<div class="term-output-content">' +
                        '<div style="margin-bottom:4px;"><strong>Category:</strong> ' + escapeHtml(cat) + '</div>' +
                        '<div style="margin-bottom:6px;"><strong>Proficiency / Status:</strong> <span style="color:var(--acid-lime);font-weight:700;">' + escapeHtml(status) + '</span></div>' +
                        '<div style="font-size:0.8rem;color:var(--warm-white);opacity:0.9;border-top:1px dashed #333;padding-top:6px;margin-top:6px;">' +
                            'Active component in Pranav\'s creative tech stack. Verified for production workflows and continuous learning.' +
                        '</div>' +
                    '</div>';
            }
        }

        // Bind skill pills and toolbox chips
        allSkillPills.forEach(function (el) {
            el.addEventListener('click', function () {
                var name = el.getAttribute('data-skill-name') || el.getAttribute('data-toolbox-name');
                var cat = el.getAttribute('data-skill-cat') || el.getAttribute('data-toolbox-cat');
                var status = el.getAttribute('data-skill-status') || el.getAttribute('data-toolbox-status');
                inspectSkill(name, cat, status);
            });
        });

        // Bind reset button
        if (resetBtn) {
            resetBtn.addEventListener('click', function () {
                allSkillPills.forEach(function (el) { el.classList.remove('selected'); });
                categoryBoxes.forEach(function (box) { box.classList.remove('active-category'); });
                if (terminalBody) {
                    terminalBody.innerHTML =
                        '<div class="term-output-title"><span>STATUS: READY</span></div>' +
                        '<div class="term-output-content">Select any skill pill or toolbox chip on the left to inspect proficiency, category data, and specs.</div>';
                }
            });
        }

        // Refresh custom cursor bindings
        if (window.customCursor && window.customCursor.refresh) {
            window.customCursor.refresh();
        }
    }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Override or hook into main renderSkills
    window.renderSkillsDashboard = renderSkillsDashboard;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', renderSkillsDashboard);
    } else {
        renderSkillsDashboard();
    }
})();
