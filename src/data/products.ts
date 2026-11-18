/**
 * ============================================================
 *  MAHSULOTLAR KATALOGI
 *  Bu yerdagi mahsulotlar NAMUNAVIY. Nomlar, xususiyatlar va rasmlarni
 *  haqiqiy ma'lumotlarga almashtiring.
 *  Rasm: /public/images/products/ papkasiga qo'ying va `image` maydoniga
 *  yo'lini yozing (masalan "/images/products/konveksion-5.webp").
 * ============================================================
 */

export type L = { uz: string; ru: string };

export type CategoryId = "convection" | "deck" | "rotary" | "mixer" | "steel";

export interface Category {
  id: CategoryId;
  name: L;
  /** Kategoriya tanlanganda filtr ostida chiqadigan qisqa izoh (ixtiyoriy) */
  note?: L;
}

export interface Product {
  id: string;
  category: CategoryId;
  name: L;
  desc: L;
  specs: { uz: string[]; ru: string[] };
  image?: string;
}

export const categories: Category[] = [
  {
    id: "convection",
    name: { uz: "Ratsionli konveksion pechlar", ru: "Конвекционные печи" },
    note: {
      uz: "1 listdan 9 listgacha (kafe, kichik nonvoyxona) va 10 listdan 32 listgacha (sex, sanoat) modellar.",
      ru: "Модели от 1 до 9 противней (кафе, мини-пекарня) и от 10 до 32 противней (цех, производство).",
    },
  },
  { id: "deck", name: { uz: "Elektr va gaz pechlar", ru: "Электрические и газовые печи" } },
  { id: "rotary", name: { uz: "Rotatsion pechlar", ru: "Ротационные печи" } },
  { id: "mixer", name: { uz: "Xamir qorish mashinalari", ru: "Тестомесы и миксеры" } },
  { id: "steel", name: { uz: "Zanglamas stollar va vitrinalar", ru: "Нержавеющие столы и витрины" } },
];

