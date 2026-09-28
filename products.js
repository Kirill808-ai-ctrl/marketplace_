/* =========================================================
   УЛЕЙ — данные о товарах и категориях
   Единый источник данных для всех страниц сайта.
   ========================================================= */

const CATEGORIES = [
  { id: "clothes", title: "Одежда", icon: "👕" },
  { id: "shoes", title: "Обувь", icon: "👟" },
  { id: "electronics", title: "Электроника", icon: "💻" },
  { id: "phones", title: "Телефоны", icon: "📱" },
  { id: "computers", title: "Компьютеры", icon: "🖥️" },
  { id: "accessories", title: "Аксессуары", icon: "⌚" },
  { id: "beauty", title: "Красота", icon: "💄" },
  { id: "cosmetics", title: "Косметика", icon: "🧴" },
  { id: "home", title: "Дом", icon: "🏺" },
  { id: "furniture", title: "Мебель", icon: "🛋️" },
  { id: "sport", title: "Спорт", icon: "🏀" },
  { id: "kids", title: "Детские товары", icon: "🧸" },
  { id: "auto", title: "Автотовары", icon: "🚗" },
  { id: "food", title: "Продукты", icon: "🍯" },
  { id: "pets", title: "Товары для животных", icon: "🐾" },
];

function categoryTitle(id) {
  const c = CATEGORIES.find((c) => c.id === id);
  return c ? c.title : id;
}

/* Стабильная "случайная" картинка-заглушка по сиду (не ломает вёрстку,
   одинаковая на каждой перезагрузке для одного и того же товара). */
function imgFor(seed, n) {
  return `https://picsum.photos/seed/ulei-${seed}${n ? "-" + n : ""}/700/700`;
}

