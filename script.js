/* =========================================================
   УЛЕЙ — общая логика сайта
   Работает на всех страницах. Конкретная страница определяется
   по атрибуту data-page на <body>.
   ========================================================= */

const STORAGE_KEYS = {
  cart: "ulei_cart",
  favorites: "ulei_favorites",
  user: "ulei_user",
};

/* ---------------------------------------------------------
   Хранилище: корзина
   Элемент корзины: { key, id, color, size, qty }
   --------------------------------------------------------- */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.cart)) || [];
  } catch (e) {
    return [];
  }
}
function saveCart(cart) {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  updateHeaderCounts();
}
function cartItemKey(id, color, size) {
  return `${id}__${color || ""}__${size || ""}`;
}
function addToCart(id, { color = "", size = "", qty = 1 } = {}) {
  const cart = getCart();
  const key = cartItemKey(id, color, size);
  const existing = cart.find((c) => c.key === key);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ key, id, color, size, qty });
  }
  saveCart(cart);
}
function setCartQty(key, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter((c) => c.key !== key);
  } else {
    const item = cart.find((c) => c.key === key);
    if (item) item.qty = qty;
  }
  saveCart(cart);
}
function removeFromCart(key) {
  const cart = getCart().filter((c) => c.key !== key);
  saveCart(cart);
}
function cartCount() {
  return getCart().reduce((sum, c) => sum + c.qty, 0);
}
function cartTotal() {
  return getCart().reduce((sum, c) => {
    const p = getProductById(c.id);
    return p ? sum + p.price * c.qty : sum;
  }, 0);
}
function cartOldTotal() {
  return getCart().reduce((sum, c) => {
    const p = getProductById(c.id);
    if (!p) return sum;
    return sum + (p.oldPrice || p.price) * c.qty;
  }, 0);
}

/* ---------------------------------------------------------
   Хранилище: избранное
   --------------------------------------------------------- */
function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites)) || [];
  } catch (e) {
    return [];
  }
}
function saveFavorites(list) {
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(list));
  updateHeaderCounts();
}
function isFavorite(id) {
  return getFavorites().includes(Number(id));
}
function toggleFavorite(id) {
  id = Number(id);
  let list = getFavorites();
  let added;
  if (list.includes(id)) {
    list = list.filter((x) => x !== id);
    added = false;
  } else {
    list.push(id);
    added = true;
  }
  saveFavorites(list);
  return added;
}

/* ---------------------------------------------------------
   Хранилище: пользователь (имитация авторизации)
   --------------------------------------------------------- */
function getUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.user));
  } catch (e) {
    return null;
  }
}
function setUser(user) {
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
  updateHeaderCounts();
}
function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.user);
  updateHeaderCounts();
}

/* ---------------------------------------------------------
   Уведомления (toast)
   --------------------------------------------------------- */
function showToast(message, type = "default") {
  let stack = document.querySelector(".toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.className = "toast-stack";
    document.body.appendChild(stack);
  }
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  stack.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("leaving");
    setTimeout(() => toast.remove(), 200);
  }, 2400);
}

/* ---------------------------------------------------------
   Модальное окно (простое, для успеха заказа и т.п.)
   --------------------------------------------------------- */
function openModal({ icon = "✓", title, text, actionLabel = "Хорошо", onAction = null }) {
  let overlay = document.getElementById("appModal");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "appModal";
    overlay.className = "modal-overlay";
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true">
      <div class="modal-icon">${icon}</div>
      <h3>${title}</h3>
      <p>${text}</p>
      <button class="btn btn-primary btn-block" id="modalActionBtn">${actionLabel}</button>
    </div>`;
  overlay.classList.add("open");
  overlay.querySelector("#modalActionBtn").addEventListener("click", () => {
    closeModal();
    if (onAction) onAction();
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
}
function closeModal() {
  const overlay = document.getElementById("appModal");
  if (overlay) overlay.classList.remove("open");
}

/* ---------------------------------------------------------
   Иконки (инлайн SVG)
   --------------------------------------------------------- */
const ICONS = {
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.6-10-9.3C.4 8.2 2 4.5 5.6 4A5.4 5.4 0 0 1 12 7a5.4 5.4 0 0 1 6.4-3c3.6.5 5.2 4.2 3.6 7.7C19.5 16.4 12 21 12 21z"/></svg>`,
};

/* ---------------------------------------------------------
   Обновление счётчиков в шапке
   --------------------------------------------------------- */
