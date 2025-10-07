// Mobile navigation toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle')
  const navToggleMenuIcon = document.getElementById('nav-toggle-menu-icon')
  const navToggleCloseIcon = document.getElementById('nav-toggle-close-icon')
  const mobileNav = document.getElementById('mobile-nav')
  const navOverlay = document.getElementById('nav-overlay')

  let isNavOpen = false

  // Function to open navigation
  function openNav() {
    isNavOpen = true
    mobileNav.classList.remove('translate-x-full')
    mobileNav.classList.add('translate-x-0')
    navOverlay.classList.remove('opacity-0', 'pointer-events-none')
    navOverlay.classList.add('opacity-100', 'pointer-events-auto')
    document.body.style.overflow = 'hidden' // Prevent background scrolling

    // Show X icon, hide menu icon
    if (navToggleMenuIcon) {
      navToggleMenuIcon.classList.add('opacity-0')
    }
    if (navToggleCloseIcon) {
      navToggleCloseIcon.classList.remove('opacity-0')
    }
  }

  // Function to close navigation
  function closeNav() {
    isNavOpen = false
    mobileNav.classList.remove('translate-x-0')
    mobileNav.classList.add('translate-x-full')
    navOverlay.classList.remove('opacity-100', 'pointer-events-auto')
    navOverlay.classList.add('opacity-0', 'pointer-events-none')
    document.body.style.overflow = '' // Restore scrolling

    // Show menu icon, hide X icon
    if (navToggleMenuIcon) {
      navToggleMenuIcon.classList.remove('opacity-0')
    }
    if (navToggleCloseIcon) {
      navToggleCloseIcon.classList.add('opacity-0')
    }
  }

  // Toggle navigation when FAB is clicked
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      if (isNavOpen) {
        closeNav()
      } else {
        openNav()
      }
    })
  }

  // Close navigation when overlay is clicked
  if (navOverlay) {
    navOverlay.addEventListener('click', closeNav)
  }

  // Close navigation when escape key is pressed
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isNavOpen) {
      closeNav()
    }
  })

  // Close navigation on window resize to desktop size
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && isNavOpen) {
      // 768px is the md breakpoint
      closeNav()
    }
  })
})
