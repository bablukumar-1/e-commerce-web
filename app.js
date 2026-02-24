// =============================================
// FLIPKART CLONE — MAIN APP ENGINE
// =============================================

// ---- State ----
const State = {
    cart: JSON.parse(localStorage.getItem('fk_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('fk_wishlist') || '[]'),
    currentCategory: 'all',
    currentSort: 'popular',
    currentView: 'grid',
    filters: { brands: [], minPrice: 0, maxPrice: 200000, minRating: 0 },
    searchQuery: '',

    save() {
        localStorage.setItem('fk_cart', JSON.stringify(this.cart));
        localStorage.setItem('fk_wishlist', JSON.stringify(this.wishlist));
    },
    cartCount() { return this.cart.reduce((s, i) => s + i.qty, 0); },
    wishlistCount() { return this.wishlist.length; },
    cartTotal() { return this.cart.reduce((s, i) => s + i.price * i.qty, 0); },
    cartOriginalTotal() { return this.cart.reduce((s, i) => s + i.originalPrice * i.qty, 0); },
    cartSavings() { return this.cartOriginalTotal() - this.cartTotal(); },

    addToCart(productId) {
        const p = PRODUCTS.find(x => x.id === productId);
        if (!p) return;
        const existing = this.cart.find(x => x.id === productId);
        if (existing) existing.qty += 1;
        else this.cart.push({ ...p, qty: 1 });
        this.save();
        updateHeaderCounts();
        showToast('Added to cart! 🛒', 'success');
    },
    removeFromCart(productId) {
        this.cart = this.cart.filter(x => x.id !== productId);
        this.save();
        updateHeaderCounts();
        showToast('Removed from cart', 'info');
    },
    updateQty(productId, delta) {
        const item = this.cart.find(x => x.id === productId);
        if (!item) return;
        item.qty = Math.max(1, item.qty + delta);
        this.save();
        renderCart();
        updateHeaderCounts();
    },
    toggleWishlist(productId) {
        const idx = this.wishlist.findIndex(x => x.id === productId);
        if (idx >= 0) {
            this.wishlist.splice(idx, 1);
            showToast('Removed from wishlist', 'info');
        } else {
            const p = PRODUCTS.find(x => x.id === productId);
            if (p) { this.wishlist.push(p); showToast('Added to wishlist ❤️', 'success'); }
        }
        this.save();
        updateHeaderCounts();
        return idx < 0;
    },
    isWishlisted(productId) { return this.wishlist.some(x => x.id === productId); },
    isInCart(productId) { return this.cart.some(x => x.id === productId); }
};

// ---- Toast ----
function showToast(msg, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
    container.appendChild(t);
    setTimeout(() => t.remove(), 3200);
}

// ---- Header Counts ----
function updateHeaderCounts() {
    document.querySelectorAll('.cart-count').forEach(el => { el.textContent = State.cartCount(); el.style.display = State.cartCount() > 0 ? 'flex' : 'none'; });
    document.querySelectorAll('.wishlist-count').forEach(el => { el.textContent = State.wishlistCount(); el.style.display = State.wishlistCount() > 0 ? 'flex' : 'none'; });
}

// ---- Format Price ----
function fmt(n) { return '₹' + n.toLocaleString('en-IN'); }
function pctOff(orig, curr) { return Math.round((1 - curr / orig) * 100); }

// ---- Star Rating HTML ----
function starHTML(rating) {
    const full = Math.floor(rating), half = rating % 1 >= 0.5;
    let s = '';
    for (let i = 0; i < full; i++) s += '⭐';
    if (half) s += '✨';
    return s;
}

// ---- Product Card ----
function productCardHTML(p, mini = false) {
    const wishlisted = State.isWishlisted(p.id);
    const inCart = State.isInCart(p.id);
    const off = pctOff(p.originalPrice, p.price);
    return `
  <div class="product-card" onclick="openProduct(${p.id})">
    <div class="card-img-wrap">
      <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x300?text=No+Image'">
      ${p.badge ? `<span class="card-badge">${p.badge}</span>` : ''}
      <div class="card-actions">
        <button class="card-action-btn ${wishlisted ? 'wishlisted' : ''}" onclick="event.stopPropagation();toggleWishlist(${p.id},this)" title="Wishlist">
          ${wishlisted ? '❤️' : '🤍'}
        </button>
        <button class="card-action-btn" onclick="event.stopPropagation();quickView(${p.id})" title="Quick View">👁️</button>
      </div>
    </div>
    <div class="card-body">
      <div class="card-brand">${p.brand}</div>
      <div class="card-title">${p.name}</div>
      <div class="card-rating">
        <span class="rating-badge">⭐ ${p.rating}</span>
        <span class="rating-count">(${p.reviews.toLocaleString()})</span>
      </div>
      <div class="card-price">
        <span class="price-current">${fmt(p.price)}</span>
        <span class="price-original">${fmt(p.originalPrice)}</span>
        <span class="price-off">${off}% off</span>
      </div>
      <button class="card-add-btn ${inCart ? 'added' : ''}" onclick="event.stopPropagation();handleAddToCart(${p.id},this)">
        ${inCart ? '✅ Added to Cart' : '🛒 Add to Cart'}
      </button>
    </div>
  </div>`;
}

function handleAddToCart(id, btn) {
    State.addToCart(id);
    btn.className = 'card-add-btn added';
    btn.textContent = '✅ Added to Cart';
}

function toggleWishlist(id, btn) {
    const added = State.toggleWishlist(id);
    btn.className = `card-action-btn ${added ? 'wishlisted' : ''}`;
    btn.textContent = added ? '❤️' : '🤍';
    // refresh wishlist page if open
    const wPage = document.getElementById('wishlistPage');
    if (wPage && !wPage.classList.contains('hidden')) renderWishlist();
}

// ---- Hero Banner ----
let heroIdx = 0, heroTimer;
function initHero() {
    const track = document.getElementById('heroTrack');
    const dots = document.getElementById('heroDots');
    if (!track || !HERO_SLIDES) return;
    track.innerHTML = HERO_SLIDES.map(s => `
    <div class="hero-slide">
      <img src="${s.img}" alt="${s.title}" loading="lazy">
      <div class="hero-slide-overlay">
        <div class="hero-slide-content">
          <span class="hero-slide-tag">${s.tag}</span>
          <h1 class="hero-slide-title">${s.title}</h1>
          <p class="hero-slide-sub">${s.sub}</p>
          <button class="view-all-btn" onclick="filterCategory('electronics')">Shop Now →</button>
        </div>
      </div>
    </div>`).join('');
    dots.innerHTML = HERO_SLIDES.map((_, i) => `<div class="hero-dot ${i === 0 ? 'active' : ''}" onclick="goHero(${i})"></div>`).join('');
    startHeroTimer();
}
function goHero(idx) {
    heroIdx = (idx + HERO_SLIDES.length) % HERO_SLIDES.length;
    document.getElementById('heroTrack').style.transform = `translateX(-${heroIdx * 100}%)`;
    document.querySelectorAll('.hero-dot').forEach((d, i) => d.classList.toggle('active', i === heroIdx));
}
function startHeroTimer() { clearInterval(heroTimer); heroTimer = setInterval(() => goHero(heroIdx + 1), 4500); }

// ---- Category Nav ----
function initCatNav() {
    const nav = document.getElementById('catNav');
    if (!nav) return;
    nav.innerHTML = CATEGORIES.map(c => `
    <div class="cat-nav-item ${c.id === 'all' ? 'active' : ''}" onclick="filterCategory('${c.id}')">
      <span class="cat-icon">${c.icon}</span>
      <span>${c.name}</span>
    </div>`).join('');
}

function filterCategory(catId) {
    State.currentCategory = catId;
    document.querySelectorAll('.cat-nav-item').forEach((el, i) => el.classList.toggle('active', CATEGORIES[i]?.id === catId));
    showPage('products');
    renderProducts();
}

// ---- Flash Deal Timer ----
function initTimer() {
    const el = document.getElementById('dealTimer');
    if (!el) return;
    let end = new Date();
    end.setHours(23, 59, 59, 0);
    function tick() {
        const diff = end - new Date();
        if (diff <= 0) { el.textContent = 'Deal Ended!'; return; }
        const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
        const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
        const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
        el.innerHTML = `<div class="timer-blocks"><div class="timer-block">${h}</div><span class="timer-sep">:</span><div class="timer-block">${m}</div><span class="timer-sep">:</span><div class="timer-block">${s}</div></div>`;
    }
    tick(); setInterval(tick, 1000);
}

// ---- Home Page Sections ----
function renderHome() {
    // Featured categories
    const catGrid = document.getElementById('homeCatGrid');
    if (catGrid) {
        catGrid.innerHTML = CATEGORIES.slice(1).map(c => `
      <div class="h-scroll-inner" style="justify-content:center">
        <div class="cat-card" onclick="filterCategory('${c.id}')">
          <div class="cat-card-img" style="background:var(--primary-light);display:flex;align-items:center;justify-content:center;font-size:36px;">${c.icon}</div>
          <div class="cat-card-name">${c.name}</div>
        </div>
      </div>`).join('');
    }
    // Flash deals strip
    const flashStrip = document.getElementById('flashDealsStrip');
    if (flashStrip) {
        const deals = PRODUCTS.filter(p => p.tags.includes('deal') || p.badge);
        flashStrip.innerHTML = `<div class="h-scroll-inner">${deals.map(p => productCardHTML(p)).join('')}</div>`;
    }
    // Top picks
    const topPicks = document.getElementById('topPicksGrid');
    if (topPicks) {
        const picks = PRODUCTS.filter(p => p.rating >= 4.5).slice(0, 8);
        topPicks.innerHTML = picks.map(p => productCardHTML(p)).join('');
    }
    // Trending
    const trending = document.getElementById('trendingStrip');
    if (trending) {
        const tr = PRODUCTS.filter(p => p.tags.includes('trending'));
        trending.innerHTML = `<div class="h-scroll-inner">${tr.map(p => productCardHTML(p)).join('')}</div>`;
    }
    // Bestsellers
    const bestsellers = document.getElementById('bestsellersGrid');
    if (bestsellers) {
        const bs = PRODUCTS.filter(p => p.tags.includes('bestseller')).slice(0, 6);
        bestsellers.innerHTML = bs.map(p => productCardHTML(p)).join('');
    }
}

// ---- Products Listing Page ----
function getFilteredProducts() {
    let list = PRODUCTS.slice();
    if (State.currentCategory !== 'all') list = list.filter(p => p.category === State.currentCategory);
    if (State.searchQuery) {
        const q = State.searchQuery.toLowerCase();
        list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (State.filters.brands.length) list = list.filter(p => State.filters.brands.includes(p.brand));
    list = list.filter(p => p.price >= State.filters.minPrice && p.price <= State.filters.maxPrice);
    list = list.filter(p => p.rating >= State.filters.minRating);
    switch (State.currentSort) {
        case 'price_asc': list.sort((a, b) => a.price - b.price); break;
        case 'price_desc': list.sort((a, b) => b.price - a.price); break;
        case 'rating': list.sort((a, b) => b.rating - a.rating); break;
        case 'new': list.sort((a, b) => b.id - a.id); break;
        default: list.sort((a, b) => b.reviews - a.reviews);
    }
    return list;
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const info = document.getElementById('resultsInfo');
    if (!grid) return;
    const list = getFilteredProducts();
    info && (info.textContent = `Showing ${list.length} results`);
    if (!list.length) {
        grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-secondary)"><div style="font-size:60px;margin-bottom:16px">🔍</div><h3>No products found</h3><p>Try different filters or search terms</p></div>`;
        return;
    }
    grid.className = `products-grid ${State.currentView === 'list' ? 'list-view' : ''}`;
    grid.innerHTML = list.map(p => productCardHTML(p)).join('');
}

function renderFilterSidebar() {
    const sidebar = document.getElementById('filterSidebar');
    if (!sidebar) return;
    // Get brands for current category
    const catProds = State.currentCategory === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === State.currentCategory);
    const brands = [...new Set(catProds.map(p => p.brand))];
    const ratings = [4, 3, 2, 1];
    sidebar.innerHTML = `
    <div class="filter-title">Filters <span class="filter-clear" onclick="clearFilters()">Clear All</span></div>
    <div class="filter-group">
      <div class="filter-group-title">Price Range</div>
      <div class="price-range">
        <input type="range" min="0" max="200000" step="500" value="${State.filters.maxPrice}" id="priceRange" oninput="updatePriceFilter(this.value)">
        <div class="price-range-labels"><span>₹0</span><span id="priceRangeVal">Up to ${fmt(State.filters.maxPrice)}</span></div>
      </div>
    </div>
    <div class="filter-group">
      <div class="filter-group-title">Brand</div>
      ${brands.map(b => `
        <label class="filter-option">
          <input type="checkbox" ${State.filters.brands.includes(b) ? 'checked' : ''} onchange="toggleBrandFilter('${b}',this.checked)">
          <span>${b}</span>
        </label>`).join('')}
    </div>
    <div class="filter-group">
      <div class="filter-group-title">Customer Rating</div>
      ${ratings.map(r => `
        <label class="filter-option">
          <input type="radio" name="ratingFilter" ${State.filters.minRating === r ? 'checked' : ''} onchange="updateRatingFilter(${r})">
          <span>${'⭐'.repeat(r)} & above</span>
        </label>`).join('')}
    </div>`;
}

function updatePriceFilter(val) {
    State.filters.maxPrice = +val;
    document.getElementById('priceRangeVal').textContent = `Up to ${fmt(+val)}`;
    renderProducts();
}
function toggleBrandFilter(brand, checked) {
    if (checked) State.filters.brands.push(brand);
    else State.filters.brands = State.filters.brands.filter(b => b !== brand);
    renderProducts();
}
function updateRatingFilter(r) { State.filters.minRating = r; renderProducts(); }
function clearFilters() {
    State.filters = { brands: [], minPrice: 0, maxPrice: 200000, minRating: 0 };
    renderFilterSidebar(); renderProducts();
}

// ---- Product Detail ----
let currentProduct = null;
let currentImgIndex = 0;
function openProduct(id) {
    currentProduct = PRODUCTS.find(p => p.id === id);
    if (!currentProduct) return;
    currentImgIndex = 0;
    renderPDP();
    showPage('productDetail');
}

function renderPDP() {
    const p = currentProduct;
    if (!p) return;
    const container = document.getElementById('pdpContainer');
    if (!container) return;
    const off = pctOff(p.originalPrice, p.price);
    const sizeHtml = p.sizes.length ? `
    <div class="pdp-options-label">Size:</div>
    <div class="size-options">${p.sizes.map((s, i) => `<button class="size-btn ${i === 0 ? 'active' : ''}" onclick="selectSize(this)">${s}</button>`).join('')}</div>` : '';
    const colorHtml = p.colors.length ? `
    <div class="pdp-options-label mt-12">Color:</div>
    <div class="color-options">${p.colors.map((c, i) => `<div class="color-btn ${i === 0 ? 'active' : ''}" style="background:${c}" onclick="selectColor(this)"></div>`).join('')}</div>` : '';
    const specsHtml = Object.entries(p.specs).map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('');
    container.innerHTML = `
    <div class="pdp-layout">
      <div class="pdp-gallery">
        <div class="gallery-main" id="galleryMain">
          <img src="${p.imgs[0]}" alt="${p.name}" id="mainImg" onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'">
        </div>
        <div class="gallery-thumbs">
          ${p.imgs.map((img, i) => `<div class="gallery-thumb ${i === 0 ? 'active' : ''}" onclick="setGalleryImg(${i})"><img src="${img}" alt="thumb"></div>`).join('')}
        </div>
        <div style="display:flex;gap:10px;margin-top:16px">
          <button class="pdp-cta cart" onclick="State.addToCart(${p.id})">🛒 Add to Cart</button>
          <button class="pdp-cta buy" onclick="buyNow(${p.id})">⚡ Buy Now</button>
        </div>
        <button style="width:100%;margin-top:10px;padding:10px;border:1.5px solid var(--border);border-radius:4px;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s" onclick="toggleWishlist(${p.id},this)">
          ${State.isWishlisted(p.id) ? '❤️ Wishlisted' : '🤍 Add to Wishlist'}
        </button>
      </div>
      <div class="pdp-info">
        <div class="pdp-card">
          <div class="pdp-brand">${p.brand}</div>
          <h1 class="pdp-title">${p.name}</h1>
          <div class="pdp-rating-row">
            <span class="rating-badge">⭐ ${p.rating}</span>
            <span class="rating-count">(${p.reviews.toLocaleString()} ratings)</span>
            <span class="chip blue">${p.reviews > 10000 ? 'Bestseller' : 'Popular'}</span>
          </div>
          <hr class="pdp-divider">
          <div class="pdp-price-row">
            <span class="pdp-price">${fmt(p.price)}</span>
            <span class="pdp-original">${fmt(p.originalPrice)}</span>
            <span class="pdp-off">${off}% off</span>
          </div>
          <div class="pdp-emi">EMI from ${fmt(Math.round(p.price / 6))}/month</div>
          ${sizeHtml}${colorHtml}
        </div>
        <div class="pdp-card">
          <div class="pdp-options-label">Available Offers</div>
          <div class="offers-list">
            ${p.offers.map(o => `<div class="offer-item"><span class="offer-tag">Bank</span><span>${o}</span></div>`).join('')}
          </div>
        </div>
        <div class="pdp-card">
          <div class="pdp-options-label">Delivery</div>
          <div class="delivery-row">
            <input class="pincode-input" placeholder="Enter PIN code" maxlength="6" type="number">
            <button class="check-btn" onclick="checkDelivery(this)">Check</button>
          </div>
          <div id="deliveryResult" style="margin-top:8px;font-size:13px;color:var(--success)"></div>
        </div>
        <div class="pdp-card">
          <div class="pdp-options-label">Description</div>
          <p style="font-size:13px;color:var(--text-secondary);line-height:1.7;margin-top:8px">${p.description}</p>
        </div>
        <div class="pdp-card">
          <div class="pdp-options-label">Specifications</div>
          <table class="specs-table" style="margin-top:10px">
            ${specsHtml}
          </table>
        </div>
        <div class="pdp-card" id="reviewsSection">
          <div class="pdp-options-label">Ratings & Reviews</div>
          ${renderReviews(p)}
        </div>
      </div>
    </div>`;
}

function setGalleryImg(idx) {
    currentImgIndex = idx;
    const p = currentProduct;
    document.getElementById('mainImg').src = p.imgs[idx];
    document.querySelectorAll('.gallery-thumb').forEach((t, i) => t.classList.toggle('active', i === idx));
}
function selectSize(btn) { document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); }
function selectColor(btn) { document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); }
function checkDelivery(btn) {
    const pin = btn.previousElementSibling.value;
    const el = document.getElementById('deliveryResult');
    if (pin.length !== 6) { el.style.color = 'var(--accent)'; el.textContent = 'Please enter a valid 6-digit PIN code'; return; }
    el.style.color = 'var(--success)';
    el.textContent = `✅ Delivery available to ${pin} — Free delivery by ${new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}`;
}
function buyNow(id) { State.addToCart(id); showPage('cart'); renderCart(); }

