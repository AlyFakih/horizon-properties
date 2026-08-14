/**
 * Horizon Properties - Main JavaScript
 * This file contains all the interactive functionality for the Horizon Properties website
 */

// Shared validation patterns.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[0-9+()\s-]{7,}$/;

document.addEventListener('DOMContentLoaded', function() {
    // Each initialiser is guarded so a missing element on one page cannot
    // abort the initialisers that follow it.
    initNavbar();
    initMobileMenu();
    initTestimonialSlider();
    initPropertyFavorites();
    initDarkModeToggle();
    initScrollAnimation();
    initBackToTop();
    initTimelineAnimation();
    initAwardsAnimation();
    initAgentsPageFeatures();
    initPropertyDetail();
    initPropertyFilters();
    initFaqAccordion();
    initNewsletterForm();
    initContactForm();
});

/**
 * Agents page: animated reveal, filter/search, and modal popup
 */
function initAgentsPageFeatures() {
    var agentCards = document.querySelectorAll('.agent-card');
    if (!agentCards.length) return;

    var filterBar = document.getElementById('agentsFilterBar');
    var searchInput = document.getElementById('agentSearchInput');
    var specialtySelect = document.getElementById('agentSpecialtySelect');
    var modal = document.getElementById('agentModal');
    var modalContent = document.getElementById('agentModalContent');
    var lastFocused = null;

    // 1. Animated reveal for agent cards
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries, obs) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('agent-animate');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14 });
        agentCards.forEach(function(card) { observer.observe(card); });
    } else {
        agentCards.forEach(function(card) { card.classList.add('agent-animate'); });
    }

    // 2. Filter/search logic - filters live as the user types, and reports empty state
    if (filterBar && searchInput && specialtySelect) {
        var emptyState = document.createElement('p');
        emptyState.className = 'agents-empty-state';
        emptyState.setAttribute('role', 'status');
        emptyState.hidden = true;
        emptyState.textContent = 'No agents match your search. Try a different name or specialty.';
        filterBar.insertAdjacentElement('afterend', emptyState);

        var applyAgentFilter = function() {
            var query = searchInput.value.trim().toLowerCase();
            var specialty = specialtySelect.value;
            var visible = 0;

            agentCards.forEach(function(card) {
                var nameEl = card.querySelector('h3');
                var titleEl = card.querySelector('.agent-title');
                var name = nameEl ? nameEl.textContent.toLowerCase() : '';
                var title = titleEl ? titleEl.textContent.trim() : '';
                var matchesQuery = !query || name.indexOf(query) !== -1 || title.toLowerCase().indexOf(query) !== -1;
                var matchesSpecialty = !specialty || title === specialty;
                var match = matchesQuery && matchesSpecialty;

                card.hidden = !match;
                if (match) visible++;
            });

            emptyState.hidden = visible !== 0;
        };

        filterBar.addEventListener('submit', function(e) { e.preventDefault(); applyAgentFilter(); });
        searchInput.addEventListener('input', applyAgentFilter);
        specialtySelect.addEventListener('change', applyAgentFilter);
    }

    // 3. Agent modal popup logic
    var agentData = [
        {
            id: 1,
            name: 'Sarah Johnson',
            title: 'Luxury Property Specialist',
            bio: 'Sarah brings 15 years of experience and a passion for matching clients with their dream homes on the coast.',
            photo: 'assets/images/agent1.webp',
            email: 'sarah@horizonproperties.com',
            phone: '5551234567',
            linkedin: '#'
        },
        {
            id: 2,
            name: 'Michael Lee',
            title: 'Downtown Specialist',
            bio: 'Michael’s expertise in urban properties ensures clients get the best deals in the city’s most desirable neighborhoods.',
            photo: 'assets/images/agent3.webp',
            email: 'michael@horizonproperties.com',
            phone: '5559876543',
            linkedin: '#'
        },
        {
            id: 3,
            name: 'Priya Patel',
            title: 'Family Homes Advisor',
            bio: 'Priya specializes in family-friendly properties and is known for her attentive, caring approach to every client.',
            photo: 'assets/images/agent7.webp',
            email: 'priya@horizonproperties.com',
            phone: '5552468101',
            linkedin: '#'
        },
        {
            id: 4,
            name: 'Carlos Martinez',
            title: 'Investment Consultant',
            bio: 'Carlos helps investors maximize returns with smart acquisitions and deep market knowledge.',
            photo: 'assets/images/agent2.webp',
            email: 'carlos@horizonproperties.com',
            phone: '5551357913',
            linkedin: '#'
        },
        {
            id: 5,
            name: 'Emily Chen',
            title: 'Luxury Rentals Expert',
            bio: 'Emily is the go-to for high-end rentals, offering a seamless experience for both owners and tenants.',
            photo: 'assets/images/agent5.webp',
            email: 'emily@horizonproperties.com',
            phone: '5558642098',
            linkedin: '#'
        },
        {
            id: 6,
            name: 'Daniel Kim',
            title: 'New Developments Lead',
            bio: 'Daniel’s insight into new builds and luxury developments gives clients an edge in the hottest markets.',
            photo: 'assets/images/agent6.webp',
            email: 'daniel@horizonproperties.com',
            phone: '5553216549',
            linkedin: '#'
        }
    ];

    if (!modal || !modalContent) return;

    // Build the modal with DOM APIs rather than innerHTML so agent copy can
    // never be interpreted as markup.
    function buildModal(agent) {
        modalContent.textContent = '';

        var closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'agent-modal-close';
        closeBtn.setAttribute('aria-label', 'Close agent details');
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', closeAgentModal);

        var photo = document.createElement('img');
        photo.className = 'agent-modal-photo';
        photo.src = agent.photo;
        photo.alt = agent.name;
        photo.loading = 'lazy';

        var heading = document.createElement('h3');
        heading.textContent = agent.name;

        var title = document.createElement('span');
        title.className = 'agent-modal-title';
        title.textContent = agent.title;

        var bio = document.createElement('p');
        bio.className = 'agent-modal-bio';
        bio.textContent = agent.bio;

        var contact = document.createElement('div');
        contact.className = 'agent-modal-contact';
        [
            { href: 'mailto:' + agent.email, label: 'Email ' + agent.name, icon: 'fa-solid fa-envelope' },
            { href: 'tel:' + agent.phone, label: 'Call ' + agent.name, icon: 'fa-solid fa-phone' },
            { href: agent.linkedin, label: agent.name + ' on LinkedIn', icon: 'fa-brands fa-linkedin-in' }
        ].forEach(function(link) {
            var a = document.createElement('a');
            a.href = link.href;
            a.setAttribute('aria-label', link.label);
            if (link.href.charAt(0) !== '#' && link.href.indexOf('mailto:') !== 0 && link.href.indexOf('tel:') !== 0) {
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
            }
            var i = document.createElement('i');
            i.className = link.icon;
            i.setAttribute('aria-hidden', 'true');
            a.appendChild(i);
            contact.appendChild(a);
        });

        modalContent.append(closeBtn, photo, heading, title, bio, contact);
        return closeBtn;
    }

    function openAgentModal(agentId, trigger) {
        var agent = agentData.find(function(a) { return String(a.id) === String(agentId); });
        if (!agent) return;

        // Prefer the card that opened the dialog; document.activeElement is
        // <body> when the click did not move focus first.
        lastFocused = (document.activeElement && document.activeElement !== document.body)
            ? document.activeElement
            : (trigger || null);
        var closeBtn = buildModal(agent);
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        closeBtn.focus();

        document.addEventListener('keydown', onModalKeydown);
    }

    function closeAgentModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        modalContent.textContent = '';
        document.body.classList.remove('modal-open');
        document.removeEventListener('keydown', onModalKeydown);
        if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    // Escape closes; Tab is trapped inside the dialog.
    function onModalKeydown(e) {
        if (e.key === 'Escape') {
            closeAgentModal();
            return;
        }
        if (e.key !== 'Tab') return;

        var focusable = modalContent.querySelectorAll('button, [href], input, select, textarea');
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }

    agentCards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            // Let the inline email/phone/LinkedIn links work without opening the modal.
            if (e.target.closest('a')) return;
            openAgentModal(card.getAttribute('data-agent-id'), card);
        });
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                openAgentModal(card.getAttribute('data-agent-id'), card);
            }
        });
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeAgentModal();
    });
    modal.setAttribute('aria-hidden', 'true');
}


