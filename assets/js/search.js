/**
 * ==============================================================================
 * FILE: /assets/js/search.js
 * PROJECT: mobikom.bg — Master Institutional Portal
 * LICENSE: MIT (https://opensource.org/licenses/MIT)
 * AUTHOR: Stoyan Stoyanov / Mobikom Bulgaria (mobikom.bg)
 * STANDARDS: Vanilla ECMAScript • WAI-ARIA 1.2 • Strict CSP Level 3 Compliant
 * PERFORMANCE: Zero Layout Reflows (textContent) • Precomputed Index • Zero Dependencies
 * ==============================================================================
 * DESCRIPTION:
 * Ultra-lightweight, battery-friendly client-side search engine featuring:
 * 1. Bidirectional phonetic transliteration (Bulgarian Cyrillic <-> Latin).
 * 2. Multi-token AND logic (e.g., "добрич news" matches both tokens simultaneously).
 * 3. Native CSS Subgrid compatibility (cleanly collapses hidden card tracks).
 * 4. Screen-reader live updates via role="status" and aria-live="polite".
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const cardsGrid = document.getElementById('cards-grid');

  // Gracefully exit if search interface elements are not present on the page
  if (!searchInput || !cardsGrid) return;

  const cards = Array.from(cardsGrid.querySelectorAll('.feature-card'));
  if (cards.length === 0) return;

  /* ==========================================================================
     1. Transliteration Dictionaries (Bulgarian Transliteration Law / ISO 9)
     ========================================================================== */
  const bgToEnMap = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
    'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
    'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sht', 'ъ': 'a', 'ь': 'y',
    'ю': 'yu', 'я': 'ya'
  };

  const enToBgDigraphs = [
    ['sht', 'щ'], ['zh', 'ж'], ['ch', 'ч'], ['sh', 'ш'],
    ['yu', 'ю'], ['ya', 'я'], ['ts', 'ц']
  ];

  const enToBgSingle = {
    'a': 'а', 'b': 'б', 'v': 'в', 'w': 'в', 'g': 'г', 'd': 'д', 'e': 'е',
    'z': 'з', 'i': 'и', 'j': 'й', 'k': 'к', 'l': 'л', 'm': 'м', 'n': 'н',
    'o': 'о', 'p': 'п', 'r': 'р', 's': 'с', 't': 'т', 'u': 'у', 'f': 'ф',
    'h': 'х', 'c': 'к', 'y': 'й', 'q': 'к', 'x': 'кс'
  };

  /**
   * Generates both Latin and Cyrillic phonetic variants for a given search token.
   * @param {string} term Single search word
   * @returns {string[]} Array of unique phonetic string variants
   */
  function getBilingualVariants(term) {
    const variants = new Set([term]);

    // Cyrillic -> Latin pass
    let toLatin = term;
    for (const [cyr, lat] of Object.entries(bgToEnMap)) {
      toLatin = toLatin.replaceAll(cyr, lat);
    }
    variants.add(toLatin);

    // Latin -> Cyrillic pass
    let toCyrillic = term;
    for (const [lat, cyr] of enToBgDigraphs) {
      toCyrillic = toCyrillic.replaceAll(lat, cyr);
    }
    for (const [lat, cyr] of Object.entries(enToBgSingle)) {
      toCyrillic = toCyrillic.replaceAll(lat, cyr);
    }
    variants.add(toCyrillic);

    return Array.from(variants);
  }

  /* ==========================================================================
     2. Pre-index Cards (Zero Reflow: textContent instead of innerText)
     ========================================================================== */
  const cardIndex = cards.map(card => {
    const dataMeta = card.getAttribute('data-searchable') || '';
    const visibleText = card.textContent || '';
    const combinedIndex = `${dataMeta} ${visibleText}`.toLowerCase();
    return {
      element: card,
      content: combinedIndex
    };
  });

  /* ==========================================================================
     3. Accessible Empty State Node (Subgrid & WAI-ARIA Compliant)
     ========================================================================== */
  let noResults = document.getElementById('search-empty-msg');
  if (!noResults) {
    noResults = document.createElement('p');
    noResults.id = 'search-empty-msg';
    noResults.setAttribute('role', 'status');
    noResults.setAttribute('aria-live', 'polite');
    noResults.style.display = 'none';
    noResults.style.gridColumn = '1 / -1';
    noResults.style.textAlign = 'center';
    noResults.style.padding = '2.5rem 1rem';
    noResults.style.color = 'var(--muted)';
    noResults.style.fontSize = '1.05rem';
    noResults.textContent = 'No matching platforms found. / Няма намерени резултати.';
    cardsGrid.appendChild(noResults);
  }

  /* ==========================================================================
     4. High-Performance Input Listener (Sub-Millisecond Keystroke Response)
     ========================================================================== */
  let animationFrameId = null;

  searchInput.addEventListener('input', (e) => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    animationFrameId = requestAnimationFrame(() => {
      const rawQuery = e.target.value.toLowerCase().trim();

      // If search input is cleared, restore all cards immediately
      if (!rawQuery) {
        for (let i = 0; i < cardIndex.length; i++) {
          cardIndex[i].element.style.display = '';
        }
        noResults.style.display = 'none';
        return;
      }

      // Split query into discrete words: "добрич news" -> ["добрич", "news"]
      const queryTokens = rawQuery.split(/\s+/).filter(Boolean);

      // Precompute bilingual variants ONCE per keystroke (prevents N x T loop overhead)
      const tokenVariantsList = queryTokens.map(getBilingualVariants);
      let visibleCount = 0;

      // Single-pass evaluation against the precomputed card index
      for (let i = 0; i < cardIndex.length; i++) {
        const item = cardIndex[i];

        // Multi-token AND logic: Card must match EVERY query token
        const matchesAllTokens = tokenVariantsList.every(variants =>
          variants.some(variant => item.content.includes(variant))
        );

        if (matchesAllTokens) {
          item.element.style.display = '';
          visibleCount++;
        } else {
          item.element.style.display = 'none'; // Subgrid cleanly collapses hidden tracks
        }
      }

      // Toggle accessible empty-state notification
      noResults.style.display = visibleCount === 0 ? '' : 'none';
    });
  }, { passive: true });
});