function renderReviews(p) {
    const mockReviews = [
        { name: 'Rahul K.', rating: 5, title: 'Excellent product!', body: 'Best purchase I made this year. Completely worth the price. Delivery was fast and packaging was good.', date: '12 Jan 2025', helpful: 42 },
        { name: 'Priya M.', rating: 4, title: 'Great value for money', body: 'Very satisfied with the quality. Does exactly what it says. Would recommend to friends and family.', date: '05 Feb 2025', helpful: 28 },
        { name: 'Amit S.', rating: 5, title: 'Superb!', body: 'Amazing product. Build quality is top-notch. Customer support was very helpful when I had a query.', date: '18 Mar 2025', helpful: 19 }
    ];
    const bars = [
        { stars: 5, pct: 68 }, { stars: 4, pct: 18 }, { stars: 3, pct: 8 }, { stars: 2, pct: 3 }, { stars: 1, pct: 3 }
    ];
    return `
    <div class="reviews-summary" style="margin-top:12px">
      <div>
        <div class="big-rating">${p.rating}</div>
        <div style="color:var(--success);font-size:12px;text-align:center">⭐⭐⭐⭐⭐</div>
        <div style="font-size:12px;color:var(--text-muted);text-align:center">${p.reviews.toLocaleString()} ratings</div>
      </div>
      <div class="rating-bar-wrap">
        ${bars.map(b => `<div class="rating-bar-row"><span>${b.stars}</span><div class="rating-bar"><div class="rating-bar-fill" style="width:${b.pct}%"></div></div><span style="font-size:12px;color:var(--text-muted)">${b.pct}%</span></div>`).join('')}
      </div>
    </div>
    ${mockReviews.map(r => `
      <div class="review-card">
        <div class="review-header">
          <span class="rating-badge">⭐ ${r.rating}</span>
          <span class="reviewer-name">${r.name}</span>
          <span class="review-date">${r.date}</span>
        </div>
        <div class="review-title">${r.title}</div>
        <div class="review-body">${r.body}</div>
        <div class="review-helpful">Was this helpful? <button class="helpful-btn" onclick="this.textContent='👍 Yes ('+((+this.textContent.match(/\d+/)?.[0]||${r.helpful})+1)+')'" >👍 Yes (${r.helpful})</button><button class="helpful-btn">👎 No</button></div>
      </div>`).join('')}`;
}