/**
 * Animate awards and association logos on scroll (About Us page)
 */
function initAwardsAnimation() {
    var awardsSection = document.querySelector('.awards-section');
    if (!awardsSection) return;
    var awards = awardsSection.querySelectorAll('.award-item');
    var assocImgs = awardsSection.querySelectorAll('.associations-grid img');
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries, obs) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add(entry.target.classList.contains('award-item') ? 'award-animate' : 'assoc-animate');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        awards.forEach(function(item) { observer.observe(item); });
        assocImgs.forEach(function(img) { observer.observe(img); });
    } else {
        awards.forEach(function(item) { item.classList.add('award-animate'); });
        assocImgs.forEach(function(img) { img.classList.add('assoc-animate'); });
    }
}


/**
 * Animate timeline items on scroll (About Us page)
 */
function initTimelineAnimation() {
    var timeline = document.querySelector('.timeline');
    if (!timeline) return;
    var items = timeline.querySelectorAll('.timeline-item');
    if (!items.length) return;

    // Respect users who have asked for reduced motion: reveal everything at once.
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        items.forEach(function(item) { item.classList.add('timeline-animate'); });
        return;
    }

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries, obs) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('timeline-animate');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        items.forEach(function(item) { observer.observe(item); });
    } else {
        items.forEach(function(item) { item.classList.add('timeline-animate'); });
    }
}


/**
 * Handle navbar scroll effect
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar-container');
    if (!navbar) return;

    // Pages that render a light page header start in the "scrolled" state and
    // must stay there, otherwise the white nav text lands on a white background.
    const alwaysScrolled = navbar.classList.contains('scrolled') && !document.querySelector('.hero');
    if (alwaysScrolled) return;

    const onScroll = function() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/**
 * Build and wire up the mobile navigation drawer.
 *
 * The drawer is generated from the existing desktop nav so that the two can
 * never drift apart, and so no page markup has to be duplicated eight times.
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;

    const menu = document.createElement('nav');
    menu.className = 'mobile-menu';
    menu.id = 'mobileMenu';
    menu.setAttribute('aria-label', 'Mobile navigation');
    menu.setAttribute('aria-hidden', 'true');

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'mobile-menu-close';
    closeBtn.setAttribute('aria-label', 'Close menu');
    closeBtn.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';

    const list = document.createElement('ul');
    list.className = 'mobile-nav-links';
    navLinks.querySelectorAll('a').forEach(function(link) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.getAttribute('href');
        a.textContent = link.textContent.trim();
        if (link.classList.contains('active')) {
            a.classList.add('active');
            a.setAttribute('aria-current', 'page');
        }
        li.appendChild(a);
        list.appendChild(li);
    });

    const cta = document.createElement('div');
    cta.className = 'mobile-nav-cta';
    const navCta = document.querySelector('.nav-cta');
    if (navCta) {
        const phone = navCta.querySelector('.phone');
        if (phone) {
            const phoneLink = document.createElement('a');
            phoneLink.className = 'phone';
            phoneLink.href = 'tel:' + phone.textContent.replace(/[^0-9+]/g, '');
            phoneLink.innerHTML = '<i class="fa-solid fa-phone" aria-hidden="true"></i> ' + phone.textContent.trim();
            cta.appendChild(phoneLink);
        }
        const btn = navCta.querySelector('.btn');
        if (btn) {
            const btnClone = btn.cloneNode(true);
            cta.appendChild(btnClone);
        }
    }

    menu.append(closeBtn, list, cta);

    const backdrop = document.createElement('div');
    backdrop.className = 'menu-backdrop';
    backdrop.hidden = true;

    document.body.append(backdrop, menu);

    let lastFocused = null;

    function openMenu() {
        lastFocused = document.activeElement;
        menu.classList.add('active');
        menu.setAttribute('aria-hidden', 'false');
        backdrop.hidden = false;
        backdrop.classList.add('active');
        document.body.classList.add('menu-open');
        toggle.setAttribute('aria-expanded', 'true');
        closeBtn.focus();
        document.addEventListener('keydown', onKeydown);
    }

    function closeMenu() {
        menu.classList.remove('active');
        menu.setAttribute('aria-hidden', 'true');
        backdrop.classList.remove('active');
        backdrop.hidden = true;
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.removeEventListener('keydown', onKeydown);
        // Fall back to the toggle: if the drawer was opened without the trigger
        // holding focus, lastFocused is <body> and focus would be lost.
        const restore = (lastFocused && lastFocused !== document.body) ? lastFocused : toggle;
        if (restore && typeof restore.focus === 'function') restore.focus();
    }

    function onKeydown(e) {
        if (e.key === 'Escape') {
            closeMenu();
            return;
        }
        if (e.key !== 'Tab') return;

        const focusable = menu.querySelectorAll('button, [href]');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }

    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'mobileMenu');
    toggle.addEventListener('click', function() {
        if (menu.classList.contains('active')) closeMenu();
        else openMenu();
    });
    closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);
    list.addEventListener('click', function(e) {
        if (e.target.closest('a')) closeMenu();
    });

    // If the viewport grows past the mobile breakpoint while the drawer is
    // open, close it so focus is not trapped in a hidden element.
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && menu.classList.contains('active')) closeMenu();
    });
}


/**
 * Initialize testimonial slider
 */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.testimonial-slide');
    const controls = document.querySelector('.testimonial-controls');
    const dots = controls ? controls.querySelectorAll('.dot') : [];
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');

    if (!slides.length) return;

    let currentSlide = 0;
    let timer = null;

    slider.setAttribute('aria-live', 'polite');
    slides[0].classList.add('active');

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;
        slides.forEach(function(slide, i) {
            slide.classList.toggle('active', i === currentSlide);
        });
        dots.forEach(function(dot, i) {
            const isActive = i === currentSlide;
            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
            dot.tabIndex = isActive ? 0 : -1;
        });
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }

    function startAuto() {
        stopAuto();
        if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        timer = setInterval(nextSlide, 5000);
    }
    function stopAuto() {
        if (timer) { clearInterval(timer); timer = null; }
    }

    if (nextBtn) {
        nextBtn.type = 'button';
        nextBtn.setAttribute('aria-label', 'Next testimonial');
        nextBtn.addEventListener('click', function() { nextSlide(); startAuto(); });
    }
    if (prevBtn) {
        prevBtn.type = 'button';
        prevBtn.setAttribute('aria-label', 'Previous testimonial');
        prevBtn.addEventListener('click', function() { prevSlide(); startAuto(); });
    }

    // The dots ship as <span>; promote them to real controls for keyboard users.
    dots.forEach(function(dot, index) {
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', 'Show testimonial ' + (index + 1));
        dot.tabIndex = index === 0 ? 0 : -1;
        dot.addEventListener('click', function() { showSlide(index); startAuto(); });
        dot.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showSlide(index);
                startAuto();
            }
        });
    });

    // Pause the carousel while it is hovered or focused so content can be read.
    ['mouseenter', 'focusin'].forEach(function(evt) {
        slider.addEventListener(evt, stopAuto);
        if (controls) controls.addEventListener(evt, stopAuto);
    });
    ['mouseleave', 'focusout'].forEach(function(evt) {
        slider.addEventListener(evt, startAuto);
        if (controls) controls.addEventListener(evt, startAuto);
    });
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) stopAuto(); else startAuto();
    });

    showSlide(0);
    startAuto();
}

