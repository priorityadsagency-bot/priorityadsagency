/**
 * UI Component & View Rendering Engine for SoleStride E-Commerce
 */

import { PRODUCTS, SHOE_CATEGORIES } from './products.js';
import { Store } from './store.js';

// SVG Fallback for shoes if any image is offline
export function getShoeSvgFallback(category, colorHex = '#2874f0', name = 'Shoe') {
  const color = colorHex || '#2874f0';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 320" width="100%" height="100%">
      <defs>
        <linearGradient id="soleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#d1d5db"/>
        </linearGradient>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${color}"/>
          <stop offset="100%" stop-color="#111827"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#f8fafc"/>
      <!-- Shadow -->
      <ellipse cx="250" cy="270" rx="190" ry="20" fill="rgba(0,0,0,0.08)"/>
      <!-- Outsole -->
      <path d="M 80 250 C 130 255, 230 258, 320 252 C 370 248, 410 230, 420 215 C 405 210, 360 218, 300 220 C 230 222, 140 210, 80 230 Z" fill="url(#soleGrad)" stroke="#cbd5e1" stroke-width="2"/>
      <!-- Midsole Cushion -->
      <path d="M 85 235 C 140 240, 240 244, 325 238 C 375 232, 405 218, 415 205 C 385 202, 345 208, 290 208 C 220 208, 140 198, 85 220 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <!-- Shoe Upper Body -->
      <path d="M 90 220 C 100 170, 130 130, 180 120 C 220 110, 250 140, 280 155 C 330 170, 390 185, 410 205 C 380 200, 320 208, 250 208 C 170 208, 110 205, 90 220 Z" fill="url(#bodyGrad)"/>
      <!-- Collar & Tongue -->
      <path d="M 180 120 C 170 95, 195 85, 220 95 C 235 105, 245 130, 248 145 Z" fill="#1f2937"/>
      <!-- Laces -->
      <line x1="210" y1="125" x2="235" y2="140" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      <line x1="225" y1="135" x2="250" y2="150" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      <line x1="240" y1="145" x2="265" y2="160" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      <!-- Dynamic Accent Swoosh/Stripe -->
      <path d="M 140 185 Q 220 170 340 188 Q 240 202 150 195 Z" fill="#ffffff" opacity="0.85"/>
      <!-- Text Badge -->
      <text x="250" y="295" font-family="sans-serif" font-size="12" font-weight="bold" fill="#64748b" text-anchor="middle">${name.toUpperCase()}</text>
    </svg>
  `;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Global Image Error Handler Setup
if (typeof window !== 'undefined') {
  window.handleImageError = function(img, category, colorHex, name) {
    img.onerror = null;
    img.src = getShoeSvgFallback(category, colorHex, name);
  };
}

export const UI = {
  // Format Indian Currency (e.g. ₹7,499)
  formatPrice(num) {
    return '₹' + Number(num || 0).toLocaleString('en-IN');
  },

  // -------------------------------------------------------------
  // TOAST NOTIFICATIONS
  // -------------------------------------------------------------
  showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-message ${type}`;
    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  },

  // -------------------------------------------------------------
  // HEADER UPDATES
  // -------------------------------------------------------------
  updateHeaderBadges() {
    const cartCount = Store.getCartCount();
    const wishlistCount = Store.getWishlist().length;

    const cartBadge = document.getElementById('header-cart-badge');
    const mobileCartBadge = document.getElementById('mobile-cart-badge');
    const wishlistBadge = document.getElementById('header-wishlist-badge');
    const mobileWishlistBadge = document.getElementById('mobile-wishlist-badge');

    if (cartBadge) {
      cartBadge.textContent = cartCount;
      cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
    }
    if (mobileCartBadge) {
      mobileCartBadge.textContent = cartCount;
      mobileCartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
    }
    if (wishlistBadge) {
      wishlistBadge.textContent = wishlistCount;
      wishlistBadge.style.display = wishlistCount > 0 ? 'flex' : 'none';
    }
    if (mobileWishlistBadge) {
      mobileWishlistBadge.textContent = wishlistCount;
      mobileWishlistBadge.style.display = wishlistCount > 0 ? 'flex' : 'none';
    }
  },

  // -------------------------------------------------------------
  // PRODUCT CARD COMPONENT
  // -------------------------------------------------------------
  renderProductCard(product) {
    const isWishlisted = Store.isInWishlist(product.id);
    const primaryColor = product.colors && product.colors[0] ? product.colors[0] : { hex: '#333333' };
    const mainImg = (product.colors && product.colors[0] && product.colors[0].mainImage) || '';

    // Render sizes preview chips
    const sizesChips = (product.sizes || []).slice(0, 4).map(s => 
      `<span class="size-chip-mini">${s.size}</span>`
    ).join('');

    return `
      <div class="product-card" data-product-id="${product.id}">
        <!-- Wishlist Toggle -->
        <button class="card-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                data-wishlist-id="${product.id}" 
                title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}"
                onclick="event.stopPropagation(); window.appController.toggleWishlist('${product.id}')">
          <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
        </button>

        <!-- Discount Pill -->
        <span class="card-discount-badge">${product.discount}% OFF</span>

        <!-- Image Area -->
        <div class="product-card-img-wrap" onclick="window.location.hash='#product/${product.id}'">
          <img class="product-card-img" 
               src="${mainImg}" 
               alt="${product.name}" 
               loading="lazy"
               onerror="handleImageError(this, '${product.category}', '${primaryColor.hex}', '${product.name.replace(/'/g, '')}')" />
        </div>

        <!-- Info Area -->
        <div class="product-card-body" onclick="window.location.hash='#product/${product.id}'">
          <div class="product-card-info-top">
            <div class="product-brand-row">
              <span class="product-brand">${product.brand}</span>
              <span class="product-tag-mini">${product.tag || 'Popular'}</span>
            </div>
            <h3 class="product-title" title="${product.name}">${product.name}</h3>

            <div class="rating-assured-row">
              <div class="rating-group">
                <span class="rating-badge">
                  ${product.rating} <i class="fa-solid fa-star"></i>
                </span>
                <span class="rating-count">(${Number(product.ratingCount).toLocaleString('en-IN')} reviews)</span>
              </div>
              <span class="flipkart-assured-pill">
                <i class="fa-solid fa-certificate"></i> Assured
              </span>
            </div>
          </div>

          <div class="product-card-info-bottom">
            <div class="price-row">
              <div class="price-main-wrap">
                <span class="current-price">${this.formatPrice(product.price)}</span>
                <span class="original-price">${this.formatPrice(product.originalPrice)}</span>
              </div>
              <span class="discount-badge-pill">${product.discount}% OFF</span>
            </div>

            <div class="sizes-preview">
              <span class="sizes-preview-label">Sizes:</span>
              <div class="sizes-chips-wrap">${sizesChips}</div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="card-actions">
          <button class="card-btn-cart" onclick="event.stopPropagation(); window.appController.quickAddToCart('${product.id}')">
            <i class="fa-solid fa-cart-shopping"></i> Add to Cart
          </button>
          <button class="card-btn-buy" onclick="event.stopPropagation(); window.appController.quickBuyNow('${product.id}')">
            <i class="fa-solid fa-bolt"></i> Buy Now
          </button>
        </div>
      </div>
    `;
  },

  // -------------------------------------------------------------
  // HOME PAGE VIEW
  // -------------------------------------------------------------
  renderHomePage() {
    const allProducts = Store.getAllProducts();
    const trending = allProducts.filter(p => p.tag === 'Trending' || p.tag === 'Best Seller').slice(0, 6);
    const bestSellers = allProducts.filter(p => p.rating >= 4.6).slice(0, 8);
    const newArrivals = allProducts.filter(p => p.category === 'sneakers' || p.tag === 'New Arrival').slice(0, 6);
    const topRated = allProducts.filter(p => p.rating >= 4.7).slice(0, 6);
    const recentlyViewed = Store.getRecentlyViewed();

    // Shop by Category Cards
    const categoryCardsHtml = SHOE_CATEGORIES.map(cat => {
      const sample = allProducts.find(p => p.category === cat.id);
      const img = sample && sample.colors && sample.colors[0] ? sample.colors[0].mainImage : '';
      return `
        <div class="category-card" onclick="window.location.hash='#products?category=${cat.id}'">
          <div class="category-card-img-wrap">
            <img class="category-card-img" src="${img}" alt="${cat.name}" onerror="handleImageError(this, '${cat.id}', '#2874f0', '${cat.name}')"/>
            <span class="category-card-tag"><i class="fa-solid ${cat.icon || 'fa-shoe-prints'}"></i> ${cat.name}</span>
          </div>
          <div class="category-card-info">
            <div class="category-card-title">${cat.name}</div>
            <div class="category-card-offer">
              <span class="category-card-count">Min. 30-65% Off</span>
              <span class="category-card-arrow"><i class="fa-solid fa-arrow-right"></i></span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <!-- Hero Promotional Carousel -->
      <section class="hero-slider-section">
        <div class="hero-slider" id="hero-slider">
          <div class="slider-track" id="slider-track">
            <!-- Slide 1 -->
            <div class="hero-slide" style="background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);">
              <div class="slide-content">
                <span class="slide-tag">SoleStride Mega Sale</span>
                <h1 class="slide-title">BIG FOOTWEAR FESTIVAL</h1>
                <p class="slide-subtitle">Up to 70% Off on Nike, Adidas, Puma, ASICS & Clarks. 30 Unique Designs in Stock!</p>
                <a href="#products" class="slide-cta-btn"><i class="fa-solid fa-bolt"></i> EXPLORE ALL 30 SHOES</a>
              </div>
              <img class="slide-graphic" src="img/1542291026-7eec264c27ff.webp" alt="Nike Zoom" onerror="handleImageError(this, 'running', '#d92534', 'Hero Runner')"/>
            </div>
            <!-- Slide 2 -->
            <div class="hero-slide" style="background: linear-gradient(135deg, #870000 0%, #190a05 100%);">
              <div class="slide-content">
                <span class="slide-tag">Sneakerhead Collection</span>
                <h1 class="slide-title">AIR JORDAN & RETRO ICONS</h1>
                <p class="slide-subtitle">Iconic Chicago colorways, Chuck 70s, and classic Suede drops at unbeatable prices.</p>
                <a href="#products?category=sneakers" class="slide-cta-btn"><i class="fa-solid fa-fire"></i> SHOP SNEAKERS</a>
              </div>
              <img class="slide-graphic" src="img/1552346154-21d32810aba3.webp" alt="Jordan 1" onerror="handleImageError(this, 'sneakers', '#bf0a30', 'Hero Jordan')"/>
            </div>
            <!-- Slide 3 -->
            <div class="hero-slide" style="background: linear-gradient(135deg, #0d324d 0%, #7f5a83 100%);">
              <div class="slide-content">
                <span class="slide-tag">Pro Performance</span>
                <h1 class="slide-title">RUNNING & ATHLETIC SPEED</h1>
                <p class="slide-subtitle">Carbon-plated marathon racers, PureGEL impact shock absorption, and responsive foam.</p>
                <a href="#products?category=running" class="slide-cta-btn"><i class="fa-solid fa-person-running"></i> EXPLORE RUNNING</a>
              </div>
              <img class="slide-graphic" src="img/1584735935682-2f2b69dff9d2.webp" alt="Ultraboost" onerror="handleImageError(this, 'running', '#4a90e2', 'Hero Running')"/>
            </div>
          </div>
          <button class="slider-arrow slider-prev" id="slider-prev-btn"><i class="fa-solid fa-chevron-left"></i></button>
          <button class="slider-arrow slider-next" id="slider-next-btn"><i class="fa-solid fa-chevron-right"></i></button>
          <div class="slider-dots" id="slider-dots">
            <span class="slider-dot active" data-index="0"></span>
            <span class="slider-dot" data-index="1"></span>
            <span class="slider-dot" data-index="2"></span>
          </div>
        </div>
      </section>

      <!-- Shop by Category Section -->
      <section class="home-section">
        <div class="section-header">
          <div class="section-title-wrap">
            <h2 class="section-title">Shop by Category</h2>
            <span class="section-subtitle">Curated collections with 5 unique designs in each category</span>
          </div>
          <a href="#products" class="view-all-btn">VIEW ALL 30 SHOES <i class="fa-solid fa-chevron-right"></i></a>
        </div>
        <div class="category-cards-grid">
          ${categoryCardsHtml}
        </div>
      </section>

      <!-- Trending Footwear Section (Horizontal Carousel) -->
      <section class="home-section">
        <div class="section-header">
          <div class="section-title-wrap">
            <h2 class="section-title">Trending Now & Best Sellers</h2>
            <span class="section-subtitle">Most popular picks loved by thousands of verified shoppers</span>
          </div>
          <a href="#products?sort=popularity" class="view-all-btn">SEE MORE <i class="fa-solid fa-chevron-right"></i></a>
        </div>
        <div class="products-horizontal-scroll">
          ${trending.map(p => this.renderProductCard(p)).join('')}
        </div>
      </section>

      <!-- Best Selling Shoes (Grid) -->
      <section class="home-section">
        <div class="section-header">
          <div class="section-title-wrap">
            <h2 class="section-title">Best Value Deals (4.6★ & Above)</h2>
            <span class="section-subtitle">Top customer-rated footwear from verified global brands</span>
          </div>
          <a href="#products?rating=4.5" class="view-all-btn">VIEW ALL <i class="fa-solid fa-chevron-right"></i></a>
        </div>
        <div class="products-grid">
          ${bestSellers.map(p => this.renderProductCard(p)).join('')}
        </div>
      </section>

      <!-- New Arrivals / Limited Drops -->
      <section class="home-section">
        <div class="section-header">
          <div class="section-title-wrap">
            <h2 class="section-title">New Arrivals & Streetwear Drops</h2>
            <span class="section-subtitle">Fresh additions to the footwear vault</span>
          </div>
          <a href="#products?category=sneakers" class="view-all-btn">EXPLORE SNEAKERS <i class="fa-solid fa-chevron-right"></i></a>
        </div>
        <div class="products-horizontal-scroll">
          ${newArrivals.map(p => this.renderProductCard(p)).join('')}
        </div>
      </section>

      <!-- Top Rated Section -->
      <section class="home-section">
        <div class="section-header">
          <div class="section-title-wrap">
            <h2 class="section-title">Highest Rated by Runners & Walkers</h2>
            <span class="section-subtitle">Peak comfort, orthotic support & marathon cushioning</span>
          </div>
          <a href="#products?category=walking" class="view-all-btn">EXPLORE WALKING <i class="fa-solid fa-chevron-right"></i></a>
        </div>
        <div class="products-horizontal-scroll">
          ${topRated.map(p => this.renderProductCard(p)).join('')}
        </div>
      </section>

      <!-- Recently Viewed Products (Dynamic) -->
      ${recentlyViewed.length > 0 ? `
        <section class="home-section">
          <div class="section-header">
            <div class="section-title-wrap">
              <h2 class="section-title">Recently Viewed Shoes</h2>
              <span class="section-subtitle">Shoes you explored recently</span>
            </div>
          </div>
          <div class="products-horizontal-scroll">
            ${recentlyViewed.map(p => this.renderProductCard(p)).join('')}
          </div>
        </section>
      ` : ''}

      <!-- Trust Badges Section -->
      <section class="home-section" style="background: #ffffff; padding: 24px; margin-bottom: 24px;">
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; text-align: center;">
          <div>
            <i class="fa-solid fa-shield-halved" style="font-size: 28px; color: var(--primary); margin-bottom: 8px;"></i>
            <h4 style="font-size: 14px; font-weight: 700;">100% Original</h4>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Direct from authorized brand distributors</p>
          </div>
          <div>
            <i class="fa-solid fa-arrow-rotate-left" style="font-size: 28px; color: var(--primary); margin-bottom: 8px;"></i>
            <h4 style="font-size: 14px; font-weight: 700;">7 Days Return</h4>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Hassle-free size exchange & returns</p>
          </div>
          <div>
            <i class="fa-solid fa-truck-fast" style="font-size: 28px; color: var(--primary); margin-bottom: 8px;"></i>
            <h4 style="font-size: 14px; font-weight: 700;">Free & Fast Delivery</h4>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">On all prepaid and COD footwear orders</p>
          </div>
          <div>
            <i class="fa-solid fa-headset" style="font-size: 28px; color: var(--primary); margin-bottom: 8px;"></i>
            <h4 style="font-size: 14px; font-weight: 700;">24x7 Customer Help</h4>
            <p style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">Dedicated support for all inquiries</p>
          </div>
        </div>
      </section>
    `;
  },

  // -------------------------------------------------------------
  // PRODUCT LISTING / CATALOG VIEW
  // -------------------------------------------------------------
  renderCatalogPage(filters = {}) {
    const allProducts = Store.getAllProducts();
    
    // Extract unique brands for filters
    const allBrands = [...new Set(allProducts.map(p => p.brand))].sort();

    return `
      <div class="catalog-layout">
        <!-- Filter Sidebar -->
        <aside class="filters-sidebar" id="filters-sidebar">
          <div class="filters-header">
            <span class="filters-header-title">Filters</span>
            <button class="clear-filters-btn" id="clear-all-filters-btn">CLEAR ALL</button>
          </div>

          <!-- Category Filter -->
          <div class="filter-group">
            <div class="filter-group-title">Category</div>
            <div class="filter-category-list">
              <div class="filter-category-item ${!filters.category || filters.category === 'all' ? 'active' : ''}" data-cat="all">
                <span>All 30 Shoes</span>
                <span style="color: var(--text-muted); font-size: 11px;">(30)</span>
              </div>
              ${SHOE_CATEGORIES.map(cat => {
                const count = allProducts.filter(p => p.category === cat.id).length;
                const isActive = filters.category === cat.id;
                return `
                  <div class="filter-category-item ${isActive ? 'active' : ''}" data-cat="${cat.id}">
                    <span>${cat.name}</span>
                    <span style="color: var(--text-muted); font-size: 11px;">(${count})</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Price Range Filter -->
          <div class="filter-group">
            <div class="filter-group-title">Price Range</div>
            <div class="price-slider-wrap">
              <input type="range" class="price-range-slider" id="price-filter-slider" 
                     min="1000" max="15000" step="500" value="${filters.maxPrice || 15000}" />
              <div class="price-slider-values">
                <span>₹1,000</span>
                <span id="price-slider-display">Up to ${this.formatPrice(filters.maxPrice || 15000)}</span>
              </div>
            </div>
          </div>

          <!-- Shoe Size Filter -->
          <div class="filter-group">
            <div class="filter-group-title">Shoe Size (UK)</div>
            <div class="size-filter-grid">
              ${['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'].map(sz => {
                const isSelected = filters.sizes && filters.sizes.includes(sz);
                return `
                  <button class="size-filter-btn ${isSelected ? 'active' : ''}" data-size="${sz}">${sz}</button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Brand Filter Checkboxes -->
          <div class="filter-group">
            <div class="filter-group-title">Brand</div>
            <div class="brand-filter-list">
              ${allBrands.map(b => {
                const isChecked = filters.brands && filters.brands.includes(b);
                return `
                  <label class="checkbox-label">
                    <input type="checkbox" name="brand" value="${b}" ${isChecked ? 'checked' : ''} />
                    <span>${b}</span>
                  </label>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Customer Rating Filter -->
          <div class="filter-group">
            <div class="filter-group-title">Customer Ratings</div>
            <div class="rating-filter-list">
              <label class="checkbox-label">
                <input type="radio" name="rating" value="4.5" ${filters.minRating === 4.5 ? 'checked' : ''} />
                <span>4.5★ & above</span>
              </label>
              <label class="checkbox-label">
                <input type="radio" name="rating" value="4.0" ${filters.minRating === 4.0 ? 'checked' : ''} />
                <span>4.0★ & above</span>
              </label>
              <label class="checkbox-label">
                <input type="radio" name="rating" value="0" ${!filters.minRating ? 'checked' : ''} />
                <span>All Ratings</span>
              </label>
            </div>
          </div>
          <button type="button" class="mobile-filter-done" id="mobile-filter-done">
            Show <span id="mobile-filter-result-count">30</span> Products
          </button>
        </aside>

        <!-- Catalog Content Area -->
        <main class="catalog-content">
          <!-- Top Sort & Count Bar -->
          <div class="catalog-top-bar">
            <div class="catalog-count-text">
              Showing <strong id="catalog-count-num">30</strong> of <strong>30</strong> Products
            </div>

            <div class="catalog-mobile-controls">
              <button type="button" class="catalog-mobile-control" id="mobile-filter-toggle">
                <i class="fa-solid fa-sliders"></i> Filter
              </button>
              <button type="button" class="catalog-mobile-control" id="mobile-sort-toggle">
                <i class="fa-solid fa-arrow-down-wide-short"></i> Sort:
                <span id="mobile-sort-label">Popularity</span>
              </button>
            </div>

            <!-- Sort By Tabs -->
            <div class="sort-tabs-wrap">
              <span class="sort-label">Sort By:</span>
              <div class="sort-tabs" id="sort-tabs">
                <button class="sort-tab-btn ${filters.sort === 'popularity' || !filters.sort ? 'active' : ''}" data-sort="popularity">Popularity</button>
                <button class="sort-tab-btn ${filters.sort === 'price_asc' ? 'active' : ''}" data-sort="price_asc">Price: Low to High</button>
                <button class="sort-tab-btn ${filters.sort === 'price_desc' ? 'active' : ''}" data-sort="price_desc">Price: High to Low</button>
                <button class="sort-tab-btn ${filters.sort === 'newest' ? 'active' : ''}" data-sort="newest">Newest First</button>
                <button class="sort-tab-btn ${filters.sort === 'rating' ? 'active' : ''}" data-sort="rating">Customer Rating</button>
              </div>
            </div>
          </div>

          <!-- Active Filter Pills -->
          <div class="active-filter-pills" id="active-filter-pills"></div>

          <!-- Product Grid Container -->
          <div class="products-grid" id="catalog-products-grid">
            ${allProducts.map(p => this.renderProductCard(p)).join('')}
          </div>
        </main>
      </div>
      <div class="catalog-sheet-overlay" id="catalog-sheet-overlay"></div>
    `;
  },

  // -------------------------------------------------------------
  // FULL-SCREEN PRODUCT DETAILS VIEW
  // -------------------------------------------------------------
  renderProductDetailsPage(product, state = {}) {
    if (!product) {
      return `
        <div style="padding: 60px 20px; text-align: center; background: #fff; border-radius: 4px; margin: 40px auto; max-width: 600px;">
          <h2>Product Not Found</h2>
          <p style="margin: 12px 0 20px; color: #666;">The requested shoe design could not be found.</p>
          <a href="#products" class="btn-primary">Browse All 30 Shoes</a>
        </div>
      `;
    }

    // Default selected color & size from state
    const selectedColorIndex = state.selectedColorIndex !== undefined ? state.selectedColorIndex : 0;
    const activeColor = product.colors[selectedColorIndex] || product.colors[0];
    const selectedSize = state.selectedSize || '';
    const quantity = state.quantity || 1;

    // Gallery images for active color
    const galleryImages = (activeColor.gallery && activeColor.gallery.length > 0) 
      ? activeColor.gallery 
      : [activeColor.mainImage];

    const activeImage = state.activeImage || activeColor.mainImage;

    // Reviews data from store (merging custom user reviews)
    const reviewData = Store.getProductReviews(product.id);
    const reviews = reviewData.reviews;
    const avgRating = reviewData.rating;
    const totalReviews = reviewData.reviewCount;
    const totalRatings = reviewData.ratingCount;
    const breakdown = reviewData.breakdown;

    // Related products (from same category)
    const relatedProducts = Store.getAllProducts()
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);

    // More products to explore
    const moreProducts = Store.getAllProducts()
      .filter(p => p.id !== product.id && !relatedProducts.some(r => r.id === p.id))
      .slice(0, 4);

    return `
      <div class="product-details-container">
        <!-- Breadcrumb Navigation -->
        <nav class="breadcrumb-trail">
          <a href="#home">Home</a>
          <i class="fa-solid fa-chevron-right" style="font-size: 9px;"></i>
          <a href="#products">Footwear</a>
          <i class="fa-solid fa-chevron-right" style="font-size: 9px;"></i>
          <a href="#products?category=${product.category}">${product.categoryName}</a>
          <i class="fa-solid fa-chevron-right" style="font-size: 9px;"></i>
          <span>${product.name}</span>
        </nav>

        <!-- Main Product Card -->
        <div class="product-detail-main-card">
          <!-- Left Column: Interactive Image Gallery -->
          <div class="product-gallery-col">
            <div class="gallery-stage">
              <!-- Thumbnail strip -->
              <div class="gallery-thumbs" id="gallery-thumbs-strip">
                ${galleryImages.map((img, idx) => `
                  <div class="gallery-thumb-item ${img === activeImage ? 'active' : ''}" 
                       data-thumb-src="${img}"
                       onclick="window.appController.switchDetailImage('${img}')">
                    <img src="${img}" alt="Angle ${idx + 1}" onerror="handleImageError(this, '${product.category}', '${activeColor.hex}', '${product.name.replace(/'/g, '')}')"/>
                  </div>
                `).join('')}
              </div>

              <!-- Main Large Image View with Zoom -->
              <div class="gallery-main-view" id="gallery-main-view">
                <img id="detail-main-display-img" class="gallery-main-img" 
                     src="${activeImage}" 
                     alt="${product.name}" 
                     onerror="handleImageError(this, '${product.category}', '${activeColor.hex}', '${product.name.replace(/'/g, '')}')" />
              </div>
            </div>

            <!-- Sticky CTA Action Buttons -->
            <div class="gallery-cta-actions">
              <button class="btn-detail-cart" id="detail-add-cart-btn" onclick="window.appController.handleDetailAddToCart('${product.id}')">
                <i class="fa-solid fa-cart-shopping"></i> ADD TO CART
              </button>
              <button class="btn-detail-buy" id="detail-buy-now-btn" onclick="window.appController.handleDetailBuyNow('${product.id}')">
                <i class="fa-solid fa-bolt"></i> BUY NOW
              </button>
            </div>
          </div>

          <!-- Right Column: Product Info & Selectors -->
          <div class="product-info-col">
            <div class="product-detail-brand">${product.brand}</div>
            <h1 class="product-detail-title">${product.name}</h1>

            <div class="detail-rating-row">
              <span class="detail-rating-badge">
                ${avgRating} <i class="fa-solid fa-star"></i>
              </span>
              <span class="detail-rating-text">
                ${Number(totalRatings).toLocaleString('en-IN')} Ratings & ${Number(totalReviews).toLocaleString('en-IN')} Reviews
              </span>
              <span class="flipkart-assured-pill">
                <i class="fa-solid fa-certificate"></i> Flipkart Assured
              </span>
            </div>

            <!-- Price Breakdown -->
            <div class="detail-price-box">
              <div class="detail-special-price-tag">Special Festive Price</div>
              <div class="detail-price-numbers">
                <span class="detail-current-price">${this.formatPrice(product.price)}</span>
                <span class="detail-original-price">${this.formatPrice(product.originalPrice)}</span>
                <span class="detail-discount-percent">${product.discount}% off</span>
              </div>
              <div class="detail-savings-notice">
                <i class="fa-solid fa-tags"></i> You save ${this.formatPrice(product.originalPrice - product.price)} on this order!
              </div>
            </div>

            <!-- Bank Offers List -->
            <div class="bank-offers-box">
              <div class="bank-offers-title">
                <i class="fa-solid fa-percent" style="color: var(--success-green);"></i> Available Offers
              </div>
              <div class="bank-offer-item">
                <i class="fa-solid fa-tag"></i>
                <span><strong>Bank Offer:</strong> 10% instant discount on HDFC & SBI Credit Cards on orders above ₹3,000.</span>
              </div>
              <div class="bank-offer-item">
                <i class="fa-solid fa-tag"></i>
                <span><strong>Special Price:</strong> Get extra 15% off with coupon <strong>SOLE20</strong> (Auto-applies at checkout).</span>
              </div>
              <div class="bank-offer-item">
                <i class="fa-solid fa-tag"></i>
                <span><strong>Partner Offer:</strong> Sign up for Flipkart Pay Later & get free ₹250 gift card.</span>
              </div>
            </div>

            <!-- INTERACTIVE COLOR SELECTION -->
            <div class="detail-option-group">
              <div class="option-group-label">
                <span>Color:</span>
                <span class="option-selected-name" id="selected-color-name">${activeColor.name}</span>
              </div>
              <div class="color-swatches-row">
                ${product.colors.map((c, idx) => `
                  <button class="detail-color-swatch-btn ${idx === selectedColorIndex ? 'active' : ''}" 
                          data-color-index="${idx}"
                          onclick="window.appController.switchDetailColor(${idx})">
                    <span class="swatch-circle" style="background-color: ${c.hex};"></span>
                    <span class="swatch-label">${c.name}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- INTERACTIVE SIZE SELECTION -->
            <div class="detail-option-group">
              <div class="option-group-label">
                <span>Select Shoe Size (UK):</span>
                <span class="option-selected-name" id="selected-size-label">${selectedSize ? selectedSize : 'Please select'}</span>
                <a class="size-helper-link" onclick="window.appController.openSizeGuideModal()"><i class="fa-solid fa-ruler-horizontal"></i> Size Chart</a>
              </div>
              <div class="size-selector-row">
                ${['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'].map(sz => {
                  const sizeObj = product.sizes ? product.sizes.find(s => s.size === sz) : null;
                  const isAvailable = sizeObj ? sizeObj.inStock : true;
                  const isSelected = selectedSize === sz;
                  return `
                    <button class="detail-size-btn ${isSelected ? 'active' : ''} ${!isAvailable ? 'disabled' : ''}"
                            data-size="${sz}"
                            ${!isAvailable ? 'disabled title="Size currently out of stock"' : ''}
                            onclick="window.appController.selectDetailSize('${sz}')">
                      <span>${sz}</span>
                      <small style="font-size: 9px; opacity: 0.8;">${isAvailable ? 'In Stock' : 'Sold Out'}</small>
                    </button>
                  `;
                }).join('')}
              </div>
              <div id="size-warning-msg" style="display: none; color: var(--rating-red); font-size: 12px; margin-top: 6px; font-weight: 600;">
                <i class="fa-solid fa-triangle-exclamation"></i> Please choose a shoe size before proceeding.
              </div>
            </div>

            <!-- Quantity Selector -->
            <div class="detail-option-group">
              <div class="option-group-label">Quantity:</div>
              <div class="quantity-control-row">
                <button class="qty-btn" onclick="window.appController.changeDetailQty(-1)"><i class="fa-solid fa-minus"></i></button>
                <span class="qty-display" id="detail-qty-display">${quantity}</span>
                <button class="qty-btn" onclick="window.appController.changeDetailQty(1)"><i class="fa-solid fa-plus"></i></button>
              </div>
            </div>

            <!-- Delivery & PIN Code Checker -->
            <div class="delivery-checker-box">
              <div class="highlights-title"><i class="fa-solid fa-truck-fast"></i> Check Delivery Availability</div>
              <form class="pincode-form" onsubmit="event.preventDefault(); window.appController.checkPincode();">
                <input type="text" class="pincode-input" id="pincode-input" placeholder="Enter 6 digit PIN code" maxlength="6" value="560034" />
                <button type="submit" class="pincode-btn">Check</button>
              </form>
              <div class="pincode-result success" id="pincode-result-msg">
                <i class="fa-solid fa-circle-check"></i> Delivery by Monday, 24 Nov | Free Delivery
              </div>
            </div>

            <!-- Product Highlights -->
            <div class="product-highlights-box">
              <div class="highlights-title">Product Highlights</div>
              <ul class="highlights-list">
                ${(product.highlights || []).map(h => `<li>${h}</li>`).join('')}
              </ul>
            </div>

            <!-- Description -->
            <div class="product-highlights-box">
              <div class="highlights-title">Product Description</div>
              <p style="font-size: 13.5px; color: var(--text-medium); line-height: 1.6;">${product.description}</p>
            </div>

            <!-- Specifications Table -->
            <div class="product-highlights-box">
              <div class="highlights-title">Specifications</div>
              <table class="specs-table">
                <tbody>
                  ${Object.entries(product.specifications || {}).map(([key, val]) => `
                    <tr>
                      <td>${key}</td>
                      <td>${val}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ============================================================= -->
        <!-- CUSTOMER REVIEW SYSTEM & HORIZONTAL REVIEW SCROLLING -->
        <!-- ============================================================= -->
        <section class="product-reviews-section" id="reviews-section">
          <div class="reviews-section-header">
            <h2 class="reviews-header-title">Ratings & Customer Reviews</h2>
            <button class="btn-write-review" onclick="window.appController.openWriteReviewModal('${product.id}')">
              <i class="fa-solid fa-pen-to-square"></i> Rate & Write a Review
            </button>
          </div>

          <!-- Overall Rating & Breakdown Bars -->
          <div class="ratings-summary-row">
            <div class="overall-score-box">
              <div class="huge-rating-number">
                ${avgRating} <i class="fa-solid fa-star"></i>
              </div>
              <div class="total-ratings-label">
                ${Number(totalRatings).toLocaleString('en-IN')} Ratings &<br/>${Number(totalReviews).toLocaleString('en-IN')} Verified Reviews
              </div>
            </div>

            <div class="breakdown-bars-wrap">
              ${[5, 4, 3, 2, 1].map(star => {
                const pct = breakdown[star] || 0;
                const fillClass = star >= 4 ? '' : (star === 3 ? 'orange' : 'red');
                return `
                  <div class="breakdown-row">
                    <span class="star-label">${star} <i class="fa-solid fa-star"></i></span>
                    <div class="breakdown-track">
                      <div class="breakdown-fill ${fillClass}" style="width: ${pct}%;"></div>
                    </div>
                    <span class="breakdown-percent">${pct}%</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- HORIZONTAL REVIEW SCROLL CAROUSEL -->
          <div class="reviews-carousel-container">
            <button class="carousel-nav-btn carousel-nav-prev" id="review-scroll-prev" onclick="window.appController.scrollReviews(-1)">
              <i class="fa-solid fa-chevron-left"></i>
            </button>
            <div class="reviews-carousel-track" id="reviews-carousel-track">
              ${reviews.map(r => `
                <div class="review-card-item">
                  <div class="review-card-top">
                    <div class="review-user-avatar">${r.author.charAt(0).toUpperCase()}</div>
                    <div class="review-user-meta">
                      <div class="review-author-name">
                        <span>${r.author}</span>
                        ${r.verified ? '<i class="fa-solid fa-circle-check verified-icon" title="Flipkart Verified Buyer"></i>' : ''}
                      </div>
                      <div class="review-location-date">
                        ${r.location || 'India'} • ${r.date}
                      </div>
                    </div>
                  </div>

                  <div class="review-rating-headline">
                    <span class="rating-badge">${r.rating} <i class="fa-solid fa-star"></i></span>
                    <span class="review-title-text">${r.title}</span>
                  </div>

                  <p class="review-comment-body">${r.comment}</p>

                  <div class="review-card-footer">
                    <span>Certified Buyer</span>
                    <button class="helpful-vote-btn" onclick="window.appController.voteHelpful('${r.id}')">
                      <i class="fa-regular fa-thumbs-up"></i> Helpful (${r.helpfulCount || 0})
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
            <button class="carousel-nav-btn carousel-nav-next" id="review-scroll-next" onclick="window.appController.scrollReviews(1)">
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>

        <!-- ============================================================= -->
        <!-- CONTINUOUS PRODUCT BROWSING: YOU MAY ALSO LIKE -->
        <!-- ============================================================= -->
        <section class="continuous-section">
          <div class="section-header">
            <div class="section-title-wrap">
              <h2 class="section-title">You May Also Like</h2>
              <span class="section-subtitle">Related ${product.categoryName} recommendations</span>
            </div>
            <a href="#products?category=${product.category}" class="view-all-btn">SEE ALL <i class="fa-solid fa-chevron-right"></i></a>
          </div>
          <div class="products-horizontal-scroll">
            ${relatedProducts.map(p => this.renderProductCard(p)).join('')}
          </div>
        </section>

        <!-- ============================================================= -->
        <!-- CONTINUOUS PRODUCT BROWSING: MORE POPULAR FOOTWEAR -->
        <!-- ============================================================= -->
        <section class="continuous-section">
          <div class="section-header">
            <div class="section-title-wrap">
              <h2 class="section-title">More Products to Explore</h2>
              <span class="section-subtitle">Trending shoes across other categories</span>
            </div>
            <a href="#products" class="view-all-btn">BROWSE ENTIRE STORE <i class="fa-solid fa-chevron-right"></i></a>
          </div>
          <div class="products-grid">
            ${moreProducts.map(p => this.renderProductCard(p)).join('')}
          </div>
        </section>
      </div>
    `;
  },

  // -------------------------------------------------------------
  // SHOPPING CART VIEW
  // -------------------------------------------------------------
  renderCartPage() {
    const summary = Store.getCartSummary();
    const items = summary.items;

    if (!items || items.length === 0) {
      return `
        <div class="empty-cart-card">
          <i class="fa-solid fa-cart-shopping" style="font-size: 64px; color: var(--primary); margin-bottom: 16px;"></i>
          <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Your Shopping Cart is Empty!</h2>
          <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 24px;">Explore our 30 unique shoe designs and add your favorites to cart.</p>
          <a href="#products" class="btn-primary" style="display: inline-block; padding: 12px 28px; font-size: 15px;">Shop Now</a>
        </div>
      `;
    }

    return `
      <div class="cart-page-layout">
        <!-- Left: Cart Items List -->
        <div class="cart-items-column">
          <div class="cart-header-row">
            <h2 class="cart-header-title">My Cart (${summary.itemCount} Items)</h2>
            <span style="font-size: 13px; color: var(--text-muted);"><i class="fa-solid fa-location-dot"></i> Deliver to: <strong>560034</strong></span>
          </div>

          <div class="cart-items-list">
            ${items.map((item, index) => `
              <div class="cart-item-card">
                <div class="cart-item-img-wrap" onclick="window.location.hash='#product/${item.productId}'" style="cursor: pointer;">
                  <img src="${item.image}" alt="${item.product.name}" onerror="handleImageError(this, '${item.product.category}', '${item.colorHex}', '${item.product.name.replace(/'/g, '')}')" />
                </div>
                <div class="cart-item-details">
                  <h3 class="cart-item-title" onclick="window.location.hash='#product/${item.productId}'" style="cursor: pointer;">${item.product.name}</h3>
                  <div class="cart-item-variant">
                    Size: <strong>${item.size}</strong> • Color: <strong>${item.colorName}</strong> • Brand: <strong>${item.product.brand}</strong>
                  </div>
                  <div class="cart-item-price-row">
                    <span class="current-price">${this.formatPrice(item.unitPrice)}</span>
                    <span class="original-price">${this.formatPrice(item.unitMRP)}</span>
                    <span class="discount-text">${item.product.discount}% off</span>
                  </div>
                  <div class="cart-item-actions">
                    <div class="cart-qty-wrap">
                      <button class="qty-btn" onclick="window.appController.updateCartQty(${index}, ${item.quantity - 1})"><i class="fa-solid fa-minus"></i></button>
                      <span class="qty-display">${item.quantity}</span>
                      <button class="qty-btn" onclick="window.appController.updateCartQty(${index}, ${item.quantity + 1})"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    <button class="cart-action-link" onclick="window.appController.removeCartItem(${index})">REMOVE</button>
                    <button class="cart-action-link" onclick="window.appController.moveCartToWishlist(${index}, '${item.productId}')">SAVE FOR LATER</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="cart-bottom-actions">
            <a href="#products" class="btn-continue-shopping"><i class="fa-solid fa-chevron-left"></i> CONTINUE SHOPPING</a>
            <button class="btn-place-order" onclick="window.location.hash='#checkout'">PLACE ORDER</button>
          </div>
        </div>

        <!-- Right: Price Details Summary -->
        <div class="price-details-card">
          <div class="price-details-header">Price Details</div>
          <div class="price-details-body">
            <div class="price-summary-row">
              <span>Price (${summary.itemCount} items)</span>
              <span>${this.formatPrice(summary.totalMRP)}</span>
            </div>
            <div class="price-summary-row discount">
              <span>Discount on MRP</span>
              <span>- ${this.formatPrice(summary.discountOnMRP)}</span>
            </div>
            ${summary.couponDiscount > 0 ? `
              <div class="price-summary-row discount">
                <span>Coupon (${summary.activeCoupon ? summary.activeCoupon.code : 'PROMO'})</span>
                <span>- ${this.formatPrice(summary.couponDiscount)}</span>
              </div>
            ` : ''}
            <div class="price-summary-row">
              <span>Delivery Charges</span>
              <span style="color: var(--success-green); font-weight: 700;">${summary.deliveryFee === 0 ? 'FREE' : this.formatPrice(summary.deliveryFee)}</span>
            </div>
            <div class="price-summary-row total">
              <span>Total Amount</span>
              <span>${this.formatPrice(summary.finalAmount)}</span>
            </div>
            <div class="savings-highlight">
              <i class="fa-solid fa-circle-check"></i> You will save ${this.formatPrice(summary.totalSavings)} on this order
            </div>
          </div>

          <!-- Coupon Code Input -->
          <div class="coupon-box">
            <form onsubmit="event.preventDefault(); window.appController.applyCouponCode();">
              <div class="coupon-input-row">
                <input type="text" class="coupon-input" id="cart-coupon-input" 
                       placeholder="Have a coupon? Try SOLE20" 
                       value="${summary.activeCoupon ? summary.activeCoupon.code : ''}" />
                <button type="submit" class="btn-apply-coupon">
                  ${summary.activeCoupon ? 'CHANGE' : 'APPLY'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  // -------------------------------------------------------------
  // CHECKOUT VIEW
  // -------------------------------------------------------------
  renderCheckoutPage() {
    const summary = Store.getCartSummary();
    const address = Store.getSavedAddress();

    return `
      <div class="checkout-layout">
        <!-- Steps Column -->
        <div class="checkout-steps-column">
          <!-- Step 1: Delivery Address -->
          <div class="checkout-step-card">
            <div class="checkout-step-header active">
              <span class="step-number-badge">1</span>
              <span class="checkout-step-title">DELIVERY ADDRESS</span>
            </div>
            <div class="checkout-step-body">
              <form id="checkout-address-form">
                <div class="address-form-grid">
                  <div>
                    <label class="form-label">Full Name *</label>
                    <input type="text" class="form-input" id="addr-name" required value="${address.fullName || ''}" />
                  </div>
                  <div>
                    <label class="form-label">10-Digit Mobile Number *</label>
                    <input type="tel" class="form-input" id="addr-phone" required maxlength="10" value="${address.phone || ''}" />
                  </div>
                  <div>
                    <label class="form-label">Pincode *</label>
                    <input type="text" class="form-input" id="addr-pincode" required maxlength="6" value="${address.pincode || ''}" />
                  </div>
                  <div>
                    <label class="form-label">Locality / Landmark</label>
                    <input type="text" class="form-input" id="addr-landmark" value="${address.landmark || ''}" />
                  </div>
                  <div class="full-col">
                    <label class="form-label">Address (Flat, House no., Building, Company, Apartment) *</label>
                    <input type="text" class="form-input" id="addr-line1" required value="${address.houseNo || ''}" />
                  </div>
                  <div class="full-col">
                    <label class="form-label">Area, Colony, Street, Sector, Village *</label>
                    <input type="text" class="form-input" id="addr-line2" required value="${address.street || ''}" />
                  </div>
                  <div>
                    <label class="form-label">City / District / Town *</label>
                    <input type="text" class="form-input" id="addr-city" required value="${address.city || ''}" />
                  </div>
                  <div>
                    <label class="form-label">State *</label>
                    <input type="text" class="form-input" id="addr-state" required value="${address.state || 'Karnataka'}" />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Step 2: Order Summary Review -->
          <div class="checkout-step-card">
            <div class="checkout-step-header">
              <span class="step-number-badge">2</span>
              <span class="checkout-step-title">ORDER SUMMARY (${summary.itemCount} Items)</span>
            </div>
            <div class="checkout-step-body">
              ${summary.items.map(item => `
                <div style="display: flex; gap: 14px; padding: 10px 0; border-bottom: 1px solid var(--border-subtle); align-items: center;">
                  <img src="${item.image}" alt="${item.product.name}" style="width: 50px; height: 50px; object-fit: contain;" onerror="handleImageError(this, '${item.product.category}', '${item.colorHex}', '${item.product.name.replace(/'/g, '')}')"/>
                  <div style="flex: 1;">
                    <div style="font-weight: 600; font-size: 13.5px;">${item.product.name}</div>
                    <div style="font-size: 12px; color: var(--text-muted);">Size: ${item.size} • Color: ${item.colorName} • Qty: ${item.quantity}</div>
                  </div>
                  <div style="font-weight: 700; font-size: 14px;">${this.formatPrice(item.subtotalPrice)}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Step 3: Payment Options -->
          <div class="checkout-step-card">
            <div class="checkout-step-header active">
              <span class="step-number-badge">3</span>
              <span class="checkout-step-title">PAYMENT OPTIONS</span>
            </div>
            <div class="checkout-step-body">
              <div class="payment-methods-list" id="payment-methods-group">
                <div class="payment-method-item active" data-method="upi" onclick="window.appController.selectPaymentMethod(this)">
                  <label class="payment-method-radio">
                    <input type="radio" name="payment_method" value="UPI" checked />
                    <span><i class="fa-solid fa-mobile-screen-button"></i> UPI (Google Pay, PhonePe, Paytm, Any UPI ID)</span>
                  </label>
                  <div class="payment-details-expanded">
                    Instant zero-fee payment with instant order dispatch.
                  </div>
                </div>

                <div class="payment-method-item" data-method="card" onclick="window.appController.selectPaymentMethod(this)">
                  <label class="payment-method-radio">
                    <input type="radio" name="payment_method" value="Card" />
                    <span><i class="fa-solid fa-credit-card"></i> Credit / Debit / ATM Card</span>
                  </label>
                  <div class="payment-details-expanded" style="display: none;">
                    Accepts Visa, MasterCard, RuPay, and Maestro.
                  </div>
                </div>

                <div class="payment-method-item" data-method="cod" onclick="window.appController.selectPaymentMethod(this)">
                  <label class="payment-method-radio">
                    <input type="radio" name="payment_method" value="COD" />
                    <span><i class="fa-solid fa-money-bill-wave"></i> Cash on Delivery (COD)</span>
                  </label>
                  <div class="payment-details-expanded" style="display: none;">
                    Pay in cash or UPI to the delivery courier when your shoes arrive.
                  </div>
                </div>
              </div>

              <div style="margin-top: 24px;">
                <button class="btn-place-order" style="width: 100%; font-size: 16px; padding: 14px;" onclick="window.appController.submitPlaceOrder()">
                  <i class="fa-solid fa-shield-halved"></i> CONFIRM & PLACE ORDER (${this.formatPrice(summary.finalAmount)})
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Summary Card -->
        <div class="price-details-card">
          <div class="price-details-header">Price Details</div>
          <div class="price-details-body">
            <div class="price-summary-row">
              <span>Total MRP</span>
              <span>${this.formatPrice(summary.totalMRP)}</span>
            </div>
            <div class="price-summary-row discount">
              <span>Discount on MRP</span>
              <span>- ${this.formatPrice(summary.discountOnMRP)}</span>
            </div>
            ${summary.couponDiscount > 0 ? `
              <div class="price-summary-row discount">
                <span>Coupon Discount</span>
                <span>- ${this.formatPrice(summary.couponDiscount)}</span>
              </div>
            ` : ''}
            <div class="price-summary-row">
              <span>Delivery Charges</span>
              <span style="color: var(--success-green); font-weight: 700;">FREE</span>
            </div>
            <div class="price-summary-row total">
              <span>Amount Payable</span>
              <span>${this.formatPrice(summary.finalAmount)}</span>
            </div>
            <div class="savings-highlight">
              <i class="fa-solid fa-circle-check"></i> Total Savings: ${this.formatPrice(summary.totalSavings)}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // -------------------------------------------------------------
  // ORDER CONFIRMATION VIEW
  // -------------------------------------------------------------
  renderOrderSuccessPage(order) {
    if (!order) {
      return `
        <div style="padding: 60px 20px; text-align: center; background: #fff; max-width: 600px; margin: 40px auto; border-radius: 4px;">
          <h2>Order Not Found</h2>
          <a href="#home" class="btn-primary" style="margin-top: 16px; display: inline-block;">Return to Home</a>
        </div>
      `;
    }

    return `
      <div class="order-success-card">
        <div class="order-success-icon">
          <i class="fa-solid fa-check"></i>
        </div>
        <h1 style="font-size: 24px; font-weight: 800; color: var(--text-dark);">Order Confirmed!</h1>
        <p style="color: var(--text-muted); font-size: 14px; margin-top: 4px;">
          Thank you for shopping with SoleStride. We are getting your shoes ready!
        </p>

        <div class="order-id-chip">
          Order ID: ${order.orderId}
        </div>

        <div class="order-tracking-stepper">
          <div class="tracking-step done">
            <div class="step-dot"><i class="fa-solid fa-check"></i></div>
            <span class="step-label">Placed</span>
          </div>
          <div class="tracking-step done">
            <div class="step-dot"><i class="fa-solid fa-box"></i></div>
            <span class="step-label">Packed</span>
          </div>
          <div class="tracking-step">
            <div class="step-dot"><i class="fa-solid fa-truck"></i></div>
            <span class="step-label">Shipped</span>
          </div>
          <div class="tracking-step">
            <div class="step-dot"><i class="fa-solid fa-house-chimney"></i></div>
            <span class="step-label">Delivered</span>
          </div>
        </div>

        <div style="background: #fafafa; border: 1px solid var(--border-light); border-radius: 4px; padding: 18px; margin: 24px 0; text-align: left;">
          <h4 style="font-size: 14px; font-weight: 700; margin-bottom: 8px;">Delivery Details:</h4>
          <p style="font-size: 13px; color: var(--text-dark); margin-bottom: 4px;">
            <strong>${order.address.fullName}</strong> (${order.address.phone})
          </p>
          <p style="font-size: 13px; color: var(--text-medium);">
            ${order.address.houseNo}, ${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}
          </p>
          <div style="font-size: 12.5px; color: var(--success-green); font-weight: 700; margin-top: 8px;">
            <i class="fa-solid fa-calendar-check"></i> Estimated Delivery: ${order.expectedDelivery}
          </div>
        </div>

        <div style="display: flex; gap: 14px; justify-content: center;">
          <a href="#orders" class="btn-secondary" style="padding: 10px 22px;">View in Orders</a>
          <a href="#products" class="btn-primary" style="padding: 10px 24px;">Continue Shopping</a>
        </div>
      </div>
    `;
  },

  // -------------------------------------------------------------
  // WISHLIST VIEW
  // -------------------------------------------------------------
  renderWishlistPage() {
    const products = Store.getWishlistProducts();

    if (products.length === 0) {
      return `
        <div class="empty-cart-card">
          <i class="fa-regular fa-heart" style="font-size: 64px; color: var(--text-muted); margin-bottom: 16px;"></i>
          <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Empty Wishlist</h2>
          <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 24px;">You have not saved any shoes to your wishlist yet.</p>
          <a href="#products" class="btn-primary" style="display: inline-block; padding: 12px 28px;">Explore Shoes</a>
        </div>
      `;
    }

    return `
      <div style="padding: 20px 0 40px;">
        <div class="section-header" style="background: #fff; padding: 16px 20px; border-radius: 4px 4px 0 0; margin-bottom: 0;">
          <h2 class="section-title">My Wishlist (${products.length} Items)</h2>
        </div>
        <div class="products-grid" style="background: #fff; padding: 20px; border-radius: 0 0 4px 4px; box-shadow: var(--shadow-sm);">
          ${products.map(p => this.renderProductCard(p)).join('')}
        </div>
      </div>
    `;
  },

  // -------------------------------------------------------------
  // ORDERS HISTORY VIEW
  // -------------------------------------------------------------
  renderOrdersPage() {
    const orders = Store.getOrders();

    if (orders.length === 0) {
      return `
        <div class="empty-cart-card">
          <i class="fa-solid fa-box-open" style="font-size: 64px; color: var(--text-muted); margin-bottom: 16px;"></i>
          <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">No Orders Placed Yet</h2>
          <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 24px;">Your past orders will appear here after checkout.</p>
          <a href="#products" class="btn-primary" style="display: inline-block; padding: 12px 28px;">Start Shopping</a>
        </div>
      `;
    }

    return `
      <div style="padding: 20px 0 40px; max-width: 900px; margin: 0 auto;">
        <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 18px;">Past Orders (${orders.length})</h2>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          ${orders.map(order => `
            <div style="background: #fff; border-radius: 4px; box-shadow: var(--shadow-sm); border: 1px solid var(--border-light); padding: 20px;">
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-light); padding-bottom: 12px; margin-bottom: 14px; font-size: 13px;">
                <div>
                  <span style="color: var(--text-muted);">Order ID:</span> <strong>${order.orderId}</strong>
                  <span style="margin: 0 8px; color: var(--border-light);">|</span>
                  <span style="color: var(--text-muted);">Placed on:</span> ${new Date(order.orderDate).toLocaleDateString('en-IN')}
                </div>
                <div>
                  <span class="flipkart-assured-pill"><i class="fa-solid fa-check"></i> ${order.status}</span>
                </div>
              </div>

              ${order.items.map(item => `
                <div style="display: flex; gap: 16px; margin-bottom: 12px; align-items: center;">
                  <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: contain; background: #fafafa; border-radius: 4px;" onerror="handleImageError(this, 'running', '#333', '${item.name.replace(/'/g, '')}')"/>
                  <div style="flex: 1;">
                    <h4 style="font-size: 14px; font-weight: 600;">${item.name}</h4>
                    <div style="font-size: 12px; color: var(--text-muted);">Size: ${item.size} • Color: ${item.colorName} • Qty: ${item.quantity}</div>
                  </div>
                  <div style="font-weight: 700; font-size: 15px;">${this.formatPrice(item.subtotal)}</div>
                </div>
              `).join('')}

              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-light); padding-top: 12px; margin-top: 12px;">
                <div style="font-size: 13px; color: var(--success-green); font-weight: 600;">
                  <i class="fa-solid fa-truck"></i> Delivery by: ${order.expectedDelivery}
                </div>
                <div style="font-weight: 800; font-size: 16px;">
                  Total: ${this.formatPrice(order.totals.finalAmount)}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
};