// ---- Cart ----
function renderCart() {
    const container = document.getElementById('cartContainer');
    if (!container) return;
    if (!State.cart.length) {
        container.innerHTML = `
      <div class="cart-empty">
        <div class="empty-icon">🛒</div>
        <h2>Your cart is empty!</h2>
        <p>Add items to it now.</p>
        <button class="btn-primary" style="width:auto;padding:12px 32px" onclick="showPage('home')">Shop Now</button>
      </div>`;
        return;
    }
    container.innerHTML = `
    <div class="cart-layout">
      <div>
        <div class="section-card">
          <div class="section-header"><div><div class="section-title">My Cart</div><div class="section-subtitle">${State.cartCount()} item${State.cartCount() !== 1 ? 's' : ''}</div></div></div>
          ${State.cart.map(item => `
            <div class="cart-item">
              <div class="cart-item-img" onclick="openProduct(${item.id})" style="cursor:pointer">
                <img src="${item.img}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/100'">
              </div>
              <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-seller">Seller: RetailNet</div>
                <div style="margin-top:8px">
                  <div class="qty-control">
                    <div class="qty-btn" onclick="State.updateQty(${item.id},-1);renderCart()">−</div>
                    <div class="qty-val">${item.qty}</div>
                    <div class="qty-btn" onclick="State.updateQty(${item.id},1);renderCart()">+</div>
                  </div>
                </div>
                <div class="cart-item-actions">
                  <span class="cart-action-link" onclick="State.removeFromCart(${item.id});renderCart()">🗑️ Remove</span>
                  <span class="cart-action-link" onclick="toggleWishlist(${item.id},{classList:{contains:()=>false,add:()=>{},remove:()=>{}}})">🤍 Save for later</span>
                </div>
              </div>
              <div style="text-align:right">
                <div class="cart-item-price">${fmt(item.price * item.qty)}</div>
                <div class="cart-item-original">${fmt(item.originalPrice * item.qty)}</div>
                <div class="cart-item-off">${pctOff(item.originalPrice, item.price)}% off</div>
              </div>
            </div>`).join('')}
        </div>
        <div style="background:var(--card);padding:16px;border-radius:0 0 var(--radius-md) var(--radius-md);text-align:right;border-top:1px solid var(--border)">
          <button class="checkout-btn" style="display:inline-block;width:auto;padding:14px 40px" onclick="showPage('checkout');renderCheckout()">Place Order →</button>
        </div>
      </div>
      <div>
        <div class="price-card">
          <div class="price-card-title">Price Details</div>
          <div class="price-row"><span>Price (${State.cartCount()} items)</span><span>${fmt(State.cartOriginalTotal())}</span></div>
          <div class="price-row"><span>Discount</span><span class="green">−${fmt(State.cartSavings())}</span></div>
          <div class="price-row"><span>Delivery Charges</span><span class="green">Free</span></div>
          <div class="price-row total"><span>Total Amount</span><span>${fmt(State.cartTotal())}</span></div>
          <div class="savings-note">🎉 You will save ${fmt(State.cartSavings())} on this order!</div>
          <button class="checkout-btn" onclick="showPage('checkout');renderCheckout()">Proceed to Checkout →</button>
        </div>
        <div class="section-card" style="margin-top:12px">
          <div style="font-size:13px;font-weight:700;margin-bottom:10px">Safe and Secure Payments</div>
          <div style="font-size:12px;color:var(--text-secondary)">🔒 100% Authentic Products &nbsp;|&nbsp; ✅ Easy Returns &nbsp;|&nbsp; 🚀 Fast Delivery</div>
        </div>
      </div>
    </div>`;
}

