/**
 * Central Application Controller & Single-Page Router for SoleStride
 */

import { PRODUCTS, SHOE_CATEGORIES } from './products.js';
import { Store } from './store.js';
import { UI } from './ui.js';

class AppController {
  constructor() {
    this.currentRoute = 'home';
    this.routeParams = {};
    this.catalogFilters = {
      category: 'all',
      maxPrice: 15000,
      sizes: [],
      brands: [],
      minRating: 0,
      sort: 'popularity',
      searchQuery: ''
    };
    this.detailState = {
      selectedColorIndex: 0,
      selectedSize: '',
      quantity: 1,
      activeImage: ''
    };
    this.heroInterval = null;
    this.currentHeroSlide = 0;
  }

  init() {
    // Subscribe store changes to update header counts
    Store.subscribe((event, payload) => {
      UI.updateHeaderBadges();
      if (event === 'cart_updated' && this.currentRoute === 'cart') {
        this.renderCurrentRoute();
      }
      if (event === 'wishlist_updated' && this.currentRoute === 'wishlist') {
        this.renderCurrentRoute();
      }
    });

    // Attach global window listeners
    window.addEventListener('hashchange', () => this.handleHashChange());
    window.addEventListener('DOMContentLoaded', () => {
      this.bindHeaderEvents();
      this.handleHashChange();
      UI.updateHeaderBadges();
    });

    // Make appController accessible to inline HTML event handlers
    window.appController = this;
  }

  // -------------------------------------------------------------
  // ROUTING LOGIC
  // -------------------------------------------------------------
  handleHashChange() {
    const rawHash = window.location.hash.slice(1).trim();
    const [pathPart, queryPart] = rawHash.split('?');
    const path = pathPart || 'home';

    // Parse query params
    const queryParams = {};
    if (queryPart) {
      queryPart.split('&').forEach(param => {
        const [k, v] = param.split('=');
        if (k) queryParams[decodeURIComponent(k)] = decodeURIComponent(v || '');
      });
    }

    if (path.startsWith('product/')) {
      const productId = path.replace('product/', '');
      this.currentRoute = 'product-detail';
      this.routeParams = { productId, ...queryParams };
    } else if (path.startsWith('order-success/')) {
      const orderId = path.replace('order-success/', '');
      this.currentRoute = 'order-success';
      this.routeParams = { orderId };
    } else if (path === 'products') {
      this.currentRoute = 'products';
      this.routeParams = queryParams;
    } else if (path === 'cart') {
      this.currentRoute = 'cart';
      this.routeParams = queryParams;
    } else if (path === 'checkout') {
      this.currentRoute = 'checkout';
      this.routeParams = queryParams;
    } else if (path === 'wishlist') {
      this.currentRoute = 'wishlist';
      this.routeParams = queryParams;
    } else if (path === 'orders') {
      this.currentRoute = 'orders';
      this.routeParams = queryParams;
    } else {
      this.currentRoute = 'home';
      this.routeParams = queryParams;
    }

    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.renderCurrentRoute();
  }

