const STORAGE_KEY = 'ff_favorites';

function getFavorites() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveFavorites(favs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

function isFavorite(id) {
  return getFavorites().some(f => f.id === id);
}

function toggleFavorite(product) {
  const favs = getFavorites();
  const idx = favs.findIndex(f => f.id === product.id);
  if (idx === -1) favs.push(product);
  else favs.splice(idx, 1);
  saveFavorites(favs);
  return idx === -1;
}

// --- Product listing page ---
function initFavoriteButtons() {
  document.querySelectorAll('.favorite-btn[data-id]').forEach(btn => {
    const id = btn.dataset.id;
    if (isFavorite(id)) btn.classList.add('active');

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const product = {
        id:    this.dataset.id,
        name:  this.dataset.name,
        brand: this.dataset.brand,
        model: this.dataset.model,
        color: this.dataset.color,
        price: this.dataset.price,
        image: this.dataset.image,
      };
      const added = toggleFavorite(product);
      this.classList.toggle('active', added);
    });
  });
}

// --- Favorites page ---
function renderFavoritesPage() {
  const grid = document.getElementById('favorites-grid');
  if (!grid) return;

  const favs = getFavorites();
  if (!favs.length) {
    grid.innerHTML = '<p class="empty-favorites">Du har inga sparade favoriter än.</p>';
    return;
  }

  grid.innerHTML = favs.map(item => `
    <article class="fav-card">
      <div class="fav-img-wrap">
        <img src="${item.image}" alt="${item.name}">
        <button class="favorite-btn active"
          data-id="${item.id}" data-name="${item.name}"
          data-brand="${item.brand}" data-model="${item.model}"
          data-color="${item.color}" data-price="${item.price}"
          data-image="${item.image}" aria-label="Ta bort från favoriter">❤</button>
      </div>
      <div class="fav-info">
        <span class="fav-name">${item.color} ${item.model}</span>
        <p class="fav-sub">${item.brand}</p>
        <span class="fav-price">${item.price > 0 ? item.price + ' kr' : 'Kontakta oss'}</span>
      </div>
    </article>
  `).join('');

  initFavoriteButtons();
}

document.addEventListener('DOMContentLoaded', function () {
  initFavoriteButtons();
  renderFavoritesPage();
});
