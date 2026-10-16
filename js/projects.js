/**
 * ===========================================
 * PRANAV SHARMA - PORTFOLIO V4
 * Project Renderer (Coding, Video, Automation)
 * Includes accessible Project Detail Modal System
 * ===========================================
 */

(function () {
    'use strict';

    // SVG Icons
    var icons = {
        github: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>',
        external: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
        play: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
        workflow: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
        info: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
        close: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
    };

    /* ----------------------------------------
       Project Detail Modal System (V4)
       ---------------------------------------- */
    var modalOverlay = null;

    function initModal() {
        if (document.getElementById('project-detail-modal')) return;

        modalOverlay = document.createElement('div');
        modalOverlay.id = 'project-detail-modal';
        modalOverlay.className = 'project-modal-overlay';
        modalOverlay.setAttribute('role', 'dialog');
        modalOverlay.setAttribute('aria-modal', 'true');
        modalOverlay.setAttribute('aria-hidden', 'true');

        modalOverlay.innerHTML =
            '<div class="project-modal-container">' +
                '<button class="project-modal-close" aria-label="Close project details">' + icons.close + '</button>' +
                '<div class="project-modal-body" id="project-modal-content"></div>' +
            '</div>';

        document.body.appendChild(modalOverlay);

        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });

        modalOverlay.querySelector('.project-modal-close').addEventListener('click', closeModal);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }

    function openModal(project) {
        initModal();
        var contentEl = document.getElementById('project-modal-content');
        if (!contentEl) return;

        var details = project.details || {
            overview: project.description,
            challenge: "Designing and engineering a robust, responsive solution with clean code and high performance.",
            solution: "Implemented using modern vanilla web technologies, responsive CSS grid layout systems, and clean component decoupling.",
            highlights: project.tags || []
        };

        var tagsHtml = '';
        if (project.tags && project.tags.length > 0) {
            tagsHtml = '<div class="project-tags" style="margin-bottom:var(--space-lg);">';
            project.tags.forEach(function (t) {
                tagsHtml += '<span class="project-tag">' + t + '</span>';
            });
            tagsHtml += '</div>';
        }

        var highlightsHtml = '';
        if (details.highlights && details.highlights.length > 0) {
            highlightsHtml = '<h4 style="font-family:var(--font-mono);font-size:0.85rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted-grey);margin-bottom:var(--space-xs);">Key Highlights / Tech Stack</h4>' +
                '<ul style="margin-bottom:var(--space-xl);padding-left:1.25rem;color:var(--charcoal);font-size:0.95rem;line-height:1.6;">';
            details.highlights.forEach(function (h) {
                highlightsHtml += '<li style="margin-bottom:6px;">' + h + '</li>';
            });
            highlightsHtml += '</ul>';
        }

        var actionsHtml = '<div class="project-actions" style="margin-top:var(--space-xl);">';
        if (project.github && project.github.trim() !== '') {
            actionsHtml += '<a href="' + project.github + '" class="project-action-link" target="_blank" rel="noopener noreferrer">' + icons.github + ' View Code</a>';
        }
        if (project.live && project.live.trim() !== '') {
            actionsHtml += '<a href="' + project.live + '" class="project-action-link primary" target="_blank" rel="noopener noreferrer">' + icons.external + ' Live Demo</a>';
        }
        actionsHtml += '</div>';

        contentEl.innerHTML =
            '<div style="font-family:var(--font-mono);font-size:0.75rem;text-transform:uppercase;letter-spacing:0.15em;color:var(--muted-grey);margin-bottom:var(--space-xs);">Project Deep Dive</div>' +
            '<h2 style="font-size:2.2rem;margin-bottom:var(--space-xs);">' + project.title + '</h2>' +
            (project.subtitle ? '<p style="font-family:var(--font-mono);font-size:0.9rem;color:var(--coral);margin-bottom:var(--space-md);">' + project.subtitle + '</p>' : '') +
            tagsHtml +
            '<div style="margin-bottom:var(--space-lg);">' +
                '<h4 style="font-family:var(--font-mono);font-size:0.85rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted-grey);margin-bottom:var(--space-xs);">Overview</h4>' +
                '<p style="color:var(--charcoal);font-size:1rem;line-height:1.7;">' + details.overview + '</p>' +
            '</div>' +
            '<div style="margin-bottom:var(--space-lg);">' +
                '<h4 style="font-family:var(--font-mono);font-size:0.85rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted-grey);margin-bottom:var(--space-xs);">The Challenge</h4>' +
                '<p style="color:var(--charcoal);font-size:1rem;line-height:1.7;">' + details.challenge + '</p>' +
            '</div>' +
            '<div style="margin-bottom:var(--space-lg);">' +
                '<h4 style="font-family:var(--font-mono);font-size:0.85rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--muted-grey);margin-bottom:var(--space-xs);">Architecture &amp; Solution</h4>' +
                '<p style="color:var(--charcoal);font-size:1rem;line-height:1.7;">' + details.solution + '</p>' +
            '</div>' +
            highlightsHtml +
            actionsHtml;

        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        // Refresh cursor bindings for newly rendered modal buttons
        if (window.customCursor && window.customCursor.refresh) {
            window.customCursor.refresh();
        }
    }

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    }

    /* ----------------------------------------
       Render Coding Projects (Asymmetrical V4 Bento Layout)
       ---------------------------------------- */
    function renderCodingProjects() {
        var container = document.getElementById('coding-projects');
        if (!container) return;

        var projects = window.portfolioData && window.portfolioData.projects && window.portfolioData.projects.coding;
        if (!projects || projects.length === 0) {
            container.innerHTML = '<p style="font-family:var(--font-mono);color:var(--muted-grey);padding:var(--space-md);">No coding projects added yet.</p>';
            return;
        }

        container.innerHTML = '';
        projects.forEach(function (proj, idx) {
            var card = document.createElement('div');
            // V4 Asymmetrical editorial layout: first card is featured / wider bento cell
            var isFeatured = proj.featured || idx === 0;
            card.className = 'project-card' + (isFeatured ? ' featured-bento' : '') + (proj.featured ? ' card-dark' : '');

            // Media or placeholder
            var mediaHtml = '';
            if (proj.image && proj.image.trim() !== '') {
                mediaHtml = '<div class="project-card-media"><img src="' + proj.image + '" alt="' + proj.title + '" loading="lazy"></div>';
            } else {
                mediaHtml = '<div class="project-card-media"><div class="project-media-placeholder"><span>[ preview image ]</span><code style="font-size:0.7rem;opacity:0.7;">' + (proj.imagePlaceholder || 'assets/images/projects/project.jpg') + '</code></div></div>';
            }

            // Status badge
            var badgeClass = 'status-badge';
            var s = (proj.status || '').toLowerCase();
            if (s.includes('progress') || s.includes('learning')) badgeClass += ' in-progress';
            else if (s.includes('soon')) badgeClass += ' coming-soon';
            else if (s.includes('learning')) badgeClass += ' learning';

            var badgeHtml = proj.status ? '<span class="' + badgeClass + '">' + proj.status + '</span>' : '';

            // Tags
            var tagsHtml = '';
            if (proj.tags && proj.tags.length > 0) {
                tagsHtml = '<div class="project-tags">';
                proj.tags.forEach(function (t) {
                    tagsHtml += '<span class="project-tag">' + t + '</span>';
                });
                tagsHtml += '</div>';
            }

            // Action buttons + Details Modal Button
            var actionsHtml = '<div class="project-actions">';
            actionsHtml += '<button class="project-action-link details-btn" data-project-id="' + (proj.id || idx) + '">' + icons.info + ' Details</button>';
            if (proj.github && proj.github.trim() !== '') {
                actionsHtml += '<a href="' + proj.github + '" class="project-action-link" target="_blank" rel="noopener noreferrer">' + icons.github + ' Code</a>';
            }
            if (proj.live && proj.live.trim() !== '') {
                actionsHtml += '<a href="' + proj.live + '" class="project-action-link primary" target="_blank" rel="noopener noreferrer">' + icons.external + ' Live Demo</a>';
            }
            actionsHtml += '</div>';

            card.innerHTML = mediaHtml +
                '<div class="project-card-content">' +
                    '<div class="project-header-row">' +
                        '<h3 class="project-title">' + proj.title + '</h3>' +
                        badgeHtml +
                    '</div>' +
                    (proj.subtitle ? '<p style="font-family:var(--font-mono);font-size:0.8rem;color:var(--coral);margin-bottom:var(--space-xs);">' + proj.subtitle + '</p>' : '') +
                    '<p class="project-description">' + proj.description + '</p>' +
                    tagsHtml +
                    actionsHtml +
                '</div>';

            // Bind click for details modal
            card.querySelector('.details-btn').addEventListener('click', function (e) {
                e.preventDefault();
                openModal(proj);
            });

            container.appendChild(card);
        });

        initModal();
    }

    function renderVideoProjects() {
        var container = document.getElementById('video-projects');
        if (!container) return;

        var videoData = window.portfolioData && window.portfolioData.projects && window.portfolioData.projects.videoEditing;
        if (!videoData) return;

        var bannerText = videoData.bannerText || "I'm currently exploring video editing and motion design — focusing on pacing, cuts, and storytelling in Premiere Pro & DaVinci Resolve.";
        var projects = videoData.items || [];

        var html = '<div class="video-section-banner animate-on-scroll">' +
            '<div class="film-perforations"><div class="film-hole"></div><div class="film-hole"></div><div class="film-hole"></div><div class="film-hole"></div><div class="film-hole"></div><div class="film-hole"></div><div class="film-hole"></div><div class="film-hole"></div></div>' +
            '<div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-sm);">' +
                '<span class="editorial-stamp">Learning Workspace</span>' +
                '<h3 style="margin:0;font-size:1.4rem;">Video Editing &amp; Motion</h3>' +
            '</div>' +
            '<p style="color:var(--charcoal);line-height:1.6;margin-bottom:var(--space-md);">' + bannerText + '</p>' +
            '<div class="video-timeline-mock">' +
                '<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--muted-grey);">00:00</span>' +
                '<div class="timeline-playhead"></div>' +
                '<div class="timeline-track-bar"></div>' +
                '<span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--muted-grey);">02:45</span>' +
            '</div>' +
        '</div>';

        if (projects.length > 0) {
            html += '<div class="project-grid">';
            projects.forEach(function (proj, idx) {
                var badgeClass = 'status-badge in-progress';
                var tagsHtml = '';
                if (proj.tags && proj.tags.length > 0) {
                    tagsHtml = '<div class="project-tags">';
                    proj.tags.forEach(function (t) { tagsHtml += '<span class="project-tag">' + t + '</span>'; });
                    tagsHtml += '</div>';
                }

                var actionsHtml = '<div class="project-actions">';
                actionsHtml += '<button class="project-action-link details-btn-video" data-idx="' + idx + '">' + icons.info + ' Breakdown</button>';
                if (proj.link && proj.link.trim() !== '') {
                    actionsHtml += '<a href="' + proj.link + '" class="project-action-link primary" target="_blank" rel="noopener noreferrer">' + icons.play + ' Watch Preview</a>';
                }
                actionsHtml += '</div>';

                html += '<div class="project-card">' +
                    '<div class="project-card-media"><div class="project-media-placeholder"><span>🎬 [ Video Edit ]</span><code style="font-size:0.7rem;opacity:0.7;">' + proj.title + '</code></div></div>' +
                    '<div class="project-card-content">' +
                        '<div class="project-header-row"><h3 class="project-title">' + proj.title + '</h3><span class="' + badgeClass + '">' + (proj.status || 'Learning') + '</span></div>' +
                        '<p class="project-description">' + proj.description + '</p>' +
                        tagsHtml +
                        actionsHtml +
                    '</div>' +
                '</div>';
            });
            html += '</div>';
        } else {
            html += '<div class="learning-callout-card animate-on-scroll">' +
                '<div class="callout-badge">Learning in Progress</div>' +
                '<h3 style="margin-bottom:var(--space-sm);">Practicing Cuts &amp; Color Grading</h3>' +
                '<p style="color:var(--muted-grey);max-width:500px;margin:0 auto;line-height:1.6;">Check back soon for sample edits, montage practice, and short-form video experiments.</p>' +
            '</div>';
        }

        container.innerHTML = html;

        // Bind video modal buttons
        container.querySelectorAll('.details-btn-video').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var idx = parseInt(btn.getAttribute('data-idx'), 10);
                openModal(projects[idx]);
            });
        });
    }

    function renderAutomationProjects() {
        var container = document.getElementById('automation-projects');
        if (!container) return;

        var autoData = window.portfolioData && window.portfolioData.projects && window.portfolioData.projects.automation;
        if (!autoData) return;

        var bannerText = autoData.bannerText || "Exploring workflow automation, Python utility scripts, and AI integrations to automate repetitive tasks.";
        var projects = autoData.items || [];

        var html = '<div class="automation-banner animate-on-scroll">' +
            '<div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-sm);">' +
                '<span class="editorial-stamp" style="border-color:var(--sky-blue);color:var(--sky-blue);">AI &amp; Workflows</span>' +
                '<h3 style="margin:0;font-size:1.4rem;">Automation &amp; Scripts</h3>' +
            '</div>' +
            '<p style="color:var(--charcoal);line-height:1.6;margin-bottom:var(--space-md);">' + bannerText + '</p>' +
            '<div class="workflow-node-diagram">' +
                '<div class="diagram-node trigger">⚡ Trigger (Webhook)</div>' +
                '<div class="diagram-connector">→</div>' +
                '<div class="diagram-node action">⚙ Python Script</div>' +
                '<div class="diagram-connector">→</div>' +
                '<div class="diagram-node ai">🤖 LLM API</div>' +
                '<div class="diagram-connector">→</div>' +
                '<div class="diagram-node action" style="background:var(--acid-lime);">📁 Output</div>' +
            '</div>' +
        '</div>';

        if (projects.length > 0) {
            html += '<div class="project-grid">';
            projects.forEach(function (proj, idx) {
                var tagsHtml = '';
                if (proj.tags && proj.tags.length > 0) {
                    tagsHtml = '<div class="project-tags">';
                    proj.tags.forEach(function (t) { tagsHtml += '<span class="project-tag">' + t + '</span>'; });
                    tagsHtml += '</div>';
                }

                var actionsHtml = '<div class="project-actions">';
                actionsHtml += '<button class="project-action-link details-btn-auto" data-idx="' + idx + '">' + icons.info + ' Workflow Spec</button>';
                if (proj.github && proj.github.trim() !== '') {
                    actionsHtml += '<a href="' + proj.github + '" class="project-action-link primary" target="_blank" rel="noopener noreferrer">' + icons.github + ' View Script</a>';
                }
                actionsHtml += '</div>';

                html += '<div class="project-card">' +
                    '<div class="project-card-media" style="background:var(--paper-surface);"><div class="project-media-placeholder"><span>⚡ [ Automation Flow ]</span><code style="font-size:0.7rem;opacity:0.7;">' + proj.title + '</code></div></div>' +
                    '<div class="project-card-content">' +
                        '<div class="project-header-row"><h3 class="project-title">' + proj.title + '</h3><span class="status-badge learning">' + (proj.status || 'Exploring') + '</span></div>' +
                        '<p class="project-description">' + proj.description + '</p>' +
                        tagsHtml +
                        actionsHtml +
                    '</div>' +
                '</div>';
            });
            html += '</div>';
        } else {
            html += '<div class="learning-callout-card animate-on-scroll" style="background:var(--warm-white);">' +
                '<div class="callout-badge automation">Scripts in Development</div>' +
                '<h3 style="margin-bottom:var(--space-sm);">Building Personal Tooling</h3>' +
                '<p style="color:var(--muted-grey);max-width:500px;margin:0 auto;line-height:1.6;">Currently experimenting with workflow automations, API integrations, and developer productivity tools.</p>' +
            '</div>';
        }

        container.innerHTML = html;

        // Bind automation modal buttons
        container.querySelectorAll('.details-btn-auto').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var idx = parseInt(btn.getAttribute('data-idx'), 10);
                openModal(projects[idx]);
            });
        });
    }

    window.projectRenderer = {
        render: function () {
            renderCodingProjects();
            renderVideoProjects();
            renderAutomationProjects();
        }
    };
})();