function updateHeaderCounts() {
  document.querySelectorAll("[data-cart-count]").forEach((el) => {
    const n = cartCount();
    el.textContent = n;
    el.style.display = n > 0 ? "flex" : "none";
  });
  document.querySelectorAll("[data-fav-count]").forEach((el) => {
    const n = getFavorites().length;
    el.textContent = n;
    el.style.display = n > 0 ? "flex" : "none";
  });
  const user = getUser();
  document.querySelectorAll("[data-login-label]").forEach((el) => {
    el.textContent = user ? user.name.split(" ")[0] : "Войти";
  });
  document.querySelectorAll("[data-login-link]").forEach((el) => {
    el.setAttribute("href", "login.html");
  });
}

/* ---------------------------------------------------------
   Карточка товара (переиспользуется на всех страницах)
   --------------------------------------------------------- */
function productCardHTML(p) {
  const disc = discountPercent(p);
  const fav = isFavorite(p.id);
  return `
  <article class="product-card" data-id="${p.id}">
    <a href="product.html?id=${p.id}" class="pc-media">
      ${disc || p.isNew ? `<div class="pc-badges">
        ${disc ? `<span class="pc-badge discount">-${disc}%</span>` : ""}
        ${p.isNew ? `<span class="pc-badge new">Новинка</span>` : ""}
      </div>` : ""}
      <img src="${p.image}" alt="${p.title}" loading="lazy">
    </a>
    <button class="pc-fav ${fav ? "active" : ""}" data-fav-toggle="${p.id}" aria-label="В избранное" title="В избранное">
      ${ICONS.heart}
    </button>
    <div class="pc-body">
      <a href="product.html?id=${p.id}">
        <div class="pc-brand">${p.brand}</div>
        <div class="pc-title">${p.title}</div>
      </a>
      <div class="pc-rating"><span class="stars">★ ${p.rating.toFixed(1)}</span> · ${p.reviews} отзывов</div>
      <div class="pc-price-row">
        <span class="pc-price">${formatPrice(p.price)}</span>
        ${p.oldPrice ? `<span class="pc-old-price">${formatPrice(p.oldPrice)}</span>` : ""}
      </div>
      <div class="pc-actions">
        <button class="pc-add" data-add-to-cart="${p.id}">Добавить в корзину</button>
      </div>
    </div>
  </article>`;
}

function renderProductGrid(container, products, emptyMessage = "Ничего не найдено") {
  if (!container) return;
  if (!products.length) {
    container.innerHTML = `<div class="empty-state">
      <h3>${emptyMessage}</h3>
      <p>Попробуйте изменить параметры поиска или фильтры.</p>
    </div>`;
    return;
  }
  container.innerHTML = products.map(productCardHTML).join("");
}

/* Делегирование кликов по кнопкам "в корзину" / "в избранное" внутри карточек */
function bindProductGridEvents(root = document) {
  root.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add-to-cart]");
    if (addBtn) {
      e.preventDefault();
      const id = Number(addBtn.dataset.addToCart);
      const p = getProductById(id);
      addToCart(id, { color: p.colors[0] || "", size: p.sizes[0] || "" });
      showToast(`«${p.title}» добавлен в корзину`, "success");
      addBtn.textContent = "Добавлено ✓";
      addBtn.classList.add("added");
      setTimeout(() => {
        addBtn.textContent = "Добавить в корзину";
        addBtn.classList.remove("added");
      }, 1400);
      return;
    }
    const favBtn = e.target.closest("[data-fav-toggle]");
    if (favBtn) {
      e.preventDefault();
      const id = Number(favBtn.dataset.favToggle);
      const added = toggleFavorite(id);
      favBtn.classList.toggle("active", added);
      showToast(added ? "Добавлено в избранное" : "Убрано из избранного");
      if (document.body.dataset.page === "favorites") {
        initFavoritesPage();
      }
    }
  });
}

/* ---------------------------------------------------------
   Шапка сайта: поиск, подсказки, бургер-меню
   --------------------------------------------------------- */
