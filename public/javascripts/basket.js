const BASKET_KEY = 'ff_basket';

function getBasket() {
  try { return JSON.parse(localStorage.getItem(BASKET_KEY)) || []; }
  catch { return []; }
}

function saveBasket(items) {
  localStorage.setItem(BASKET_KEY, JSON.stringify(items));
}

function addToBasket(product) {
  const basket = getBasket();
  const existing = basket.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    basket.push({ ...product, qty: 1 });
  }
  saveBasket(basket);
}

function removeFromBasket(id) {
  saveBasket(getBasket().filter(item => item.id !== id));
}

function updateQty(id, qty) {
  const basket = getBasket();
  const item = basket.find(i => i.id === id);
  if (item) item.qty = qty;
  saveBasket(basket);
}

function updateBasketCount() {
  const badge = document.getElementById('basket-count');
  if (!badge) return;
  const total = getBasket().reduce((sum, i) => sum + i.qty, 0);
  badge.textContent = total > 0 ? total : '';
}

// --- Knappar på produkt-/kategorisidor ---
function initBasketButtons() {
  document.querySelectorAll('.basket-btn, .add-to-cart').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const product = {
        id:    this.dataset.id,
        name:  this.dataset.name,
        price: Number(this.dataset.price),
        image: this.dataset.image,
      };
      addToBasket(product);
      updateBasketCount();
      this.textContent = 'Tillagd ✓';
      setTimeout(() => { this.textContent = 'Lägg till i varukorg'; }, 1500);
    });
  });
}

// --- Varukorgsidan ---
function renderBasketPage() {
  const tbody = document.getElementById('cart-tbody');
  const totalEl = document.getElementById('cart-total');
  if (!tbody) return;

  const basket = getBasket();

  if (!basket.length) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;padding:2rem;">Varukorgen är tom.</td></tr>';
    if (totalEl) totalEl.textContent = '0 kr';
    return;
  }

  tbody.innerHTML = basket.map(item => `
    <tr data-id="${item.id}">
      <td>${item.name}</td>
      <td>${item.price} kr</td>
      <td>${item.price * item.qty} kr</td>
      <td>
        <select class="qty-select" data-id="${item.id}">
          ${[1,2,3,4,5].map(n => `<option ${item.qty === n ? 'selected' : ''}>${n}</option>`).join('')}
        </select>
        <button class="remove-btn" data-id="${item.id}" style="margin-left:8px">✕</button>
      </td>
    </tr>
  `).join('');

  const total = basket.reduce((sum, i) => sum + i.price * i.qty, 0);
  if (totalEl) totalEl.textContent = total + ' kr';

  tbody.querySelectorAll('.qty-select').forEach(sel => {
    sel.addEventListener('change', function () {
      updateQty(this.dataset.id, Number(this.value));
      renderBasketPage();
    });
  });

  tbody.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      removeFromBasket(this.dataset.id);
      renderBasketPage();
      updateBasketCount();
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initBasketButtons();
  renderBasketPage();
  updateBasketCount();
});