// ---- Checkout ----
function renderCheckout() {
    const container = document.getElementById('checkoutContainer');
    if (!container) return;
    container.innerHTML = `
    <div class="checkout-layout">
      <div>
        <div class="checkout-steps">
          <div class="checkout-step active"><span class="step-num">1</span>Address</div>
          <div class="checkout-step"><span class="step-num">2</span>Payment</div>
          <div class="checkout-step"><span class="step-num">3</span>Review</div>
        </div>
        <div class="section-card" id="addressStep">
          <div class="section-title" style="margin-bottom:16px">Delivery Address</div>
          <div class="form-grid-2">
            <div class="form-group"><label class="form-label">First Name</label><input class="form-input" placeholder="John" id="fname"></div>
            <div class="form-group"><label class="form-label">Last Name</label><input class="form-input" placeholder="Doe" id="lname"></div>
          </div>
          <div class="form-group"><label class="form-label">Mobile Number</label><input class="form-input" placeholder="10-digit mobile number" type="tel" maxlength="10" id="mobile"></div>
          <div class="form-group"><label class="form-label">Address (House No, Building, Street)</label><input class="form-input" placeholder="Enter your address" id="address"></div>
          <div class="form-grid-3">
            <div class="form-group"><label class="form-label">City</label><input class="form-input" placeholder="City" id="city"></div>
            <div class="form-group"><label class="form-label">State</label><input class="form-input" placeholder="State" id="state"></div>
            <div class="form-group"><label class="form-label">PIN Code</label><input class="form-input" placeholder="6-digit PIN" type="number" maxlength="6" id="pin"></div>
          </div>
          <button class="btn-primary" onclick="goToPayment()">Continue to Payment →</button>
        </div>
        <div class="section-card hidden" id="paymentStep">
          <div class="section-title" style="margin-bottom:16px">Payment Options</div>
          <div class="payment-option selected" onclick="selectPayment(this)"><input type="radio" name="pay" checked><span class="payment-icon">💳</span><div><div class="payment-option-label">Credit / Debit Card</div><div class="payment-option-sub">Visa, Mastercard, Amex, RuPay</div></div></div>
          <div class="payment-option" onclick="selectPayment(this)"><input type="radio" name="pay"><span class="payment-icon">📱</span><div><div class="payment-option-label">UPI</div><div class="payment-option-sub">Google Pay, PhonePe, Paytm</div></div></div>
          <div class="payment-option" onclick="selectPayment(this)"><input type="radio" name="pay"><span class="payment-icon">🏦</span><div><div class="payment-option-label">Net Banking</div><div class="payment-option-sub">All major banks supported</div></div></div>
          <div class="payment-option" onclick="selectPayment(this)"><input type="radio" name="pay"><span class="payment-icon">💵</span><div><div class="payment-option-label">Cash on Delivery</div><div class="payment-option-sub">Pay when delivered</div></div></div>
          <div id="cardForm" style="margin-top:16px">
            <div class="form-group"><label class="form-label">Card Number</label><input class="form-input" placeholder="1234 5678 9012 3456" maxlength="19" oninput="formatCard(this)"></div>
            <div class="form-grid-2">
              <div class="form-group"><label class="form-label">Expiry</label><input class="form-input" placeholder="MM/YY" maxlength="5" oninput="formatExpiry(this)"></div>
              <div class="form-group"><label class="form-label">CVV</label><input class="form-input" placeholder="•••" maxlength="3" type="password"></div>
            </div>
            <div class="form-group"><label class="form-label">Name on Card</label><input class="form-input" placeholder="As printed on card"></div>
          </div>
          <button class="btn-primary" onclick="placeOrder()">🔒 Pay ${fmt(State.cartTotal())} →</button>
        </div>
      </div>
      <div>
        <div class="price-card">
          <div class="price-card-title">Order Summary (${State.cartCount()} Items)</div>
          ${State.cart.map(i => `<div class="price-row" style="font-size:13px"><span style="max-width:200px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">${i.name}</span><span>${fmt(i.price * i.qty)}</span></div>`).join('')}
          <div class="price-row total"><span>Total</span><span>${fmt(State.cartTotal())}</span></div>
          <div class="savings-note">🎉 Saving ${fmt(State.cartSavings())}!</div>
        </div>
      </div>
    </div>`;
}

