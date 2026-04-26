// TAB SWITCHING
function switchTab(section, tabId) {
  // Find all tab buttons and contents within the current page
  const activePage = document.querySelector('body'); // since no page div
  // Get all tab buttons in this section - find the clicked button
  const allBtns = activePage.querySelectorAll('.tab-btn');
  const allContents = activePage.querySelectorAll('.tab-content');

  // Find the content we want
  const targetContent = document.getElementById(section + '-tab-' + tabId);
  if (!targetContent) return;

  // Find the button that triggered this (by matching section+tabId)
  allBtns.forEach(btn => {
    if (btn.getAttribute('onclick') === `switchTab('${section}', '${tabId}')`) {
      // Find sibling buttons (in same .tabs container)
      const tabsContainer = btn.closest('.tabs');
      tabsContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
  });

  // Hide sibling tab contents
  const tabGroup = section + '-tab-';
  allContents.forEach(content => {
    if (content.id && content.id.startsWith(tabGroup)) {
      content.classList.remove('active');
    }
  });

  targetContent.classList.add('active');
}

// FAQ ACCORDION
function toggleFAQ(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');

  // Close all
  document.querySelectorAll('.faq-question').forEach(q => {
    q.classList.remove('open');
    q.nextElementSibling.style.maxHeight = null;
  });

  // Open this one if it was closed
  if (!isOpen) {
    btn.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

// FAQ SEARCH
function filterFAQs(query) {
  const q = query.toLowerCase();
  document.querySelectorAll('.faq-item').forEach(item => {
    const text = item.querySelector('.faq-question').textContent.toLowerCase() + ' ' + (item.dataset.q || '');
    item.style.display = text.includes(q) ? 'block' : 'none';
  });
}

// FORM SUBMISSION
function showConfirmation() {
  const conf = document.getElementById('confirmationTravel');
  if (conf) {
    conf.classList.add('show');
    conf.scrollIntoView({ behavior: 'smooth' });
  }
}

function hideConfirmation(id) {
  document.getElementById(id).classList.remove('show');
}

function submitContact() {
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('confirmationAsk').classList.add('show');
}

function resetContact() {
  document.getElementById('contactForm').style.display = 'block';
  document.getElementById('confirmationAsk').classList.remove('show');
}

// HAMBURGER MENU
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// NAV SCROLL EFFECT
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Responsive: two-col FAQ layout on small screens
function checkResponsive() {
  const grid = document.querySelector('#page-ask .content-area > div');
  if (grid) {
    if (window.innerWidth < 900) {
      grid.style.gridTemplateColumns = '1fr';
    } else {
      grid.style.gridTemplateColumns = '1fr 1fr';
    }
  }
}

window.addEventListener('resize', checkResponsive);
checkResponsive();