/**
 * Initialize property favorite toggle, persisted across page loads.
 */
function initPropertyFavorites() {
    const favoriteButtons = document.querySelectorAll('.property-favorite');
    if (!favoriteButtons.length) return;

    let saved = [];
    try {
        saved = JSON.parse(localStorage.getItem('favoriteProperties') || '[]');
        if (!Array.isArray(saved)) saved = [];
    } catch (err) {
        saved = [];
    }

    function persist() {
        try {
            localStorage.setItem('favoriteProperties', JSON.stringify(saved));
        } catch (err) {
            /* Storage may be unavailable (private mode, quota); favouriting
               still works for the current page view. */
        }
    }

    favoriteButtons.forEach(function(btn) {
        const card = btn.closest('.property-card');
        const titleEl = card ? card.querySelector('h3') : null;
        const id = btn.dataset.propertyId || (titleEl ? titleEl.textContent.trim() : null);
        if (!id) return;

        const icon = btn.querySelector('i');

        function render(isFav) {
            if (icon) {
                icon.classList.toggle('fa-solid', isFav);
                icon.classList.toggle('fa-regular', !isFav);
            }
            btn.classList.toggle('is-favorite', isFav);
            btn.setAttribute('aria-pressed', isFav ? 'true' : 'false');
            btn.setAttribute('aria-label', (isFav ? 'Remove ' : 'Save ') + id + (isFav ? ' from' : ' to') + ' favorites');
        }

        render(saved.indexOf(id) !== -1);

        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const at = saved.indexOf(id);
            if (at === -1) saved.push(id);
            else saved.splice(at, 1);
            persist();
            render(at === -1);
        });
    });
}

/**
 * Initialize dark mode toggle
 */
function initDarkModeToggle() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;

    let stored = null;
    try {
        stored = localStorage.getItem('darkMode');
    } catch (err) {
        stored = null;
    }

    function setDarkMode(enabled) {
        body.classList.toggle('dark-mode', enabled);
        try {
            localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
        } catch (err) { /* storage unavailable */ }
        if (darkModeToggle) {
            darkModeToggle.innerHTML = enabled
                ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
                : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
            darkModeToggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
            darkModeToggle.setAttribute('aria-label', enabled ? 'Switch to light mode' : 'Switch to dark mode');
        }
    }

    // Apply the stored preference even on pages that have no toggle button.
    setDarkMode(stored === 'enabled');

    if (!darkModeToggle) return;

    darkModeToggle.setAttribute('role', 'button');
    darkModeToggle.setAttribute('tabindex', '0');
    darkModeToggle.addEventListener('click', function() {
        setDarkMode(!body.classList.contains('dark-mode'));
    });
    darkModeToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setDarkMode(!body.classList.contains('dark-mode'));
        }
    });
}

/**
 * Initialize scroll animation for elements
 */
function initScrollAnimation() {
    const elements = document.querySelectorAll('.feature-item, .section-header, .property-card');
    if (!elements.length || !('IntersectionObserver' in window)) return;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        elements.forEach(function(el) { el.classList.add('animate'); });
        return;
    }

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(function(element) { observer.observe(element); });
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        // Move focus back to the top of the page, not just the scroll position.
        const target = document.querySelector('.logo a') || document.body;
        if (target && typeof target.focus === 'function') target.focus({ preventScroll: true });
    });
}

/**
 * Property detail page: thumbnail gallery and lightbox.
 */
function initPropertyGallery() {
    const mainImage = document.getElementById('mainGalleryImage');
    const thumbs = document.querySelectorAll('.gallery-thumbnails .thumb');
    if (!mainImage || !thumbs.length) return;

    function selectThumb(thumb) {
        // Prefer an explicit full-size source, but fall back to the thumbnail's
        // own src so a missing data-img can never blank the gallery.
        const full = thumb.getAttribute('data-img') || thumb.getAttribute('src');
        mainImage.src = full;
        mainImage.alt = thumb.alt || mainImage.alt;
        thumbs.forEach(function(t) {
            const isActive = t === thumb;
            t.classList.toggle('active', isActive);
            t.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
    }

    thumbs.forEach(function(thumb) {
        thumb.setAttribute('role', 'button');
        thumb.setAttribute('tabindex', '0');
        thumb.addEventListener('click', function() { selectThumb(thumb); });
        thumb.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectThumb(thumb);
            }
        });
    });

    // Lightbox for the "view all images" control.
    const lightboxBtn = document.querySelector('.gallery-lightbox-btn');
    if (lightboxBtn) {
        lightboxBtn.addEventListener('click', function() {
            const overlay = document.createElement('div');
            overlay.className = 'gallery-lightbox';
            overlay.setAttribute('role', 'dialog');
            overlay.setAttribute('aria-modal', 'true');
            overlay.setAttribute('aria-label', 'Property photo gallery');

            const close = document.createElement('button');
            close.type = 'button';
            close.className = 'gallery-lightbox-close';
            close.setAttribute('aria-label', 'Close gallery');
            close.innerHTML = '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';

            const strip = document.createElement('div');
            strip.className = 'gallery-lightbox-strip';
            thumbs.forEach(function(thumb) {
                const img = document.createElement('img');
                img.src = thumb.getAttribute('data-img') || thumb.getAttribute('src');
                img.alt = thumb.alt || '';
                img.loading = 'lazy';
                strip.appendChild(img);
            });

            overlay.append(close, strip);
            document.body.appendChild(overlay);
            document.body.classList.add('modal-open');
            close.focus();

            function dismiss() {
                overlay.remove();
                document.body.classList.remove('modal-open');
                document.removeEventListener('keydown', onKey);
                lightboxBtn.focus();
            }
            function onKey(e) { if (e.key === 'Escape') dismiss(); }

            close.addEventListener('click', dismiss);
            overlay.addEventListener('click', function(e) { if (e.target === overlay) dismiss(); });
            document.addEventListener('keydown', onKey);
        });
    }

    // The virtual tour is not wired to a provider yet; say so rather than
    // presenting a button that silently does nothing.
    const tourBtn = document.querySelector('.virtual-tour-btn');
    if (tourBtn) {
        tourBtn.addEventListener('click', function() {
            window.location.href = 'contact.html?subject=schedule-viewing';
        });
    }

    // "Schedule Viewing" in the sidebar routes to the contact form.
    document.querySelectorAll('.property-sidebar .btn').forEach(function(btn) {
        if (btn.tagName === 'BUTTON') {
            btn.addEventListener('click', function() {
                window.location.href = 'contact.html?subject=schedule-viewing';
            });
        }
    });
}