function goToPayment() {
    const fname = document.getElementById('fname')?.value;
    if (!fname) { showToast('Please fill in your name', 'error'); return; }
    document.getElementById('addressStep')?.classList.add('hidden');
    document.getElementById('paymentStep')?.classList.remove('hidden');
    document.querySelectorAll('.checkout-step')[0]?.classList.replace('active', 'done');
    document.querySelectorAll('.checkout-step')[1]?.classList.add('active');
}
function selectPayment(el) {
    document.querySelectorAll('.payment-option').forEach(o => { o.classList.remove('selected'); o.querySelector('input').checked = false; });
    el.classList.add('selected'); el.querySelector('input').checked = true;
    document.getElementById('cardForm')?.classList.toggle('hidden', !el.querySelector('.payment-option-label').textContent.includes('Card'));
}
function formatCard(inp) { inp.value = inp.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19); }
function formatExpiry(inp) { inp.value = inp.value.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1/$2').slice(0, 5); }

function placeOrder() {
    State.cart = []; State.save(); updateHeaderCounts();
    const orderId = 'OD' + Date.now().toString().slice(-10);
    showPage('orderConfirm');
    const el = document.getElementById('orderConfirmContainer');
    if (el) el.innerHTML = `
    <div class="order-confirm">
      <div class="confirm-icon">🎉</div>
      <div class="confirm-title">Order Placed!</div>
      <div class="confirm-sub">Your order has been placed successfully and will be delivered soon.</div>
      <div class="order-id">Order ID: <strong>${orderId}</strong></div>
      <div class="track-steps">
        <div class="track-step done"><div class="track-dot">✓</div><div class="track-label">Confirmed</div></div>
        <div class="track-step active"><div class="track-dot">📦</div><div class="track-label">Processing</div></div>
        <div class="track-step"><div class="track-dot">🚚</div><div class="track-label">Shipped</div></div>
        <div class="track-step"><div class="track-dot">🏠</div><div class="track-label">Delivered</div></div>
      </div>
      <button class="btn-primary" onclick="showPage('home')" style="margin-top:16px">Continue Shopping</button>
      <button class="btn-outline" onclick="showPage('home')" style="margin-top:10px">Track Order</button>
    </div>`;
    showToast('🎉 Order placed successfully!', 'success');
}

// ---- Wishlist ----
function renderWishlist() {
    const container = document.getElementById('wishlistContainer');
    if (!container) return;
    if (!State.wishlist.length) {
        container.innerHTML = `<div class="wishlist-empty"><div class="empty-icon">❤️</div><h2>Your Wishlist is empty</h2><p>Save items you love!</p><button class="btn-primary" style="width:auto;padding:12px 32px;margin-top:16px" onclick="showPage('home')">Discover Products</button></div>`;
        return;
    }
    container.innerHTML = `<div class="products-grid">${State.wishlist.map(p => productCardHTML(p)).join('')}</div>`;
}

// ---- Search ----
function initSearch() {
    const input = document.getElementById('searchInput');
    const suggestions = document.getElementById('searchSuggestions');
    if (!input) return;

    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        if (!q) { suggestions.classList.remove('active'); return; }
        const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)).slice(0, 6);
        if (!matches.length) { suggestions.classList.remove('active'); return; }
        suggestions.innerHTML = matches.map(p => `
      <div class="suggestion-item" onclick="searchSelect('${p.name.replace(/'/g, "\\'")}')">
        <img src="${p.img}" style="width:36px;height:36px;object-fit:contain;background:#f5f5f5;border-radius:4px" onerror="this.style.display='none'">
        <span>${p.name}</span>
        <span style="margin-left:auto;color:var(--text-muted);font-size:12px">${fmt(p.price)}</span>
      </div>`).join('');
        suggestions.classList.add('active');
    });

    input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
    document.addEventListener('click', e => { if (!e.target.closest('.search-wrap')) suggestions.classList.remove('active'); });
}

