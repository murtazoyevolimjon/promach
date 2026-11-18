# PROMACH.uz — sayt

Nonvoyxona, qandolatchilik, restoran va oshxona jihozlari do'koni uchun ikki tilli (O'zbekcha / Русский) landing sayt.
**Next.js 16 (App Router) + TypeScript + Tailwind CSS.** Sahifalar oldindan statik HTML qilib yaratiladi (SSG): tez yuklanadi, SEO uchun qulay.

- `https://promach.uz/uz` — o'zbekcha (asosiy, `/` shu yerga yo'naltiriladi)
- `https://promach.uz/ru` — ruscha

---

## 1. Papka tuzilmasi

```
PROMACH/
├─ public/                    ← rasmlar shu yerga (images/…)
├─ src/
│  ├─ data/
│  │  ├─ site.ts              ← KONTAKTLAR, MANZIL, ISH VAQTI, KOORDINATALAR, RASMLAR
│  │  └─ products.ts          ← KATALOG: kategoriyalar va mahsulotlar (uz + ru)
│  ├─ i18n/
│  │  ├─ uz.ts                ← barcha o'zbekcha matnlar (SEO title/description, FAQ, fikrlar…)
│  │  ├─ ru.ts                ← ruscha tarjima (tuzilmasi uz.ts bilan bir xil)
│  │  └─ index.ts
│  ├─ components/
│  │  ├─ Header.tsx           ← sticky header, menyu, til almashtirgich, telefon
│  │  ├─ OpenStatus.tsx       ← "Hozir ochiq / yopiq" (Toshkent vaqti, UTC+5)
│  │  ├─ LeadForm.tsx         ← so'rov formasi → /api/lead → Telegram
│  │  ├─ FloatingButtons.tsx  ← pastki o'ng burchakdagi Telegram / Qo'ng'iroq
│  │  ├─ FacadeImage.tsx      ← do'kon fasadi (rasm yoki HTML tabela)
│  │  ├─ SmartImage.tsx       ← rasm yoki placeholder (lazy, WebP/AVIF)
│  │  ├─ Analytics.tsx        ← Google Analytics 4 + Yandex Metrika
│  │  ├─ Footer.tsx, Logo.tsx, Icons.tsx, RevealObserver.tsx …
│  │  └─ sections/            ← Hero, Advantages, Catalog, WhyUs, Process,
│  │                            Gallery, Reviews, Faq, Visit, Contact
│  ├─ components/ThemeToggle.tsx ← ☀️/🌙 kunduzgi/tungi rejim
│  ├─ lib/jsonld.ts           ← JSON-LD: Store (LocalBusiness), Product, FAQPage
│  ├─ lib/theme.ts            ← rejim sozlamalari
│  (ranglar: src/app/globals.css dagi CSS o'zgaruvchilari — :root kunduzgi, .dark tungi)
│  └─ app/
│     ├─ [lang]/layout.tsx    ← <html lang>, meta teglar, OG, hreflang, canonical
│     ├─ [lang]/page.tsx      ← sahifa (bo'limlar ketma-ketligi)
│     ├─ [lang]/opengraph-image.tsx ← ulashish rasmi (1200×630) avtomatik
│     ├─ api/lead/route.ts    ← forma → Telegram bot
│     ├─ robots.ts            ← /robots.txt
│     ├─ sitemap.ts           ← /sitemap.xml (hreflang bilan)
│     └─ icon.svg             ← favicon (shesternya)
├─ supabase/migrations/       ← Supabase "leads" jadvali (SQL)
├─ .env.example               ← sozlamalar namunasi
└─ next.config.mjs
```

## 2. Ishga tushirish (lokal)

Node.js 20.9+ kerak (22 yoki 24 tavsiya etiladi).

```bash
npm install
cp .env.example .env.local     # Windows: copy .env.example .env.local
npm run dev                    # http://localhost:3000
```

Production tekshiruvi: `npm run build && npm start`.

## 3. Deploy

### Vercel (tavsiya etiladi)
1. Loyihani GitHub'ga yuklang.
2. vercel.com → **Add New → Project** → repozitoriyani tanlang (Next.js avtomatik aniqlanadi).
3. **Settings → Environment Variables**: `.env.example` dagi qiymatlarni kiriting.
4. **Deploy**. So'ng **Settings → Domains** → `promach.uz` qo'shing va DNS'da ko'rsatilgan A/CNAME yozuvlarini domen registratoringizda kiriting.
5. Env o'zgartirgandan keyin **Redeploy** qiling.

### Netlify
1. netlify.com → **Add new site → Import from Git**. Next.js avtomatik aniqlanadi (`@netlify/plugin-nextjs`).
2. Build command: `npm run build`, Publish directory: `.next`.
3. **Site configuration → Environment variables** — qiymatlarni kiriting, so'ng deploy.

> `/api/lead` server funksiyasi bo'lgani uchun oddiy statik hosting (faqat HTML) yetmaydi — Vercel yoki Netlify ishlating.

## 4. Telegram bot (forma)

1. Telegramda **@BotFather** → `/newbot` → token oling → `TELEGRAM_BOT_TOKEN`.
2. So'rovlar keladigan guruh yarating, botni qo'shing va guruhga biror xabar yozing
   (yoki shaxsiy chat uchun botga `/start` yozing).