function initHeader() {
  updateHeaderCounts();

  // Поиск + подсказки
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const suggestBox = document.getElementById("searchSuggest");

  if (searchForm && searchInput) {
    const params = new URLSearchParams(location.search);
    if (params.get("q")) searchInput.value = params.get("q");

    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const q = searchInput.value.trim();
      if (suggestBox) suggestBox.classList.remove("open");
      window.location.href = `catalog.html?q=${encodeURIComponent(q)}`;
    });

    searchInput.addEventListener("input", () => {
      const q = searchInput.value.trim();
      if (!suggestBox) return;
      if (!q) {
        suggestBox.classList.remove("open");
        suggestBox.innerHTML = "";
        return;
      }
      const results = searchProducts(q).slice(0, 6);
      if (!results.length) {
        suggestBox.innerHTML = `<div class="s-empty">Ничего не найдено по запросу «${q}»</div>`;
      } else {
        suggestBox.innerHTML = results
          .map(
            (p) => `
          <button type="button" data-suggest-id="${p.id}">
            <img src="${p.image}" alt="">
            <span>
              <span class="s-title">${p.title}</span><br>
              <span class="s-cat">${categoryTitle(p.category)} · ${formatPrice(p.price)}</span>
            </span>
          </button>`
          )
          .join("");
      }
      suggestBox.classList.add("open");
    });

    suggestBox?.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-suggest-id]");
      if (btn) window.location.href = `product.html?id=${btn.dataset.suggestId}`;
    });

    document.addEventListener("click", (e) => {
      if (suggestBox && !searchForm.contains(e.target)) suggestBox.classList.remove("open");
    });
  }

  // Бургер-меню
  const burgerBtn = document.getElementById("burgerBtn");
  const drawer = document.getElementById("mobileDrawer");
  const drawerClose = document.getElementById("drawerClose");
  burgerBtn?.addEventListener("click", () => drawer.classList.add("open"));
  drawerClose?.addEventListener("click", () => drawer.classList.remove("open"));
  drawer?.querySelector(".drawer-backdrop")?.addEventListener("click", () => drawer.classList.remove("open"));

  // Кнопка "выйти" в мобильном меню / где угодно
  document.querySelectorAll("[data-logout]").forEach((btn) => {
    btn.addEventListener("click", () => {
      logoutUser();
      showToast("Вы вышли из аккаунта");
      setTimeout(() => location.reload(), 600);
    });
  });

  bindProductGridEvents(document);
}

/* Заполнение навигации по категориям (шапка, футер, мобильное меню) */
function renderCategoryLinks(container, basePath = "catalog.html") {
  if (!container) return;
  container.innerHTML = CATEGORIES.map(
    (c) => `<a href="${basePath}?category=${c.id}">${c.icon} ${c.title}</a>`
  ).join("");
}

/* =========================================================
   ГЛАВНАЯ СТРАНИЦА
   ========================================================= */
function initHomePage() {
  // Категории
  const catGrid = document.getElementById("categoryGrid");
  if (catGrid) {
    catGrid.innerHTML = CATEGORIES.map(
      (c) => `
      <a class="category-card" href="catalog.html?category=${c.id}">
        <div class="cat-icon">${c.icon}</div>
        <span>${c.title}</span>
      </a>`
    ).join("");
  }

  const bySort = (sort) => filterAndSortProducts({ sort });
  renderProductGrid(document.getElementById("hitsGrid"), bySort("popular").slice(0, 10));
  renderProductGrid(document.getElementById("newGrid"), bySort("new").slice(0, 10));
  renderProductGrid(
    document.getElementById("saleGrid"),
    filterAndSortProducts({ onlyDiscount: true, sort: "popular" }).slice(0, 10)
  );

  initBannerSlider();
}

function initBannerSlider() {
  const slider = document.getElementById("bannerSlider");
  if (!slider) return;
  const slides = [...slider.querySelectorAll(".banner-slide")];
  const dotsBox = document.getElementById("bannerDots");
  let index = 0;
  let timer;

  if (dotsBox) {
    dotsBox.innerHTML = slides.map((_, i) => `<button data-dot="${i}" aria-label="Слайд ${i + 1}"></button>`).join("");
  }
  const dots = dotsBox ? [...dotsBox.querySelectorAll("button")] : [];

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle("active", n === index));
    dots.forEach((d, n) => d.classList.toggle("active", n === index));
  }
  function next() { show(index + 1); }
  function prev() { show(index - 1); }
  function restart() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  slider.querySelector(".banner-arrow.next")?.addEventListener("click", () => { next(); restart(); });
  slider.querySelector(".banner-arrow.prev")?.addEventListener("click", () => { prev(); restart(); });
  dots.forEach((d) => d.addEventListener("click", () => { show(Number(d.dataset.dot)); restart(); }));

  show(0);
  restart();
}

/* =========================================================
   КАТАЛОГ
   ========================================================= */
let catalogState = {
  categories: [],
  query: "",
  priceMin: "",
  priceMax: "",
  brands: [],
  minRating: 0,
  onlyDiscount: false,
  sort: "popular",
};

function initCatalogPage() {
  const params = new URLSearchParams(location.search);
  if (params.get("category")) catalogState.categories = [params.get("category")];
  if (params.get("q")) catalogState.query = params.get("q");

  renderCatalogFilters();
  applyCatalogFilters();

  document.getElementById("sortSelect")?.addEventListener("change", (e) => {
    catalogState.sort = e.target.value;
    applyCatalogFilters();
  });

  // Мобильные фильтры
  const filtersDrawer = document.getElementById("filtersDrawer");
  document.getElementById("openFiltersBtn")?.addEventListener("click", () => filtersDrawer?.classList.add("open"));
  document.getElementById("closeFiltersBtn")?.addEventListener("click", () => filtersDrawer?.classList.remove("open"));
  filtersDrawer?.querySelector(".drawer-backdrop")?.addEventListener("click", () => filtersDrawer.classList.remove("open"));
  document.getElementById("applyFiltersBtn")?.addEventListener("click", () => filtersDrawer?.classList.remove("open"));
}