/**
 * Properties page: filtering, sorting, pagination and layout switching.
 *
 * Filtering runs against js/properties-data.js rather than the text printed in
 * each card, so a price or bedroom count is compared as a number and never
 * parsed back out of a formatted string. The cards themselves stay in the HTML
 * (crawlable, and they still render with JavaScript disabled); this only
 * decides which of them are shown, and in what order.
 */
function initPropertyFilters() {
    const grid = document.querySelector('.properties-grid');
    if (!grid) return;

    const data = (window.HORIZON && window.HORIZON.properties) || [];
    const cards = Array.from(grid.querySelectorAll('.property-card'));
    if (!cards.length) return;

    const form = document.querySelector('.filter-form');
    const sortSelect = document.getElementById('sort-options');
    const countEl = document.querySelector('.properties-count span');
    const noResults = document.getElementById('noResults');
    const pagination = document.getElementById('pagination');
    const PER_PAGE = 6;

    // Pair each card with its record. A card with no matching record still
    // takes part in the list; it simply cannot be filtered on.
    const items = cards.map(function(card, index) {
        const record = data.find(function(p) { return p.id === card.dataset.propertyId; });
        return {
            card: card,
            order: index,
            data: record || null
        };
    });

    // Slider position -> price. Index 5 means "no upper limit".
    const PRICE_STEPS = [0, 1000000, 2000000, 3000000, 4000000, Infinity];
    const PRICE_LABELS = ['$0', '$1M', '$2M', '$3M', '$4M', '$5M+'];

    const minSlider = document.getElementById('price-min-slider');
    const maxSlider = document.getElementById('price-max-slider');
    const minLabel = document.getElementById('price-min');
    const maxLabel = document.getElementById('price-max');

    let currentPage = 1;

    function readPriceRange() {
        if (!minSlider || !maxSlider) return { min: 0, max: Infinity };
        let lo = parseInt(minSlider.value, 10);
        let hi = parseInt(maxSlider.value, 10);
        // Keep the two thumbs from crossing over each other.
        if (lo > hi) { const t = lo; lo = hi; hi = t; }
        return { min: PRICE_STEPS[lo], max: PRICE_STEPS[hi], loIndex: lo, hiIndex: hi };
    }

    function paintPriceLabels() {
        const range = readPriceRange();
        if (minLabel) minLabel.textContent = PRICE_LABELS[range.loIndex];
        if (maxLabel) maxLabel.textContent = PRICE_LABELS[range.hiIndex];
    }

    function selectedFeatures() {
        return Array.from(document.querySelectorAll('.checkbox-item input[name="features"]:checked'))
            .map(function(input) { return input.value; });
    }

    function currentFilters() {
        const val = function(id) {
            const el = document.getElementById(id);
            return el ? el.value : '';
        };
        const price = readPriceRange();
        return {
            location: val('filter-location'),
            type: val('filter-type'),
            beds: parseInt(val('filter-bedrooms'), 10) || 0,
            baths: parseInt(val('filter-bathrooms'), 10) || 0,
            features: selectedFeatures(),
            priceMin: price.min,
            priceMax: price.max
        };
    }

    function matches(item, f) {
        const p = item.data;
        if (!p) return true;
        if (f.location && p.location !== f.location) return false;
        if (f.type && p.type !== f.type) return false;
        if (f.beds && p.beds < f.beds) return false;
        if (f.baths && p.baths < f.baths) return false;
        if (p.price < f.priceMin) return false;
        if (f.priceMax !== Infinity && p.price > f.priceMax) return false;
        // Every ticked feature must be present, not just one of them.
        for (let i = 0; i < f.features.length; i++) {
            if (!p.features || p.features.indexOf(f.features[i]) === -1) return false;
        }
        return true;
    }

    function sortItems(list, mode) {
        const value = function(item, key) { return item.data ? item.data[key] : 0; };
        return list.slice().sort(function(a, b) {
            switch (mode) {
                case 'price-asc':  return value(a, 'price') - value(b, 'price');
                case 'price-desc': return value(b, 'price') - value(a, 'price');
                case 'size-asc':   return value(a, 'sqft') - value(b, 'sqft');
                case 'size-desc':  return value(b, 'sqft') - value(a, 'sqft');
                case 'newest':
                    return new Date(value(b, 'listed') || 0) - new Date(value(a, 'listed') || 0);
                default: return a.order - b.order;
            }
        });
    }

    function renderPagination(totalPages) {
        if (!pagination) return;
        pagination.textContent = '';

        if (totalPages <= 1) {
            pagination.hidden = true;
            return;
        }
        pagination.hidden = false;

        const addButton = function(label, page, opts) {
            const options = opts || {};
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = options.className || 'page-number';
            btn.innerHTML = options.html || label;
            if (options.ariaLabel) btn.setAttribute('aria-label', options.ariaLabel);
            if (options.current) {
                btn.classList.add('active');
                btn.setAttribute('aria-current', 'page');
            }
            if (options.disabled) btn.disabled = true;
            btn.addEventListener('click', function() { goToPage(page); });
            pagination.appendChild(btn);
        };

        addButton('', currentPage - 1, {
            className: 'page-prev',
            html: '<i class="fa-solid fa-chevron-left" aria-hidden="true"></i>',
            ariaLabel: 'Previous page',
            disabled: currentPage === 1
        });

        for (let i = 1; i <= totalPages; i++) {
            addButton(String(i), i, { current: i === currentPage, ariaLabel: 'Page ' + i });
        }

        addButton('', currentPage + 1, {
            className: 'page-next',
            html: '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>',
            ariaLabel: 'Next page',
            disabled: currentPage === totalPages
        });
    }

    function goToPage(page) {
        currentPage = page;
        apply({ keepPage: true });
        // Bring the top of the results into view without yanking the whole page.
        const header = document.querySelector('.properties-listing .properties-header');
        if (header && header.scrollIntoView) {
            const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            header.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        }
    }

    function apply(options) {
        const opts = options || {};
        const f = currentFilters();
        const mode = sortSelect ? sortSelect.value : 'newest';

        const visible = sortItems(items.filter(function(item) { return matches(item, f); }), mode);
        const totalPages = Math.max(1, Math.ceil(visible.length / PER_PAGE));

        if (!opts.keepPage) currentPage = 1;
        if (currentPage > totalPages) currentPage = totalPages;

        const from = (currentPage - 1) * PER_PAGE;
        const pageItems = visible.slice(from, from + PER_PAGE);

        items.forEach(function(item) { item.card.hidden = true; });
        pageItems.forEach(function(item) {
            item.card.hidden = false;
            grid.appendChild(item.card);
        });
        if (noResults) grid.appendChild(noResults);

        if (countEl) {
            if (visible.length === 0) {
                countEl.textContent = 'No properties match your filters';
            } else if (visible.length <= PER_PAGE) {
                countEl.textContent = 'Showing ' + visible.length +
                    (visible.length === 1 ? ' property' : ' properties');
            } else {
                countEl.textContent = 'Showing ' + (from + 1) + '–' +
                    (from + pageItems.length) + ' of ' + visible.length + ' properties';
            }
        }

        if (noResults) noResults.hidden = visible.length !== 0;
        renderPagination(totalPages);
        syncUrl(f, mode);
    }

    // Keep the address bar in step so a filtered view can be shared or reloaded.
    function syncUrl(f, mode) {
        if (!window.history || !window.history.replaceState) return;
        const params = new URLSearchParams();
        if (f.location) params.set('location', f.location);
        if (f.type) params.set('type', f.type);
        if (f.beds) params.set('beds', f.beds + '+');
        if (f.baths) params.set('baths', f.baths + '+');
        if (f.features.length) params.set('features', f.features.join(','));
        if (f.priceMin > 0) params.set('min', String(f.priceMin));
        if (f.priceMax !== Infinity) params.set('max', String(f.priceMax));
        if (mode && mode !== 'newest') params.set('sort', mode);
        if (currentPage > 1) params.set('page', String(currentPage));

        const query = params.toString();
        window.history.replaceState(null, '', query ? '?' + query : window.location.pathname);
    }

    // ---- wiring ----

    if (form) {
        form.addEventListener('submit', function(e) { e.preventDefault(); apply(); });
        form.addEventListener('reset', function() {
            // Let the browser clear the fields first, then recompute.
            setTimeout(function() {
                if (minSlider) minSlider.value = '0';
                if (maxSlider) maxSlider.value = '5';
                paintPriceLabels();
                apply();
            }, 0);
        });
        // Selects and checkboxes filter immediately; the button stays for
        // anyone who expects to press it.
        form.addEventListener('change', function(e) {
            if (e.target.matches('select, input[type="checkbox"], input[type="range"]')) apply();
        });
    }

    [minSlider, maxSlider].forEach(function(slider) {
        if (!slider) return;
        slider.addEventListener('input', paintPriceLabels);
    });

    if (sortSelect) sortSelect.addEventListener('change', function() { apply(); });

    document.querySelectorAll('.view-option-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.view-option-btn').forEach(function(b) {
                const isActive = b === btn;
                b.classList.toggle('active', isActive);
                b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            });
            grid.classList.toggle('list-view', btn.dataset.view === 'list');
            try {
                localStorage.setItem('propertyView', btn.dataset.view);
            } catch (err) { /* storage unavailable */ }
        });
    });

    // Restore the visitor's last layout choice.
    try {
        const savedView = localStorage.getItem('propertyView');
        if (savedView === 'list') {
            const listBtn = document.querySelector('.view-option-btn[data-view="list"]');
            if (listBtn) listBtn.click();
        }
    } catch (err) { /* storage unavailable */ }

    const resetBtn = document.querySelector('.reset-search');
    if (resetBtn && form) {
        resetBtn.addEventListener('click', function() {
            form.reset();
            if (minSlider) minSlider.value = '0';
            if (maxSlider) maxSlider.value = '5';
            paintPriceLabels();
            apply();
            const firstField = form.querySelector('select');
            if (firstField) firstField.focus();
        });
    }

    // Collapsible filter panel on small screens. The markup ships expanded and
    // the CSS collapses it, so the toggle has to be driven from here.
    const sidebar = document.querySelector('.filter-sidebar');
    const sidebarHeading = sidebar ? sidebar.querySelector('h3') : null;
    if (sidebar && sidebarHeading && !sidebarHeading.querySelector('.filter-toggle')) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'filter-toggle';
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', 'filterForm');
        btn.textContent = sidebarHeading.textContent.trim();
        sidebarHeading.textContent = '';
        sidebarHeading.appendChild(btn);
        if (form) form.id = 'filterForm';

        btn.addEventListener('click', function() {
            const open = sidebar.classList.toggle('is-open');
            btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    // Adopt any criteria handed over by the homepage hero search or a shared URL.
    const params = new URLSearchParams(window.location.search);
    if (params.toString()) {
        const setIf = function(id, value) {
            const el = document.getElementById(id);
            if (el && value) el.value = value;
        };
        setIf('filter-location', params.get('location'));
        setIf('filter-type', params.get('type'));
        setIf('filter-bedrooms', params.get('beds'));
        setIf('filter-bathrooms', params.get('baths'));

        const features = params.get('features');
        if (features) {
            features.split(',').forEach(function(value) {
                const box = document.querySelector('.checkbox-item input[value="' + value + '"]');
                if (box) box.checked = true;
            });
        }

        // The homepage passes a "300000-500000" style band; the listing page
        // passes explicit min/max. Accept both.
        const band = params.get('price');
        let min = parseInt(params.get('min'), 10);
        let max = parseInt(params.get('max'), 10);
        if (band) {
            const parts = band.replace('+', '').split('-');
            min = parseInt(parts[0], 10);
            max = parts[1] ? parseInt(parts[1], 10) : NaN;
        }
        const nearestStep = function(value, fallback) {
            if (isNaN(value)) return fallback;
            let best = fallback;
            for (let i = 0; i < PRICE_STEPS.length; i++) {
                if (PRICE_STEPS[i] <= value) best = i;
            }
            return best;
        };
        if (minSlider && !isNaN(min)) minSlider.value = String(nearestStep(min, 0));
        if (maxSlider && !isNaN(max)) {
            let hi = 5;
            for (let i = 0; i < PRICE_STEPS.length; i++) {
                if (PRICE_STEPS[i] >= max) { hi = i; break; }
            }
            maxSlider.value = String(hi);
        }

        const sort = params.get('sort');
        if (sort && sortSelect) sortSelect.value = sort;
        const page = parseInt(params.get('page'), 10);
        if (page > 0) currentPage = page;
    }

    paintPriceLabels();
    apply({ keepPage: currentPage > 1 });
}

/**
 * Property detail page: renders whichever listing the ?id= parameter names.
 *
 * One page serves every property. An unknown or missing id gets a proper
 * "not found" state instead of a half-rendered page.
 */
function initPropertyDetail() {
    const root = document.getElementById('propertyDetail');
    if (!root) return;

    const H = window.HORIZON;
    if (!H) return;

    const id = new URLSearchParams(window.location.search).get('id');
    const property = id ? H.getPropertyById(id) : null;

    if (!property) {
        renderNotFound(root, id);
        return;
    }

    renderProperty(root, property, H);
}

function renderNotFound(root, id) {
    root.innerHTML = '';
    document.title = 'Property not found - Horizon Properties';

    const wrap = document.createElement('section');
    wrap.className = 'property-not-found';

    const icon = document.createElement('div');
    icon.className = 'not-found-icon';
    icon.innerHTML = '<i class="fa-solid fa-house" aria-hidden="true"></i>';

    const heading = document.createElement('h1');
    heading.textContent = 'We couldn’t find that property';

    const message = document.createElement('p');
    message.textContent = id
        ? 'The listing you followed may have been sold or withdrawn. Browse our current portfolio to find something similar.'
        : 'No property was specified. Browse our current portfolio to find your next home.';

    const actions = document.createElement('div');
    actions.className = 'not-found-actions';

    const browse = document.createElement('a');
    browse.className = 'btn btn-primary';
    browse.href = 'properties.html';
    browse.textContent = 'Browse all properties';

    const contact = document.createElement('a');
    contact.className = 'btn btn-outline';
    contact.href = 'contact.html';
    contact.textContent = 'Talk to an agent';

    actions.append(browse, contact);
    wrap.append(icon, heading, message, actions);
    root.appendChild(wrap);
}

function renderProperty(root, p, H) {
    const el = function(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    };
    const icon = function(name) {
        const i = document.createElement('i');
        i.className = 'fa-solid ' + name;
        i.setAttribute('aria-hidden', 'true');
        return i;
    };

    const agent = H.agents[p.agent];
    const price = H.formatPrice(p.price);

    document.title = p.title + ' - Horizon Properties';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
        desc.setAttribute('content',
            p.title + ' in ' + p.address + '. ' + p.beds + ' bedrooms, ' + p.baths +
            ' bathrooms, ' + p.sqft.toLocaleString('en-US') + ' sqft. ' + price + '.');
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', canonical.href.split('?')[0] + '?id=' + p.id);

    root.innerHTML = '';

    // ---- breadcrumbs ----
    const crumbs = el('nav', 'property-breadcrumbs');
    crumbs.setAttribute('aria-label', 'Breadcrumb');
    const crumbList = el('div', 'breadcrumbs');
    const home = el('a', null, 'Home'); home.href = 'index.html';
    const props = el('a', null, 'Properties'); props.href = 'properties.html';
    const sep1 = el('span', 'separator', '/'); sep1.setAttribute('aria-hidden', 'true');
    const sep2 = el('span', 'separator', '/'); sep2.setAttribute('aria-hidden', 'true');
    crumbList.append(home, sep1, props, sep2, el('span', 'current', p.title));
    crumbs.appendChild(crumbList);

    // ---- gallery ----
    const hero = el('section', 'property-hero');
    const galleryMain = el('div', 'gallery-main');
    const mainImg = document.createElement('img');
    mainImg.className = 'main-image';
    mainImg.id = 'mainGalleryImage';
    mainImg.src = p.images[0].src;
    mainImg.alt = p.images[0].alt;
    mainImg.width = 1200;
    mainImg.height = 675;
    mainImg.fetchPriority = 'high';
    mainImg.decoding = 'async';

    const tourBtn = el('button', 'virtual-tour-btn');
    tourBtn.type = 'button';
    tourBtn.append(icon('fa-video'), document.createTextNode(' Book a viewing'));

    const lightboxBtn = el('button', 'gallery-lightbox-btn');
    lightboxBtn.type = 'button';
    lightboxBtn.setAttribute('aria-label', 'View all ' + p.images.length + ' photos');
    const imagesIcon = document.createElement('i');
    imagesIcon.className = 'fa-regular fa-images';
    imagesIcon.setAttribute('aria-hidden', 'true');
    lightboxBtn.appendChild(imagesIcon);

    galleryMain.append(mainImg, tourBtn, lightboxBtn);

    const thumbs = el('div', 'gallery-thumbnails');
    if (p.images.length > 1) {
        p.images.forEach(function(image, index) {
            const t = document.createElement('img');
            t.className = 'thumb' + (index === 0 ? ' active' : '');
            t.src = image.src;
            t.alt = image.alt;
            t.width = 160;
            t.height = 120;
            t.loading = 'lazy';
            t.decoding = 'async';
            t.setAttribute('data-img', image.src);
            thumbs.appendChild(t);
        });
    }
    hero.append(galleryMain, thumbs);

    // ---- main details ----
    const details = el('section', 'property-main-details');
    const content = el('div', 'property-main-content');

    const title = el('h1', null, p.title);
    const address = el('p', 'property-address');
    address.append(icon('fa-location-dot'), document.createTextNode(' ' + p.address));

    const featureList = el('div', 'property-features-list');
    [
        [icon('fa-bed'), p.beds + (p.beds === 1 ? ' Bed' : ' Beds')],
        [icon('fa-bath'), p.baths + ' Baths'],
        [icon('fa-ruler-combined'), p.sqft.toLocaleString('en-US') + ' sqft'],
        [icon('fa-tag'), p.status]
    ].forEach(function(pair) {
        const span = document.createElement('span');
        span.append(pair[0], document.createTextNode(' ' + pair[1]));
        featureList.appendChild(span);
    });

    const description = el('div', 'property-description');
    description.appendChild(el('p', null, p.description));

    const specs = el('table', 'property-specs');
    const caption = el('caption', 'visually-hidden', 'Key facts for ' + p.title);
    specs.appendChild(caption);
    const tbody = document.createElement('tbody');
    [
        ['Price', price],
        ['Property type', p.type.charAt(0).toUpperCase() + p.type.slice(1)],
        ['Year built', String(p.yearBuilt)],
        ['Lot size', p.lotSize],
        ['Garage', p.garage],
        ['Flooring', p.flooring]
    ].forEach(function(row) {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.scope = 'row';
        th.textContent = row[0];
        const td = document.createElement('td');
        td.textContent = row[1];
        tr.append(th, td);
        tbody.appendChild(tr);
    });
    specs.appendChild(tbody);

    // Features as readable labels rather than raw filter values.
    const FEATURE_LABELS = {
        pool: 'Swimming pool', garden: 'Garden', garage: 'Garage',
        balcony: 'Balcony', waterfront: 'Waterfront', gym: 'Gym'
    };
    let featuresBlock = null;
    if (p.features && p.features.length) {
        featuresBlock = el('div', 'property-amenity-block');
        featuresBlock.appendChild(el('h2', null, 'Features'));
        const ul = el('ul', 'property-feature-tags');
        p.features.forEach(function(key) {
            const li = document.createElement('li');
            li.append(icon('fa-check'), document.createTextNode(' ' + (FEATURE_LABELS[key] || key)));
            ul.appendChild(li);
        });
        featuresBlock.appendChild(ul);
    }

    let amenitiesBlock = null;
    if (p.amenities && p.amenities.length) {
        amenitiesBlock = el('div', 'property-amenity-block');
        amenitiesBlock.appendChild(el('h2', null, 'Nearby'));
        const ul = el('ul', 'property-feature-tags');
        p.amenities.forEach(function(item) {
            const li = document.createElement('li');
            li.append(icon(item.icon), document.createTextNode(' ' + item.label));
            ul.appendChild(li);
        });
        amenitiesBlock.appendChild(ul);
    }

    const actions = el('div', 'property-actions');
    const contactLink = el('a', 'btn btn-primary');
    contactLink.href = 'contact.html?subject=property-inquiry&property=' + encodeURIComponent(p.title);
    contactLink.append(icon('fa-envelope'), document.createTextNode(' Enquire about this property'));
    const shareBtn = el('button', 'btn btn-outline');
    shareBtn.type = 'button';
    shareBtn.className = 'btn btn-outline js-share';
    shareBtn.append(icon('fa-share-nodes'), document.createTextNode(' Share'));
    actions.append(contactLink, shareBtn);

    content.append(title, address, featureList, description, specs);
    if (featuresBlock) content.appendChild(featuresBlock);
    if (amenitiesBlock) content.appendChild(amenitiesBlock);
    content.appendChild(actions);

    // ---- sidebar ----
    const sidebar = el('aside', 'property-sidebar');
    sidebar.id = 'contact-agent';
    const priceBox = el('div', 'property-price');
    priceBox.appendChild(el('span', 'price', price));
    const viewingBtn = el('a', 'btn btn-primary');
    viewingBtn.href = 'contact.html?subject=schedule-viewing&property=' + encodeURIComponent(p.title);
    viewingBtn.textContent = 'Schedule a viewing';
    priceBox.appendChild(viewingBtn);
    sidebar.appendChild(priceBox);

    if (agent) {
        const agentBox = el('div', 'agent-contact');
        const photo = document.createElement('img');
        photo.className = 'agent-photo';
        photo.src = agent.photo;
        photo.alt = agent.name;
        photo.width = 120;
        photo.height = 120;
        photo.loading = 'lazy';
        photo.decoding = 'async';

        const info = el('div', 'agent-info');
        info.appendChild(el('h3', null, agent.name));
        info.appendChild(el('span', null, agent.title));
        const email = el('a', 'agent-email');
        email.href = 'mailto:' + agent.email;
        email.append(icon('fa-envelope'), document.createTextNode(' ' + agent.email));
        const phone = el('a', 'agent-phone');
        phone.href = 'tel:' + agent.phone;
        phone.append(icon('fa-phone'), document.createTextNode(' ' + agent.phoneDisplay));
        info.append(email, phone);

        agentBox.append(photo, info);
        sidebar.appendChild(agentBox);
    }

    details.append(content, sidebar);

    // ---- similar properties ----
    const similar = el('section', 'similar-properties');
    similar.appendChild(el('h2', null, 'Similar properties'));
    const carousel = el('div', 'similar-carousel');
    H.properties
        .filter(function(other) { return other.id !== p.id; })
        .sort(function(a, b) {
            return Math.abs(a.price - p.price) - Math.abs(b.price - p.price);
        })
        .slice(0, 3)
        .forEach(function(other) {
            const card = el('article', 'similar-card');
            const img = document.createElement('img');
            img.src = other.images[0].src;
            img.alt = other.images[0].alt;
            img.width = 400;
            img.height = 300;
            img.loading = 'lazy';
            img.decoding = 'async';
            const h3 = el('h3', null, other.title);
            const priceEl = el('span', null, H.formatPrice(other.price));
            const link = el('a', 'btn btn-outline');
            link.href = 'property-single.html?id=' + other.id;
            link.textContent = 'View Details';
            link.setAttribute('aria-label', 'View details for ' + other.title);
            card.append(img, h3, priceEl, link);
            carousel.appendChild(card);
        });
    similar.appendChild(carousel);

    const more = el('div', 'view-more-similar');
    const moreLink = el('a', 'btn btn-primary');
    moreLink.href = 'properties.html';
    moreLink.textContent = 'View all properties';
    more.appendChild(moreLink);
    similar.appendChild(more);

    root.append(crumbs, hero, details, similar);

    // Share uses the native sheet where available, clipboard otherwise.
    shareBtn.addEventListener('click', function() {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({ title: p.title, url: url }).catch(function() { /* dismissed */ });
            return;
        }
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(function() {
                shareBtn.textContent = 'Link copied';
                setTimeout(function() {
                    shareBtn.textContent = '';
                    shareBtn.append(icon('fa-share-nodes'), document.createTextNode(' Share'));
                }, 2000);
            });
        }
    });

    tourBtn.addEventListener('click', function() {
        window.location.href = 'contact.html?subject=schedule-viewing&property=' + encodeURIComponent(p.title);
    });

    initPropertyGallery();
    initPropertyStructuredData(p, agent);
}