3. Brauzerda oching: `https://api.telegram.org/bot<TOKEN>/getUpdates` → `"chat":{"id":-100…}` → `TELEGRAM_CHAT_ID`.
4. Ikkalasini `.env.local` / Vercel env'ga yozing. Token faqat serverda qoladi.

Token bo'lmasa forma **demo rejimda** ishlaydi: foydalanuvchiga muvaffaqiyat ko'rsatiladi, so'rov server logiga yoziladi.

## 4.1. Supabase (ixtiyoriy — so'rovlarni bazada saqlash)

> Supabase sayt **hostingi emas**: sayt Vercel'da turadi, Supabase esa formadan kelgan so'rovlarni
> `leads` jadvaliga saqlaydi. Telegram ishlamay qolsa ham birorta mijoz yo'qolmaydi.

1. supabase.com → **New project** (region: Frankfurt yoki eng yaqini).
2. **SQL Editor** → `supabase/migrations/20261118000000_create_leads.sql` faylining matnini qo'ying → **Run**.
3. **Project Settings → API Keys**:
   - Project URL → `SUPABASE_URL`
   - **Secret** kalit (`sb_secret_…`, yoki eski "service_role") → `SUPABASE_SECRET_KEY`
4. Ikkalasini `.env.local` va Vercel → Environment Variables'ga yozing → Redeploy.
5. So'rovlarni ko'rish: Supabase → **Table Editor → leads**. `status` ustunini `contacted` / `done` qilib belgilab borishingiz mumkin.

**Xavfsizlik:** jadvalda RLS yoqilgan va ochiq policy yo'q, shuning uchun ochiq (publishable/anon) kalit bilan
na o'qib, na yozib bo'ladi. Secret kalitni hech qachon `NEXT_PUBLIC_` bilan boshlamang va kodga yozmang.

## 5. Google Search Console va Yandex Webmaster

**Google Search Console** (search.google.com/search-console):
1. **Add property → URL prefix** → `https://promach.uz/`.
2. Tasdiqlash usuli **HTML tag**: `<meta name="google-site-verification" content="ABC123…">`.
3. Faqat `content` ichidagi qiymatni `NEXT_PUBLIC_GOOGLE_VERIFICATION=ABC123…` ga yozing → redeploy → **Verify**.
4. **Sitemaps** → `sitemap.xml` yuboring. **URL Inspection** → `/uz` va `/ru` uchun "Request indexing".

**Yandex Webmaster** (webmaster.yandex.ru):
1. **Добавить сайт** → `https://promach.uz`.
2. Usul **Мета-тег**: `<meta name="yandex-verification" content="XYZ…">` → `NEXT_PUBLIC_YANDEX_VERIFICATION=XYZ…` → redeploy → **Проверить**.
3. **Индексирование → Файлы Sitemap** → `https://promach.uz/sitemap.xml`.
4. **Информация о сайте → Регион сайта** → Самарканд.

Qo'shimcha (lokal SEO uchun juda muhim):
- **Google Business Profile** (business.google.com) va **Яндекс Бизнес** (yandex.uz/sprav) da do'konni ro'yxatdan o'tkazing: nomi, manzil, telefon va ish vaqti saytdagi bilan **aynan bir xil** bo'lsin. Xaritada "PROMACH" qidirilganda chiqishning asosiy omili shu.
- Tekshirish: [Rich Results Test](https://search.google.com/test/rich-results), [Schema validator](https://validator.schema.org), [PageSpeed Insights](https://pagespeed.web.dev).

## 6. Analitika

`.env` ga ID yozilsa, skript avtomatik ulanadi (bo'sh bo'lsa yuklanmaydi):
- `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` — Google Analytics 4
- `NEXT_PUBLIC_YM_ID=12345678` — Yandex Metrika (Webvisor yoqilgan)

Forma yuborilganda `generate_lead` (GA4) va `lead` (Metrika maqsadi) hodisalari yuboriladi. Metrikada **Цели → JavaScript-событие** → identifikator `lead` qilib maqsad yarating.

## 7. Rasmlar

- Formatlar: JPG/PNG/WebP. Next.js ularni avtomatik **AVIF/WebP** ga o'giradi va ekran o'lchamiga moslaydi. Shunga qaramay, yuklashdan oldin rasmni ~1600px kenglikka kichraytirib, **WebP** qilib saqlash tavsiya etiladi (squoosh.app).
- Fayl nomlari lotincha va ma'noli bo'lsin: `konveksion-pech-10-list.webp`.
- Hero rasmidan boshqa barcha rasmlar lazy load bilan yuklanadi; o'lchamlar oldindan belgilangan, shuning uchun CLS bo'lmaydi.

| Rasm | Qayerga qo'yish | Qayerda yozish |
|---|---|---|
| Do'kon fasadi | `public/images/promach-facade.webp` | `src/data/site.ts` → `images.facade` |
| Hero (pech rasmi, fon shaffof bo'lsa yaxshi) | `public/images/hero.webp` | `site.ts` → `images.hero` |
| Mahsulotlar | `public/images/products/…` | `src/data/products.ts` → `image` |
| Galereya | `public/images/gallery/…` | `src/components/sections/Gallery.tsx` → `galleryImages` |
