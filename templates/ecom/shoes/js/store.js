/**
 * LocalStorage State Management for SoleStride E-Commerce
 * Manages Cart, Wishlist, User Reviews, Orders, User Session, and Recently Viewed items
 */

import { PRODUCTS } from './products.js';

const STORAGE_KEYS = {
  CART: 'solestride_cart_v1',
  WISHLIST: 'solestride_wishlist_v1',
  USER_REVIEWS: 'solestride_user_reviews_v1',
  ORDERS: 'solestride_orders_v1',
  RECENTLY_VIEWED: 'solestride_recently_viewed_v1',
  USER: 'solestride_user_v1',
  ADDRESS: 'solestride_address_v1',
  COUPON: 'solestride_active_coupon_v1'
};

// Safe JSON Parse helper
function safeGet(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    console.error('Storage read error for key:', key, e);
    return fallback;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage write error for key:', key, e);
  }
}

export const Store = {
  // Listeners for reactive updates
  listeners: [],
  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  },
  notify(event, payload) {
    this.listeners.forEach(fn => fn(event, payload));
  },

  // -------------------------------------------------------------
  // PRODUCTS LOOKUP
  // -------------------------------------------------------------
  getAllProducts() {
    return PRODUCTS;
  },

  getProductById(id) {
    return PRODUCTS.find(p => p.id === id) || null;
  },

  getProductsByCategory(category) {
    if (!category || category === 'all') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === category);
  },

  // -------------------------------------------------------------
  // CART MANAGEMENT
  // -------------------------------------------------------------
  getCart() {
    return safeGet(STORAGE_KEYS.CART, []);
  },

  addToCart(productId, size, colorName, quantity = 1) {
    const product = this.getProductById(productId);
    if (!product) return { success: false, message: 'Product not found' };

    if (!size) {
      return { success: false, message: 'Please select a shoe size' };
    }

    const cart = this.getCart();
    const existingIndex = cart.findIndex(
      item => item.productId === productId && item.size === size && item.colorName === colorName
    );

    const selectedColor = product.colors.find(c => c.name === colorName) || product.colors[0];

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        productId,
        size,
        colorName: selectedColor.name,
        colorHex: selectedColor.hex,
        image: selectedColor.mainImage,
        quantity,
        addedAt: new Date().toISOString()
      });
    }

    safeSet(STORAGE_KEYS.CART, cart);
    this.notify('cart_updated', { cart, action: 'add', productId });
    return { success: true, message: `Added "${product.name}" (${size}) to Cart` };
  },

  updateCartQty(index, newQty) {
    const cart = this.getCart();
    if (index >= 0 && index < cart.length) {
      if (newQty <= 0) {
        cart.splice(index, 1);
      } else {
        cart[index].quantity = Math.min(10, Math.max(1, newQty));
      }
      safeSet(STORAGE_KEYS.CART, cart);
      this.notify('cart_updated', { cart, action: 'update' });
    }
  },

  removeFromCart(index) {
    const cart = this.getCart();
    if (index >= 0 && index < cart.length) {
      const removed = cart.splice(index, 1);
      safeSet(STORAGE_KEYS.CART, cart);
      this.notify('cart_updated', { cart, action: 'remove', removed });
    }
  },

  clearCart() {
    safeSet(STORAGE_KEYS.CART, []);
    safeSet(STORAGE_KEYS.COUPON, null);
    this.notify('cart_updated', { cart: [], action: 'clear' });
  },

  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  getActiveCoupon() {
    return safeGet(STORAGE_KEYS.COUPON, null);
  },

  applyCoupon(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    const VALID_COUPONS = {
      'SOLE20': { percent: 20, maxDiscount: 2000, desc: 'Flat 20% off up to ₹2,000' },
      'FIRST10': { percent: 10, maxDiscount: 1000, desc: '10% off for new shoppers' },
      'FESTIVE500': { flat: 500, minCart: 2999, desc: 'Flat ₹500 off on orders above ₹2,999' }
    };

    if (VALID_COUPONS[cleanCode]) {
      const coupon = { code: cleanCode, ...VALID_COUPONS[cleanCode] };
      safeSet(STORAGE_KEYS.COUPON, coupon);
      this.notify('coupon_applied', coupon);
      return { success: true, message: `Coupon ${cleanCode} applied!`, coupon };
    }
    return { success: false, message: 'Invalid coupon code. Try SOLE20 or FIRST10' };
  },

  removeCoupon() {
    safeSet(STORAGE_KEYS.COUPON, null);
    this.notify('coupon_removed', null);
  },

  getCartSummary() {
    const cart = this.getCart();
    let totalMRP = 0;
    let totalSellingPrice = 0;
    let itemCount = 0;

    const items = cart.map(item => {
      const product = this.getProductById(item.productId);
      if (!product) return null;

      const mrp = product.originalPrice * item.quantity;
      const price = product.price * item.quantity;
      totalMRP += mrp;
      totalSellingPrice += price;
      itemCount += item.quantity;

      return {
        ...item,
        product,
        unitPrice: product.price,
        unitMRP: product.originalPrice,
        subtotalPrice: price,
        subtotalMRP: mrp
      };
    }).filter(Boolean);

    const discountOnMRP = totalMRP - totalSellingPrice;
    const deliveryFee = totalSellingPrice >= 500 || totalSellingPrice === 0 ? 0 : 40;

    // Apply Coupon
    let couponDiscount = 0;
    const activeCoupon = this.getActiveCoupon();
    if (activeCoupon && totalSellingPrice > 0) {
      if (activeCoupon.flat) {
        if (!activeCoupon.minCart || totalSellingPrice >= activeCoupon.minCart) {
          couponDiscount = activeCoupon.flat;
        }
      } else if (activeCoupon.percent) {
        couponDiscount = Math.round((totalSellingPrice * activeCoupon.percent) / 100);
        if (activeCoupon.maxDiscount) {
          couponDiscount = Math.min(couponDiscount, activeCoupon.maxDiscount);
        }
      }
    }

    const finalAmount = Math.max(0, totalSellingPrice - couponDiscount + deliveryFee);
    const totalSavings = discountOnMRP + couponDiscount + (deliveryFee === 0 && totalSellingPrice > 0 ? 40 : 0);

    return {
      items,
      itemCount,
      totalMRP,
      totalSellingPrice,
      discountOnMRP,
      couponDiscount,
      activeCoupon,
      deliveryFee,
      finalAmount,
      totalSavings
    };
  },

  // -------------------------------------------------------------
  // WISHLIST MANAGEMENT
  // -------------------------------------------------------------
  getWishlist() {
    return safeGet(STORAGE_KEYS.WISHLIST, []);
  },

  isInWishlist(productId) {
    const list = this.getWishlist();
    return list.includes(productId);
  },

  toggleWishlist(productId) {
    const list = this.getWishlist();
    const index = list.indexOf(productId);
    let added = false;

    if (index > -1) {
      list.splice(index, 1);
      added = false;
    } else {
      list.unshift(productId);
      added = true;
    }

    safeSet(STORAGE_KEYS.WISHLIST, list);
    this.notify('wishlist_updated', { wishlist: list, productId, added });
    return added;
  },

  getWishlistProducts() {
    const list = this.getWishlist();
    return list.map(id => this.getProductById(id)).filter(Boolean);
  },

  // -------------------------------------------------------------
  // RECENTLY VIEWED PRODUCTS
  // -------------------------------------------------------------
  getRecentlyViewed() {
    const ids = safeGet(STORAGE_KEYS.RECENTLY_VIEWED, []);
    return ids.map(id => this.getProductById(id)).filter(Boolean);
  },

  addRecentlyViewed(productId) {
    let ids = safeGet(STORAGE_KEYS.RECENTLY_VIEWED, []);
    ids = ids.filter(id => id !== productId);
    ids.unshift(productId);
    if (ids.length > 10) ids = ids.slice(0, 10);
    safeSet(STORAGE_KEYS.RECENTLY_VIEWED, ids);
  },

  // -------------------------------------------------------------
  // CUSTOMER REVIEWS MANAGEMENT
  // -------------------------------------------------------------
  getProductReviews(productId) {
    const product = this.getProductById(productId);
    if (!product) return { reviews: [], rating: 4.5, ratingCount: 0, reviewCount: 0, breakdown: { 5: 60, 4: 20, 3: 10, 2: 5, 1: 5 } };

    const defaultReviews = product.reviews || [];
    const userReviewsMap = safeGet(STORAGE_KEYS.USER_REVIEWS, {});
    const customUserReviews = userReviewsMap[productId] || [];

    // Combine custom user reviews (first) with default curated reviews
    const allReviews = [...customUserReviews, ...defaultReviews];

    // Compute updated aggregates
    const baseCount = product.ratingCount || 1000;
    const addedCount = customUserReviews.length;
    const totalReviewCount = (product.reviewCount || defaultReviews.length) + addedCount;
    const totalRatingCount = baseCount + addedCount;

    // Calculate rating adjustment
    let sumScore = (product.rating * baseCount);
    customUserReviews.forEach(r => {
      sumScore += (Number(r.rating) || 5);
    });
    const avgRating = Math.round((sumScore / totalRatingCount) * 10) / 10;

    // Recalculate breakdown percentages
    const breakdown = { ...(product.ratingBreakdown || { 5: 65, 4: 20, 3: 8, 2: 4, 1: 3 }) };

    return {
      reviews: allReviews,
      rating: avgRating,
      ratingCount: totalRatingCount,
      reviewCount: totalReviewCount,
      breakdown
    };
  },

  addReview(productId, { author, rating, title, comment, location }) {
    if (!productId || !author || !title || !comment) {
      return { success: false, message: 'Please fill in all required fields' };
    }

    const userReviewsMap = safeGet(STORAGE_KEYS.USER_REVIEWS, {});
    if (!userReviewsMap[productId]) {
      userReviewsMap[productId] = [];
    }

    const newReview = {
      id: 'user-rev-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      author: author.trim(),
      verified: true,
      rating: Number(rating) || 5,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      location: (location || 'Verified Buyer, India').trim(),
      title: title.trim(),
      comment: comment.trim(),
      helpfulCount: 0,
      isUserSubmitted: true
    };

    userReviewsMap[productId].unshift(newReview);
    safeSet(STORAGE_KEYS.USER_REVIEWS, userReviewsMap);
    this.notify('review_added', { productId, review: newReview });
    return { success: true, message: 'Thank you! Your review was submitted successfully.', review: newReview };
  },

  // -------------------------------------------------------------
  // ORDERS & CHECKOUT MANAGEMENT
  // -------------------------------------------------------------
  getOrders() {
    return safeGet(STORAGE_KEYS.ORDERS, []);
  },

  createOrder({ address, paymentMethod }) {
    const summary = this.getCartSummary();
    if (!summary.items || summary.items.length === 0) {
      return { success: false, message: 'Cart is empty' };
    }

    const orderId = 'OD' + Math.floor(1000000000 + Math.random() * 9000000000);
    const orderDate = new Date().toISOString();
    
    // Calculate delivery date 3 days in future
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    const newOrder = {
      orderId,
      orderDate,
      expectedDelivery: deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
      status: 'Order Placed',
      address,
      paymentMethod,
      items: summary.items.map(item => ({
        productId: item.productId,
        name: item.product.name,
        brand: item.product.brand,
        size: item.size,
        colorName: item.colorName,
        image: item.image,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        unitMRP: item.unitMRP,
        subtotal: item.subtotalPrice
      })),
      totals: {
        totalMRP: summary.totalMRP,
        totalSellingPrice: summary.totalSellingPrice,
        discountOnMRP: summary.discountOnMRP,
        couponDiscount: summary.couponDiscount,
        deliveryFee: summary.deliveryFee,
        finalAmount: summary.finalAmount,
        totalSavings: summary.totalSavings
      }
    };

    const orders = this.getOrders();
    orders.unshift(newOrder);
    safeSet(STORAGE_KEYS.ORDERS, orders);

    // Save default address
    if (address) {
      this.saveAddress(address);
    }

    // Clear cart after placing order
    this.clearCart();

    this.notify('order_created', newOrder);
    return { success: true, order: newOrder };
  },

  getOrderById(orderId) {
    const orders = this.getOrders();
    return orders.find(o => o.orderId === orderId) || null;
  },

  // -------------------------------------------------------------
  // USER PROFILE & ADDRESS
  // -------------------------------------------------------------
  getUser() {
    return safeGet(STORAGE_KEYS.USER, {
      isLoggedIn: true,
      name: 'Aditya Verma',
      phone: '9845012345',
      email: 'aditya.verma@example.com'
    });
  },

  setUser(userData) {
    safeSet(STORAGE_KEYS.USER, { ...userData, isLoggedIn: true });
    this.notify('user_updated', userData);
  },

  logoutUser() {
    safeSet(STORAGE_KEYS.USER, { isLoggedIn: false, name: '', phone: '', email: '' });
    this.notify('user_updated', null);
  },

  getSavedAddress() {
    return safeGet(STORAGE_KEYS.ADDRESS, {
      fullName: 'Aditya Verma',
      phone: '9845012345',
      pincode: '560034',
      houseNo: 'Flat 402, Sunshine Heights',
      street: '17th Main Road, 5th Block, Koramangala',
      city: 'Bengaluru',
      state: 'Karnataka',
      landmark: 'Near Sony World Signal',
      type: 'Home'
    });
  },

  saveAddress(addr) {
    safeSet(STORAGE_KEYS.ADDRESS, addr);
  }
};