/**
 * Emit JSON-LD for the listing that is actually on screen.
 */
function initPropertyStructuredData(p, agent) {
    const existing = document.getElementById('propertyJsonLd');
    if (existing) existing.remove();

    const data = {
        '@context': 'https://schema.org',
        '@type': 'SingleFamilyResidence',
        name: p.title,
        description: p.description,
        numberOfRooms: p.beds,
        numberOfBathroomsTotal: p.baths,
        floorSize: { '@type': 'QuantitativeValue', value: p.sqft, unitCode: 'FTK' },
        address: {
            '@type': 'PostalAddress',
            streetAddress: p.address.split(',')[0].trim(),
            addressLocality: p.city,
            addressRegion: p.state,
            addressCountry: 'US'
        },
        photo: p.images.map(function(image) {
            return new URL(image.src, window.location.href).href;
        })
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'propertyJsonLd';
    script.textContent = JSON.stringify(data, null, 2);
    document.head.appendChild(script);
}

/**
 * FAQ accordion, shared by the services and contact pages.
 */
function initFaqAccordion() {
    const items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(function(item, index) {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (!question || !answer) return;

        // The question ships as a <div>; give it real button semantics.
        const answerId = 'faq-answer-' + index;
        answer.id = answerId;
        question.setAttribute('role', 'button');
        question.setAttribute('tabindex', '0');
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('aria-controls', answerId);

        function setOpen(open) {
            item.classList.toggle('active', open);
            question.setAttribute('aria-expanded', open ? 'true' : 'false');
            answer.style.maxHeight = open ? answer.scrollHeight + 'px' : null;
            const toggle = item.querySelector('.faq-toggle');
            if (toggle) {
                toggle.innerHTML = open
                    ? '<i class="fa-solid fa-minus" aria-hidden="true"></i>'
                    : '<i class="fa-solid fa-plus" aria-hidden="true"></i>';
            }
        }

        function activate() {
            const willOpen = !item.classList.contains('active');
            items.forEach(function(other) {
                if (other !== item && other.classList.contains('active')) {
                    other.classList.remove('active');
                    const otherAnswer = other.querySelector('.faq-answer');
                    const otherQuestion = other.querySelector('.faq-question');
                    const otherToggle = other.querySelector('.faq-toggle');
                    if (otherAnswer) otherAnswer.style.maxHeight = null;
                    if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
                    if (otherToggle) otherToggle.innerHTML = '<i class="fa-solid fa-plus" aria-hidden="true"></i>';
                }
            });
            setOpen(willOpen);
        }

        question.addEventListener('click', activate);
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activate();
            }
        });
    });

    // An open answer measured at one width is the wrong height at another.
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            document.querySelectorAll('.faq-item.active .faq-answer').forEach(function(answer) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            });
        }, 150);
    });
}