function renderCatalogFilters() {
  const panels = document.querySelectorAll("[data-filters-root]");
  panels.forEach((panel) => {
    panel.innerHTML = `
      <div class="filter-block">
        <h4>Категория</h4>
        ${CATEGORIES.map(
          (c) => `
          <label class="check-row">
            <input type="checkbox" value="${c.id}" data-filter="category" ${catalogState.categories.includes(c.id) ? "checked" : ""}>
            ${c.icon} ${c.title}
          </label>`
        ).join("")}
      </div>
      <div class="filter-block">
        <h4>Цена, сом</h4>
        <div class="filter-range">
          <input type="number" placeholder="От" min="0" data-filter="priceMin" value="${catalogState.priceMin}">
          <span>—</span>
          <input type="number" placeholder="До" min="0" data-filter="priceMax" value="${catalogState.priceMax}">
        </div>
      </div>
      <div class="filter-block">
        <h4>Бренд</h4>
        ${allBrands()
          .map(
            (b) => `
          <label class="check-row">
            <input type="checkbox" value="${b}" data-filter="brand" ${catalogState.brands.includes(b) ? "checked" : ""}>
            ${b}
          </label>`
          )
          .join("")}
      </div>
      <div class="filter-block">
        <h4>Рейтинг</h4>
        <div class="rating-row">
          ${[4.5, 4, 3].map(
            (r) => `<button type="button" class="rating-chip ${catalogState.minRating === r ? "active" : ""}" data-filter="rating" data-value="${r}">от ${r} ★</button>`
          ).join("")}
          <button type="button" class="rating-chip ${catalogState.minRating === 0 ? "active" : ""}" data-filter="rating" data-value="0">Любой</button>
        </div>
      </div>
      <div class="filter-block">
        <div class="toggle-row">
          <h4 style="margin:0;">Только со скидкой</h4>
          <label class="switch">
            <input type="checkbox" data-filter="discount" ${catalogState.onlyDiscount ? "checked" : ""}>
            <span class="track"></span>
          </label>
        </div>
      </div>
      <button class="btn btn-outline btn-block" data-filter="reset">Сбросить фильтры</button>
    `;

    panel.querySelectorAll('[data-filter="category"]').forEach((cb) => {
      cb.addEventListener("change", () => {
        const checked = [...panel.querySelectorAll('[data-filter="category"]:checked')].map((c) => c.value);
        catalogState.categories = checked;
        syncFilterPanels();
        applyCatalogFilters();
      });
    });
    panel.querySelectorAll('[data-filter="brand"]').forEach((cb) => {
      cb.addEventListener("change", () => {
        const checked = [...panel.querySelectorAll('[data-filter="brand"]:checked')].map((c) => c.value);
        catalogState.brands = checked;
        syncFilterPanels();
        applyCatalogFilters();
      });
    });
    panel.querySelector('[data-filter="priceMin"]')?.addEventListener("input", (e) => {
      catalogState.priceMin = e.target.value;
      applyCatalogFilters();
    });
    panel.querySelector('[data-filter="priceMax"]')?.addEventListener("input", (e) => {
      catalogState.priceMax = e.target.value;
      applyCatalogFilters();
    });
    panel.querySelectorAll('[data-filter="rating"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        catalogState.minRating = Number(btn.dataset.value);
        syncFilterPanels();
        applyCatalogFilters();
      });
    });
    panel.querySelector('[data-filter="discount"]')?.addEventListener("change", (e) => {
      catalogState.onlyDiscount = e.target.checked;
      applyCatalogFilters();
    });
    panel.querySelector('[data-filter="reset"]')?.addEventListener("click", () => {
      catalogState = { categories: [], query: catalogState.query, priceMin: "", priceMax: "", brands: [], minRating: 0, onlyDiscount: false, sort: "popular" };
      const sortSelect = document.getElementById("sortSelect");
      if (sortSelect) sortSelect.value = "popular";
      renderCatalogFilters();
      applyCatalogFilters();
    });
  });
}

function syncFilterPanels() {
  // При двух панелях фильтров (десктоп + мобильная) перерисовываем обе, сохраняя состояние
  renderCatalogFilters();
}

