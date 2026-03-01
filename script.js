/* 
    Kodijong The Food Hub - Frontend Script   
*/

// Feature flag / config (safe defaults)
const KJ_PERF = {
  carousel: {
    disableAutoplayOnMobile: true,
    autoplayIntervalMs: 4000,
    cloneBuffer: 3 // number of clones on each side
  },
  lazy: {
    rootMargin: '100px'
  }
};

// ================= TOUCH JS (injected)
(function(){
  // add a class for touch-detected devices so CSS can adapt
  function onFirstTouch() {
    document.documentElement.classList.add('using-touch');
    window.removeEventListener('touchstart', onFirstTouch, {passive:true});
  }
  window.addEventListener('touchstart', onFirstTouch, {passive:true});

  // transient tapped visual: add .touched briefly on targets, then remove
  document.addEventListener('touchstart', function(e){
    const t = e.target.closest('button, a, .card-btn, .addon-card, .qty-btn, .menu-filter, .nav-link');
    if (!t) return;
    t.classList.add('touched');
    clearTimeout(t._tTimer);
    t._tTimer = setTimeout(() => { t.classList.remove('touched'); }, 140);
  }, {passive:true});

  // blur after touchend to avoid focus sticking (tiny delay to let click handlers run)
  document.addEventListener('touchend', function(e){
    const t = e.target.closest('button, a, .card-btn, .addon-card, .qty-btn, .menu-filter, .nav-link');
    if (!t) return;
    setTimeout(()=>{ try { t.blur && t.blur(); } catch(e){} }, 80);
  }, {passive:true});
})();

// ================= DATA (original) 
const products = [
    { id: 1, name: "NIX MAPHA", price: 17, category: "kota", popular: false, desc: "FRESH BREAD, GREENS, POLONY, SECRET SAUCE AND CHIPS.", img: "ORDERING/ORDERING 8.jpg" },
    { id: 2, name: "KWELA KWELA", price: 22, category: "kota", popular: false, desc: "FRESH BREAD, GREENS, POLONY, CHEESE, SECRET SAUCE AND CHIPS.", img: "ORDERING/ORDERING 2.jpg" },
    { id: 3, name: "SKAFTIN", price: 25, category: "kota", popular: false, desc: "FRESH BREAD, GREENS, POLONY, EGG, SECRET SAUCE AND CHIPS.", img: "ORDERING/ORDERING 10.jpg" },
    { id: 4, name: "SPORO", price: 27, category: "kota", popular: false, desc: "FRESH BREAD, GREENS, POLONY, VIENNA, SECRET SAUCE AND CHIPS.", img: "ORDERING/ORDERING 1.jpg" },
    { id: 5, name: "TJOVITJO", price: 30, category: "kota", popular: false, desc: "FRESH BREAD, GREENS, POLONY, SPECIAL, EGG, CHEESE, TANTALIZING SAUCE AND CHIPS.", img: "ORDERING/ORDERING 6.jpg" },
    { id: 6, name: "NOMTHANDAZO", price: 35, category: "kota", popular: false, desc: "FRESH BREAD, GREENS, POLONY, SPECIAL, EGG, CHEESE, VIENNA,TANTALIZING SAUCE AND CHIPS.", img: "ORDERING/ORDERING 24.jpg" },
    { id: 7, name: "CHEESEBOY", price: 40, category: "kota", popular: false, desc: "FRESH BREAD, GREENS, POLONY, SPECIAL, EGG, CHEESE, GRILLED BACON, TANTALIZING SAUCE AND CHIPS.", img: "ORDERING/ORDERING 5.jpg" },
    { id: 8, name: "DA JA VU", price: 44, category: "kota", popular: false, desc: "FRESH BREAD, GREENS, POLONY, SPECIAL, CHEESE, RUSSIAN SAUSAGE, TANTALIZING SAUCE AND CHIPS.", img: "ORDERING/ORDERING 7.jpg" },
    { id: 9, name: "KINGS OF GOMORA", price: 47, category: "kota", popular: false, desc: "FRESH BREAD, GREENS, POLONY, SPECIAL, EGG, CHEESE, RUSSIAN SAUSAGE, TANTALIZING SAUCE AND CHIPS.", img: "ORDERING/ORDERING 21.jpg" },
    { id: 10, name: "PAPUKA", price: 50, category: "kota", popular: false, desc: "FRESH BREAD, GREENS, POLONY, SPECIAL, EGG, CHEESE, BEEF BURGER PATTY, TANTALIZING SAUCE AND CHIPS.", img: "ORDERING/ORDERING 26.jpg" },
    { id: 11, name: "MZEKE ZEKE", price: 60, category: "kota", popular: false, desc: "FRESH QUARTER BREAD, GREENS, POLONY, SPECIAL, EGG, CHEESE, JUICY GRILLED RIBS, TANTALIZING SAUCE AND CHIPS.", img: "ORDERING/ORDERING 29.jpg" },
    { id: 12, name: "ZUUMBA", price: 62, category: "kota", popular: false, desc: "FRESH BREAD, GREENS, POLONY, SPECIAL, EGG, CHEESE , CRISPY CHICKEN FILLET , TANTALIZING SAUCE AND CHIPS.", img:"ORDERING/ORDERING 20.jpg" },
    { id: 13, name: "BIG BOSS", price: 85, category: "kota", popular: false, desc: "FRESH BREAD, GREENS, POLONY, SPECIAL, EGG, CHEESE, VIENNA, GRILLED BACON, RUSSIAN SAUSAGE, BEEF BURGER PATTY, TANTALIZING SAUCE AND CHIPS.", img: "ORDERING/ORDERING 19.jpg "},
    { id: 14, name: "UGOGO UYANG THANDA", price: 130, category: "kota", popular: false, desc: "1/2 FRESH BREAD, GREENS, POLONY, SPECIAL, EGG X2, CHEESE X2, VIENNA X2, GRILLED BACON X2, RUSSIAN SAUSAGE X2, BEEF BURGER PATTY X2, TANTALIZING SAUCE AND CHIPS.", img: "ORDERING/ORDERING 28.jpg" },



    { id: 15, name: "MAC BUZA", price: 43, category: "burgers", popular: false, desc: "BURGER BUNS TOASTED, FRESH LETTUCE,SLICE OF TOMATO, CUCUMBERS, BEEF BURGER PATTY, CHEESE AND SIDE CHIPS.", img: "ORDERING/ORDERING 18.jpg" },
    { id: 16, name: "MAC LOVE", price: 48, category: "burgers", popular: false, desc: "BURGER BUNS TOASTED, FRESH LETTUCE,SLICE OF TOMATO, CUCUMBERS, BEEF BURGER PATTY, CHEESE, GRILLED BACON AND SIDE CHIPS.", img: "ORDERING/ORDERING 4.jpg" },
    { id: 17, name: "KEDIBONI", price: 53, category: "burgers", popular: false, desc: "BURGER BUNS TOASTED, FRESH LETTUCE,SLICE OF TOMATO, CUCUMBERS, CRISPY CHICKEN FILLET, CHEESE, ONION RINGS AND SIDE CHIPS.", img: "ORDERING/ORDERING 25.jpg" },
    { id: 18, name: "MAC GEE", price: 70, category: "burgers", popular: false, desc: "BURGER BUNS TOASTED, FRESH LETTUCE,SLICE OF TOMATO, CUCUMBERS, BEEF BURGER PATTY X2, EGG, CHEESE X2, GRILLED BACON X2, ONION RINGS AND SIDE CHIPS.", img: "ORDERING/ORDERING 15.jpg" },
    { id: 19, name: "MA_JOLELA", price: 70, category: "burgers", popular: false, desc: "BURGER BUNS TOASTED, FRESH LETTUCE,SLICE OF TOMATO, CUCUMBERS, DOUBLE RIBS, EGG OR CHEESE, SIDE CHIPS.", img: "ORDERING/ORDERING 30.jpg" },


    { id: 20, name: "MAKHELWANE", price: 18, category: "sandwiches", popular: false, desc: "SLICES OF TOASTED BREAD, GREENS, EGG, CHEESE AND TANTALIZING SAUCES.", img: "ORDERING/ORDERING 3.jpg" },
    { id: 21, name: "KASABLANCA", price: 27, category: "sandwiches", popular: false, desc: "SLICES OF TOASTED BREAD, GREENS, EGG, CHEESE, VIENNA AND TANTALIZING SAUCES.", img: "ORDERING/ORDERING 11.jpg" },
    { id: 22, name: "SPONGEBOB", price: 30, category: "sandwiches", popular: false, desc: "SLICES OF TOASTED BREAD, GREENS, EGG, CHEESE, GRILLED BACON AND TANTALIZING SAUCES.", img: "ORDERING/ORDERING 23.jpg" },
    { id: 23, name: "COOL GUY", price: 36, category: "sandwiches", popular: false, desc: "SLICES OF TOASTED BREAD, GREENS, EGG, CHEESE, RUSSIAN SAUSAGE AND TANTALIZING SAUCES.", img: "ORDERING/ORDERING 27.jpg" },
    { id: 24, name: "GOLIATH", price: 46, category: "sandwiches", popular: false, desc: "3 SLICES OF TOASTED BREAD, GREENS, EGG, CHEESE, RUSSIAN SAUSAGE, VIENNNA AND TANTALIZING SAUCES.", img: "ORDERING/ORDERING 22.jpg" },
    { id: 25, name: "MAKHELWANE", price: 18, category: "sandwiches", popular: false, desc: "SLICES OF TOASTED BREAD, GREENS, EGG, CHEESE AND TANTALIZING SAUCES.", img: "ORDERING/ORDERING 16.jpg" },
    
    
    { id: 26, name: "SMALL CHIPS", price: 25, category: "chips", popular: false, desc: "DELICIOUS GOLDEN FRIES SERVED WITH OUR SPECIAL SAUCES", img: "ORDERING/ORDERING 12.jpg" },
    { id: 27, name: "MEDIUM CHIPS", price: 30, category: "chips", popular: false, desc: "DELICIOUS GOLDEN FRIES SERVED WITH OUR SPECIAL SAUCES", img: "ORDERING/ORDERING 12.jpg" },
    { id: 28, name: "LARGE CHIPS", price: 40, category: "chips", popular: false, desc: "DELICIOUS GOLDEN FRIES SERVED WITH OUR SPECIAL SAUCES", img: "ORDERING/ORDERING 12.jpg" },
    { id: 29, name: "KASI WRAP", price: 50, category: "chips", popular: false, desc: "GOLDEN BROWN TORTILLA WRAP, GREENS-FRESH LETTUCE, TOMATOES, RED,YELLOW & GREEN PEPPERS,RED ONION, CHEESE, CRISPY FRIED CHICKEN, TANTALIZING SAUCES AND SNACK CHIPS.", img: "ORDERING/ORDERING 31.jpg" },
    { id: 30, name: "CHICKEN SALAD", price: 30, category: "chips", popular: false, desc: "FRESH LETTUCE, SLICES OF TOMATOES, CUCUMBERS, SWEET RED ONION, SALAD DRESSING AND GRILLED CHICKEN.", img: "ORDERING/ORDERING 32.jpg" }


];

