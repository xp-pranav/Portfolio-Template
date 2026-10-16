/**
 * ===========================================
 * PRANAV SHARMA - PORTFOLIO V4
 * Interactive Terminal (PRANAV.EXE v4.0)
 * Pure Vanilla JavaScript — Zero Dependencies
 * ===========================================
 */

(function () {
    'use strict';

    function initTerminal() {
        var form = document.getElementById('terminal-form');
        var input = document.getElementById('terminal-input');
        var output = document.getElementById('terminal-output');
        var suggestions = document.getElementById('terminal-suggestions');

        if (!form || !input || !output) return;

        // Command handler map
        var commands = {
            help: function () {
                return '<div class="term-res-block">' +
                    '<div class="term-res-heading">AVAILABLE COMMANDS:</div>' +
                    '<div class="term-res-table">' +
                        '<div><span class="term-highlight">about</span>    — Developer background, status &amp; bio</div>' +
                        '<div><span class="term-highlight">skills</span>   — Technical toolkit with honest proficiencies</div>' +
                        '<div><span class="term-highlight">projects</span> — Coding, Video &amp; Automation projects</div>' +
                        '<div><span class="term-highlight">journey</span>  — Milestones &amp; learning timeline</div>' +
                        '<div><span class="term-highlight">clear</span>    — Reset terminal console</div>' +
                    '</div>' +
                '</div>';
            },

            about: function () {
                var p = (window.portfolioData && window.portfolioData.profile) || {};
                var intro = p.introduction || "Developer & creative technologist building things for the web.";
                return '<div class="term-res-block">' +
                    '<div class="term-res-heading">IDENTITY PROFILE:</div>' +
                    '<div><strong>Name:</strong> ' + (p.name || 'Pranav Sharma') + '</div>' +
                    '<div><strong>Role:</strong> ' + (p.role || 'Developer & Creative Technologist') + '</div>' +
                    '<div><strong>Location:</strong> ' + (p.location || 'India') + '</div>' +
                    '<div><strong>Status:</strong> <span class="term-badge-acid">' + (p.status || 'Available') + '</span></div>' +
                    '<div style="margin-top:8px;line-height:1.6;color:var(--warm-white);font-style:italic;">&ldquo;' + intro + '&rdquo;</div>' +
                '</div>';
            },

            skills: function () {
                var skills = (window.portfolioData && window.portfolioData.skills) || [];
                if (skills.length === 0) return '<div>No skills data available.</div>';

                var categories = {};
                skills.forEach(function (s) {
                    if (!categories[s.category]) categories[s.category] = [];
                    categories[s.category].push(s);
                });

                var html = '<div class="term-res-block"><div class="term-res-heading">TOOLKIT &amp; PROFICIENCIES:</div>';
                Object.keys(categories).forEach(function (cat) {
                    html += '<div style="margin-top:6px;"><span class="term-highlight">[' + cat + ']</span> ';
                    var items = categories[cat].map(function (s) {
                        return s.name + ' <span style="opacity:0.65;font-size:0.75rem;">(' + s.status + ')</span>';
                    });
                    html += items.join(', ') + '</div>';
                });
                html += '</div>';
                return html;
            },

            projects: function () {
                var data = (window.portfolioData && window.portfolioData.projects) || {};
                var html = '<div class="term-res-block"><div class="term-res-heading">PROJECT CATALOGUE:</div>';

                // Coding
                if (data.coding && data.coding.length > 0) {
                    html += '<div style="margin-top:6px;"><span class="term-highlight">[Coding &amp; Web Dev]</span></div>';
                    data.coding.forEach(function (c) {
                        html += '<div style="padding-left:12px;">• <strong>' + c.title + '</strong> — ' + (c.subtitle || c.description) + '</div>';
                    });
                }

                // Video
                if (data.videoEditing && data.videoEditing.items) {
                    html += '<div style="margin-top:6px;"><span class="term-highlight">[Video Editing &amp; Motion]</span></div>';
                    data.videoEditing.items.forEach(function (v) {
                        html += '<div style="padding-left:12px;">• <strong>' + v.title + '</strong> — ' + v.description + '</div>';
                    });
                }

                // Automation
                if (data.automation && data.automation.items) {
                    html += '<div style="margin-top:6px;"><span class="term-highlight">[Automation &amp; AI Tools]</span></div>';
                    data.automation.items.forEach(function (a) {
                        html += '<div style="padding-left:12px;">• <strong>' + a.title + '</strong> — ' + a.description + '</div>';
                    });
                }

                html += '<div style="margin-top:8px;font-size:0.8rem;opacity:0.7;">Tip: Explore the Work section above for interactive deep dive modals.</div></div>';
                return html;
            },

            journey: function () {
                var exp = (window.portfolioData && window.portfolioData.experience) || [];
                if (exp.length === 0) return '<div>No timeline data available.</div>';

                var html = '<div class="term-res-block"><div class="term-res-heading">MILESTONES &amp; JOURNEY:</div>';
                exp.forEach(function (e) {
                    html += '<div style="margin-top:6px;">' +
                        '<span class="term-highlight">[' + (e.date || '') + ']</span> ' +
                        '<strong>' + e.title + '</strong>' +
                        (e.organization ? ' — <span style="opacity:0.8;">' + e.organization + '</span>' : '') +
                        '<div style="padding-left:12px;font-size:0.85rem;opacity:0.85;line-height:1.5;">' + (e.description || '') + '</div>' +
                    '</div>';
                });
                html += '</div>';
                return html;
            },

            clear: function () {
                output.innerHTML = '';
                return null;
            }
        };

        function executeCommand(rawCmd) {
            var cmd = (rawCmd || '').trim().toLowerCase();
            if (!cmd) return;

            // Echo command
            var echoEl = document.createElement('div');
            echoEl.className = 'terminal-line';
            echoEl.innerHTML = '<span class="term-prompt">guest@pranav:~$</span> <span class="term-cmd">' + escapeHtml(rawCmd.trim()) + '</span>';
            output.appendChild(echoEl);

            // Execute
            if (commands.hasOwnProperty(cmd)) {
                var result = commands[cmd]();
                if (result !== null) {
                    var resEl = document.createElement('div');
                    resEl.className = 'terminal-response';
                    resEl.innerHTML = result;
                    output.appendChild(resEl);
                }
            } else {
                var errEl = document.createElement('div');
                errEl.className = 'terminal-response term-error';
                errEl.innerHTML = 'command not found: <span class="term-highlight">' + escapeHtml(rawCmd.trim()) + '</span>. Type <span class="term-highlight">help</span> or click a suggestion below.';
                output.appendChild(errEl);
            }

            // Auto-scroll terminal output to bottom
            output.scrollTop = output.scrollHeight;

            // Refresh custom cursor for dynamically added buttons/links
            if (window.customCursor && window.customCursor.refresh) {
                window.customCursor.refresh();
            }
        }

        function escapeHtml(str) {
            var div = document.createElement('div');
            div.textContent = str;
            return div.innerHTML;
        }

        // Form submit
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var val = input.value;
            input.value = '';
            executeCommand(val);
        });

        // Clickable suggestion chips
        if (suggestions) {
            suggestions.addEventListener('click', function (e) {
                var btn = e.target.closest('.term-chip');
                if (!btn) return;
                var cmd = btn.getAttribute('data-cmd');
                if (cmd) {
                    input.value = cmd;
                    executeCommand(cmd);
                    input.value = '';
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTerminal);
    } else {
        initTerminal();
    }
})();