function applyCatalogFilters() {
  const results = filterAndSortProducts({
    categories: catalogState.categories,
    query: catalogState.query,
    priceMin: catalogState.priceMin,
    priceMax: catalogState.priceMax,
    brands: catalogState.brands,
    minRating: catalogState.minRating,
    onlyDiscount: catalogState.onlyDiscount,
    sort: catalogState.sort,
  });

  const titleEl = document.getElementById("catalogTitle");
  if (titleEl) {
    if (catalogState.query) titleEl.textContent = `Результаты по запросу «${catalogState.query}»`;
    else if (catalogState.categories.length === 1) titleEl.textContent = categoryTitle(catalogState.categories[0]);
    else titleEl.textContent = "Каталог товаров";
  }

  const countEl = document.getElementById("resultsCount");
  if (countEl) countEl.textContent = `Найдено товаров: ${results.length}`;

  renderProductGrid(document.getElementById("catalogGrid"), results, "По вашему запросу ничего не найдено");
}

/* =========================================================
   СТРАНИЦА ТОВАРА
   ========================================================= */
let currentProductSelection = { color: "", size: "", qty: 1 };

function initProductPage() {
  const params = new URLSearchParams(location.search);
  const product = getProductById(params.get("id"));
  const root = document.getElementById("productRoot");
  if (!product) {
    if (root) root.innerHTML = `<div class="empty-state"><h3>Товар не найден</h3><p><a href="catalog.html" class="form-link">Вернуться в каталог</a></p></div>`;
    return;
  }

  currentProductSelection = { color: product.colors[0] || "", size: product.sizes[0] || "", qty: 1 };

  document.title = `${product.title} — Улей`;
  document.getElementById("breadcrumbCategory").textContent = categoryTitle(product.category);
  document.getElementById("breadcrumbCategory").href = `catalog.html?category=${product.category}`;
  document.getElementById("breadcrumbTitle").textContent = product.title;

  document.getElementById("mainImage").src = product.image;
  document.getElementById("mainImage").alt = product.title;
  document.getElementById("galleryThumbs").innerHTML = product.images
    .map((img, i) => `<button data-img="${img}" class="${i === 0 ? "active" : ""}"><img src="${img}" alt=""></button>`)
    .join("");
  document.getElementById("galleryThumbs").addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    document.getElementById("mainImage").src = btn.dataset.img;
    document.querySelectorAll("#galleryThumbs button").forEach((b) => b.classList.toggle("active", b === btn));
  });

  document.getElementById("pBrand").textContent = product.brand;
  document.getElementById("pTitle").textContent = product.title;
  document.getElementById("pStars").textContent = `★ ${product.rating.toFixed(1)}`;
  document.getElementById("pReviewsCount").textContent = `${product.reviews} отзывов`;

  const disc = discountPercent(product);
  document.getElementById("priceNow").textContent = formatPrice(product.price);
  const oldPriceEl = document.getElementById("priceOld");
  const badgeEl = document.getElementById("priceBadge");
  if (product.oldPrice) {
    oldPriceEl.textContent = formatPrice(product.oldPrice);
    oldPriceEl.style.display = "";
    badgeEl.textContent = `-${disc}%`;
    badgeEl.style.display = "";
  } else {
    oldPriceEl.style.display = "none";
    badgeEl.style.display = "none";
  }
  document.getElementById("pStock").textContent = product.stock > 0 ? `В наличии — ${product.stock} шт.` : "Нет в наличии";

  // Цвета
  const colorGroup = document.getElementById("colorGroup");
  if (product.colors.length) {
    colorGroup.style.display = "";
    colorGroup.querySelector(".color-row").innerHTML = product.colors
      .map((c, i) => `<button class="color-swatch ${i === 0 ? "active" : ""}" style="background:${c}" data-color="${c}" aria-label="Цвет"></button>`)
      .join("");
    colorGroup.querySelectorAll(".color-swatch").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentProductSelection.color = btn.dataset.color;
        colorGroup.querySelectorAll(".color-swatch").forEach((b) => b.classList.toggle("active", b === btn));
      });
    });
  } else {
    colorGroup.style.display = "none";
  }

  // Размеры
  const sizeGroup = document.getElementById("sizeGroup");
  if (product.sizes.length) {
    sizeGroup.style.display = "";
    sizeGroup.querySelector(".size-row").innerHTML = product.sizes
      .map((s, i) => `<button class="size-chip ${i === 0 ? "active" : ""}" data-size="${s}">${s}</button>`)
      .join("");
    sizeGroup.querySelectorAll(".size-chip").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentProductSelection.size = btn.dataset.size;
        sizeGroup.querySelectorAll(".size-chip").forEach((b) => b.classList.toggle("active", b === btn));
      });
    });
  } else {
    sizeGroup.style.display = "none";
  }

  // Количество
  const qtyDisplay = document.getElementById("qtyDisplay");
  document.getElementById("qtyMinus").addEventListener("click", () => {
    currentProductSelection.qty = Math.max(1, currentProductSelection.qty - 1);
    qtyDisplay.textContent = currentProductSelection.qty;
  });
  document.getElementById("qtyPlus").addEventListener("click", () => {
    currentProductSelection.qty = Math.min(product.stock || 99, currentProductSelection.qty + 1);
    qtyDisplay.textContent = currentProductSelection.qty;
  });

  // Избранное
  const favBtn = document.getElementById("pFavBtn");
  favBtn.classList.toggle("active", isFavorite(product.id));
  favBtn.innerHTML = `${ICONS.heart} <span>${isFavorite(product.id) ? "В избранном" : "В избранное"}</span>`;
  favBtn.addEventListener("click", () => {
    const added = toggleFavorite(product.id);
    favBtn.classList.toggle("active", added);
    favBtn.querySelector("span").textContent = added ? "В избранном" : "В избранное";
    showToast(added ? "Добавлено в избранное" : "Убрано из избранного");
  });

  // Добавить в корзину / купить сейчас
  document.getElementById("addToCartBtn").addEventListener("click", () => {
    addToCart(product.id, currentProductSelection);
    showToast(`«${product.title}» добавлен в корзину`, "success");
  });
  document.getElementById("buyNowBtn").addEventListener("click", () => {
    addToCart(product.id, currentProductSelection);
    window.location.href = "checkout.html";
  });

  // Вкладки
  document.getElementById("pDescription").textContent = product.description;
  const specsBody = document.getElementById("specsBody");
  specsBody.innerHTML = Object.entries(product.specs)
    .filter(([k]) => k)
    .map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`)
    .join("");
  renderProductReviews(product);

  const tabButtons = document.querySelectorAll(".p-tabs-nav button");
  function activateTab(tabId) {
    tabButtons.forEach((b) => b.classList.toggle("active", b.dataset.tab === tabId));
    document.querySelectorAll(".p-tab-panel").forEach((p) => p.classList.toggle("active", p.id === tabId));
  }
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab));
  });
  document.getElementById("pReviewsCount")?.addEventListener("click", (e) => {
    e.preventDefault();
    activateTab("tabReviews");
    document.querySelector(".p-tabs").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Похожие товары
  renderProductGrid(document.getElementById("relatedGrid"), getRelatedProducts(product, 4));
}

function renderProductReviews(product) {
  const names = ["Айгуль", "Данияр", "Марина", "Тимур", "Жанна", "Олег"];
  const texts = [
    "Товар полностью соответствует описанию, качеством довольна.",
    "Быстрая доставка, упаковано аккуратно. Буду заказывать ещё.",
    "Хорошее соотношение цены и качества, рекомендую.",
    "Есть небольшие нюансы, но в целом покупкой доволен.",
    "Выглядит даже лучше, чем на фото. Спасибо!",
  ];
  const count = Math.min(3, product.reviews);
  const box = document.getElementById("reviewsList");
  let html = "";
  for (let i = 0; i < count; i++) {
    const stars = Math.max(3, Math.round(product.rating) - (i === 2 ? 1 : 0));
    html += `
      <div class="review-item">
        <div class="review-head"><span>${names[i % names.length]}</span><span class="stars">${"★".repeat(stars)}${"☆".repeat(5 - stars)}</span></div>
        <p>${texts[(i + product.id) % texts.length]}</p>
      </div>`;
  }
  box.innerHTML = html || `<p>Пока нет отзывов на этот товар.</p>`;
}

/* =========================================================
   КОРЗИНА
   ========================================================= */
function initCartPage() {
  renderCart();
}

function renderCart() {
  const cart = getCart();
  const listEl = document.getElementById("cartItemsList");
  const emptyEl = document.getElementById("cartEmpty");
  const summaryEl = document.getElementById("cartSummaryBox");

  if (!cart.length) {
    if (listEl) listEl.style.display = "none";
    if (summaryEl) summaryEl.style.display = "none";
    if (emptyEl) emptyEl.style.display = "block";
    return;
  }
  if (emptyEl) emptyEl.style.display = "none";
  if (listEl) listEl.style.display = "flex";
  if (summaryEl) summaryEl.style.display = "block";

  listEl.innerHTML = cart
    .map((item) => {
      const p = getProductById(item.id);
      if (!p) return "";
      const metaParts = [item.color ? `Цвет` : "", item.size ? `Размер: ${item.size}` : ""].filter(Boolean);
      return `
      <div class="cart-item" data-key="${item.key}">
        <a href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.title}"></a>
        <div>
          <a href="product.html?id=${p.id}" class="ci-title">${p.title}</a>
          <div class="ci-meta">${metaParts.join(" · ") || p.brand}</div>
          <div class="ci-price">${formatPrice(p.price)}</div>
        </div>
        <div class="ci-side">
          <div class="qty-control">
            <button data-qty-minus="${item.key}" aria-label="Уменьшить">−</button>
            <span>${item.qty}</span>
            <button data-qty-plus="${item.key}" aria-label="Увеличить">+</button>
          </div>
          <button class="ci-remove" data-remove="${item.key}">Удалить</button>
        </div>
      </div>`;
    })
    .join("");

  const total = cartTotal();
  const oldTotal = cartOldTotal();
  const savings = oldTotal - total;
  document.getElementById("summaryCount").textContent = `${cartCount()} товар(а)`;
  document.getElementById("summarySubtotal").textContent = formatPrice(oldTotal);
  document.getElementById("summaryDiscount").textContent = savings > 0 ? `−${formatPrice(savings)}` : formatPrice(0);
  document.getElementById("summaryTotal").textContent = formatPrice(total);

  listEl.querySelectorAll("[data-qty-minus]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = cart.find((c) => c.key === btn.dataset.qtyMinus);
      setCartQty(item.key, item.qty - 1);
      renderCart();
    });
  });
  listEl.querySelectorAll("[data-qty-plus]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = cart.find((c) => c.key === btn.dataset.qtyPlus);
      setCartQty(item.key, item.qty + 1);
      renderCart();
    });
  });
  listEl.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeFromCart(btn.dataset.remove);
      showToast("Товар удалён из корзины");
      renderCart();
    });
  });
}

/* =========================================================
   ИЗБРАННОЕ
   ========================================================= */
function initFavoritesPage() {
  const favIds = getFavorites();
  const products = favIds.map((id) => getProductById(id)).filter(Boolean);
  const grid = document.getElementById("favoritesGrid");
  const emptyEl = document.getElementById("favoritesEmpty");
  if (!products.length) {
    if (grid) grid.style.display = "none";
    if (emptyEl) emptyEl.style.display = "block";
    return;
  }
  if (emptyEl) emptyEl.style.display = "none";
  if (grid) grid.style.display = "grid";
  renderProductGrid(grid, products);
}

/* =========================================================
   АВТОРИЗАЦИЯ (имитация)
   ========================================================= */
function initLoginPage() {
  const loginTab = document.getElementById("tabLogin");
  const registerTab = document.getElementById("tabRegister");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  function showLogin() {
    loginTab.classList.add("active");
    registerTab.classList.remove("active");
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  }
  function showRegister() {
    registerTab.classList.add("active");
    loginTab.classList.remove("active");
    registerForm.style.display = "block";
    loginForm.style.display = "none";
  }
  loginTab.addEventListener("click", showLogin);
  registerTab.addEventListener("click", showRegister);
  document.getElementById("goToRegister")?.addEventListener("click", showRegister);
  document.getElementById("goToLogin")?.addEventListener("click", showLogin);

  const user = getUser();
  if (user) {
    document.getElementById("loggedInView").style.display = "block";
    document.getElementById("authTabsCard").style.display = "none";
    document.getElementById("loggedInName").textContent = user.name;
    document.getElementById("loggedInContact").textContent = user.contact;
  }

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const contact = document.getElementById("loginContact").value.trim();
    const password = document.getElementById("loginPassword").value;
    let ok = true;
    if (!contact) { markInvalid("loginContact", "Введите телефон или email"); ok = false; } else markValid("loginContact");
    if (!password || password.length < 4) { markInvalid("loginPassword", "Минимум 4 символа"); ok = false; } else markValid("loginPassword");
    if (!ok) return;
    setUser({ name: contact.includes("@") ? contact.split("@")[0] : "Покупатель", contact });
    showToast("Вы успешно вошли", "success");
    setTimeout(() => (window.location.href = "index.html"), 700);
  });

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("regName").value.trim();
    const contact = document.getElementById("regContact").value.trim();
    const password = document.getElementById("regPassword").value;
    let ok = true;
    if (!name) { markInvalid("regName", "Введите имя"); ok = false; } else markValid("regName");
    if (!contact) { markInvalid("regContact", "Введите телефон или email"); ok = false; } else markValid("regContact");
    if (!password || password.length < 4) { markInvalid("regPassword", "Минимум 4 символа"); ok = false; } else markValid("regPassword");
    if (!ok) return;
    setUser({ name, contact });
    showToast("Аккаунт создан", "success");
    setTimeout(() => (window.location.href = "index.html"), 700);
  });
}

function markInvalid(fieldId, message) {
  const field = document.getElementById(fieldId)?.closest(".field");
  if (!field) return;
  field.classList.add("invalid");
  const err = field.querySelector(".field-error");
  if (err) err.textContent = message;
}
function markValid(fieldId) {
  document.getElementById(fieldId)?.closest(".field")?.classList.remove("invalid");
}

/* =========================================================
   ОФОРМЛЕНИЕ ЗАКАЗА
   ========================================================= */
function initCheckoutPage() {
  const cart = getCart();
  if (!cart.length) {
    const root = document.getElementById("checkoutRoot");
    if (root) {
      root.innerHTML = `<div class="empty-state">
        <h3>Ваша корзина пуста</h3>
        <p>Добавьте товары, чтобы оформить заказ.</p>
        <p style="margin-top:14px;"><a href="catalog.html" class="btn btn-primary">Перейти в каталог</a></p>
      </div>`;
    }
    return;
  }

  const miniList = document.getElementById("orderMiniList");
  miniList.innerHTML = cart
    .map((item) => {
      const p = getProductById(item.id);
      if (!p) return "";
      return `<div class="order-mini-item">
        <img src="${p.image}" alt="">
        <div>
          <div class="omi-title">${p.title}</div>
          <div class="omi-qty">${item.qty} × ${formatPrice(p.price)}</div>
        </div>
      </div>`;
    })
    .join("");

  const total = cartTotal();
  document.getElementById("orderSubtotal").textContent = formatPrice(total);
  document.getElementById("orderDelivery").textContent = total >= 3000 ? "Бесплатно" : formatPrice(250);
  const finalTotal = total >= 3000 ? total : total + 250;
  document.getElementById("orderTotal").textContent = formatPrice(finalTotal);

  document.querySelectorAll('input[name="delivery"]').forEach((input) => {
    input.addEventListener("change", () => {
      document.querySelectorAll('input[name="delivery"]').forEach((i) => i.closest(".radio-card").classList.toggle("checked", i.checked));
    });
  });
  document.querySelectorAll('input[name="payment"]').forEach((input) => {
    input.addEventListener("change", () => {
      document.querySelectorAll('input[name="payment"]').forEach((i) => i.closest(".radio-card").classList.toggle("checked", i.checked));
    });
  });

  const user = getUser();
  if (user) {
    if (user.contact && user.contact.includes("@")) document.getElementById("coEmail").value = user.contact;
    else document.getElementById("coPhone").value = user.contact || "";
    document.getElementById("coFirstName").value = user.name?.split(" ")[0] || "";
  }

  document.getElementById("checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const requiredFields = ["coFirstName", "coLastName", "coPhone", "coEmail", "coCity", "coAddress"];
    let ok = true;
    requiredFields.forEach((id) => {
      const val = document.getElementById(id).value.trim();
      if (!val) { markInvalid(id, "Обязательное поле"); ok = false; }
      else markValid(id);
    });
    const emailVal = document.getElementById("coEmail").value.trim();
    if (emailVal && !/^\S+@\S+\.\S+$/.test(emailVal)) { markInvalid("coEmail", "Некорректный email"); ok = false; }
    const phoneVal = document.getElementById("coPhone").value.trim();
    if (phoneVal && phoneVal.replace(/\D/g, "").length < 9) { markInvalid("coPhone", "Некорректный номер телефона"); ok = false; }

    if (!ok) {
      showToast("Проверьте правильность заполнения полей", "error");
      return;
    }

    const orderNumber = "UL-" + Math.floor(100000 + Math.random() * 900000);
    localStorage.removeItem(STORAGE_KEYS.cart);
    updateHeaderCounts();

    openModal({
      icon: "✓",
      title: "Заказ успешно оформлен!",
      text: `Номер вашего заказа — ${orderNumber}. Мы свяжемся с вами в ближайшее время для подтверждения.`,
      actionLabel: "На главную",
      onAction: () => (window.location.href = "index.html"),
    });
  });
}

/* =========================================================
   ТОЧКА ВХОДА
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  initHeader();

  renderCategoryLinks(document.getElementById("footerCategoryLinks"));
  renderCategoryLinks(document.getElementById("mobileCategoryLinks"));
  renderCategoryLinks(document.getElementById("headerCategoryNav"));

  const page = document.body.dataset.page;
  switch (page) {
    case "home": initHomePage(); break;
    case "catalog": initCatalogPage(); break;
    case "product": initProductPage(); break;
    case "cart": initCartPage(); break;
    case "favorites": initFavoritesPage(); break;
    case "login": initLoginPage(); break;
    case "checkout": initCheckoutPage(); break;
  }
});