// customization option groups (sauces price kept 0 = free)
const customizationOptions = {
    extras: [
        { id: 101, name: "Extra Cheese", price: 6, icon: "🧀" },
        { id: 102, name: "Fried Egg", price: 7, icon: "🍳" },
        { id: 103, name: "Avocado", price: 10, icon: "🥑" },
        { id: 104, name: "Crispy Onion Rings", price: 10, icon: "🧅" },
        { id: 105, name: "Vienna", price: 15, icon: "🌭" },
        { id: 106, name: "Bacon", price: 15, icon: "🥓" },
        { id: 107, name: "Russian", price: 25, icon: "🌭" },
        { id: 108, name: "Extra Beef Patty", price: 27, icon: "🍔" },
        { id: 109, name: "Crispy Chicken Fillet", price: 30, icon: "🍗" }
        
    ],
    drinks: [
        { id: 201, name: "Coca-Cola 500ml", price: 15, icon: "🥤" },
        { id: 202, name: "Sprite 500ml", price: 15, icon: "🥤" },
        { id: 203, name: "Fanta Orange 500ml", price: 15, icon: "🥤" },
        { id: 204, name: "Spa Leta 500ml", price: 15, icon: "🥤" },
        { id: 205, name: "Pepsi", price: 12, icon: "🥤" },
        { id: 206, name: "Fruit Juice 300ml", price: 15, icon: "🥤" },
        { id: 207, name: "flavoured Sparkling Water", price: 12, icon: "💧" }
    ],
    // sauces are FREE (price: 0) - id 301 = All Sauces, 302 = No Sauces
    sauces: [
        { id: 301, name: "All Sauces", price: 0 },
        { id: 302, name: "No Sauces", price: 0 },
        { id: 303, name: "BBQ Sauce", price: 0 },
        { id: 304, name: "Tomato Sauce", price: 0 },
        { id: 305, name: "Chilli Sauce", price: 0 },
        { id: 306, name: "Mango Salad(Atchaar)", price: 0 },
        { id: 307, name: "Mayo & herbs", price: 0 }
    ],
    greens: [
        { id: 401, name: "With Greens", price: 0 },
        { id: 402, name: "No Greens", price: 0 }
    ]
};

// ================= STATE =================
let cart = [];                     // array of cart items (persisted)
let pendingProduct = null;         // product object when customizing
let productQty = 1;                // product quantity while customizing

// use maps/objects to store quantities per addon/drink
let selectedExtras = {};           // { [id]: qty }
let selectedDrinks = {};           // { [id]: qty }
let selectedSauces = [];           // [ id, id, ... ] multi-select
let selectedGreens = null;         // id or null

const CART_STORAGE_KEY = 'kodijong_cart_v1';
const POPULARITY_KEY = 'kodijong_popularity_v1'; // popularity counts stored as {id:count}

// Prevent duplicate WhatsApp sends
let _isSendingOrder = false;

// Secure order number generator
function generateOrderNumber() {
    try {
        if (window.crypto && window.crypto.getRandomValues) {
            const arr = new Uint32Array(1);
            window.crypto.getRandomValues(arr);
            return `KJ-${(arr[0] % 900000) + 100000}`;
        }
    } catch (e) {}
    return `KJ-${Math.floor(Math.random() * 900000) + 100000}`;
}

