/* ============================================================
   PRODUCTS PAGE — filter, expanding dossier, tabs, gallery
   ============================================================ */

const catalogGrid = document.getElementById('catalogGrid');
const filterButtons = document.querySelectorAll('.toggle-group button');
const resultCount = document.getElementById('resultCount');

function updateResultCount() {
  if (!resultCount) return;
  const visible = document.querySelectorAll('.catalog-card:not([style*="display: none"])').length;
  resultCount.textContent = visible + ' MODEL' + (visible === 1 ? '' : 'S') + ' SHOWN';
}

// filter
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.catalog-card').forEach(card => {
      const match = filter === 'all' || card.dataset.type === filter;
      card.style.display = match ? '' : 'none';
      const dossier = document.getElementById('dossier-' + card.dataset.id);
      if (dossier) {
        dossier.classList.remove('open');
        if (!match) dossier.style.display = 'none';
        else dossier.style.display = '';
      }
    });
    updateResultCount();
  });
});

// expand / collapse dossier on card click
if (catalogGrid) {
  catalogGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.catalog-card');
    if (!card) return;
    const id = card.dataset.id;
    const dossier = document.getElementById('dossier-' + id);
    if (!dossier) return;

    const isOpen = dossier.classList.contains('open');

    // close all other dossiers
    document.querySelectorAll('.dossier-row.open').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.catalog-card.selected').forEach(c => c.classList.remove('selected'));

    if (!isOpen) {
      dossier.classList.add('open');
      card.classList.add('selected');
      setTimeout(() => {
        dossier.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 120);
    }
  });
}

// dossier close buttons, tabs, thumbnails (event delegation on document)
document.addEventListener('click', (e) => {
  // close button
  const closeBtn = e.target.closest('.dossier-close');
  if (closeBtn) {
    const row = closeBtn.closest('.dossier-row');
    row.classList.remove('open');
    const card = document.querySelector('.catalog-card[data-id="' + row.dataset.for + '"]');
    if (card) card.classList.remove('selected');
    return;
  }

  // tabs
  const tabBtn = e.target.closest('.dossier-tabs button');
  if (tabBtn) {
    const tabsWrap = tabBtn.closest('.dossier-tabs');
    const dossier = tabBtn.closest('.dossier');
    tabsWrap.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    tabBtn.classList.add('active');
    const target = tabBtn.dataset.tab;
    dossier.querySelectorAll('.dossier-pane').forEach(p => p.classList.remove('active'));
    dossier.querySelector('.dossier-pane[data-pane="' + target + '"]').classList.add('active');
    return;
  }

  // gallery thumbnails
  const thumbBtn = e.target.closest('.dossier-thumbs button');
  if (thumbBtn) {
    const thumbsWrap = thumbBtn.closest('.dossier-thumbs');
    const dossier = thumbBtn.closest('.dossier');
    thumbsWrap.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    thumbBtn.classList.add('active');
    const mainImg = dossier.querySelector('.dossier-gallery-main img');
    const thumbImg = thumbBtn.querySelector('img');
    if (mainImg && thumbImg) {
      mainImg.src = thumbImg.src;
      mainImg.alt = thumbImg.alt;
    }
    return;
  }
});

updateResultCount();
