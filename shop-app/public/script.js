const apiBase = '/api';

function formatCurrency(vnd) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(vnd);
}

async function loadProducts() {
  const res = await fetch(`${apiBase}/products`);
  const products = await res.json();
  const container = document.getElementById('product-list');
  container.innerHTML = '';
  for (const p of products) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.image || 'https://picsum.photos/seed/' + p.id + '/400/300'}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description || ''}</p>
      <div class="price">${formatCurrency(p.price)}</div>
      <div style="display:flex; gap:8px;">
        <a href="/product.html?id=${p.id}"><button>Chi tiết</button></a>
        <button data-id="${p.id}" data-name="${p.name}" data-price="${p.price}">Thêm vào giỏ</button>
      </div>
    `;
    container.appendChild(card);
  }

  container.addEventListener('click', async (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.textContent.includes('Thêm')) {
      const id = Number(e.target.getAttribute('data-id'));
      const name = e.target.getAttribute('data-name');
      const price = Number(e.target.getAttribute('data-price'));
      await addToCart({ id, name, price, quantity: 1 });
    }
  });
}

function getQueryParam(key) {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
}

async function loadProductDetail() {
  const id = getQueryParam('id');
  if (!id) {
    document.getElementById('product-detail').textContent = 'Không tìm thấy sản phẩm';
    return;
  }
  const res = await fetch(`${apiBase}/products/${id}`);
  if (!res.ok) {
    document.getElementById('product-detail').textContent = 'Không tìm thấy sản phẩm';
    return;
  }
  const p = await res.json();
  const wrap = document.getElementById('product-detail');
  wrap.innerHTML = `
    <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 16px;">
      <img src="${p.image || 'https://picsum.photos/seed/' + p.id + '/600/400'}" alt="${p.name}" style="width:100%; border-radius:8px;">
      <div>
        <h2>${p.name}</h2>
        <p>${p.description || ''}</p>
        <div class="price">${formatCurrency(p.price)}</div>
        <button id="btn-add">Thêm vào giỏ</button>
      </div>
    </div>
  `;
  document.getElementById('btn-add').addEventListener('click', async () => {
    await addToCart({ id: p.id, name: p.name, price: p.price, quantity: 1 });
  });
}

async function addToCart({ id, name, price, quantity }) {
  const res = await fetch(`${apiBase}/cart/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name, price, quantity })
  });
  if (res.ok) {
    alert('Đã thêm vào giỏ');
  } else {
    alert('Thêm thất bại');
  }
}

async function loadCart() {
  const res = await fetch(`${apiBase}/cart`);
  const { cart } = await res.json();

  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  let total = 0;
  for (const item of cart) {
    const div = document.createElement('div');
    const sub = item.price * item.quantity;
    total += sub;
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #eee;">
        <div>
          <strong>${item.name}</strong>
          <div>Giá: ${formatCurrency(item.price)}</div>
          <div>Số lượng: ${item.quantity}</div>
        </div>
        <div>${formatCurrency(sub)}</div>
      </div>
    `;
    container.appendChild(div);
  }
  document.getElementById('cart-total').textContent = 'Tổng: ' + formatCurrency(total);
}

async function clearCart() {
  const res = await fetch(`${apiBase}/cart/clear`, { method: 'POST' });
  if (res.ok) {
    await loadCart();
  }
}
