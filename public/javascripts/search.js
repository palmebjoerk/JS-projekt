document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('search-input');
  const dropdown = document.getElementById('search-dropdown');
  if (!input || !dropdown) return;

  let debounceTimer;

  input.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    const q = this.value.trim();
    if (!q) { close(); return; }
    debounceTimer = setTimeout(() => fetchResults(q), 200);
  });

  document.addEventListener('click', function (e) {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) close();
  });

  function fetchResults(q) {
    fetch('/api/search?q=' + encodeURIComponent(q))
      .then(r => r.json())
      .then(items => {
        if (!items.length) { close(); return; }
        dropdown.innerHTML = items.map(item => `
          <li>
            <a href="/category/${encodeURIComponent(q)}">
              <img src="${item.image}" alt="${item.name}">
              <span class="result-name">${item.name}</span>
              <span class="result-price">${item.price > 0 ? item.price + ' kr' : 'Kontakta oss'}</span>
            </a>
          </li>
        `).join('');
        dropdown.classList.add('open');
      })
      .catch(() => close());
  }

  function close() {
    dropdown.classList.remove('open');
    dropdown.innerHTML = '';
  }
});