const PRODUCTS = [
  // ---------- ОДЕЖДА ----------
  {
    id: 1, title: "Худи оверсайз «Комфорт»", brand: "Ulei Basics",
    category: "clothes", price: 2490, oldPrice: 3490, rating: 4.7, reviews: 218,
    isNew: false, stock: 24,
    colors: ["#1B2420", "#C97F1E", "#8A8577"], sizes: ["XS", "S", "M", "L", "XL"],
    image: imgFor("hoodie"), images: [imgFor("hoodie"), imgFor("hoodie", 2), imgFor("hoodie", 3)],
    description: "Свободный крой, плотный хлопковый флис и мягкая изнанка — худи, в котором одинаково комфортно дома и на прогулке.",
    specs: { "Состав": "80% хлопок, 20% полиэстер", "Плотность": "320 г/м²", "Уход": "Машинная стирка 30°C", "Страна": "Кыргызстан" },
  },
  {
    id: 2, title: "Платье миди из льна", brand: "Linen Story",
    category: "clothes", price: 3190, oldPrice: null, rating: 4.9, reviews: 96,
    isNew: true, stock: 15,
    colors: ["#FAF7F1", "#7A3B69", "#1B2420"], sizes: ["XS", "S", "M", "L"],
    image: imgFor("dress"), images: [imgFor("dress"), imgFor("dress", 2), imgFor("dress", 3)],
    description: "Летнее платье прямого силуэта из натурального льна. Дышащая ткань, регулируемый пояс, два кармана.",
    specs: { "Состав": "100% лён", "Длина": "Миди", "Уход": "Деликатная стирка", "Страна": "Турция" },
  },
  {
    id: 3, title: "Джинсы прямого кроя", brand: "Denim Co.",
    category: "clothes", price: 2790, oldPrice: 3990, rating: 4.6, reviews: 341,
    isNew: false, stock: 40,
    colors: ["#2B3A55", "#1B2420"], sizes: ["28", "30", "32", "34", "36"],
    image: imgFor("jeans"), images: [imgFor("jeans"), imgFor("jeans", 2), imgFor("jeans", 3)],
    description: "Классические джинсы прямого кроя из плотного денима с небольшим содержанием стрейча для свободы движения.",
    specs: { "Состав": "98% хлопок, 2% эластан", "Посадка": "Средняя", "Уход": "Стирка при 30°C", "Страна": "Узбекистан" },
  },
  {
    id: 4, title: "Куртка утеплённая «Зима+»", brand: "Ulei Outdoor",
    category: "clothes", price: 6490, oldPrice: 8990, rating: 4.8, reviews: 152,
    isNew: false, stock: 12,
    colors: ["#1B2420", "#C1443A"], sizes: ["S", "M", "L", "XL", "XXL"],
    image: imgFor("jacket"), images: [imgFor("jacket"), imgFor("jacket", 2), imgFor("jacket", 3)],
    description: "Тёплая куртка с мембранной тканью верха и синтетическим утеплителем до −25°C. Съёмный капюшон.",
    specs: { "Утеплитель": "Синтепух 250 г", "Мембрана": "Да", "Температура": "до −25°C", "Страна": "Кыргызстан" },
  },

  // ---------- ОБУВЬ ----------
  {
    id: 5, title: "Кроссовки «AirRun 3»", brand: "Runlab",
    category: "shoes", price: 4590, oldPrice: 5990, rating: 4.7, reviews: 512,
    isNew: false, stock: 33,
    colors: ["#FFFFFF", "#1B2420"], sizes: ["38", "39", "40", "41", "42", "43", "44"],
    image: imgFor("sneakers"), images: [imgFor("sneakers"), imgFor("sneakers", 2), imgFor("sneakers", 3)],
    description: "Беговые кроссовки с амортизирующей подошвой и дышащим сетчатым верхом. Подходят для города и лёгких пробежек.",
    specs: { "Верх": "Текстильная сетка", "Подошва": "EVA + резина", "Тип": "Беговые", "Страна": "Вьетнам" },
  },
  {
    id: 6, title: "Ботинки кожаные челси", brand: "Craft&Sole",
    category: "shoes", price: 5290, oldPrice: null, rating: 4.8, reviews: 87,
    isNew: true, stock: 18,
    colors: ["#3B2A1E", "#1B2420"], sizes: ["40", "41", "42", "43", "44", "45"],
    image: imgFor("boots"), images: [imgFor("boots"), imgFor("boots", 2), imgFor("boots", 3)],
    description: "Классические челси из натуральной кожи с эластичными вставками. Устойчивая подошва для города.",
    specs: { "Материал верха": "Натуральная кожа", "Подкладка": "Текстиль", "Сезон": "Демисезон", "Страна": "Кыргызстан" },
  },
  {
    id: 7, title: "Сандалии летние «Бриз»", brand: "Sunwalk",
    category: "shoes", price: 1690, oldPrice: 2290, rating: 4.5, reviews: 204,
    isNew: false, stock: 50,
    colors: ["#C97F1E", "#7A3B69"], sizes: ["36", "37", "38", "39", "40"],
    image: imgFor("sandals"), images: [imgFor("sandals"), imgFor("sandals", 2)],
    description: "Лёгкие сандалии с мягкой стелькой и регулируемыми ремешками — идеальны для жаркого лета.",
    specs: { "Материал": "Эко-кожа", "Стелька": "Анатомическая", "Вес пары": "310 г", "Страна": "Китай" },
  },

  // ---------- ЭЛЕКТРОНИКА ----------
  {
    id: 8, title: "Беспроводные наушники Pro X", brand: "SoundHive",
    category: "electronics", price: 4990, oldPrice: 6990, rating: 4.8, reviews: 324,
    isNew: false, stock: 60,
    colors: ["#1B2420", "#FFFFFF"], sizes: [],
    image: imgFor("headphones"), images: [imgFor("headphones"), imgFor("headphones", 2), imgFor("headphones", 3)],
    description: "Накладные наушники с активным шумоподавлением, до 40 часов работы и быстрой зарядкой.",
    specs: { "Тип": "Накладные, Bluetooth 5.3", "Автономность": "40 часов", "Шумоподавление": "Активное (ANC)", "Зарядка": "USB-C" },
  },
  {
    id: 9, title: "Умные часы Fit Pulse 2", brand: "PulseTech",
    category: "electronics", price: 5490, oldPrice: 6990, rating: 4.6, reviews: 268,
    isNew: true, stock: 27,
    colors: ["#1B2420", "#7A3B69"], sizes: [],
    image: imgFor("smartwatch"), images: [imgFor("smartwatch"), imgFor("smartwatch", 2), imgFor("smartwatch", 3)],
    description: "Фитнес-часы с пульсометром, отслеживанием сна и до 14 дней автономной работы. Защита от воды 5 АТМ.",
    specs: { "Экран": "AMOLED 1.4\"", "Автономность": "14 дней", "Защита": "5 ATM", "Совместимость": "iOS / Android" },
  },
  {
    id: 10, title: "Портативная колонка BoomBox Mini", brand: "SoundHive",
    category: "electronics", price: 2990, oldPrice: null, rating: 4.5, reviews: 143,
    isNew: false, stock: 45,
    colors: ["#C1443A", "#1B2420", "#3B7A57"], sizes: [],
    image: imgFor("speaker"), images: [imgFor("speaker"), imgFor("speaker", 2)],
    description: "Компактная влагозащищённая колонка с мощным басом и автономностью до 12 часов.",
    specs: { "Мощность": "20 Вт", "Автономность": "12 часов", "Защита": "IPX6", "Bluetooth": "5.1" },
  },
  {
    id: 11, title: "Планшет TabLite 11", brand: "NovaTech",
    category: "electronics", price: 13990, oldPrice: 16990, rating: 4.7, reviews: 76,
    isNew: false, stock: 14,
    colors: ["#8A8577", "#1B2420"], sizes: [],
    image: imgFor("tablet"), images: [imgFor("tablet"), imgFor("tablet", 2), imgFor("tablet", 3)],
    description: "Лёгкий планшет с ярким IPS-экраном 11 дюймов — для учёбы, фильмов и работы с документами.",
    specs: { "Экран": "IPS 11\", 90 Гц", "Память": "128 ГБ", "Батарея": "8000 мАч", "ОС": "Android 14" },
  },

  // ---------- ТЕЛЕФОНЫ ----------
  {
    id: 12, title: "Смартфон Nova S12", brand: "NovaTech",
    category: "phones", price: 24990, oldPrice: 28990, rating: 4.7, reviews: 412,
    isNew: true, stock: 22,
    colors: ["#1B2420", "#FFFFFF", "#7A3B69"], sizes: ["128 ГБ", "256 ГБ"],
    image: imgFor("phone1"), images: [imgFor("phone1"), imgFor("phone1", 2), imgFor("phone1", 3)],
    description: "Флагманская камера, яркий AMOLED-экран 120 Гц и быстрая зарядка 67 Вт в стильном корпусе.",
    specs: { "Экран": "AMOLED 6.7\", 120 Гц", "Камера": "50 + 12 + 8 Мп", "Батарея": "5000 мАч", "Зарядка": "67 Вт" },
  },
  {
    id: 13, title: "Смартфон Nova A5 Lite", brand: "NovaTech",
    category: "phones", price: 11990, oldPrice: 13490, rating: 4.4, reviews: 189,
    isNew: false, stock: 38,
    colors: ["#1B2420", "#3B7A57"], sizes: ["64 ГБ", "128 ГБ"],
    image: imgFor("phone2"), images: [imgFor("phone2"), imgFor("phone2", 2)],
    description: "Доступный смартфон с большим экраном и батареей на весь день — надёжный выбор на каждый день.",
    specs: { "Экран": "IPS 6.5\", 90 Гц", "Камера": "48 Мп", "Батарея": "5000 мАч", "ОС": "Android 14" },
  },
  {
    id: 14, title: "Чехол защитный силиконовый", brand: "CaseUp",
    category: "phones", price: 490, oldPrice: 790, rating: 4.3, reviews: 512,
    isNew: false, stock: 200,
    colors: ["#1B2420", "#7A3B69", "#C97F1E", "#3B7A57"], sizes: [],
    image: imgFor("phonecase"), images: [imgFor("phonecase"), imgFor("phonecase", 2)],
    description: "Тонкий силиконовый чехол с усиленными углами и мягкой микрофиброй внутри.",
    specs: { "Материал": "Силикон + микрофибра", "Совместимость": "Универсальный", "Толщина": "1.2 мм", "" : "" },
  },

  // ---------- КОМПЬЮТЕРЫ ----------
  {
    id: 15, title: "Ноутбук WorkBook 14", brand: "NovaTech",
    category: "computers", price: 42990, oldPrice: 48990, rating: 4.8, reviews: 94,
    isNew: true, stock: 9,
    colors: ["#8A8577", "#1B2420"], sizes: ["8/256 ГБ", "16/512 ГБ"],
    image: imgFor("laptop1"), images: [imgFor("laptop1"), imgFor("laptop1", 2), imgFor("laptop1", 3)],
    description: "Тонкий и лёгкий ноутбук для учёбы и офисной работы с ярким IPS-экраном и быстрым SSD.",
    specs: { "Экран": "IPS 14\", FHD", "Процессор": "8-ядерный, 3.2 ГГц", "SSD": "от 256 ГБ", "Вес": "1.3 кг" },
  },
  {
    id: 16, title: "Игровой ноутбук StrikeForce 16", brand: "StrikeForce",
    category: "computers", price: 79990, oldPrice: 89990, rating: 4.9, reviews: 61,
    isNew: false, stock: 6,
    colors: ["#1B2420"], sizes: ["16/512 ГБ", "32/1024 ГБ"],
    image: imgFor("laptop2"), images: [imgFor("laptop2"), imgFor("laptop2", 2), imgFor("laptop2", 3)],
    description: "Мощный игровой ноутбук с дискретной видеокартой и экраном 165 Гц для комфортного гейминга.",
    specs: { "Экран": "16\", 165 Гц", "Видеокарта": "8 ГБ дискретная", "Охлаждение": "Двойной вентилятор", "Вес": "2.4 кг" },
  },
  {
    id: 17, title: "Беспроводная мышь ErgoClick", brand: "DeskPro",
    category: "computers", price: 890, oldPrice: 1290, rating: 4.6, reviews: 233,
    isNew: false, stock: 90,
    colors: ["#1B2420", "#FFFFFF"], sizes: [],
    image: imgFor("mouse"), images: [imgFor("mouse"), imgFor("mouse", 2)],
    description: "Эргономичная беспроводная мышь с бесшумными кнопками и автономностью до 6 месяцев.",
    specs: { "Подключение": "Bluetooth + 2.4 ГГц", "DPI": "800–2400", "Автономность": "6 месяцев", "" : "" },
  },
  {
    id: 18, title: "Механическая клавиатура TypeMaster", brand: "DeskPro",
    category: "computers", price: 3490, oldPrice: null, rating: 4.7, reviews: 118,
    isNew: true, stock: 21,
    colors: ["#1B2420"], sizes: [],
    image: imgFor("keyboard"), images: [imgFor("keyboard"), imgFor("keyboard", 2), imgFor("keyboard", 3)],
    description: "Механическая клавиатура с подсветкой RGB и приятными тактильными переключателями.",
    specs: { "Переключатели": "Тактильные, Blue", "Подсветка": "RGB", "Подключение": "USB-C", "" : "" },
  },

  // ---------- АКСЕССУАРЫ ----------
  {
    id: 19, title: "Рюкзак городской «Транзит»", brand: "Ulei Gear",
    category: "accessories", price: 2390, oldPrice: 2990, rating: 4.7, reviews: 176,
    isNew: false, stock: 40,
    colors: ["#1B2420", "#8A8577"], sizes: [],
    image: imgFor("backpack"), images: [imgFor("backpack"), imgFor("backpack", 2), imgFor("backpack", 3)],
    description: "Вместительный рюкзак с отделением для ноутбука 15\", влагозащитной тканью и системой ремней.",
    specs: { "Объём": "22 л", "Отделение для ноутбука": "до 15\"", "Материал": "Полиэстер 900D", "" : "" },
  },
  {
    id: 20, title: "Ремень кожаный классический", brand: "Craft&Sole",
    category: "accessories", price: 990, oldPrice: 1390, rating: 4.5, reviews: 84,
    isNew: false, stock: 60,
    colors: ["#3B2A1E", "#1B2420"], sizes: ["S", "M", "L"],
    image: imgFor("belt"), images: [imgFor("belt"), imgFor("belt", 2)],
    description: "Классический ремень из плотной натуральной кожи с металлической пряжкой.",
    specs: { "Материал": "Натуральная кожа", "Ширина": "3.5 см", "Пряжка": "Металл", "" : "" },
  },
  {
    id: 21, title: "Солнцезащитные очки «Юг»", brand: "Sunwalk",
    category: "accessories", price: 1290, oldPrice: null, rating: 4.6, reviews: 59,
    isNew: true, stock: 35,
    colors: ["#1B2420", "#7A3B69"], sizes: [],
    image: imgFor("sunglasses"), images: [imgFor("sunglasses"), imgFor("sunglasses", 2)],
    description: "Стильные очки с поляризационными линзами и защитой от УФ-излучения UV400.",
    specs: { "Линзы": "Поляризационные", "Защита": "UV400", "Оправа": "Ацетат", "" : "" },
  },

  // ---------- КРАСОТА ----------
  {
    id: 22, title: "Фен для волос AirFlow 2200", brand: "GlowLab",
    category: "beauty", price: 2190, oldPrice: 2890, rating: 4.6, reviews: 201,
    isNew: false, stock: 30,
    colors: ["#7A3B69", "#1B2420"], sizes: [],
    image: imgFor("hairdryer"), images: [imgFor("hairdryer"), imgFor("hairdryer", 2)],
    description: "Мощный фен с ионизацией для быстрой сушки без пересушивания волос. Три температурных режима.",
    specs: { "Мощность": "2200 Вт", "Ионизация": "Да", "Насадки": "2 шт.", "" : "" },
  },
  {
    id: 23, title: "Электрическая щётка для лица", brand: "GlowLab",
    category: "beauty", price: 1590, oldPrice: 1990, rating: 4.4, reviews: 132,
    isNew: false, stock: 44,
    colors: ["#FAF7F1", "#7A3B69"], sizes: [],
    image: imgFor("facebrush"), images: [imgFor("facebrush"), imgFor("facebrush", 2)],
    description: "Силиконовая щётка для глубокого очищения кожи с тремя режимами интенсивности.",
    specs: { "Режимы": "3", "Влагозащита": "IPX6", "Зарядка": "USB", "" : "" },
  },

  // ---------- КОСМЕТИКА ----------
  {
    id: 24, title: "Набор кистей для макияжа, 12 шт.", brand: "GlowLab",
    category: "cosmetics", price: 1090, oldPrice: 1590, rating: 4.7, reviews: 298,
    isNew: false, stock: 55,
    colors: [], sizes: [],
    image: imgFor("brushes"), images: [imgFor("brushes"), imgFor("brushes", 2)],
    description: "Набор профессиональных кистей из мягкого синтетического ворса с чехлом для хранения.",
    specs: { "Количество": "12 шт.", "Ворс": "Синтетика", "В комплекте": "Чехол", "" : "" },
  },
  {
    id: 25, title: "Сыворотка увлажняющая с гиалуроном", brand: "PureSkin",
    category: "cosmetics", price: 890, oldPrice: null, rating: 4.8, reviews: 410,
    isNew: true, stock: 80,
    colors: [], sizes: ["30 мл", "50 мл"],
    image: imgFor("serum"), images: [imgFor("serum"), imgFor("serum", 2)],
    description: "Лёгкая сыворотка с гиалуроновой кислотой для глубокого увлажнения и упругости кожи.",
    specs: { "Объём": "30 / 50 мл", "Тип кожи": "Любой", "Активный компонент": "Гиалуроновая кислота", "" : "" },
  },
  {
    id: 26, title: "Палетка теней «Закат»", brand: "GlowLab",
    category: "cosmetics", price: 1290, oldPrice: 1690, rating: 4.6, reviews: 167,
    isNew: false, stock: 37,
    colors: [], sizes: [],
    image: imgFor("palette"), images: [imgFor("palette"), imgFor("palette", 2)],
    description: "12 пигментированных оттенков — от тёплого бежевого до глубокого бордового.",
    specs: { "Оттенков": "12", "Финиш": "Матовый и сатиновый", "" : "", "" : "" },
  },

  // ---------- ДОМ ----------
  {
    id: 27, title: "Набор кастрюль «Уют», 4 предмета", brand: "HomeCraft",
    category: "home", price: 3690, oldPrice: 4590, rating: 4.7, reviews: 143,
    isNew: false, stock: 20,
    colors: [], sizes: [],
    image: imgFor("pots"), images: [imgFor("pots"), imgFor("pots", 2)],
    description: "Набор кастрюль с антипригарным покрытием и стеклянными крышками — для любой плиты, включая индукцию.",
    specs: { "Материал": "Алюминий с покрытием", "Плиты": "Все, включая индукцию", "В наборе": "4 предмета", "" : "" },
  },
  {
    id: 28, title: "Ароматическая свеча «Тёплый вечер»", brand: "HomeCraft",
    category: "home", price: 590, oldPrice: null, rating: 4.9, reviews: 88,
    isNew: true, stock: 65,
    colors: [], sizes: [],
    image: imgFor("candle"), images: [imgFor("candle"), imgFor("candle", 2)],
    description: "Свеча ручной работы из соевого воска с ароматом ванили и сандала. Время горения — 40 часов.",
    specs: { "Воск": "Соевый", "Время горения": "40 часов", "Аромат": "Ваниль, сандал", "" : "" },
  },
  {
    id: 29, title: "Постельное бельё сатин, евро", brand: "HomeCraft",
    category: "home", price: 2290, oldPrice: 2990, rating: 4.8, reviews: 205,
    isNew: false, stock: 28,
    colors: ["#FAF7F1", "#7A3B69", "#1B2420"], sizes: ["Евро", "2-спальный"],
    image: imgFor("bedding"), images: [imgFor("bedding"), imgFor("bedding", 2)],
    description: "Комплект постельного белья из сатина плотностью 120 г/м² — мягкий, прочный и приятный к телу.",
    specs: { "Ткань": "Сатин", "Плотность": "120 г/м²", "В комплекте": "Пододеяльник, простыня, 2 наволочки", "" : "" },
  },

  // ---------- МЕБЕЛЬ ----------
  {
    id: 30, title: "Кресло офисное ErgoSit", brand: "DeskPro",
    category: "furniture", price: 8990, oldPrice: 10990, rating: 4.6, reviews: 97,
    isNew: false, stock: 11,
    colors: ["#1B2420", "#8A8577"], sizes: [],
    image: imgFor("chair"), images: [imgFor("chair"), imgFor("chair", 2), imgFor("chair", 3)],
    description: "Эргономичное кресло с регулируемой поясничной поддержкой и подлокотниками для долгой работы за компьютером.",
    specs: { "Максимальный вес": "120 кг", "Регулировки": "Высота, наклон, подлокотники", "Материал": "Сетка + ткань", "" : "" },
  },
  {
    id: 31, title: "Журнальный столик «Скандо»", brand: "HomeCraft",
    category: "furniture", price: 4990, oldPrice: null, rating: 4.7, reviews: 42,
    isNew: true, stock: 8,
    colors: ["#8A8577", "#3B2A1E"], sizes: [],
    image: imgFor("table"), images: [imgFor("table"), imgFor("table", 2)],
    description: "Компактный журнальный столик из массива дерева в скандинавском стиле.",
    specs: { "Материал": "Массив сосны", "Размер": "90×50×45 см", "Сборка": "Требуется", "" : "" },
  },

  // ---------- СПОРТ ----------
  {
    id: 32, title: "Коврик для йоги ProGrip", brand: "MoveFit",
    category: "sport", price: 1190, oldPrice: 1590, rating: 4.8, reviews: 276,
    isNew: false, stock: 70,
    colors: ["#3B7A57", "#7A3B69", "#1B2420"], sizes: [],
    image: imgFor("yogamat"), images: [imgFor("yogamat"), imgFor("yogamat", 2)],
    description: "Нескользящий коврик для йоги и фитнеса толщиной 6 мм из экологичного материала.",
    specs: { "Толщина": "6 мм", "Материал": "TPE", "Размер": "183×61 см", "" : "" },
  },
  {
    id: 33, title: "Гантели разборные 2×10 кг", brand: "MoveFit",
    category: "sport", price: 2690, oldPrice: null, rating: 4.7, reviews: 134,
    isNew: false, stock: 25,
    colors: [], sizes: [],
    image: imgFor("dumbbells"), images: [imgFor("dumbbells"), imgFor("dumbbells", 2)],
    description: "Разборные гантели с прорезиненным покрытием — компактное решение для домашних тренировок.",
    specs: { "Вес": "2×10 кг", "Покрытие": "Неопрен", "Регулировка": "Да", "" : "" },
  },

  // ---------- ДЕТСКИЕ ТОВАРЫ ----------
  {
    id: 34, title: "Конструктор «Город будущего», 350 деталей", brand: "PlayBox",
    category: "kids", price: 1890, oldPrice: 2390, rating: 4.9, reviews: 156,
    isNew: true, stock: 33,
    colors: [], sizes: [],
    image: imgFor("lego"), images: [imgFor("lego"), imgFor("lego", 2)],
    description: "Развивающий конструктор из безопасного пластика — совместим с популярными системами блоков.",
    specs: { "Деталей": "350", "Возраст": "6+", "Материал": "ABS-пластик", "" : "" },
  },
  {
    id: 35, title: "Плюшевый мишка «Тёпыч», 40 см", brand: "PlayBox",
    category: "kids", price: 990, oldPrice: null, rating: 4.9, reviews: 210,
    isNew: false, stock: 48,
    colors: ["#C97F1E", "#8A8577"], sizes: [],
    image: imgFor("teddy"), images: [imgFor("teddy"), imgFor("teddy", 2)],
    description: "Мягкая игрушка из гипоаллергенного плюша — первый друг вашего ребёнка.",
    specs: { "Высота": "40 см", "Материал": "Плюш, холлофайбер", "Возраст": "0+", "" : "" },
  },

  // ---------- АВТОТОВАРЫ ----------
  {
    id: 36, title: "Автомобильный видеорегистратор ViewCam 4K", brand: "AutoTech",
    category: "auto", price: 3990, oldPrice: 4990, rating: 4.6, reviews: 88,
    isNew: false, stock: 19,
    colors: ["#1B2420"], sizes: [],
    image: imgFor("dashcam"), images: [imgFor("dashcam"), imgFor("dashcam", 2)],
    description: "Регистратор с записью в 4K, ночным режимом и датчиком удара для полной уверенности на дороге.",
    specs: { "Разрешение": "4K", "Угол обзора": "150°", "Ночной режим": "Да", "" : "" },
  },
  {
    id: 37, title: "Автомобильные коврики универсальные", brand: "AutoTech",
    category: "auto", price: 1490, oldPrice: 1990, rating: 4.5, reviews: 63,
    isNew: false, stock: 40,
    colors: ["#1B2420"], sizes: [],
    image: imgFor("carmats"), images: [imgFor("carmats"), imgFor("carmats", 2)],
    description: "Прочные резиновые коврики с бортиком, защищающие салон от грязи и влаги в любую погоду.",
    specs: { "Материал": "Резина", "Комплект": "4 шт.", "Универсальность": "Большинство моделей", "" : "" },
  },

  // ---------- ПРОДУКТЫ ----------
  {
    id: 38, title: "Мёд натуральный горный, 500 г", brand: "Ulei Farm",
    category: "food", price: 490, oldPrice: null, rating: 4.9, reviews: 302,
    isNew: false, stock: 120,
    colors: [], sizes: [],
    image: imgFor("honey"), images: [imgFor("honey"), imgFor("honey", 2)],
    description: "Натуральный горный мёд от небольших пасек Кыргызстана без добавок и подогрева.",
    specs: { "Вес": "500 г", "Происхождение": "Кыргызстан", "Состав": "100% мёд", "" : "" },
  },
  {
    id: 39, title: "Набор специй для плова", brand: "SpiceHouse",
    category: "food", price: 350, oldPrice: 450, rating: 4.8, reviews: 121,
    isNew: false, stock: 90,
    colors: [], sizes: [],
    image: imgFor("spices"), images: [imgFor("spices"), imgFor("spices", 2)],
    description: "Сбалансированная смесь специй для настоящего узбекского плова.",
    specs: { "Вес": "100 г", "Состав": "Зира, барбарис, паприка и др.", "" : "", "" : "" },
  },

  // ---------- ТОВАРЫ ДЛЯ ЖИВОТНЫХ ----------
  {
    id: 40, title: "Сухой корм для собак «Актив», 10 кг", brand: "PetHive",
    category: "pets", price: 2890, oldPrice: 3390, rating: 4.7, reviews: 174,
    isNew: false, stock: 32,
    colors: [], sizes: ["3 кг", "10 кг"],
    image: imgFor("dogfood"), images: [imgFor("dogfood"), imgFor("dogfood", 2)],
    description: "Сбалансированный корм для активных собак с высоким содержанием мяса птицы.",
    specs: { "Вес": "3 / 10 кг", "Белок": "28%", "Возраст": "Взрослые собаки", "" : "" },
  },
  {
    id: 41, title: "Когтеточка-домик для кошки", brand: "PetHive",
    category: "pets", price: 2190, oldPrice: null, rating: 4.8, reviews: 96,
    isNew: true, stock: 17,
    colors: ["#8A8577", "#FAF7F1"], sizes: [],
    image: imgFor("cattower"), images: [imgFor("cattower"), imgFor("cattower", 2)],
    description: "Уютный домик с когтеточкой из джута — место для отдыха и заточки когтей.",
    specs: { "Материал": "ДСП, джут, плюш", "Размер": "40×40×90 см", "" : "", "" : "" },
  },
];