export const products: Product[] = [
  // ---------- Ratsionli konveksion pechlar: 1–9 list ----------
  {
    id: "konveksion-4-elektr",
    category: "convection",
    name: { uz: "Konveksion pech, 4 listli (elektr)", ru: "Конвекционная печь на 4 противня (электро)" },
    desc: {
      uz: "Kafe, qandolatxona va kichik nonvoyxona uchun ixcham pech: bulochka, pirog, pechenye.",
      ru: "Компактная печь для кафе, кондитерской и небольшой пекарни: булочки, пироги, печенье.",
    },
    specs: {
      uz: ["4 ta list 600×400 mm", "Harorat: 50–300 °C", "Bug' bilan namlash"],
      ru: ["4 противня 600×400 мм", "Температура: 50–300 °C", "Пароувлажнение"],
    },
  },
  {
    id: "konveksion-5-elektr",
    category: "convection",
    name: { uz: "Konveksion pech, 5 listli (elektr)", ru: "Конвекционная печь на 5 противней (электро)" },
    desc: {
      uz: "Issiq havo bir tekis aylanadi — barcha listlarda mahsulot bir xil pishadi.",
      ru: "Равномерная циркуляция воздуха — одинаковая выпечка на всех уровнях.",
    },
    specs: {
      uz: ["5 ta list 600×400 mm", "Reversiv ventilyator", "Taymer va raqamli boshqaruv"],
      ru: ["5 противней 600×400 мм", "Реверсивный вентилятор", "Таймер и цифровое управление"],
    },
  },
  {
    id: "konveksion-8-elektr",
    category: "convection",
    name: { uz: "Konveksion pech, 8 listli (elektr)", ru: "Конвекционная печь на 8 противней (электро)" },
    desc: {
      uz: "Ishlab chiqarishi o'sib borayotgan nonvoyxona va oshxonalar uchun.",
      ru: "Для пекарен и кухонь с растущим объёмом производства.",
    },
    specs: {
      uz: ["8 ta list 600×400 mm", "Bug' generatori", "Ikki qavatli shisha eshik, yoritish"],
      ru: ["8 противней 600×400 мм", "Парогенератор", "Двойное стекло, подсветка камеры"],
    },
  },
  {
    id: "konveksion-9-gaz",
    category: "convection",
    name: { uz: "Konveksion pech, 9 listli (gaz)", ru: "Конвекционная печь на 9 противней (газ)" },
    desc: {
      uz: "Gazda ishlaydi — elektr quvvati cheklangan joylar uchun tejamkor yechim.",
      ru: "Работает на газе — экономичное решение при ограниченной электромощности.",
    },
    specs: {
      uz: ["9 ta list 600×400 mm", "Tabiiy gaz", "Avtomatik yondirish va himoya"],
      ru: ["9 противней 600×400 мм", "Природный газ", "Автоподжиг и газ-контроль"],
    },
  },
  {
    id: "konveksion-6-kombi",
    category: "convection",
    name: { uz: "Konveksion pech, 6 listli (restoran uchun)", ru: "Конвекционная печь на 6 уровней (для ресторана)" },
    desc: {
      uz: "Restoran oshxonasi uchun: go'sht, sabzavot, garnir va pishiriqlar.",
      ru: "Для ресторанной кухни: мясо, овощи, гарниры и выпечка.",
    },
    specs: {
      uz: ["6 ta GN 1/1 yoki 600×400", "Namlik nazorati", "Oson tozalanadigan kamera"],
      ru: ["6 уровней GN 1/1 или 600×400", "Контроль влажности", "Легко моющаяся камера"],
    },
  },

  // ---------- Ratsionli konveksion pechlar: 10–32 list ----------
  {
    id: "konveksion-10-elektr",
    category: "convection",
    name: { uz: "Konveksion pech, 10 listli (elektr)", ru: "Конвекционная печь на 10 противней (электро)" },
    desc: {
      uz: "O'rta nonvoyxona va qandolat sexi uchun ishonchli ish quroli.",
      ru: "Надёжная рабочая печь для средней пекарни и кондитерского цеха.",
    },
    specs: {
      uz: ["10 ta list 600×400 mm", "Bug' generatori", "Dasturlanadigan rejimlar"],
      ru: ["10 противней 600×400 мм", "Парогенератор", "Программируемые режимы"],
    },
  },
  {
    id: "konveksion-12-aravacha",
    category: "convection",
    name: { uz: "Konveksion pech, 12 listli (aravachali)", ru: "Конвекционная печь на 12 противней (с тележкой)" },
    desc: {
      uz: "Aravacha bilan yuklanadi — listlarni birma-bir qo'yib o'tirish shart emas.",
      ru: "Загрузка тележкой — не нужно ставить противни по одному.",
    },
    specs: {
      uz: ["12 ta list 600×400 mm", "Aravacha komplektda", "Elektr yoki gaz varianti"],
      ru: ["12 противней 600×400 мм", "Тележка в комплекте", "Электро или газ"],
    },
  },
  {
    id: "konveksion-16",
    category: "convection",
    name: { uz: "Konveksion pech, 16 listli", ru: "Конвекционная печь на 16 противней" },
    desc: {
      uz: "Kunlik katta hajmdagi non va pishiriq ishlab chiqarish uchun.",
      ru: "Для ежедневного выпуска больших объёмов хлеба и выпечки.",
    },
    specs: {
      uz: ["16 ta list 600×400 mm", "Kuchli havo aylanishi", "Issiqlik izolyatsiyasi"],
      ru: ["16 противней 600×400 мм", "Мощная конвекция", "Усиленная теплоизоляция"],
    },
  },
  {
    id: "konveksion-20",
    category: "convection",
    name: { uz: "Konveksion pech, 20 listli", ru: "Конвекционная печь на 20 противней" },
    desc: {
      uz: "Sanoat nonvoyxonalari va katta oshxonalar uchun.",
      ru: "Для промышленных пекарен и крупных кухонь.",
    },
    specs: {
      uz: ["20 ta list 600×400 mm", "Aravacha bilan yuklash", "Raqamli boshqaruv paneli"],
      ru: ["20 противней 600×400 мм", "Загрузка тележкой", "Цифровая панель управления"],
    },
  },
  {
    id: "konveksion-32",
    category: "convection",
    name: { uz: "Sanoat konveksion pechi, 32 listli", ru: "Промышленная конвекционная печь на 32 противня" },
    desc: {
      uz: "Eng katta hajmlar uchun: bir siklda ko'p mahsulot, bir xil sifat.",
      ru: "Для максимальных объёмов: много продукции за цикл при стабильном качестве.",
    },
    specs: {
      uz: ["32 ta list (2 aravacha)", "Elektr yoki gaz", "Bug' tizimi"],
      ru: ["32 противня (2 тележки)", "Электро или газ", "Система пароувлажнения"],
    },
  },

  // ---------- Elektr va gaz (qavatli) pechlar ----------
  {
    id: "qavatli-1-elektr",
    category: "deck",
    name: { uz: "1 qavatli elektr pech", ru: "Подовая электропечь, 1 ярус" },
    desc: {
      uz: "Pitsa, non va pishiriqlar uchun kichik, tejamkor pech.",
      ru: "Компактная экономичная печь для пиццы, хлеба и выпечки.",
    },
    specs: {
      uz: ["1 qavat, 2 ta list", "Tosh taglik (pod)", "Yuqori/past qizdirish alohida"],
      ru: ["1 ярус, 2 противня", "Каменный под", "Раздельный верхний/нижний нагрев"],
    },
  },
  {
    id: "qavatli-2-elektr",
    category: "deck",
    name: { uz: "2 qavatli elektr pech", ru: "Подовая электропечь, 2 яруса" },
    desc: {
      uz: "Har bir qavat alohida boshqariladi — bir vaqtda turli mahsulot pishiring.",
      ru: "Каждый ярус управляется отдельно — пеките разную продукцию одновременно.",
    },
    specs: {
      uz: ["2 qavat, 4 ta list", "Tosh taglik", "Bug' funksiyasi (ixtiyoriy)"],
      ru: ["2 яруса, 4 противня", "Каменный под", "Пароувлажнение (опция)"],
    },
  },
  {
    id: "qavatli-3-elektr",
    category: "deck",
    name: { uz: "3 qavatli elektr pech", ru: "Подовая электропечь, 3 яруса" },
    desc: {
      uz: "Nonvoyxona uchun klassik tanlov: tandir noni, baton va buxanka.",
      ru: "Классика для пекарни: батоны, буханки, хлеб на поду.",
    },
    specs: {
      uz: ["3 qavat, 6 ta list", "Har qavatda alohida termostat", "Zanglamaydigan po'lat korpus"],
      ru: ["3 яруса, 6 противней", "Отдельный термостат на ярус", "Корпус из нержавеющей стали"],
    },
  },
  {
    id: "qavatli-3-gaz",
    category: "deck",
    name: { uz: "3 qavatli gaz pech", ru: "Подовая газовая печь, 3 яруса" },
    desc: {
      uz: "Gazda ishlaydi — katta hajmda tejamkor pishirish.",
      ru: "Газовая печь — экономичная выпечка в больших объёмах.",
    },
    specs: {
      uz: ["3 qavat, 6–9 ta list", "Tabiiy gaz", "Gaz-nazorat tizimi"],
      ru: ["3 яруса, 6–9 противней", "Природный газ", "Система газ-контроля"],
    },
  },

  // ---------- Rotatsion pechlar ----------
  {
    id: "rotatsion-12",
    category: "rotary",
    name: { uz: "Rotatsion pech, 12 listli", ru: "Ротационная печь на 12 противней" },
    desc: {
      uz: "Aravacha kamerada aylanadi — mahsulot har tomondan bir tekis pishadi.",
      ru: "Тележка вращается в камере — равномерный пропёк со всех сторон.",
    },
    specs: {
      uz: ["12 ta list 600×400 mm", "Aylanuvchi aravacha", "Bug' tizimi"],
      ru: ["12 противней 600×400 мм", "Вращающаяся тележка", "Пароувлажнение"],
    },
  },
  {
    id: "rotatsion-16-elektr",
    category: "rotary",
    name: { uz: "Rotatsion pech, 16 listli (elektr)", ru: "Ротационная печь на 16 противней (электро)" },
    desc: {
      uz: "Nonvoyxona sexi uchun: kuniga ko'p partiya, barqaror sifat.",
      ru: "Для пекарного цеха: много партий в день, стабильное качество.",
    },
    specs: {
      uz: ["16 ta list 600×400 mm", "Elektr", "Dasturlanadigan boshqaruv"],
      ru: ["16 противней 600×400 мм", "Электрическая", "Программируемое управление"],
    },
  },
  {
    id: "rotatsion-18-gaz",
    category: "rotary",
    name: { uz: "Rotatsion pech, 18 listli (gaz)", ru: "Ротационная печь на 18 противней (газ)" },
    desc: {
      uz: "Gaz bilan ishlaydigan unumdor pech — katta ishlab chiqarish uchun.",
      ru: "Производительная газовая печь для крупного производства.",
    },
    specs: {
      uz: ["18 ta list 600×400 mm", "Gaz gorelkasi", "Kuchli bug' generatori"],
      ru: ["18 противней 600×400 мм", "Газовая горелка", "Мощный парогенератор"],
    },
  },
  {
    id: "rotatsion-36",
    category: "rotary",
    name: { uz: "Sanoat rotatsion pechi, 36 listli", ru: "Промышленная ротационная печь на 36 противней" },
    desc: {
      uz: "Sanoat miqyosidagi non zavodlari va katta sexlar uchun.",
      ru: "Для хлебозаводов и крупных производственных цехов.",
    },
    specs: {
      uz: ["36 ta list (katta aravacha)", "Gaz yoki dizel", "Avtomatik ish rejimlari"],
      ru: ["36 противней (большая тележка)", "Газ или дизель", "Автоматические режимы"],
    },
  },

  // ---------- Xamir qorish mashinalari ----------
  {
    id: "planetar-10",
    category: "mixer",
    name: { uz: "Planetar mikser, 10 litr", ru: "Планетарный миксер, 10 л" },
    desc: {
      uz: "Krem, biskvit va yengil xamir uchun. Qandolatxona va kafe uchun qulay.",
      ru: "Для кремов, бисквита и лёгкого теста. Удобен для кондитерской и кафе.",
    },
    specs: {
      uz: ["Idish: 10 litr", "3 ta nasadka (venchik, kurak, ilgak)", "Bir necha tezlik"],
      ru: ["Дежа: 10 л", "3 насадки (венчик, лопатка, крюк)", "Несколько скоростей"],
    },
  },
  {
    id: "planetar-20",
    category: "mixer",
    name: { uz: "Planetar mikser, 20 litr", ru: "Планетарный миксер, 20 л" },
    desc: {
      uz: "Universal: krem ko'pirtirish, qiyma aralashtirish, xamir qorish.",
      ru: "Универсальный: взбивание кремов, замес фарша и теста.",
    },
    specs: {
      uz: ["Idish: 20 litr", "Himoya to'ri", "Zanglamaydigan po'lat idish"],
      ru: ["Дежа: 20 л", "Защитная решётка", "Дежа из нержавеющей стали"],
    },
  },
  {
    id: "planetar-40",
    category: "mixer",
    name: { uz: "Planetar mikser, 40 litr", ru: "Планетарный миксер, 40 л" },
    desc: {
      uz: "Katta qandolat sexi va oshxonalar uchun kuchli mikser.",
      ru: "Мощный миксер для крупного кондитерского цеха и кухонь.",
    },
    specs: {
      uz: ["Idish: 40 litr", "Idishni ko'tarish mexanizmi", "Uzluksiz ishlashga mo'ljallangan"],
      ru: ["Дежа: 40 л", "Механизм подъёма дежи", "Рассчитан на длительную работу"],
    },
  },
  {
    id: "spiral-50",
    category: "mixer",
    name: { uz: "Spiral xamir qorish mashinasi, 50 litr", ru: "Спиральный тестомес, 50 л" },
    desc: {
      uz: "Non xamiri uchun: qattiq xamirni ham bir tekis va tez qoradi.",
      ru: "Для хлебного теста: быстро и равномерно месит даже крутое тесто.",
    },
    specs: {
      uz: ["Idish: 50 litr (≈20 kg xamir)", "Spiral ilgak", "2 tezlik"],
      ru: ["Дежа: 50 л (≈20 кг теста)", "Спиральный крюк", "2 скорости"],
    },
  },
  {
    id: "spiral-80",
    category: "mixer",
    name: { uz: "Spiral xamir qorish mashinasi, 80 litr", ru: "Спиральный тестомес, 80 л" },
    desc: {
      uz: "Katta nonvoyxonalar uchun yuqori unumdorlik.",
      ru: "Высокая производительность для крупных пекарен.",
    },
    specs: {
      uz: ["Idish: 80 litr (≈35 kg xamir)", "Reversiv idish", "Taymer"],
      ru: ["Дежа: 80 л (≈35 кг теста)", "Реверс дежи", "Таймер"],
    },
  },

  // ---------- Zanglamas stollar, vitrinalar va shkaflar ----------
  {
    id: "vitrina-qandolat",
    category: "steel",
    name: { uz: "Qandolat vitrinasi (sovutgichli)", ru: "Кондитерская витрина (холодильная)" },
    desc: {
      uz: "Tort va desertlarni chiroyli ko'rsatadi va kerakli haroratda saqlaydi.",
      ru: "Красиво выставляет торты и десерты и хранит их при нужной температуре.",
    },
    specs: {
      uz: ["Harorat: +2…+8 °C", "Old shisha, LED yoritish", "Turli uzunliklar"],
      ru: ["Температура: +2…+8 °C", "Фронтальное стекло, LED-подсветка", "Разные длины"],
    },
  },
  {
    id: "sovutgich-shkaf",
    category: "steel",
    name: { uz: "Sovutgich shkaf, 2 eshikli", ru: "Холодильный шкаф, 2 двери" },
    desc: {
      uz: "Restoran va oshxona uchun mahsulotlarni saqlash shkafi.",
      ru: "Шкаф для хранения продуктов в ресторане и на кухне.",
    },
    specs: {
      uz: ["Zanglamaydigan po'lat", "Raqamli termostat", "Sovutish yoki muzlatish rejimi"],
      ru: ["Нержавеющая сталь", "Цифровой термостат", "Охлаждение или заморозка"],
    },
  },
  {
    id: "rasstoyka-shkaf",
    category: "steel",
    name: { uz: "Tindirish (rasstoyka) shkafi", ru: "Расстоечный шкаф" },
    desc: {
      uz: "Xamirni kerakli harorat va namlikda tindiradi — non yaxshi ko'tariladi.",
      ru: "Расстойка теста при нужной температуре и влажности — хлеб хорошо поднимается.",
    },
    specs: {
      uz: ["8–36 ta list", "Harorat va namlik nazorati", "Shisha eshik"],
      ru: ["8–36 противней", "Контроль температуры и влажности", "Стеклянная дверь"],
    },
  },
  {
    id: "ish-stoli",
    category: "steel",
    name: { uz: "Zanglamaydigan po'lat ish stoli", ru: "Стол производственный из нержавеющей стали" },
    desc: {
      uz: "Oshxona va sex uchun mustahkam, gigiyenik ish stoli.",
      ru: "Прочный гигиеничный стол для кухни и цеха.",
    },
    specs: {
      uz: ["AISI 304/430 po'lat", "Pastki javon", "Turli o'lchamlar"],
      ru: ["Сталь AISI 304/430", "Нижняя полка", "Разные размеры"],
    },
  },
  {
    id: "aravacha-stellaj",
    category: "steel",
    name: { uz: "List uchun aravacha-stellaj", ru: "Тележка-стеллаж для противней" },
    desc: {
      uz: "Listlarni sex ichida qulay tashish va saqlash uchun.",
      ru: "Для удобного перемещения и хранения противней в цехе.",
    },
    specs: {
      uz: ["12–18 ta list 600×400", "G'ildirakli", "Alyuminiy yoki po'lat"],
      ru: ["12–18 противней 600×400", "На колёсах", "Алюминий или сталь"],
    },
  },
];