// ================= UI HELPERS =================
function toggleMenu(isOpen) {
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;
    if (isOpen) {
        menu.classList.add('open');
        document.body.style.overflow = 'hidden';
    } else {
        menu.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// ---------------- NAV ACTIVE ----------------
// setActiveNav: mark nav-link that corresponds to page or section as active
function setActiveNav(key) {
    // normalize key
    if (!key) return;
    key = String(key).toLowerCase();

    const navBtns = document.querySelectorAll('nav .nav-link');
    navBtns.forEach(btn => {
        btn.classList.remove('active', 'header-accent', 'font-bold');
    });

    // Try to find button by onclick attribute first (navigateTo('menu') or scrollToSection('gallery'))
    for (const btn of navBtns) {
        const onclick = (btn.getAttribute('onclick') || '').replace(/\s+/g, '').toLowerCase();
        if (onclick.includes(`navigateTo('${key}')`) || onclick.includes(`navigateTo("${key}")`) || onclick.includes(`scrollToSection('${key}')`) || onclick.includes(`scrollToSection("${key}")`)) {
            btn.classList.add('active', 'font-bold');
            return;
        }
    }

    // Fallback: match by innerText (Home, Our Mission, Gallery, Location)
    for (const btn of navBtns) {
        const txt = (btn.textContent || '').trim().toLowerCase();
        if (txt.includes(key) || (key === 'home' && txt === 'home')) {
            btn.classList.add('active', 'font-bold');
            return;
        }
    }
}

// New helper: set menu filter active programmatically
function setMenuActiveFilter(cat) {
    try {
        const filters = document.querySelectorAll('.menu-filter');
        let matched = null;
        filters.forEach(f => {
            f.classList.remove('active');
            // prefer data-filter attribute if present
            if ((f.dataset && f.dataset.filter === cat) || (f.getAttribute && (f.getAttribute('data-filter') === cat || (f.textContent || '').trim().toLowerCase() === cat))) {
                matched = f;
            }
        });
        if (matched) matched.classList.add('active');
    } catch (e) { /* ignore */ }
}

// REPLACE your current navigateTo(...) with this full implementation
function navigateTo(pageId) {
    if (!pageId) pageId = 'home';
    pageId = String(pageId).toLowerCase();

    const currentPage = document.querySelector('.page.active');
    const nextPage = document.getElementById(`page-${pageId}`);

    if (!nextPage || currentPage === nextPage) return;

    if (currentPage) currentPage.classList.remove('active');

    // Small delay for smooth transition
    setTimeout(() => {
        document.querySelectorAll('.page').forEach(p => { p.style.display = 'none'; });

        nextPage.style.display = 'block';

        setTimeout(() => {
            nextPage.classList.add('active');
            // After the new page is active, make sure viewport is at the top
            try {
                const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
            } catch (e) {
                window.scrollTo(0, 0);
            }
        }, 10);

    }, 200);

    // Page-specific logic
    if (pageId === 'home') renderPopular();
    if (pageId === 'menu') { setMenuActiveFilter('kota'); renderMenu('kota'); }
    if (pageId === 'checkout') renderCheckout();

    setActiveNav(pageId);
    history.replaceState(null, '', `#${pageId}`);
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
    // also set nav active visually
    setActiveNav(id);
}

function showToast(text) {
    const toast = document.getElementById('toast-msg');
    const toastText = document.getElementById('toast-text');
    if (!toast || !toastText) {
        // fallback
        try { console.info('Toast:', text); } catch (e) {}
        return;
    }
    toastText.innerText = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function openModal() {
    const modal = document.getElementById('success-modal');
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeModal(event) {
    const modal = document.getElementById('success-modal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

// ================= STORAGE (hardened) =================
function saveCartToStorage() {
    try {
        if (!Array.isArray(cart)) cart = [];
        const data = JSON.stringify(cart);
        localStorage.setItem(CART_STORAGE_KEY, data);
    } catch (e) {
        console.warn("Failed to save cart", e);
    }
}

function loadCartFromStorage() {
    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        // Basic validation & normalization
        return parsed.map(item => {
            return {
                id: item.id,
                name: item.name,
                img: item.img,
                customId: item.customId || (Date.now() + Math.floor(Math.random() * 1000)),
                qty: Number.isFinite(+item.qty) ? +item.qty : (item.qty || 1),
                addons: Array.isArray(item.addons) ? item.addons : (item.extras || []),
                drinks: Array.isArray(item.drinks) ? item.drinks : [],
                sauces: Array.isArray(item.sauces) ? item.sauces : [],
                greens: item.greens || null,
                finalPrice: Number.isFinite(+item.finalPrice) ? +item.finalPrice : (item.finalPrice || 0)
            };
        });
    } catch (e) {
        console.warn("Failed to load cart", e);
        return [];
    }
}

// Sync across tabs (if user changes cart in another tab)
window.addEventListener('storage', function(e) {
    if (e.key === CART_STORAGE_KEY) {
        cart = loadCartFromStorage();
        updateCartUI();
        renderCheckout();
    }
});

// reload cart when page is restored from bfcache
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        cart = loadCartFromStorage();
        updateCartUI();
        renderCheckout();
    }
});

// ================= POPULARITY =================
function getPopularityCounts() {
    try {
        const raw = localStorage.getItem(POPULARITY_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch (e) {
        console.warn('Failed to read popularity', e);
        return {};
    }
}

function savePopularityCounts(counts) {
    try {
        localStorage.setItem(POPULARITY_KEY, JSON.stringify(counts));
    } catch (e) {
        console.warn('Failed to save popularity', e);
    }
}

function incrementPopularity(productId, amount = 1) {
    if (productId === undefined || productId === null) return;
    const counts = getPopularityCounts();
    counts[productId] = (counts[productId] || 0) + amount;
    savePopularityCounts(counts);
}

// ================= RENDER: POPULAR & MENU =================
function escapeHtml(unsafe) {
    if (unsafe === undefined || unsafe === null) return '';
    return String(unsafe)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function renderPopular() {
    const grid = document.getElementById('popular-grid');
    if (!grid) return;

    const counts = getPopularityCounts();
    const prodWithCount = products.map(p => ({ p, count: counts[p.id] || 0 }));

    const haveData = prodWithCount.some(pc => pc.count > 0);
    let chosen = [];

    if (haveData) {
        // sort descending by count; fallback deterministic by id
        prodWithCount.sort((a, b) => {
            if (b.count !== a.count) return b.count - a.count;
            return a.p.id - b.p.id;
        });
        chosen = prodWithCount.slice(0, 4).map(pc => pc.p);
    } else {
        // fallback to flagged popular items
        chosen = products.filter(p => p.popular);
        if (chosen.length < 4) {
            products.forEach(p => {
                if (chosen.length >= 4) return;
                if (!chosen.includes(p)) chosen.push(p);
            });
        } else {
            chosen = chosen.slice(0, 4);
        }
    }

    // render chosen
    const html = chosen.map(p => `
        <div class="bg-onyx rounded-2xl overflow-hidden border border-white/5 group shadow-xl">
            <div class="menu-card card-elevated">
                <div class="card-media">
                <img 
                    src="${escapeHtml(p.img)}" 
                    data-src="${escapeHtml(p.img)}" 
                    loading="lazy" 
                    decoding="async"
                    width="400" height="220"
                    alt="${escapeHtml(p.name)}">
                </div>

                <div class="card-content">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
                    <h3 class="menu-item-name text-base sm:text-lg font-sans-serif">${escapeHtml(p.name)}</h3>
                    <span class="menu-item-price price">R ${Number(p.price).toFixed(2)}</span>
                </div>

                <p class="menu-item-description text-[10px] sm:text-xs mb-6 line-clamp-2">${escapeHtml(p.desc)}</p>
                </div>

                <div class="card-footer">
                <button onclick="startCustomization(${p.id})" class="card-btn gold-gradient">Add to cart</button>
                </div>
            </div>
        </div>
    `).join('');

    grid.innerHTML = html;
}

function renderMenu(filter = 'all') {
    const grid = document.getElementById('full-menu-grid');
    if (!grid) return;

    // If filter is 'all' choose active .menu-filter if present, otherwise 'all'
    if (filter === 'all') {
        const activeBtn = document.querySelector('.menu-filter.active');
        if (activeBtn) {
            const df = activeBtn.dataset && activeBtn.dataset.filter;
            filter = df || (activeBtn.textContent || '').trim().toLowerCase() || 'all';
        }
    }

    const items = filter === 'all' ? products : products.filter(p => p.category === filter);
    const html = items.map(p => `
        <div class="bg-onyx rounded-2xl overflow-hidden border border-white/5 hover:border-gold/30 transition-colors group">
                <div class="menu-card card-elevated">
                    <div class="card-media">
                    <img 
                        src="${escapeHtml(p.img)}" 
                        data-src="${escapeHtml(p.img)}" 
                        loading="lazy" 
                        decoding="async"
                        width="400" height="220"
                        alt="${escapeHtml(p.name)}">
                    </div>

                    <div class="card-content">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
                        <h3 class="menu-item-name text-base sm:text-lg font-sans-serif">${escapeHtml(p.name)}</h3>
                        <span class="menu-item-price price">R ${Number(p.price).toFixed(2)}</span>
                    </div>

                    <p class="menu-item-description text-[10px] sm:text-xs mb-6 line-clamp-2">${escapeHtml(p.desc)}</p>
                    </div>

                    <div class="card-footer">
                    <button onclick="startCustomization(${p.id})" class="card-btn gold-gradient">Add to cart</button>
                    </div>
                </div>
        </div>
    `).join('');

    grid.innerHTML = html;
}

function filterMenu(cat, btn) {
    // only toggle 'active' class (visuals handled by CSS .menu-filter.active)
    document.querySelectorAll('.menu-filter').forEach(b => {
        b.classList.remove('active');
        // ensure base styles exist
        if (!b.classList.contains('bg-onyx')) b.classList.add('bg-onyx');
        b.classList.remove('bg-gold','text-black');
        b.classList.add('text-white/40');
    });
    if (btn) {
        btn.classList.add('active');
        btn.classList.remove('text-white/40');
    }
    renderMenu(cat === 'all' ? 'all' : cat);
}

// ================= CUSTOMIZATION UI =================
function startCustomization(productId) {
    pendingProduct = products.find(p => p.id === productId) || null;

    // reset selections for this product
    productQty = 1;
    selectedExtras = {};
    selectedDrinks = {};
    selectedSauces = [];
    selectedGreens = null;

    // Try to highlight the menu/category for the product and set Menu nav active
    try {
        if (pendingProduct && pendingProduct.category) {
            setMenuActiveFilter(pendingProduct.category); // highlight category filter
            setActiveNav('menu'); // mark the Menu nav as active (visual cue)
        }
    } catch (e) {
        // non-fatal: ignore if helpers not available
        console.warn('Failed to set menu/filter active:', e);
    }

    const summary = document.getElementById('pending-product-summary');
    if (summary && pendingProduct) {
        // show image, name, unit price, full description, and qty controls
        summary.innerHTML = `
            <img src="${escapeHtml(pendingProduct.img)}" class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0" loading="lazy" onerror="this.onerror=null;this.src='ORDERING/placeholder.jpg'">
            <div class="flex-1">
                <h4 class="text-base sm:text-xl font-serif text-white">${escapeHtml(pendingProduct.name)}</h4>
                <p class="menu-item-price font-bold text-xs sm:text-sm">Unit: R ${Number(pendingProduct.price).toFixed(2)}</p>
                <p class="menu-item-description text-[11px] sm:text-sm mt-1 mb-2">${escapeHtml(pendingProduct.desc)}</p>
            </div>
            <div class="flex items-center gap-2">
                <button class="qty-btn" onclick="changeProductQty(-1)">-</button>
                <span id="product-qty" class="qty-value">${productQty}</span>
                <button class="qty-btn" onclick="changeProductQty(1)">+</button>
            </div>
        `;
    }

    renderAddonsGrid();
    updateCustomTotal();
    navigateTo('addons');
}

// renderAddonsGrid: extras, drinks, sauces, greens
function renderAddonsGrid() {
    const grid = document.getElementById('addons-grid');
    if (!grid) return;

    // Extras (multi-qty)
    const extrasHtml = customizationOptions.extras.map(a => {
        const qty = selectedExtras[a.id] || 0;
        return `
            <div class="addon-card ${qty > 0 ? 'selected' : ''}" data-addon-type="extras" data-addon-id="${a.id}">
                <div>
                    <h4 class="font-bold text-white text-[11px]">${escapeHtml(a.name)}</h4>
                    <p class="menu-item-price text-[10px]">+ R ${Number(a.price).toFixed(2)}</p>
                </div>
                <div class="qty-control">
                    <button class="qty-btn" onclick="changeExtraQty(${a.id}, -1)">-</button>
                    <span class="qty-value" id="extra-qty-${a.id}">${qty}</span>
                    <button class="qty-btn" onclick="changeExtraQty(${a.id}, 1)">+</button>
                </div>
            </div>
        `;
    }).join('');

    // Drinks (multi-qty)
    const drinksHtml = customizationOptions.drinks.map(d => {
        const qty = selectedDrinks[d.id] || 0;
        return `
            <div class="addon-card ${qty > 0 ? 'selected' : ''}" data-addon-type="drinks" data-addon-id="${d.id}">
                <div>
                    <h4 class="font-bold text-white text-[11px]">${escapeHtml(d.name)}</h4>
                    <p class="menu-item-price text-[10px]">+ R ${Number(d.price).toFixed(2)}</p>
                </div>
                <div class="qty-control">
                    <button class="qty-btn" onclick="changeDrinkQty(${d.id}, -1)">-</button>
                    <span class="qty-value" id="drink-qty-${d.id}">${qty}</span>
                    <button class="qty-btn" onclick="changeDrinkQty(${d.id}, 1)">+</button>
                </div>
            </div>
        `;
    }).join('');

    // Sauces (multi-select) — FREE
    const saucesHtml = customizationOptions.sauces.map(s => {
        const selected = selectedSauces.includes(s.id);
        return `
            <div class="addon-card ${selected ? 'selected' : ''}" data-addon-type="sauces" data-addon-id="${s.id}" onclick="toggleSauce(${s.id})">
                <div>
                    <h4 class="font-bold text-white text-[11px]">${escapeHtml(s.name)}</h4>
                    <p class="text-green-400 text-[12px]">Free</p>
                </div>
                <div>
                    ${s.id === 301 ? '<small class="text-[10px] text-white/40">Select all sauces</small>' : ''}
                </div>
            </div>
        `;
    }).join('');

    // Greens (single select)
    const greensHtml = customizationOptions.greens.map(g => {
        const selected = selectedGreens === g.id;
        return `
            <div class="addon-card ${selected ? 'selected' : ''}" data-addon-type="greens" data-addon-id="${g.id}" onclick="selectGreen(${g.id})">
                <div>
                    <h4 class="font-bold text-white text-[11px]">${escapeHtml(g.name)}</h4>
                </div>
            </div>
        `;
    }).join('');

    grid.innerHTML = `
        <div class="col-span-full"><h4 class="text-flamish-red font-bold text-sm mb-2">Extras</h4></div>
        ${extrasHtml}

        <div class="col-span-full mt-4"><h4 class="text-flamish-red font-bold text-sm mb-2">Drinks</h4></div>
        ${drinksHtml}

        <div class="col-span-full mt-4"><h4 class="text-flamish-red font-bold text-sm mb-2">Sauces <span class="text-red-400 text-xs">(Required)</span></h4></div>
        ${saucesHtml}

        <div class="col-span-full mt-4"><h4 class="text-flamish-red font-bold text-sm mb-2">Greens <span class="text-red-400 text-xs">(Required)</span></h4></div>
        ${greensHtml}
    `;
}

// change product qty in summary
function changeProductQty(amount) {
    productQty = Math.max(1, productQty + amount);
    const el = document.getElementById('product-qty');
    if (el) el.innerText = productQty;
    updateCustomTotal();
}

// extras qty handlers (now update DOM minimally instead of full re-render)
function changeExtraQty(id, delta) {
    const current = selectedExtras[id] || 0;
    const next = Math.max(0, current + delta);
    if (next === 0) delete selectedExtras[id];
    else selectedExtras[id] = next;

    // Minimal DOM update: update qty element and toggle selected class
    const qtyEl = document.getElementById(`extra-qty-${id}`);
    if (qtyEl) qtyEl.innerText = next;
    const card = document.querySelector(`[data-addon-id='${id}'][data-addon-type='extras']`);
    if (card) {
        if (next > 0) card.classList.add('selected'); else card.classList.remove('selected');
    }

    updateCustomTotal();
}

// drinks qty handlers (minimal DOM update)
function changeDrinkQty(id, delta) {
    const current = selectedDrinks[id] || 0;
    const next = Math.max(0, current + delta);
    if (next === 0) delete selectedDrinks[id];
    else selectedDrinks[id] = next;

    const qtyEl = document.getElementById(`drink-qty-${id}`);
    if (qtyEl) qtyEl.innerText = next;
    const card = document.querySelector(`[data-addon-id='${id}'][data-addon-type='drinks']`);
    if (card) {
        if (next > 0) card.classList.add('selected'); else card.classList.remove('selected');
    }

    updateCustomTotal();
}

// sauces multi-select & special rules
function toggleSauce(id) {
    // No Sauces selected -> override others
    if (id === 302) {
        selectedSauces = [302];
        renderAddonsGrid();
        updateCustomTotal();
        return;
    }

    // If All Sauces selected -> select all specific sauces + mark 301
    if (id === 301) {
        // include all specific sauces (exclude No Sauces)
        const specific = customizationOptions.sauces.filter(s => s.id !== 301 && s.id !== 302).map(s => s.id);
        selectedSauces = [301, ...specific];
        renderAddonsGrid();
        updateCustomTotal();
        return;
    }

    // Normal sauce toggle: remove No Sauces marker if present
    if (selectedSauces.includes(302)) selectedSauces = [];

    if (selectedSauces.includes(id)) {
        selectedSauces = selectedSauces.filter(s => s !== id && s !== 301);
    } else {
        selectedSauces.push(id);
    }

    // If user manually selected all specific sauces, mark 301 too (for UI)
    const allSpecificIds = customizationOptions.sauces.filter(s => s.id !== 301 && s.id !== 302).map(s => s.id);
    const hasAllSpecific = allSpecificIds.every(specId => selectedSauces.includes(specId));
    if (hasAllSpecific && !selectedSauces.includes(301)) selectedSauces.unshift(301);

    renderAddonsGrid();
    updateCustomTotal();
}

// greens selection
function selectGreen(id) {
    selectedGreens = selectedGreens === id ? null : id;
    renderAddonsGrid();
    updateCustomTotal();
}

// update customization total and control Add button state
function updateCustomTotal() {
    if (!pendingProduct) return;
    let total = pendingProduct.price;

    // extras (per item)
    Object.keys(selectedExtras).forEach(id => {
        const opt = customizationOptions.extras.find(e => e.id == id);
        if (opt) total += (opt.price * selectedExtras[id]);
    });

    // drinks (per item)
    Object.keys(selectedDrinks).forEach(id => {
        const opt = customizationOptions.drinks.find(d => d.id == id);
        if (opt) total += (opt.price * selectedDrinks[id]);
    });

    // final total multiplies by productQty
    const final = total * productQty;

    const el = document.getElementById('customization-total');
    if (el) el.innerText = `R ${final.toFixed(2)}`;
}

// finalize customization -> add to cart
function finalizeCustomization() {
    if (!pendingProduct) return;

    // if missing either, show a popup message (not a disabled button)
    const missing = [];
    if (selectedSauces.length === 0) missing.push('Sauces');
    if (!selectedGreens) missing.push('Greens');

    if (missing.length > 0) {
        const msg = missing.length === 2 ? "Please select your Sauces and Greens" : `Please select your ${missing[0]}`;
        // scroll to the first missing section, flash it, and show a popup
        scrollToAddonsSection(missing[0]);
        flashRequired(missing[0]);
        showErrorPopup(msg);
        return;
    }

    // compute per-item price
    let perItem = pendingProduct.price;

    Object.keys(selectedExtras).forEach(id => {
        const opt = customizationOptions.extras.find(e => e.id == id);
        if (opt) perItem += opt.price * selectedExtras[id];
    });

    Object.keys(selectedDrinks).forEach(id => {
        const opt = customizationOptions.drinks.find(d => d.id == id);
        if (opt) perItem += opt.price * selectedDrinks[id];
    });

    const finalPrice = perItem * productQty;

    // build readable addon arrays for cart
    const addonsArr = Object.keys(selectedExtras).map(id => {
        const o = customizationOptions.extras.find(e => e.id == id);
        return { id: o.id, name: o.name, qty: selectedExtras[id], price: o.price };
    });

    const drinksArr = Object.keys(selectedDrinks).map(id => {
        const o = customizationOptions.drinks.find(d => d.id == id);
        return { id: o.id, name: o.name, qty: selectedDrinks[id], price: o.price };
    });

    const saucesArr = selectedSauces.slice(); // ids
    const greensObj = customizationOptions.greens.find(g => g.id == selectedGreens) || null;

    const cartItem = {
        id: pendingProduct.id,
        name: pendingProduct.name,
        img: pendingProduct.img,
        customId: Date.now() + Math.floor(Math.random() * 1000),
        qty: productQty,
        addons: addonsArr,
        drinks: drinksArr,
        sauces: saucesArr,
        greens: greensObj ? { id: greensObj.id, name: greensObj.name } : null,
        finalPrice
    };

    cart.push(cartItem);
    saveCartToStorage();
    updateCartUI();
    showToast(`${pendingProduct.name} added!`);
    openModal();

    // increment popularity for the product id
    incrementPopularity(pendingProduct.id, productQty);
}

// helper: flash required area by temporarily adding class to grid
function flashRequired(sectionName) {
    const grid = document.getElementById('addons-grid');
    if (!grid) return;
    grid.classList.add('required-missing');
    setTimeout(() => grid.classList.remove('required-missing'), 700);
}

// scroll to the addons sub-section heading ("Sauces" or "Greens")
function scrollToAddonsSection(sectionName) {
    const grid = document.getElementById('addons-grid');
    if (!grid) return;
    // find headings inside grid (h4) and match by text content
    const headings = grid.querySelectorAll('h4');
    for (const h of headings) {
        const txt = (h.textContent || '').toLowerCase();
        if (txt.includes(sectionName.toLowerCase())) {
            // scroll the heading into view, offset slightly
            const rect = h.getBoundingClientRect();
            const y = rect.top + window.pageYOffset - 120;
            window.scrollTo({ top: y, behavior: 'smooth' });
            // add a short highlight on the container
            const parent = h.closest('.addon-section') || h.parentElement;
            if (parent) {
                parent.classList.add('required-missing');
                setTimeout(() => parent.classList.remove('required-missing'), 800);
            } else {
                // fallback highlight grid
                grid.classList.add('required-missing');
                setTimeout(() => grid.classList.remove('required-missing'), 800);
            }
            return;
        }
    }
    // fallback: scroll grid
    grid.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Show a small transient error popup (center of screen)
// It will dismiss after 3.5s or when user clicks it.
function showErrorPopup(message) {
    // if popup already exists, update text and restart timer
    let existing = document.getElementById('error-popup');
    if (existing) {
        existing.querySelector('.error-popup-text').innerText = message;
        existing.classList.add('show');
        clearTimeout(existing._dismissTimer);
        existing._dismissTimer = setTimeout(() => {
            existing.classList.remove('show');
            setTimeout(() => existing.remove(), 250);
        }, 3500);
        return;
    }

    const overlay = document.createElement('div');
    overlay.id = 'error-popup';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '1001';
    overlay.style.pointerEvents = 'auto';

    const box = document.createElement('div');
    box.style.background = 'rgba(20,20,22,0.98)';
    box.style.border = '1px solid rgba(197,160,89,0.9)';
    box.style.padding = '18px 22px';
    box.style.borderRadius = '12px';
    box.style.boxShadow = '0 12px 40px rgba(0,0,0,0.6)';
    box.style.maxWidth = '90%';
    box.style.textAlign = 'center';
    box.style.color = 'white';
    box.style.fontWeight = '700';

    const text = document.createElement('div');
    text.className = 'error-popup-text';
    text.innerText = message;

    const sub = document.createElement('div');
    sub.style.fontWeight = '600';
    sub.style.fontSize = '12px';
    sub.style.marginTop = '8px';
    sub.style.opacity = '0.85';
    sub.innerText = 'Please complete the required selections to continue.';

    box.appendChild(text);
    box.appendChild(sub);
    overlay.appendChild(box);

    // click to dismiss
    overlay.addEventListener('click', () => {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 200);
    });

    document.body.appendChild(overlay);

    // small show animation
    requestAnimationFrame(() => {
        overlay.classList.add('show');
        box.style.transform = 'translateY(-6px)';
    });

    overlay._dismissTimer = setTimeout(() => {
        overlay.classList.remove('show');
        setTimeout(() => overlay.remove(), 250);
    }, 3500);
}

// update cart count UI (badge) and animate
function updateCartUI() {
    const el1 = document.getElementById('cart-count');
    const el2 = document.getElementById('nav-cart-count');
    [el1, el2].forEach(el => {
        if (el) {
            // preserve old behavior (item count = number of cart entries)
            el.innerText = cart.length;
            el.classList.add('bounce-animate');
            setTimeout(() => el.classList.remove('bounce-animate'), 500);
        }
    });
    // also update checkout if visible
    const checkoutPage = document.getElementById('page-checkout');
    if (checkoutPage && checkoutPage.classList.contains('active')) renderCheckout();
}

// ================= CHECKOUT =================
function renderCheckout() {
    const list = document.getElementById('cart-items-list');
    if (!list) return;

    if (cart.length === 0) {
        list.innerHTML = `
            <div class="bg-onyx p-12 rounded-2xl text-center border border-white/5">
                <i class="fa-solid fa-basket-shopping text-4xl text-white/60 mb-4"></i>
                <p class="text-white/40">Your basket is currently empty.</p>
                <button onclick="navigateTo('menu')" class="mt-6 header-accent text-xs font-bold uppercase tracking-widest underline">Explore Menu</button>
            </div>
        `;
        updateSummary(0);
        return;
    }

    // Build list using DocumentFragment to reduce reflow
    const fragment = document.createDocumentFragment();
    const container = document.createElement('div');

    cart.forEach(item => {
        const extrasText = item.addons && item.addons.length
            ? item.addons.map(a => {
                const totalUnits = a.qty * item.qty;
                const totalCost = (a.price * a.qty) * item.qty;
                return `${escapeHtml(a.name)} — per item: x${a.qty}, total: x${totalUnits} (R ${totalCost.toFixed(2)})`;
              }).join('<br>')
            : 'No extras';

        const drinksText = item.drinks && item.drinks.length
            ? item.drinks.map(d => {
                const totalUnits = d.qty * item.qty;
                const totalCost = (d.price * d.qty) * item.qty;
                return `${escapeHtml(d.name)} — per item: x${d.qty}, total: x${totalUnits} (R ${totalCost.toFixed(2)})`;
              }).join('<br>')
            : '';

        const saucesText = item.sauces && item.sauces.length
            ? item.sauces.map(id => (customizationOptions.sauces.find(s => s.id == id) || {}).name).filter(Boolean).join(', ')
            : '';

        const greensText = item.greens ? item.greens.name : '';

        const card = document.createElement('div');
        card.className = 'bg-onyx p-5 sm:p-6 rounded-2xl border border-white/5 flex gap-4 sm:gap-6 items-start';
        card.innerHTML = `
            <img src="${escapeHtml(item.img)}" class="w-20 h-20 rounded-xl object-cover" onerror="this.onerror=null;this.src='ORDERING/placeholder.jpg'">
            <div class="flex-grow">
                <h4 class="text-white font-sans-serif  text-lg">
                    ${escapeHtml(item.name)} <span class="text-white text-sm">x${item.qty}</span>
                </h4>

                <p class="text-[11px] text-white mb-2">
                    ${extrasText ? extrasText + '<br>' : ''}
                    ${drinksText ? drinksText + '<br>' : ''}
                    ${saucesText ? 'Sauces: ' + escapeHtml(saucesText) + '<br>' : ''}
                    ${greensText ? 'Greens: ' + escapeHtml(greensText) + '<br>' : ''}
                </p>

                <p class="menu-item-price font-bold">R ${Number(item.finalPrice).toFixed(2)}</p>
            </div>
            <div class="flex flex-col items-end gap-2">
                <div class="qty-control" style="margin-bottom:6px;">
                    <button class="qty-btn" onclick="changeCartItemQty(${item.customId}, -1)">-</button>
                    <span class="qty-value">${item.qty}</span>
                    <button class="qty-btn" onclick="changeCartItemQty(${item.customId}, 1)">+</button>
                </div>
                <button onclick="removeFromCart(${item.customId})" class="text-white hover:text-red-500 transition-colors p-2">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
        fragment.appendChild(card);
    });

    // replace content
    list.innerHTML = '';
    list.appendChild(fragment);

    const subtotal = cart.reduce((sum, item) => sum + item.finalPrice, 0);
    updateSummary(subtotal);
}

function changeCartItemQty(customId, delta) {
    const idx = cart.findIndex(c => c.customId === customId);
    if (idx === -1) return;
    const item = cart[idx];
    item.qty = Math.max(1, item.qty + delta);

    // recompute perItem and finalPrice
    const product = products.find(p => p.id === item.id);
    let perItem = product ? product.price : 0;
    if (item.addons && item.addons.length) {
        item.addons.forEach(a => {
            perItem += a.price * a.qty;
        });
    }
    if (item.drinks && item.drinks.length) {
        item.drinks.forEach(d => {
            perItem += d.price * d.qty;
        });
    }
    item.finalPrice = perItem * item.qty;

    cart[idx] = item;
    saveCartToStorage();
    updateCartUI();
    renderCheckout();
    showToast("Cart updated");
}

function removeFromCart(customId) {
    cart = cart.filter(item => item.customId !== customId);
    saveCartToStorage();
    updateCartUI();
    renderCheckout();
    showToast("Item removed");
}

function updateSummary(subtotal) {
    // Service fee removed — total equals subtotal
    const total = subtotal;
    const subEl = document.getElementById('summ-sub');
    const totEl = document.getElementById('summ-total');
    if (subEl) subEl.innerText = `R ${Number(subtotal).toFixed(2)}`;
    if (totEl) totEl.innerText = `R ${Number(total).toFixed(2)}`;
}

// ================= WHATSAPP ORDER (merged & exact format) =================
function sendWhatsAppOrder() {
    try {
        if (_isSendingOrder) return false;

        const currentCart = Array.isArray(cart) ? cart : [];
        if (currentCart.length === 0) {
            showToast('Your cart is empty!');
            return false;
        }

        // Find inputs (keeps your flexible selectors)
        const nameInput = document.getElementById('customer-name') ||
                         document.querySelector('input[placeholder*="name" i], input[name="name" i]') ||
                         document.querySelector('#cust-name');

        const phoneInput = document.getElementById('customer-phone') ||
                          document.querySelector('input[placeholder*="phone" i], input[type="tel"], input[name="phone" i]') ||
                          document.querySelector('#cust-phone');

        const instructionsInput = document.getElementById('special-instructions') ||
                                 document.querySelector('textarea[placeholder*="instructions" i], textarea[name="instructions" i]') ||
                                 document.querySelector('#order-instructions');

        const name = nameInput?.value?.trim?.() || '';
        const phone = phoneInput?.value?.trim?.() || '';
        const instructions = instructionsInput?.value?.trim?.() || '';

        if (!name || !phone) {
            showToast('Please enter your name and phone number');
            if (!name && nameInput) { nameInput.style.border = '2px solid red'; nameInput.focus(); }
            else if (!phone && phoneInput) { phoneInput.style.border = '2px solid red'; phoneInput.focus(); }
            return false;
        }
        if (nameInput) nameInput.style.border = '';
        if (phoneInput) phoneInput.style.border = '';

        const cleanedPhone = phone.replace(/\s/g, '');
        const phoneRegex = /^(\+27|0)[1-9]\d{8}$/;
        if (!phoneRegex.test(cleanedPhone)) {
            showToast('Please enter a valid South African phone number');
            if (phoneInput) { phoneInput.style.border = '2px solid red'; phoneInput.focus(); }
            return false;
        }

        _isSendingOrder = true;
        const orderNumber = generateOrderNumber();
        const displayPhone = cleanedPhone.replace(/^\+27/, '0').replace(/^27/, '0');
        const now = new Date();

        // Start building message
        let message = `*KODIJONG WEBSITE ORDER*\n\n`;
        message += `*ORDER NO:* ${orderNumber}\n\n`;
        message += `*CUSTOMER DETAILS:*\n`;
        message += `👤 *Name:* ${String(name).replace(/[*_~`]/g,'')}\n`;
        message += `📞 *Phone:* ${displayPhone}\n\n`;
        message += `*ORDER SUMMARY:*\n`;

        let cartTotal = 0;

        currentCart.forEach((item, idx) => {
            const basePrice = parseFloat(item.basePrice) || 0;
            const qty = parseInt(item.qty || item.quantity) || 1;
            const extrasTotal = parseFloat(item.extrasTotal) || 0;
            const drinksTotal = parseFloat(item.drinksTotal) || 0;

            // Prefer finalPrice if present
            const itemTotal = Number(item.finalPrice) || (basePrice * qty + extrasTotal + drinksTotal);
            cartTotal += itemTotal;

            const safeName = String(item.name || '').replace(/[*_~`]/g,'');
            message += `\n${idx + 1}. 🔴 _${safeName}_ x${qty}`;
            message += `\n💰 *Price:* R${itemTotal.toFixed(2)}`;

            // 1) If options string exists (older codepath) parse it
            if (item.options && typeof item.options === 'string') {
                const options = item.options.split(' | ');
                options.forEach(opt => {
                    if (opt.startsWith('Greens:')) {
                        const g = opt.replace('Greens:', '').trim();
                        message += `\n🥬 *Greens:* ${g || 'no greens'}`;
                    } else if (opt.startsWith('Sauces:')) {
                        const s = opt.replace('Sauces:', '').trim();
                        message += `\n🍶 *Sauces:* ${s || 'no sauces'}`;
                    }
                });
            } else {
                // 2) FALLBACK: read sauces & greens from item.sauces / item.greens directly
                // Greens: item.greens can be object {id,name} or id or string
                if (item.greens) {
                    const gname = (typeof item.greens === 'object') ? (item.greens.name || '') : String(item.greens || '');
                    if (gname) message += `\n🥬 *Greens:* ${String(gname).replace(/[*_~`]/g,'')}`;
                }

                // Sauces: item.sauces ideally is array of ids
                if (item.sauces && Array.isArray(item.sauces) && item.sauces.length) {
                    // special ids handling: 301 => all sauces, 302 => no sauces
                    if (item.sauces.includes(302)) {
                        message += `\n🍶 *Sauces:* no sauces`;
                    } else if (item.sauces.includes(301)) {
                        message += `\n🍶 *Sauces:* all sauces`;
                    } else {
                        // map ids to names using customizationOptions if available
                        const sauceNames = item.sauces.map(sid => {
                            try {
                                const found = (typeof customizationOptions !== 'undefined' && customizationOptions.sauces)
                                    ? customizationOptions.sauces.find(s => s.id == sid)
                                    : null;
                                return found ? found.name : String(sid);
                            } catch (e) { return String(sid); }
                        }).filter(Boolean);
                        if (sauceNames.length) message += `\n🍶 *Sauces:* ${sauceNames.join(', ').replace(/[*_~`]/g,'')}`;
                    }
                }
            }

            // Extras
            if (item.addons && Array.isArray(item.addons) && item.addons.length) {
                const extrasList = item.addons.map(a => {
                    const q = parseInt(a.qty || a.quantity) || 0;
                    return q > 0 ? `${String(a.name || '').replace(/[*_~`]/g,'')} x${q}` : null;
                }).filter(Boolean);
                if (extrasList.length) message += `\n➕ *Extras:* ${extrasList.join(', ')}`;
            }

            // Drinks
            if (item.drinks && Array.isArray(item.drinks) && item.drinks.length) {
                const drinksList = item.drinks.map(d => {
                    const q = parseInt(d.qty || d.quantity) || 0;
                    return q > 0 ? `${String(d.name || '').replace(/[*_~`]/g,'')} x${q}` : null;
                }).filter(Boolean);
                if (drinksList.length) message += `\n🥤 *Drinks:* ${drinksList.join(', ')}`;
            }

            if (idx < currentCart.length - 1) message += `\n────────────────────`;
        });

        // special instructions
        if (instructions) {
            message += `\n\n📝 *Special Instructions:*\n${String(instructions).replace(/[*_~`]/g,'')}\n`;
        }

        message += `\n\n💰 *TOTAL AMOUNT:* R${cartTotal.toFixed(2)}\n`;
        message += `\n⏰ *Order Time:* ${now.toLocaleString('en-ZA', { year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' })}\n`;

        message += `\n────────────────────\n`;
        message += `*KODIJONG THE FOOD HUB*\n📍 232 Far East Bank, Sandton, 2014\n📞 +27 83 967 9365\n\n`;
        message += `✅ *PLEASE BE PATIENT, We will contact you shortly to confirm your order!*`;

        // encode and open whatsapp
        const encoded = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/27671144112?text=${encoded}`;

        try {
            const win = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            if (!win || win.closed || typeof win.closed === 'undefined') {
                // popup blocked
                window.location.href = whatsappUrl;
                setTimeout(() => showToast('Please allow pop-ups or click the link manually'), 900);
            }
        } catch (e) {
            window.location.href = whatsappUrl;
        }

        // clear cart and persist updates to UI
        cart = [];
        try { saveCartToStorage(); } catch (e) { console.warn('saveCart failed', e); }
        try { updateCartUI(); } catch (e) {}
        try { renderCheckout(); } catch (e) {}

        showToast('Order sent! Opening WhatsApp.');

        setTimeout(() => { _isSendingOrder = false; }, 2000);

        return true;
    } catch (err) {
        console.error('sendWhatsAppOrder error:', err);
        _isSendingOrder = false;
        showToast('Failed to prepare order — please try again.');
        return false;
    }
}

// For backward compatibility: keep submitToWhatsApp() calling sendWhatsAppOrder
function submitToWhatsApp() {
    return sendWhatsAppOrder();
}

// ================= REVIEWS ANIMATION =================
function initReviewObserver() {
    const cards = document.querySelectorAll('.review-card');
    if (!cards || cards.length === 0) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));
}

// ================= INIT =================
window.onload = () => {
    // load cart from storage
    cart = loadCartFromStorage() || [];
    renderPopular();
    // Ensure full menu opens on kota by default on load too
    setMenuActiveFilter('kota');
    renderMenu('kota');
    updateCartUI();

    // Ensure customize button state is correct on load (if user navigates directly)
    updateCustomTotal();

    // set initial active nav
    setActiveNav('home');

    // Close modal by clicking outside content
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // initialize reviews observer
    initReviewObserver();

    initReviewsMarquee();
};

// also sync once DOM is ready for elements that might load late
document.addEventListener('DOMContentLoaded', () => {
    cart = loadCartFromStorage() || [];
    updateCartUI();
    renderPopular();
});

// ---------- Carousel controls for Popular Picks ----------
function initPopularCarousel() {
  const container = document.getElementById('popular-grid');
  const prevBtn = document.getElementById('popular-prev');
  const nextBtn = document.getElementById('popular-next');
  if (!container || !prevBtn || !nextBtn) return;

  // Wrap operations to avoid repeated DOM reads/writes
  let cards = Array.from(container.children);
  if (cards.length === 0) return;

  let currentIndex = 0;
  let visibleCount = 1;
  let autoplayInterval;
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let lastCardWidth = 0;

  // --- Clone for infinite loop (smart clones: do not eager-load images) ---
  const cloneCount = Math.max(3, KJ_PERF.carousel.cloneBuffer);
  const firstClones = cards.slice(0, cloneCount).map(c => {
    const clone = c.cloneNode(true);
    // convert any <img src> to data-src to avoid immediate load for clones
    const imgs = clone.querySelectorAll && clone.querySelectorAll('img');
    if (imgs && imgs.length) {
      imgs.forEach(img => {
        try {
          if (img.hasAttribute('src')) {
            const real = img.getAttribute('src');
            img.setAttribute('data-src', real);
            img.removeAttribute('src');
          }
        } catch (e) { /* ignore */ }
      });
    }
    return clone;
  });
  const lastClones = cards.slice(-cloneCount).map(c => {
    const clone = c.cloneNode(true);
    const imgs = clone.querySelectorAll && clone.querySelectorAll('img');
    if (imgs && imgs.length) {
      imgs.forEach(img => {
        try {
          if (img.hasAttribute('src')) {
            const real = img.getAttribute('src');
            img.setAttribute('data-src', real);
            img.removeAttribute('src');
          }
        } catch (e) { /* ignore */ }
      });
    }
    return clone;
  });

  lastClones.forEach(clone => container.insertBefore(clone, cards[0]));
  firstClones.forEach(clone => container.appendChild(clone));

  cards = Array.from(container.children);
  currentIndex = cloneCount;

  function calculateVisible() {
    // read once
    const first = cards[0];
    if (!first) return;
    const rect = first.getBoundingClientRect();
    const cardWidth = rect.width || first.offsetWidth || 1;
    lastCardWidth = cardWidth;
    visibleCount = Math.max(1, Math.floor(container.parentElement.clientWidth / cardWidth));
  }

  function updateCarousel(animate = true) {
    // GPU-accelerated transform
    const cardWidth = lastCardWidth || (cards[0] && cards[0].offsetWidth) || 1;
    currentTranslate = -currentIndex * cardWidth;
    if (animate) container.style.transition = 'transform 0.45s ease'; else container.style.transition = 'none';
    container.style.willChange = 'transform';
    container.style.transform = `translate3d(${currentTranslate}px,0,0)`;
  }

  function nextSlide() {
    currentIndex++;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex--;
    updateCarousel();
  }

  container.addEventListener('transitionend', () => {
    const total = cards.length;
    if (currentIndex >= total - cloneCount) {
      currentIndex = cloneCount;
      updateCarousel(false);
    }
    if (currentIndex < cloneCount) {
      currentIndex = total - (cloneCount * 2);
      if (currentIndex < cloneCount) currentIndex = cloneCount;
      updateCarousel(false);
    }
  });

  // Buttons
  nextBtn.onclick = nextSlide;
  prevBtn.onclick = prevSlide;

  // Autoplay
  function startAutoplay() {
    if (KJ_PERF.carousel.disableAutoplayOnMobile && window.innerWidth < 768) return;
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      if (document.hidden) return;
      nextSlide();
    }, KJ_PERF.carousel.autoplayIntervalMs);
  }
  function stopAutoplay() {
    if (autoplayInterval) { clearInterval(autoplayInterval); autoplayInterval = null; }
  }

  container.parentElement.addEventListener('mouseenter', stopAutoplay);
  container.parentElement.addEventListener('mouseleave', startAutoplay);

  // Swipe / Drag with rAF
  container.addEventListener('mousedown', startDrag);
  container.addEventListener('touchstart', startDrag, {passive:true});

  container.addEventListener('mousemove', drag);
  container.addEventListener('touchmove', drag, {passive:false});

  container.addEventListener('mouseup', endDrag);
  container.addEventListener('mouseleave', endDrag);
  container.addEventListener('touchend', endDrag);

  function startDrag(e) {
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : (e.touches && e.touches[0] && e.touches[0].clientX) || 0;
    stopAutoplay();
  }

  let rafId = null;
  let latestEvent = null;

  function drag(e) {
    if (!isDragging) return;
    // prevent page scroll on touch when dragging horizontally
    if (e.type.startsWith('touch')) e.preventDefault();
    latestEvent = e;
    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const ev = latestEvent;
        const currentX = ev.type.includes('mouse') ? ev.pageX : (ev.touches && ev.touches[0] && ev.touches[0].clientX) || 0;
        const diff = currentX - startX;
        container.style.transition = 'none';
        container.style.willChange = 'transform';
        container.style.transform = `translate3d(${currentTranslate + diff}px,0,0)`;
      });
    }
  }

  function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.type.includes('mouse') ? e.pageX : (e.changedTouches ? e.changedTouches[0].clientX : startX);
    const diff = endX - startX;
    if (diff < -50) nextSlide();
    else if (diff > 50) prevSlide();
    else updateCarousel();
    startAutoplay();
  }

  // Resize handling (debounced with rAF)
  let resizePending = false;
  window.addEventListener('resize', () => {
    if (resizePending) return;
    resizePending = true;
    requestAnimationFrame(() => {
      resizePending = false;
      calculateVisible();
      updateCarousel(false);
    });
  });

  calculateVisible();
  updateCarousel(false);
  startAutoplay();
}

// ---------- Reviews marquee setup ----------
// Robust reviews marquee init — replace previous initReviewsMarquee()
function initReviewsMarquee() {
  const track = document.getElementById('reviews-track');
  if (!track) return;

  if (!track.dataset.cloned) {
    track.innerHTML += track.innerHTML;
    track.dataset.cloned = "true";
  }

  const width = track.scrollWidth / 2;
  const speed = 40;
  const duration = width / speed;

  track.style.animation = `marquee ${duration}s linear infinite`;
}

/* ------------------ Non-invasive lazy-load + small hardening add-on ------------------ */
(function () {
  // Placeholder used across your code
  const PLACEHOLDER = 'ORDERING/placeholder.jpg';

  // --- LAZY IMAGE OBSERVER -------------------------------------------------
  // Observes <img data-src="..."> and sets `src` when in view.
  const lazyImageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      const src = img.getAttribute('data-src');
      if (src) {
        // set attributes safely
        img.src = src;
        img.removeAttribute('data-src');
        img.setAttribute('decoding', 'async');
        img.classList.add('lazy-loaded');
        // add robust onerror fallback
        img.onerror = function () {
          this.onerror = null;
          this.src = PLACEHOLDER;
          this.classList.remove('lazy-loading');
        };
      }
      lazyImageObserver.unobserve(img);
    });
  }, {
    root: null,
    rootMargin: KJ_PERF.lazy.rootMargin || '100px', // preload slightly before entering viewport
    threshold: 0.01
  });

  // Scan current DOM for images to observe
  function observeLazyImages(root = document) {
    try {
      const imgs = root.querySelectorAll('img[data-src]');
      imgs.forEach(img => {
        // Avoid re-observing
        if (img.__lazyObserved) return;
        img.__lazyObserved = true;
        img.classList.add('lazy-loading');
        // If the image already has src (rare), skip replacing
        if (img.src && img.src.trim() !== '') {
          img.removeAttribute('data-src');
          img.classList.remove('lazy-loading');
          img.classList.add('lazy-loaded');
          return;
        }
        lazyImageObserver.observe(img);
      });
    } catch (e) {
      console.warn('observeLazyImages error', e);
    }
  }

  // Use a MutationObserver to catch images injected via innerHTML (your render functions)
  const mutationObserver = new MutationObserver(mutations => {
    for (const m of mutations) {
      if (!m.addedNodes || m.addedNodes.length === 0) continue;
      m.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        // element itself might be an img
        if (node.tagName === 'IMG' && node.hasAttribute('data-src')) {
          observeLazyImages(node.parentNode || document);
        }
        // or it may contain imgs deeper
        const imgs = node.querySelectorAll && node.querySelectorAll('img[data-src]');
        if (imgs && imgs.length) observeLazyImages(node);
      });
    }
  });

  mutationObserver.observe(document.documentElement || document.body, {
    childList: true,
    subtree: true
  });

  // --- RESIZE DEBOUNCE (lightweight) -------------------------------------
  // Useful for carousels — doesn't override existing behavior, just reduces frequency
  let resizeTimer = null;
  function debouncedResize(fn, ms = 150) {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resizeTimer = null;
      try { fn(); } catch (e) { /* ignore */ }
    }, ms);
  }

  // attach a generic debounced resize handler that calls your existing handlers indirectly
  // (this doesn't remove your internal resize handlers; it avoids heavy work when needed)
  window.addEventListener('resize', () => {
    if (typeof window.onLightResize === 'function') debouncedResize(window.onLightResize, 180);
  });

  // --- SMALL SECURITY/HARDENING: sendWhatsAppOrder wrapper ----------------
  // Adds additional early validation (max lengths, basic sanitation) but otherwise calls your original function.
  // This is non-invasive: it preserves your existing sendWhatsAppOrder flow.
  if (typeof window.sendWhatsAppOrder === 'function') {
    const _orig = window.sendWhatsAppOrder.bind(window);
    window.sendWhatsAppOrder = function () {
      try {
        // Retrieve inputs using the same selectors you use in your original function
        const nameInput = document.getElementById('customer-name') ||
                         document.querySelector('input[placeholder*="name" i], input[name="name"]') ||
                         document.querySelector('#cust-name');

        const phoneInput = document.getElementById('customer-phone') ||
                          document.querySelector('input[placeholder*="phone" i], input[type="tel"], input[name="phone"]') ||
                          document.querySelector('#cust-phone');

        const instructionsInput = document.getElementById('special-instructions') ||
                                 document.querySelector('textarea[placeholder*="instructions" i], textarea[name="instructions"]') ||
                                 document.querySelector('#order-instructions');

        const name = (nameInput && nameInput.value) ? String(nameInput.value).trim() : '';
        const phone = (phoneInput && phoneInput.value) ? String(phoneInput.value).trim() : '';
        const instructions = (instructionsInput && instructionsInput.value) ? String(instructionsInput.value).trim() : '';

        // Limit lengths to reasonable bounds to avoid huge payloads or DoS-like behavior
        if (name.length > 120) {
          showToast('Name is too long (max 120 chars)');
          if (nameInput) { nameInput.style.border = '2px solid red'; nameInput.focus(); }
          return false;
        }
        if (phone.length > 20) {
          showToast('Phone number looks too long');
          if (phoneInput) { phoneInput.style.border = '2px solid red'; phoneInput.focus(); }
          return false;
        }
        if (instructions.length > 800) {
          showToast('Special instructions are too long (max 800 chars)');
          if (instructionsInput) { instructionsInput.style.border = '2px solid red'; instructionsInput.focus(); }
          return false;
        }
        // Basic sanitation: strip control chars that could mess with formatting
        const ctrlChars = /[\x00-\x08\x0B\x0C\x0E-\x1F]/g;
        if (ctrlChars.test(name) || ctrlChars.test(phone) || ctrlChars.test(instructions)) {
          showToast('Invalid characters in form fields');
          return false;
        }

        // If everything looks ok, call original
        return _orig();
      } catch (e) {
        // Fall back to original if wrapper fails
        try { return _orig(); } catch (err) { console.error('sendWhatsAppOrder both wrapper and original failed', err); return false; }
      }
    };
  }

  // --- UTILITY: add placeholder fallback to imgs added without data-src ----
  // on DOMContentLoaded and onload, observe lazy images currently in DOM
  document.addEventListener('DOMContentLoaded', () => {
    observeLazyImages(document);
    // small hook — if you want to recalc sizes on resize, implement window.onLightResize in your code
  });

  window.addEventListener('load', () => {
    observeLazyImages(document);
    // also ensure images present inside dynamic sections rendered on load get observed
    const popularGrid = document.getElementById('popular-grid');
    if (popularGrid) observeLazyImages(popularGrid);
    const fullMenuGrid = document.getElementById('full-menu-grid');
    if (fullMenuGrid) observeLazyImages(fullMenuGrid);
    const cartList = document.getElementById('cart-items-list');
    if (cartList) observeLazyImages(cartList);
  });

  // expose for debugging if needed (safe)
  window.__observeLazyImages = observeLazyImages;
  window.__lazyImageObserver = lazyImageObserver;

})();


document.addEventListener('DOMContentLoaded', () => {
    const hash = (location.hash || '').replace('#', '').toLowerCase();

    if (hash === 'menu' || hash === 'home' || hash === 'checkout' || hash === 'addons') {
        navigateTo(hash);
    } else {
        navigateTo('home');
    }
});





