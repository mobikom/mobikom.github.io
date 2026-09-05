document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  const cards = document.querySelectorAll('[data-searchable]');
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    cards.forEach((card) => {
      const text = card.getAttribute('data-searchable').toLowerCase();
      card.style.display = text.includes(term) ? '' : 'none';
    });
  }, { passive: true });
});
