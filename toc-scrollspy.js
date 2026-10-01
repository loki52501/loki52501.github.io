// TOC Scroll-Spy - Highlights the active section in the table of contents
(function() {
    'use strict';

    // Only run if TOC exists on the page
    const toc = document.querySelector('.toc');
    if (!toc) return;

    const tocLinks = Array.from(toc.querySelectorAll('a[href^="#"]'));
    if (tocLinks.length === 0) return;

    // Get all heading elements that are linked in the TOC
    const headingIds = tocLinks.map(link => link.getAttribute('href').substring(1));
    const headings = headingIds
        .map(id => document.getElementById(id))
        .filter(heading => heading !== null);

    if (headings.length === 0) return;

    let activeLink = null;
    let isScrolling = false;
    let scrollTimeout;

    // Function to set active link
    function setActiveLink(link) {
        if (activeLink === link) return;

        // Remove active class from all links
        tocLinks.forEach(l => l.classList.remove('active'));

        // Add active class to current link
        if (link) {
            link.classList.add('active');
            activeLink = link;

            // Scroll TOC to show active link (if it's outside viewport)
            const tocNav = toc.querySelector('nav');
            if (tocNav && link) {
                const linkRect = link.getBoundingClientRect();
                const navRect = tocNav.getBoundingClientRect();

                // Check if link is outside the visible area of TOC nav
                if (linkRect.top < navRect.top || linkRect.bottom > navRect.bottom) {
                    link.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        }
    }

    // Find which heading is currently most visible
    function updateActiveLink() {
        if (isScrolling) return;

        // Get viewport middle point for better UX
        const viewportMiddle = window.innerHeight / 2;
        const scrollTop = window.scrollY || window.pageYOffset;

        let currentHeading = null;
        let minDistance = Infinity;

        // Find the heading closest to the top of the viewport
        for (let i = 0; i < headings.length; i++) {
            const heading = headings[i];
            const rect = heading.getBoundingClientRect();
            const headingTop = rect.top + scrollTop;

            // Calculate distance from scroll position
            const distance = Math.abs(headingTop - scrollTop - 100); // 100px offset for better feel

            // If heading is above middle of viewport and closest so far
            if (rect.top < viewportMiddle && distance < minDistance) {
                minDistance = distance;
                currentHeading = heading;
            }
        }

        // If no heading is above middle, use the first one
        if (!currentHeading && headings.length > 0) {
            // Check if we're at the very top of the page
            if (scrollTop < headings[0].offsetTop) {
                currentHeading = headings[0];
            }
        }

        // Find the corresponding TOC link
        if (currentHeading) {
            const headingId = currentHeading.getAttribute('id');
            const correspondingLink = tocLinks.find(link =>
                link.getAttribute('href') === '#' + headingId
            );
            setActiveLink(correspondingLink);
        }
    }

    // Throttled scroll handler
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }

        // Clear existing timeout
        clearTimeout(scrollTimeout);

        // Set scrolling flag
        isScrolling = true;

        // Reset scrolling flag after scroll ends
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 100);
    }

    // Smooth scroll to heading when TOC link is clicked
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetHeading = document.getElementById(targetId);

            if (targetHeading) {
                // Disable scroll spy temporarily during programmatic scroll
                isScrolling = true;

                // Immediately set this as active
                setActiveLink(link);

                // Scroll to the heading
                const targetPosition = targetHeading.offsetTop - 100; // 100px offset from top
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Re-enable scroll spy after animation
                setTimeout(() => {
                    isScrolling = false;
                    updateActiveLink();
                }, 1000);
            }
        });
    });

    // Initialize
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateActiveLink, { passive: true });

    // Set initial active link
    updateActiveLink();
})();