/* ---------- Вспомогательные функции ---------- */

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}

function getRelatedProducts(product, count = 4) {
  return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, count);
}

function discountPercent(p) {
  if (!p.oldPrice) return 0;
  return Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
}

function formatPrice(value) {
  return new Intl.NumberFormat("ru-RU").format(value) + " сом";
}

/* Полнотекстовый поиск по названию, бренду и категории */
function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter((p) => {
    return (
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      categoryTitle(p.category).toLowerCase().includes(q)
    );
  });
}

function filterAndSortProducts(options) {
  const {
    category = "",
    categories = [],
    query = "",
    priceMin = null,
    priceMax = null,
    brands = [],
    minRating = 0,
    onlyDiscount = false,
    sort = "popular",
  } = options;

  let list = [...PRODUCTS];

  if (category) list = list.filter((p) => p.category === category);
  if (categories.length) list = list.filter((p) => categories.includes(p.category));
  if (query) {
    const q = query.trim().toLowerCase();
    list = list.filter((p) => p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  }
  if (priceMin != null && priceMin !== "") list = list.filter((p) => p.price >= Number(priceMin));
  if (priceMax != null && priceMax !== "") list = list.filter((p) => p.price <= Number(priceMax));
  if (brands.length) list = list.filter((p) => brands.includes(p.brand));
  if (minRating) list = list.filter((p) => p.rating >= minRating);
  if (onlyDiscount) list = list.filter((p) => p.oldPrice);

  switch (sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      list.sort((a, b) => b.rating - a.rating);
      break;
    case "new":
      list.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
      break;
    default: // popular
      list.sort((a, b) => b.reviews - a.reviews);
  }

  return list;
}

function allBrands() {
  return [...new Set(PRODUCTS.map((p) => p.brand))].sort();
}