function searchSelect(name) {
    document.getElementById('searchInput').value = name;
    document.getElementById('searchSuggestions').classList.remove('active');
    doSearch();
}

function doSearch() {
    const q = document.getElementById('searchInput')?.value.trim();
    document.getElementById('searchSuggestions')?.classList.remove('active');
    State.searchQuery = q;
    State.currentCategory = 'all';
    showPage('products');
    renderFilterSidebar();
    renderProducts();
}

// ---- Page Routing ----
const PAGES = ['home', 'products', 'productDetail', 'cart', 'checkout', 'orderConfirm', 'wishlist'];
function showPage(pageId) {
    PAGES.forEach(id => {
        const el = document.getElementById(id + 'Page');
        if (el) el.classList.toggle('hidden', id !== pageId);
    });
    window.scrollTo(0, 0);
    // breadcrumb update
    updateBreadcrumb(pageId);
    if (pageId === 'products') { renderFilterSidebar(); renderProducts(); }
    if (pageId === 'cart') renderCart();
    if (pageId === 'wishlist') renderWishlist();
}

function updateBreadcrumb(pageId) {
    const bc = document.getElementById('breadcrumbBar');
    if (!bc) return;
    const crumbs = { home: [], products: ['Home', 'Products'], productDetail: ['Home', 'Products', currentProduct?.name], cart: ['Home', 'Cart'], checkout: ['Home', 'Cart', 'Checkout'], orderConfirm: ['Home', 'Order Confirmed'], wishlist: ['Home', 'Wishlist'] };
    const items = crumbs[pageId] || [];
    bc.innerHTML = items.map((c, i) => i === items.length - 1 ? `<span class="active">${c}</span>` : `<a href="#" onclick="showPage('${i === 0 ? 'home' : 'products'}')">${c}</a><span class="breadcrumb-sep">›</span>`).join('');
    bc.parentElement.style.display = items.length ? 'block' : 'none';
}