/**
 * Submits a form to Netlify Forms over fetch, so the visitor stays on the page.
 * Netlify accepts a URL-encoded POST to any path on the site; the form-name
 * hidden field tells it which form the submission belongs to.
 */
function postToNetlify(form) {
    const body = new URLSearchParams(new FormData(form)).toString();
    return fetch(form.getAttribute('action') || '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
    }).then(function(response) {
        if (!response.ok) throw new Error('Netlify responded ' + response.status);
        return response;
    });
}

/**
 * True when the page is not being served over http(s) - opened straight from
 * disk, for example. Netlify Forms cannot work there, and we say so rather than
 * reporting a success that never happened.
 */
function isOfflinePreview() {
    return window.location.protocol !== 'http:' && window.location.protocol !== 'https:';
}

/**
 * Newsletter signup: validates locally, then submits to Netlify Forms.
 */
function initNewsletterForm() {
    document.querySelectorAll('.newsletter-form').forEach(function(form) {
        const input = form.querySelector('input[type="email"]');
        if (!input) return;

        let feedback = form.querySelector('.newsletter-feedback');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'newsletter-feedback';
            feedback.setAttribute('role', 'status');
            feedback.setAttribute('aria-live', 'polite');
            form.appendChild(feedback);
        }

        const button = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const value = input.value.trim();
            const valid = EMAIL_PATTERN.test(value);

            if (!valid) {
                feedback.textContent = 'Please enter a valid email address.';
                feedback.classList.add('is-error');
                input.setAttribute('aria-invalid', 'true');
                input.focus();
                return;
            }

            feedback.classList.remove('is-error');
            input.removeAttribute('aria-invalid');

            if (isOfflinePreview()) {
                feedback.textContent = 'Newsletter signup starts working once the site is deployed.';
                return;
            }

            feedback.textContent = 'Subscribing...';
            if (button) button.disabled = true;

            postToNetlify(form).then(function() {
                feedback.textContent = 'Thanks - you are on the list.';
                form.reset();
            }).catch(function() {
                feedback.classList.add('is-error');
                feedback.textContent = 'Sorry, that did not go through. Please email info@horizonproperties.com.';
            }).then(function() {
                if (button) button.disabled = false;
            });
        });
    });
}