  renderCurrentRoute() {
    const mainContainer = document.getElementById('main-content');
    if (!mainContainer) return;

    document.body.classList.toggle('product-detail-mobile', this.currentRoute === 'product-detail');
    this.closeMobileCatalogSheets();

    // Clear existing hero interval if any
    if (this.heroInterval) {
      clearInterval(this.heroInterval);
      this.heroInterval = null;
    }

    // Update active state in sub-nav
    document.querySelectorAll('.cat-nav-link').forEach(link => {
      const cat = link.getAttribute('data-cat');
      if (this.currentRoute === 'products' && this.catalogFilters.category === cat) {
        link.classList.add('active');
      } else if (this.currentRoute === 'home' && cat === 'all') {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    switch (this.currentRoute) {
      case 'home':
        mainContainer.innerHTML = UI.renderHomePage();
        this.initHeroSlider();
        break;

      case 'products':
        // Update catalog filters from route params
        if (this.routeParams.category) {
          this.catalogFilters.category = this.routeParams.category;
        }
        if (this.routeParams.sort) {
          this.catalogFilters.sort = this.routeParams.sort;
        }
        if (this.routeParams.q) {
          this.catalogFilters.searchQuery = this.routeParams.q;
        }
        if (this.routeParams.rating) {
          this.catalogFilters.minRating = Number(this.routeParams.rating);
        }

        mainContainer.innerHTML = UI.renderCatalogPage(this.catalogFilters);
        this.bindCatalogEvents();
        this.applyCatalogFilters();
        break;

      case 'product-detail': {
        const product = Store.getProductById(this.routeParams.productId);
        if (product) {
          Store.addRecentlyViewed(product.id);
          // Reset detail state for new product
          this.detailState = {
            selectedColorIndex: 0,
            selectedSize: '',
            quantity: 1,
            activeImage: (product.colors && product.colors[0] && product.colors[0].mainImage) || ''
          };
          mainContainer.innerHTML = UI.renderProductDetailsPage(product, this.detailState);
          this.initReviewCarouselGestures();
        } else {
          mainContainer.innerHTML = UI.renderProductDetailsPage(null);
        }
        break;
      }

      case 'cart':
        mainContainer.innerHTML = UI.renderCartPage();
        break;

      case 'checkout':
        mainContainer.innerHTML = UI.renderCheckoutPage();
        break;

      case 'order-success': {
        const order = Store.getOrderById(this.routeParams.orderId);
        mainContainer.innerHTML = UI.renderOrderSuccessPage(order);
        break;
      }

      case 'wishlist':
        mainContainer.innerHTML = UI.renderWishlistPage();
        break;

      case 'orders':
        mainContainer.innerHTML = UI.renderOrdersPage();
        break;

      default:
        mainContainer.innerHTML = UI.renderHomePage();
        this.initHeroSlider();
    }
  }

  // -------------------------------------------------------------
  // HEADER & GLOBAL EVENT BINDING
  // -------------------------------------------------------------
  bindHeaderEvents() {
    const searchInput = document.getElementById('header-search-input');
    const searchDropdown = document.getElementById('search-dropdown');
    const searchForm = document.getElementById('header-search-form');

    // Live autocomplete search
    if (searchInput && searchDropdown) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        if (q.length < 2) {
          searchDropdown.classList.remove('active');
          searchDropdown.innerHTML = '';
          return;
        }

        const matches = Store.getAllProducts().filter(p => 
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        ).slice(0, 6);

        if (matches.length === 0) {
          searchDropdown.innerHTML = `
            <div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 13px;">
              No shoes found for "${q}". Try "Nike", "Running", or "Sneakers".
            </div>
          `;
          searchDropdown.classList.add('active');
          return;
        }

        searchDropdown.innerHTML = matches.map(p => {
          const img = (p.colors && p.colors[0]) ? p.colors[0].mainImage : '';
          return `
            <div class="search-result-item" onclick="window.location.hash='#product/${p.id}'; document.getElementById('search-dropdown').classList.remove('active');">
              <img class="search-result-thumb" src="${img}" alt="${p.name}" onerror="handleImageError(this, '${p.category}', '#333', '${p.name.replace(/'/g, '')}')"/>
              <div class="search-result-info">
                <div class="search-result-title">${p.name}</div>
                <div class="search-result-meta">
                  <span class="search-result-price">${UI.formatPrice(p.price)}</span>
                  <span>in ${p.categoryName}</span>
                  <span style="color: var(--success-green); font-weight: 700;">${p.rating}★</span>
                </div>
              </div>
            </div>
          `;
        }).join('');
        searchDropdown.classList.add('active');
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
          searchDropdown.classList.remove('active');
        }
      });
    }

    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const q = searchInput.value.trim();
        if (searchDropdown) searchDropdown.classList.remove('active');
        if (q) {
          window.location.hash = `#products?q=${encodeURIComponent(q)}`;
        }
      });
    }

    // Mobile filter drawer toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        const sidebar = document.getElementById('filters-sidebar');
        if (sidebar) {
        if (sidebar.classList.contains('open')) {
          this.closeMobileCatalogSheets();
        } else {
          this.openMobileCatalogSheet('filter');
        }
        } else {
          window.location.hash = '#products';
        }
      });
    }
  }

  // -------------------------------------------------------------
  // HERO SLIDER LOGIC
  // -------------------------------------------------------------
  initHeroSlider() {
    const track = document.getElementById('slider-track');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('slider-prev-btn');
    const nextBtn = document.getElementById('slider-next-btn');

    if (!track) return;

    this.currentHeroSlide = 0;
    const totalSlides = 3;

    const goToSlide = (idx) => {
      this.currentHeroSlide = (idx + totalSlides) % totalSlides;
      track.style.transform = `translateX(-${this.currentHeroSlide * 100}%)`;
      dots.forEach((d, i) => {
        if (i === this.currentHeroSlide) d.classList.add('active');
        else d.classList.remove('active');
      });
    };

    if (prevBtn) prevBtn.onclick = () => goToSlide(this.currentHeroSlide - 1);
    if (nextBtn) nextBtn.onclick = () => goToSlide(this.currentHeroSlide + 1);

    dots.forEach((dot, idx) => {
      dot.onclick = () => goToSlide(idx);
    });

    // Auto rotate every 5 seconds
    this.heroInterval = setInterval(() => {
      goToSlide(this.currentHeroSlide + 1);
    }, 5000);

    const slider = document.getElementById('hero-slider');
    if (slider) {
      slider.addEventListener('mouseenter', () => clearInterval(this.heroInterval));
      slider.addEventListener('mouseleave', () => {
        clearInterval(this.heroInterval);
        this.heroInterval = setInterval(() => goToSlide(this.currentHeroSlide + 1), 5000);
      });
    }
  }

  // -------------------------------------------------------------
  // CATALOG FILTER & SORT LOGIC
  // -------------------------------------------------------------
  bindCatalogEvents() {
    // Category items click
    document.querySelectorAll('.filter-category-item').forEach(item => {
      item.onclick = () => {
        const cat = item.getAttribute('data-cat');
        this.catalogFilters.category = cat;
        this.applyCatalogFilters();
      };
    });

    // Price range slider
    const priceSlider = document.getElementById('price-filter-slider');
    const priceDisplay = document.getElementById('price-slider-display');
    if (priceSlider) {
      priceSlider.oninput = (e) => {
        const val = Number(e.target.value);
        this.catalogFilters.maxPrice = val;
        if (priceDisplay) priceDisplay.textContent = `Up to ${UI.formatPrice(val)}`;
        this.applyCatalogFilters();
      };
    }

    // Size filter buttons
    document.querySelectorAll('.size-filter-btn').forEach(btn => {
      btn.onclick = () => {
        const sz = btn.getAttribute('data-size');
        const idx = this.catalogFilters.sizes.indexOf(sz);
        if (idx > -1) {
          this.catalogFilters.sizes.splice(idx, 1);
          btn.classList.remove('active');
        } else {
          this.catalogFilters.sizes.push(sz);
          btn.classList.add('active');
        }
        this.applyCatalogFilters();
      };
    });

    // Brand checkboxes
    document.querySelectorAll('input[name="brand"]').forEach(cb => {
      cb.onchange = () => {
        const checkedBrands = Array.from(document.querySelectorAll('input[name="brand"]:checked')).map(c => c.value);
        this.catalogFilters.brands = checkedBrands;
        this.applyCatalogFilters();
      };
    });

    // Rating radio
    document.querySelectorAll('input[name="rating"]').forEach(rb => {
      rb.onchange = () => {
        this.catalogFilters.minRating = Number(rb.value);
        this.applyCatalogFilters();
      };
    });

    // Sort tabs
    document.querySelectorAll('.sort-tab-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.sort-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.catalogFilters.sort = btn.getAttribute('data-sort');
        this.applyCatalogFilters();
        this.closeMobileCatalogSheets();
      };
    });

    // Clear all filters
    const clearBtn = document.getElementById('clear-all-filters-btn');
    if (clearBtn) {
      clearBtn.onclick = () => {
        this.catalogFilters = {
          category: 'all',
          maxPrice: 15000,
          sizes: [],
          brands: [],
          minRating: 0,
          sort: 'popularity',
          searchQuery: ''
        };
        // Reset UI controls
        if (priceSlider) {
          priceSlider.value = 15000;
          if (priceDisplay) priceDisplay.textContent = 'Up to ₹15,000';
        }
        document.querySelectorAll('.size-filter-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('input[name="brand"]').forEach(c => c.checked = false);
        document.querySelectorAll('.sort-tab-btn').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-sort') === 'popularity');
        });
        const allRatingsRadio = document.querySelector('input[name="rating"][value="0"]');
        if (allRatingsRadio) allRatingsRadio.checked = true;
        this.applyCatalogFilters();
      };
    }

    const filterToggle = document.getElementById('mobile-filter-toggle');
    const sortToggle = document.getElementById('mobile-sort-toggle');
    const overlay = document.getElementById('catalog-sheet-overlay');
    const filterDone = document.getElementById('mobile-filter-done');

    if (filterToggle) {
      filterToggle.onclick = () => this.openMobileCatalogSheet('filter');
    }
    if (sortToggle) {
      sortToggle.onclick = () => this.openMobileCatalogSheet('sort');
    }
    if (overlay) {
      overlay.onclick = () => this.closeMobileCatalogSheets();
    }
    if (filterDone) {
      filterDone.onclick = () => this.closeMobileCatalogSheets();
    }
  }

  openMobileCatalogSheet(type) {
    const sidebar = document.getElementById('filters-sidebar');
    const sortSheet = document.querySelector('.sort-tabs-wrap');
    const overlay = document.getElementById('catalog-sheet-overlay');
    const selectedSheet = type === 'filter' ? sidebar : sortSheet;

    if (!selectedSheet) return;
    const wasOpen = selectedSheet.classList.contains('open');
    this.closeMobileCatalogSheets();

    if (!wasOpen) {
      selectedSheet.classList.add('open');
      if (overlay) overlay.classList.add('active');
      document.body.classList.add('catalog-sheet-open');
    }
  }

  closeMobileCatalogSheets() {
    const sidebar = document.getElementById('filters-sidebar');
    const sortSheet = document.querySelector('.sort-tabs-wrap');
    const overlay = document.getElementById('catalog-sheet-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (sortSheet) sortSheet.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.classList.remove('catalog-sheet-open');
  }

  applyCatalogFilters() {
    let filtered = Store.getAllProducts();

    // Filter by Category
    if (this.catalogFilters.category && this.catalogFilters.category !== 'all') {
      filtered = filtered.filter(p => p.category === this.catalogFilters.category);
    }

    // Filter by Max Price
    if (this.catalogFilters.maxPrice) {
      filtered = filtered.filter(p => p.price <= this.catalogFilters.maxPrice);
    }

    // Filter by Sizes
    if (this.catalogFilters.sizes && this.catalogFilters.sizes.length > 0) {
      filtered = filtered.filter(p => {
        return this.catalogFilters.sizes.some(sz => {
          return p.sizes && p.sizes.some(s => s.size === sz && s.inStock);
        });
      });
    }

    // Filter by Brands
    if (this.catalogFilters.brands && this.catalogFilters.brands.length > 0) {
      filtered = filtered.filter(p => this.catalogFilters.brands.includes(p.brand));
    }

    // Filter by Rating
    if (this.catalogFilters.minRating > 0) {
      filtered = filtered.filter(p => p.rating >= this.catalogFilters.minRating);
    }

    // Filter by Search Query
    if (this.catalogFilters.searchQuery) {
      const q = this.catalogFilters.searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
      );
    }

    // Sort Products
    switch (this.catalogFilters.sort) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.tag === 'New Arrival' ? 1 : 0) - (a.tag === 'New Arrival' ? 1 : 0));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
      default:
        filtered.sort((a, b) => b.ratingCount - a.ratingCount);
        break;
    }

    // Update count in UI
    const countDisplay = document.getElementById('catalog-count-num');
    if (countDisplay) countDisplay.textContent = filtered.length;
    const mobileCountDisplay = document.getElementById('mobile-filter-result-count');
    if (mobileCountDisplay) mobileCountDisplay.textContent = filtered.length;
    const mobileSortLabel = document.getElementById('mobile-sort-label');
    const activeSort = document.querySelector('.sort-tab-btn.active');
    if (mobileSortLabel && activeSort) mobileSortLabel.textContent = activeSort.textContent.trim();

    // Update category active styles in sidebar
    document.querySelectorAll('.filter-category-item').forEach(item => {
      const cat = item.getAttribute('data-cat');
      if (cat === this.catalogFilters.category) item.classList.add('active');
      else item.classList.remove('active');
    });

    // Render Active Filter Pills
    this.renderActiveFilterPills();

    // Render Products Grid
    const grid = document.getElementById('catalog-products-grid');
    if (!grid) return;

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-catalog-state" style="grid-column: 1 / -1;">
          <div class="empty-catalog-icon"><i class="fa-solid fa-filter-circle-xmark"></i></div>
          <h3 class="empty-catalog-title">No Matching Shoes Found</h3>
          <p class="empty-catalog-desc">Try clearing some filters or searching for another shoe design.</p>
          <button class="btn-primary" onclick="document.getElementById('clear-all-filters-btn').click()">Reset All Filters</button>
        </div>
      `;
    } else {
      grid.innerHTML = filtered.map(p => UI.renderProductCard(p)).join('');
    }
  }

  renderActiveFilterPills() {
    const pillsContainer = document.getElementById('active-filter-pills');
    if (!pillsContainer) return;

    const pills = [];

    if (this.catalogFilters.category && this.catalogFilters.category !== 'all') {
      const cat = SHOE_CATEGORIES.find(c => c.id === this.catalogFilters.category);
      if (cat) {
        pills.push({
          label: `Category: ${cat.name}`,
          onRemove: () => {
            this.catalogFilters.category = 'all';
            this.applyCatalogFilters();
          }
        });
      }
    }

    if (this.catalogFilters.maxPrice && this.catalogFilters.maxPrice < 15000) {
      pills.push({
        label: `Max: ${UI.formatPrice(this.catalogFilters.maxPrice)}`,
        onRemove: () => {
          this.catalogFilters.maxPrice = 15000;
          const slider = document.getElementById('price-filter-slider');
          if (slider) slider.value = 15000;
          this.applyCatalogFilters();
        }
      });
    }

    (this.catalogFilters.sizes || []).forEach(sz => {
      pills.push({
        label: `Size: ${sz}`,
        onRemove: () => {
          this.catalogFilters.sizes = this.catalogFilters.sizes.filter(s => s !== sz);
          document.querySelectorAll(`.size-filter-btn[data-size="${sz}"]`).forEach(b => b.classList.remove('active'));
          this.applyCatalogFilters();
        }
      });
    });

    (this.catalogFilters.brands || []).forEach(b => {
      pills.push({
        label: `Brand: ${b}`,
        onRemove: () => {
          this.catalogFilters.brands = this.catalogFilters.brands.filter(brand => brand !== b);
          const cb = document.querySelector(`input[name="brand"][value="${b}"]`);
          if (cb) cb.checked = false;
          this.applyCatalogFilters();
        }
      });
    });

    if (this.catalogFilters.minRating > 0) {
      pills.push({
        label: `Rating: ${this.catalogFilters.minRating}★+`,
        onRemove: () => {
          this.catalogFilters.minRating = 0;
          const allR = document.querySelector('input[name="rating"][value="0"]');
          if (allR) allR.checked = true;
          this.applyCatalogFilters();
        }
      });
    }

    pillsContainer.innerHTML = pills.map((p, idx) => `
      <div class="filter-pill" id="filter-pill-${idx}">
        <span>${p.label}</span>
        <i class="fa-solid fa-xmark"></i>
      </div>
    `).join('');

    pills.forEach((p, idx) => {
      const el = document.getElementById(`filter-pill-${idx}`);
      if (el) el.onclick = p.onRemove;
    });
  }

  // -------------------------------------------------------------
  // FULL-SCREEN PRODUCT DETAILS INTERACTIONS
  // -------------------------------------------------------------
  switchDetailImage(newSrc) {
    const mainImg = document.getElementById('detail-main-display-img');
    if (mainImg) {
      mainImg.src = newSrc;
      this.detailState.activeImage = newSrc;
    }
    document.querySelectorAll('.gallery-thumb-item').forEach(t => {
      if (t.getAttribute('data-thumb-src') === newSrc) t.classList.add('active');
      else t.classList.remove('active');
    });
  }

  switchDetailColor(colorIndex) {
    const product = Store.getProductById(this.routeParams.productId);
    if (!product || !product.colors[colorIndex]) return;

    this.detailState.selectedColorIndex = colorIndex;
    const selectedColor = product.colors[colorIndex];

    // Update active swatch button styling
    document.querySelectorAll('.detail-color-swatch-btn').forEach((btn, idx) => {
      if (idx === colorIndex) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    // Update selected color label
    const colorLabel = document.getElementById('selected-color-name');
    if (colorLabel) colorLabel.textContent = selectedColor.name;

    // Switch main image & gallery thumbnails
    this.detailState.activeImage = selectedColor.mainImage;
    const mainImg = document.getElementById('detail-main-display-img');
    if (mainImg) mainImg.src = selectedColor.mainImage;

    const galleryImages = (selectedColor.gallery && selectedColor.gallery.length > 0) 
      ? selectedColor.gallery 
      : [selectedColor.mainImage];

    const thumbsContainer = document.getElementById('gallery-thumbs-strip');
    if (thumbsContainer) {
      thumbsContainer.innerHTML = galleryImages.map((img, idx) => `
        <div class="gallery-thumb-item ${img === selectedColor.mainImage ? 'active' : ''}" 
             data-thumb-src="${img}"
             onclick="window.appController.switchDetailImage('${img}')">
          <img src="${img}" alt="Angle ${idx + 1}" onerror="handleImageError(this, '${product.category}', '${selectedColor.hex}', '${product.name.replace(/'/g, '')}')"/>
        </div>
      `).join('');
    }

    UI.showToast(`Switched color to: ${selectedColor.name}`, 'success');
  }

  selectDetailSize(sz) {
    this.detailState.selectedSize = sz;

    document.querySelectorAll('.detail-size-btn').forEach(btn => {
      if (btn.getAttribute('data-size') === sz) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    const sizeLabel = document.getElementById('selected-size-label');
    if (sizeLabel) sizeLabel.textContent = sz;

    const warning = document.getElementById('size-warning-msg');
    if (warning) warning.style.display = 'none';

    UI.showToast(`Selected size: ${sz}`, 'success');
  }

  changeDetailQty(delta) {
    const newQty = Math.min(10, Math.max(1, this.detailState.quantity + delta));
    this.detailState.quantity = newQty;
    const display = document.getElementById('detail-qty-display');
    if (display) display.textContent = newQty;
  }

  checkPincode() {
    const input = document.getElementById('pincode-input');
    const result = document.getElementById('pincode-result-msg');
    if (!input || !result) return;

    const pin = input.value.trim();
    if (!/^\d{6}$/.test(pin)) {
      result.className = 'pincode-result error';
      result.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Please enter a valid 6-digit Indian PIN code.';
      return;
    }

    // Valid pincode - estimate 2-3 days
    const delDate = new Date();
    delDate.setDate(delDate.getDate() + 3);
    const dateStr = delDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

    result.className = 'pincode-result success';
    result.innerHTML = `<i class="fa-solid fa-circle-check"></i> Delivery by ${dateStr} | FREE Delivery | Cash on Delivery available`;
    UI.showToast(`Delivery available for PIN code ${pin}!`, 'success');
  }

  handleDetailAddToCart(productId) {
    const product = Store.getProductById(productId);
    if (!product) return;

    if (!this.detailState.selectedSize) {
      const warning = document.getElementById('size-warning-msg');
      if (warning) warning.style.display = 'block';
      UI.showToast('Please select your shoe size before adding to cart', 'error');
      return;
    }

    const color = product.colors[this.detailState.selectedColorIndex] || product.colors[0];
    const res = Store.addToCart(productId, this.detailState.selectedSize, color.name, this.detailState.quantity);

    if (res.success) {
      UI.showToast(res.message, 'success');
    }
  }

  handleDetailBuyNow(productId) {
    const product = Store.getProductById(productId);
    if (!product) return;

    if (!this.detailState.selectedSize) {
      const warning = document.getElementById('size-warning-msg');
      if (warning) warning.style.display = 'block';
      UI.showToast('Please select your shoe size before buying', 'error');
      return;
    }

    const color = product.colors[this.detailState.selectedColorIndex] || product.colors[0];
    Store.addToCart(productId, this.detailState.selectedSize, color.name, this.detailState.quantity);
    window.location.hash = '#checkout';
  }

  // Quick actions from card
  quickAddToCart(productId) {
    const product = Store.getProductById(productId);
    if (!product) return;
    // Auto select first available size
    const availableSize = product.sizes ? product.sizes.find(s => s.inStock) : null;
    const size = availableSize ? availableSize.size : 'UK 8';
    const color = product.colors[0].name;

    const res = Store.addToCart(productId, size, color, 1);
    UI.showToast(`Added "${product.name}" (${size}) to Cart`, 'success');
  }

  quickBuyNow(productId) {
    const product = Store.getProductById(productId);
    if (!product) return;
    const availableSize = product.sizes ? product.sizes.find(s => s.inStock) : null;
    const size = availableSize ? availableSize.size : 'UK 8';
    const color = product.colors[0].name;

    Store.addToCart(productId, size, color, 1);
    window.location.hash = '#checkout';
  }

  toggleWishlist(productId) {
    const added = Store.toggleWishlist(productId);
    const product = Store.getProductById(productId);
    const name = product ? product.name : 'Shoe';

    if (added) {
      UI.showToast(`Added "${name}" to Wishlist`, 'success');
    } else {
      UI.showToast(`Removed "${name}" from Wishlist`, 'success');
    }

    // Update wishlist buttons on cards
    document.querySelectorAll(`.card-wishlist-btn[data-wishlist-id="${productId}"]`).forEach(btn => {
      if (added) {
        btn.classList.add('active');
        btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
      } else {
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
      }
    });
  }

  // -------------------------------------------------------------
  // HORIZONTAL REVIEW SCROLLING & TOUCH / DRAG GESTURES
  // -------------------------------------------------------------
  scrollReviews(direction) {
    const track = document.getElementById('reviews-carousel-track');
    if (!track) return;
    const scrollAmount = 360 * direction;
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  initReviewCarouselGestures() {
    const track = document.getElementById('reviews-carousel-track');
    if (!track) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      track.classList.add('active');
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => {
      isDown = false;
    });

    track.addEventListener('mouseup', () => {
      isDown = false;
    });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5; // Drag scroll velocity
      track.scrollLeft = scrollLeft - walk;
    });
  }

  voteHelpful(reviewId) {
    UI.showToast('Thank you! Marked as helpful.', 'success');
  }

  // -------------------------------------------------------------
  // WRITE A REVIEW MODAL
  // -------------------------------------------------------------
  openWriteReviewModal(productId) {
    const product = Store.getProductById(productId);
    if (!product) return;

    let modal = document.getElementById('write-review-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'write-review-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <h3 class="modal-title">Write a Review for ${product.name}</h3>
          <button class="modal-close-btn" onclick="document.getElementById('write-review-modal').classList.remove('active')"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <form id="write-review-form" onsubmit="event.preventDefault(); window.appController.submitReview('${productId}');">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Overall Rating *</label>
              <div class="star-rating-selector" id="modal-star-selector">
                ${[1, 2, 3, 4, 5].map(star => `
                  <i class="fa-solid fa-star star-icon ${star <= 5 ? 'active' : ''}" data-val="${star}" onclick="window.appController.selectReviewStar(${star})"></i>
                `).join('')}
              </div>
              <input type="hidden" id="review-rating-val" value="5" />
            </div>

            <div class="form-group">
              <label class="form-label">Your Name *</label>
              <input type="text" class="form-input" id="review-author" required placeholder="e.g. Rohit Sharma" value="${Store.getUser().name || ''}" />
            </div>

            <div class="form-group">
              <label class="form-label">Your City / Location</label>
              <input type="text" class="form-input" id="review-location" placeholder="e.g. Mumbai, Maharashtra" value="Bengaluru, Karnataka" />
            </div>

            <div class="form-group">
              <label class="form-label">Review Headline / Title *</label>
              <input type="text" class="form-input" id="review-title" required placeholder="e.g. Best running shoe I've ever owned!" />
            </div>

            <div class="form-group">
              <label class="form-label">Detailed Review Description *</label>
              <textarea class="form-textarea" id="review-comment" required placeholder="Share your experience about comfort, sizing, sole grip, and durability..."></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-secondary" onclick="document.getElementById('write-review-modal').classList.remove('active')">Cancel</button>
            <button type="submit" class="btn-primary"><i class="fa-solid fa-paper-plane"></i> Submit Review</button>
          </div>
        </form>
      </div>
    `;

    modal.classList.add('active');
  }

  selectReviewStar(star) {
    const input = document.getElementById('review-rating-val');
    if (input) input.value = star;

    const stars = document.querySelectorAll('#modal-star-selector .star-icon');
    stars.forEach((s, idx) => {
      if (idx < star) s.classList.add('active');
      else s.classList.remove('active');
    });
  }

  submitReview(productId) {
    const author = document.getElementById('review-author').value;
    const rating = document.getElementById('review-rating-val').value;
    const title = document.getElementById('review-title').value;
    const comment = document.getElementById('review-comment').value;
    const location = document.getElementById('review-location').value;

    const res = Store.addReview(productId, { author, rating, title, comment, location });

    if (res.success) {
      document.getElementById('write-review-modal').classList.remove('active');
      UI.showToast(res.message, 'success');

      // Re-render product details to immediately show the new review and updated rating
      const product = Store.getProductById(productId);
      const mainContainer = document.getElementById('main-content');
      if (mainContainer && product) {
        mainContainer.innerHTML = UI.renderProductDetailsPage(product, this.detailState);
        this.initReviewCarouselGestures();
      }
    } else {
      UI.showToast(res.message, 'error');
    }
  }

  openSizeGuideModal() {
    let modal = document.getElementById('size-guide-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'size-guide-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <h3 class="modal-title"><i class="fa-solid fa-ruler-combined"></i> Footwear Size Conversion Chart</h3>
          <button class="modal-close-btn" onclick="document.getElementById('size-guide-modal').classList.remove('active')"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="modal-body">
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 14px;">All shoes on SoleStride use standard UK / India sizing.</p>
          <table class="specs-table" style="text-align: center;">
            <thead>
              <tr style="background: #f1f3f6; font-weight: 700;">
                <td style="width: 25%;">UK / India</td>
                <td style="width: 25%;">US Men</td>
                <td style="width: 25%;">EU</td>
                <td style="width: 25%;">Foot Length</td>
              </tr>
            </thead>
            <tbody>
              <tr><td>UK 6</td><td>US 7</td><td>EU 40</td><td>24.5 cm</td></tr>
              <tr><td>UK 7</td><td>US 8</td><td>EU 41</td><td>25.4 cm</td></tr>
              <tr><td>UK 8</td><td>US 9</td><td>EU 42</td><td>26.2 cm</td></tr>
              <tr><td>UK 9</td><td>US 10</td><td>EU 43</td><td>27.1 cm</td></tr>
              <tr><td>UK 10</td><td>US 11</td><td>EU 44.5</td><td>27.9 cm</td></tr>
              <tr><td>UK 11</td><td>US 12</td><td>EU 46</td><td>28.8 cm</td></tr>
            </tbody>
          </table>
          <div style="background: #eef3ff; padding: 12px; border-radius: 4px; font-size: 12.5px; color: var(--primary); margin-top: 14px;">
            <i class="fa-solid fa-circle-info"></i> Tip: If you have wider feet or prefer extra toe wiggle room for running, we recommend selecting one size up.
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

  // -------------------------------------------------------------
  // CART ACTIONS
  // -------------------------------------------------------------
  updateCartQty(index, qty) {
    Store.updateCartQty(index, qty);
  }

  removeCartItem(index) {
    Store.removeFromCart(index);
    UI.showToast('Item removed from cart', 'success');
  }

  moveCartToWishlist(index, productId) {
    Store.toggleWishlist(productId);
    Store.removeFromCart(index);
    UI.showToast('Item moved to Wishlist', 'success');
  }

  applyCouponCode() {
    const input = document.getElementById('cart-coupon-input');
    if (!input) return;
    const code = input.value.trim();
    const res = Store.applyCoupon(code);
    if (res.success) {
      UI.showToast(res.message, 'success');
      this.renderCurrentRoute();
    } else {
      UI.showToast(res.message, 'error');
    }
  }

  // -------------------------------------------------------------
  // CHECKOUT & ORDER SUBMISSION
  // -------------------------------------------------------------
  selectPaymentMethod(elem) {
    document.querySelectorAll('.payment-method-item').forEach(el => {
      el.classList.remove('active');
      const details = el.querySelector('.payment-details-expanded');
      if (details) details.style.display = 'none';
    });

    elem.classList.add('active');
    const radio = elem.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;

    const details = elem.querySelector('.payment-details-expanded');
    if (details) details.style.display = 'block';
  }

  submitPlaceOrder() {
    const form = document.getElementById('checkout-address-form');
    if (form && !form.checkValidity()) {
      form.reportValidity();
      UI.showToast('Please fill all mandatory address fields', 'error');
      return;
    }

    const address = {
      fullName: document.getElementById('addr-name').value.trim(),
      phone: document.getElementById('addr-phone').value.trim(),
      pincode: document.getElementById('addr-pincode').value.trim(),
      landmark: document.getElementById('addr-landmark').value.trim(),
      houseNo: document.getElementById('addr-line1').value.trim(),
      street: document.getElementById('addr-line2').value.trim(),
      city: document.getElementById('addr-city').value.trim(),
      state: document.getElementById('addr-state').value.trim()
    };

    const checkedPayment = document.querySelector('input[name="payment_method"]:checked');
    const paymentMethod = checkedPayment ? checkedPayment.value : 'UPI';

    const res = Store.createOrder({ address, paymentMethod });
    if (res.success) {
      UI.showToast(`Order Placed Successfully! Order ID: ${res.order.orderId}`, 'success');
      window.location.hash = `#order-success/${res.order.orderId}`;
    } else {
      UI.showToast(res.message, 'error');
    }
  }

  // -------------------------------------------------------------
  // USER LOGIN / SIGNUP MODAL
  // -------------------------------------------------------------
  openLoginModal() {
    let modal = document.getElementById('auth-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'auth-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    const currentUser = Store.getUser();

    modal.innerHTML = `
      <div class="modal-card" style="max-width: 650px; display: grid; grid-template-columns: 240px 1fr; overflow: hidden; border-radius: 4px;">
        <div style="background: var(--primary); color: #fff; padding: 30px 24px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h2 style="font-size: 24px; font-weight: 800; line-height: 1.2;">Login</h2>
            <p style="font-size: 14px; opacity: 0.9; margin-top: 10px;">Get access to your Orders, Wishlist and Footwear Recommendations</p>
          </div>
          <img src="img/1542291026-7eec264c27ff.webp" style="max-width: 140px; margin: 20px auto 0; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.3));" alt="Shoe" onerror="handleImageError(this, 'running', '#fff', 'Login')"/>
        </div>

        <div style="padding: 30px;">
          <div style="display: flex; justify-content: flex-end;">
            <button class="modal-close-btn" onclick="document.getElementById('auth-modal').classList.remove('active')"><i class="fa-solid fa-xmark"></i></button>
          </div>

          <form onsubmit="event.preventDefault(); window.appController.handleLoginSubmit();" style="margin-top: 10px;">
            <div class="form-group">
              <label class="form-label">Enter Email / Mobile Number</label>
              <input type="text" class="form-input" id="auth-input-email" required value="${currentUser.email || 'aditya.verma@example.com'}" />
            </div>

            <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 20px;">
              By continuing, you agree to SoleStride's Terms of Use and Privacy Policy.
            </p>

            <button type="submit" class="btn-place-order" style="width: 100%; border-radius: 2px;">
              Request OTP / Sign In
            </button>
          </form>

          <div style="margin-top: 24px; text-align: center;">
            <a href="#orders" onclick="document.getElementById('auth-modal').classList.remove('active');" style="color: var(--primary); font-weight: 700; font-size: 13px;">View Past Orders</a>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
  }

  handleLoginSubmit() {
    const input = document.getElementById('auth-input-email');
    if (!input) return;
    const val = input.value.trim();

    Store.setUser({
      name: 'Aditya Verma',
      email: val.includes('@') ? val : 'aditya.verma@example.com',
      phone: !val.includes('@') ? val : '9845012345'
    });

    document.getElementById('auth-modal').classList.remove('active');
    UI.showToast('Signed in successfully as Aditya Verma!', 'success');
  }
}

// Bootstrap Application
const app = new AppController();
if (typeof window !== 'undefined') {
  app.init();
}
export default app;