// ---- Login Modal ----
function openLogin() {
    document.getElementById('loginModal')?.classList.add('open');
}
function closeLogin() {
    document.getElementById('loginModal')?.classList.remove('open');
}
function switchAuthTab(tab) {
    document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.add('hidden'));
    document.querySelector(`.modal-tab[data-tab="${tab}"]`)?.classList.add('active');
    document.getElementById(tab + 'Form')?.classList.remove('hidden');
}
function doLogin(e) {
    e.preventDefault();
    closeLogin();
    showToast('Welcome back! Logged in successfully 👋', 'success');
}
function doSignup(e) {
    e.preventDefault();
    closeLogin();
    showToast('Account created! Welcome to FlipKart Clone 🎉', 'success');
}

// ---- Quick View Modal ----
function quickView(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    const modal = document.getElementById('quickViewModal');
    document.getElementById('quickViewContent').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
      <img src="${p.img}" style="width:100%;aspect-ratio:1;object-fit:contain;border-radius:8px;background:#f5f5f5;padding:20px" onerror="this.src='https://via.placeholder.com/300'">
      <div>
        <div style="font-size:11px;font-weight:700;color:var(--primary);text-transform:uppercase;margin-bottom:6px">${p.brand}</div>
        <div style="font-size:16px;font-weight:700;margin-bottom:10px">${p.name}</div>
        <span class="rating-badge">⭐ ${p.rating}</span>
        <div style="font-size:22px;font-weight:700;margin-top:12px">${fmt(p.price)}</div>
        <div style="color:var(--text-secondary);text-decoration:line-through;font-size:13px">${fmt(p.originalPrice)}</div>
        <div style="color:var(--success);font-weight:600;font-size:13px">${pctOff(p.originalPrice, p.price)}% off</div>
        <div style="display:flex;gap:10px;margin-top:16px">
          <button class="pdp-cta cart" style="flex:1;padding:12px" onclick="State.addToCart(${p.id});closeQuickView()">🛒 Add to Cart</button>
          <button class="pdp-cta buy" style="flex:1;padding:12px" onclick="openProduct(${p.id});closeQuickView()">View Details</button>
        </div>
      </div>
    </div>`;
    modal.classList.add('open');
}
function closeQuickView() { document.getElementById('quickViewModal')?.classList.remove('open'); }

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
    initHero();
    initCatNav();
    initTimer();
    initSearch();
    renderHome();
    updateHeaderCounts();
    showPage('home');
});