/**
 * Contact form: field-level validation, then a real submission to Netlify.
 * Nothing reports success unless the POST actually succeeded.
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const message = form.querySelector('.form-message');
    const loader = form.querySelector('.submit-loader');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Prefill subject and property from links such as
    // contact.html?subject=schedule-viewing&property=Luxury%20Beachfront%20Villa
    const params = new URLSearchParams(window.location.search);
    const subject = params.get('subject');
    const subjectField = form.querySelector('#subject');
    if (subject && subjectField && subjectField.querySelector('option[value="' + subject + '"]')) {
        subjectField.value = subject;
    }

    const property = params.get('property');
    const propertyField = form.querySelector('#property');
    const propertyGroup = document.getElementById('propertyFieldGroup');
    if (property && propertyField && propertyGroup) {
        propertyField.value = property;
        propertyGroup.hidden = false;
        const messageField = form.querySelector('#message');
        if (messageField && !messageField.value) {
            messageField.value = 'I would like to know more about ' + property + '.';
        }
    }

    function fieldError(field, text) {
        const group = field.closest('.form-group');
        if (!group) return;
        let hint = group.querySelector('.field-error');
        if (!text) {
            if (hint) hint.remove();
            field.removeAttribute('aria-invalid');
            field.removeAttribute('aria-describedby');
            return;
        }
        if (!hint) {
            hint = document.createElement('p');
            hint.className = 'field-error';
            hint.id = field.id + '-error';
            group.appendChild(hint);
        }
        hint.textContent = text;
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', hint.id);
    }

    function validate() {
        const problems = [];
        const check = function(id, isBad, text) {
            const field = form.querySelector('#' + id);
            if (!field) return;
            if (isBad(field)) {
                fieldError(field, text);
                problems.push(field);
            } else {
                fieldError(field, null);
            }
        };

        check('name', function(f) { return f.value.trim().length < 2; },
              'Please enter your name.');
        check('email', function(f) { return !EMAIL_PATTERN.test(f.value.trim()); },
              'Please enter a valid email address.');
        check('phone', function(f) { return f.value.trim() !== '' && !PHONE_PATTERN.test(f.value.trim()); },
              'Please enter a valid phone number, or leave this blank.');
        check('subject', function(f) { return !f.value; },
              'Please choose a subject.');
        check('message', function(f) { return f.value.trim().length < 10; },
              'Please tell us a little more (at least 10 characters).');
        check('privacy', function(f) { return !f.checked; },
              'Please accept the privacy policy to continue.');

        return problems;
    }

    // Clear a field's error as soon as the visitor corrects it.
    form.addEventListener('input', function(e) {
        if (e.target.getAttribute('aria-invalid') === 'true') fieldError(e.target, null);
    });
    form.addEventListener('change', function(e) {
        if (e.target.getAttribute('aria-invalid') === 'true') fieldError(e.target, null);
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const problems = validate();
        if (problems.length) {
            message.className = 'form-message is-error';
            message.textContent = problems.length === 1
                ? 'Please correct the highlighted field.'
                : 'Please correct the ' + problems.length + ' highlighted fields.';
            problems[0].focus();
            return;
        }

        if (isOfflinePreview()) {
            message.className = 'form-message is-error';
            message.textContent = 'This form sends once the site is deployed to Netlify. It cannot submit from a local file preview.';
            return;
        }

        if (loader) loader.hidden = false;
        if (submitBtn) submitBtn.disabled = true;
        message.className = 'form-message';
        message.textContent = 'Sending your message...';

        postToNetlify(form).then(function() {
            message.className = 'form-message';
            message.innerHTML = '<span class="success-message">Thank you - your message has been sent. ' +
                'One of our agents will reply within one working day.</span>';
            form.reset();
            if (propertyGroup) propertyGroup.hidden = true;
        }).catch(function() {
            message.className = 'form-message is-error';
            message.innerHTML = 'We could not send your message. Please call ' +
                '<a href="tel:+15551234567">(555) 123-4567</a> or email ' +
                '<a href="mailto:info@horizonproperties.com">info@horizonproperties.com</a>.';
        }).then(function() {
            if (loader) loader.hidden = true;
            if (submitBtn) submitBtn.disabled = false;
        });
    });
}

/**
 * Homepage hero search: hand the chosen criteria to the properties page.
 */
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-form');
    if (!searchForm) return;

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const params = new URLSearchParams();
        const add = function(key, id) {
            const el = document.getElementById(id);
            if (el && el.value) params.set(key, el.value);
        };
        add('location', 'location');
        add('type', 'property-type');
        add('price', 'price-range');
        add('beds', 'bedrooms');

        const query = params.toString();
        window.location.href = 'properties.html' + (query ? '?' + query : '');
    });
});
