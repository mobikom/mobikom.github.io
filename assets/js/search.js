/**
 * mobikom.bg — Bilingual Combination Search Engine
 * Native Vanilla JS • Multi-token AND logic • Bidirectional Transliteration
 * Zero External Dependencies • 100% CSP Level 3 Compliant
 */
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const cardsGrid = document.getElementById('cards-grid');
  if (!searchInput || !cardsGrid) return;

  const cards = Array.from(cardsGrid.querySelectorAll('.feature-card'));

  // 1. Transliteration Dictionaries (Bulgarian Official System / ISO 9)
  const bgToEnMap = {
    'а':'a', 'б':'b', 'в':'v', 'г':'g', 'д':'d', 'е':'e', 'ж':'zh',
    'з':'z', 'и':'i', 'й':'y', 'к':'k', 'л':'l', 'м':'m', 'н':'n',
    'о':'o', 'п':'p', 'р':'r', 'с':'s', 'т':'t', 'у':'u', 'ф':'f',
    'х':'h', 'ц':'ts', 'ч':'ch', 'ш':'sh', 'щ':'sht', 'ъ':'a', 'ь':'y',
    'ю':'yu', 'я':'ya'
  };

  const enToBgDigraphs = [
    ['sht', 'щ'], ['zh', 'ж'], ['ch', 'ч'], ['sh', 'ш'],
    ['yu', 'ю'], ['ya', 'я'], ['ts', 'ц']
  ];

  const enToBgSingle = {
    'a':'а', 'b':'б', 'v':'в', 'w':'в', 'g':'г', 'd':'д', 'e':'е',
    'z':'з', 'i':'и', 'j':'й', 'k':'к', 'l':'л', 'm':'м', 'n':'н',
    'o':'о', 'п':'p', 'r':'р', 's':'с', 't':'т', 'u':'у', 'f':'ф',
    'h':'х', 'c':'к', 'y':'й', 'q':'к', 'x':'кс'
  };

  // Convert term into both Cyrillic and Latin phonetic variants
  function getBilingualVariants(term) {
    const variants = new Set([term]);

    // Cyrillic -> Latin
    let toLatin = term;
    for (const [cyr, lat] of Object.entries(bgToEnMap)) {
      toLatin = toLatin.replaceAll(cyr, lat);
    }
    variants.add(toLatin);

    // Latin -> Cyrillic
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

  // 2. Pre-index each card once on load for fast querying
  const cardIndex = cards.map(card => {
    const dataMeta = card.getAttribute('data-searchable') || '';
    const visibleText = card.innerText || '';
    const combinedIndex = `${dataMeta} ${visibleText}`.toLowerCase();
    return { element: card, content: combinedIndex };
  });

  // Create an accessible "No results" message node if it does not exist
  let noResults = document.getElementById('search-empty-msg');
  if (!noResults) {
    noResults = document.createElement('p');
    noResults.id = 'search-empty-msg';
    noResults.style.display = 'none';
    noResults.style.gridColumn = '1 / -1';
    noResults.style.textAlign = 'center';
    noResults.style.padding = '2.5rem 1rem';
    noResults.style.color = 'var(--text-muted)';
    noResults.style.fontSize = '1.05rem';
    noResults.textContent = 'No matching platforms found. / Няма намерени резултати.';
    cardsGrid.appendChild(noResults);
  }

  // 3. Multi-token combination search listener
  searchInput.addEventListener('input', (e) => {
    const rawQuery = e.target.value.toLowerCase().trim();

    if (!rawQuery) {
      cardIndex.forEach(item => { item.element.style.display = ''; });
      noResults.style.display = 'none';
      return;
    }

    // Split input into individual tokens (e.g. "добрич news" -> ["добрич", "news"])
    const queryTokens = rawQuery.split(/\s+/).filter(Boolean);
    let visibleCount = 0;

    cardIndex.forEach(item => {
      // Card must match EVERY token in the query (AND logic)
      const matchesAllTokens = queryTokens.every(token => {
        const variants = getBilingualVariants(token);
        // Matches if ANY phonetic variant exists in card content
        return variants.some(variant => item.content.includes(variant));
      });

      if (matchesAllTokens) {
        item.element.style.display = '';
        visibleCount++;
      } else {
        item.element.style.display = 'none';
      }
    });

    noResults.style.display = visibleCount === 0 ? '' : 'none';
  }, { passive: true });
});
