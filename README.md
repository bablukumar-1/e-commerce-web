# 🛍️ Flipkart Clone — Full-Featured E-Commerce Website

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white)

> A fully-featured, responsive e-commerce website inspired by Flipkart — built with pure HTML, CSS, and Vanilla JavaScript. No frameworks, no dependencies!

🔗 **Live Demo:** [https://bablukumar-1.github.io/e-commerce-web](https://bablukumar-1.github.io/e-commerce-web)

---

## 📸 Screenshots

| Home Page | Product Listing | Product Detail |
|-----------|----------------|----------------|
| Hero carousel + flash deals | Filter sidebar + sort | Image gallery + reviews |

| Cart | Checkout | Order Confirmed |
|------|----------|-----------------|
| Qty controls + savings | 3-step flow + payment | Tracking timeline |

---

## ✨ Features

### 🏠 Home Page
- 🎠 **Auto-sliding hero carousel** (4 slides, auto-advances every 4.5s)
- ⚡ **Flash Deals** with live countdown timer
- 🛍️ **Shop by Category** icon grid (8 categories)
- 🔥 Trending, ⭐ Top Rated, 🏆 Bestsellers sections
- 🖼️ Promotional banner strips

### 📋 Product Listing Page
- 🔍 **Filter Sidebar** — Price range, Brand, Customer Rating
- 📊 **Sort** — Popularity, Price (Low/High), Rating, Newest
- ⊞ **Grid / List view** toggle
- Results count display

### 📦 Product Detail Page
- 🖼️ Image gallery with thumbnail switcher + zoom effect
- 👗 Size & color selectors
- 🛒 Add to Cart / ⚡ Buy Now CTAs
- 📍 Delivery PIN code checker
- 🎁 Offers section
- 📋 Specifications table
- ⭐ Ratings & Reviews with bar chart distribution

### 🛒 Shopping Cart
- ➕➖ Quantity controls with live price update
- 💰 Price breakdown (original, discount, savings)
- 🗑️ Remove items / Save for Later

### 💳 Checkout Flow
- 3-step wizard: **Address → Payment → Review**
- Multiple payment options: Credit/Debit Card, UPI, Net Banking, Cash on Delivery
- Auto-formatting card number & expiry date

### 🎉 Order Confirmation
- Unique Order ID generated
- Visual 4-step tracking timeline

### ❤️ Wishlist
- Toggle from any product card
- Badge count in header
- Full wishlist page

### 🔐 Authentication Modal
- Login & Sign Up tabs
- Social login (Google, Facebook)
- Form validation

### 🔍 Search
- **Live suggestions** dropdown as you type
- Press Enter or click 🔍 to filter results

### 📱 Responsive Design
- Works on Desktop, Tablet, and Mobile
- Mobile-friendly category nav and product grid

---

## 🗂️ Project Structure

```
flipkart-clone/
├── index.html       # Main SPA — all 7 pages in one file
├── style.css        # Complete design system (700+ lines)
├── data.js          # 20 products across 8 categories + hero data
├── app.js           # Full interactive engine (700+ lines)
└── .github/
    └── workflows/
        └── deploy.yml   # GitHub Pages auto-deploy workflow
```

---

## 🚀 Getting Started

### Option 1 — Open Directly (No Server Needed)
```
1. Clone or download this repo
2. Double-click index.html
3. Opens in your browser instantly!
```

### Option 2 — Clone via Git
```bash
git clone https://github.com/bablukumar-1/e-commerce-web.git
cd e-commerce-web
# Open index.html in your browser
```

### Option 3 — Live on GitHub Pages
Visit: **https://bablukumar-1.github.io/e-commerce-web**

---

## 📦 Product Categories

| Category | Products |
|----------|---------|
| 📱 Electronics | Samsung Galaxy S24, MacBook Air M3, Sony WH-1000XM5, iPad Air, Apple Watch, Canon Camera |
| 👗 Fashion | Nike T-Shirt, Zara Dress, Adidas Ultraboost, Levi's Jeans |
| 🏠 Home & Kitchen | Philips Air Fryer, Nespresso Coffee Maker, iRobot Roomba |
| 📚 Books | Atomic Habits, Harry Potter Collection |
| ⚽ Sports | Yoga Mat, Trek Bicycle |
| 💄 Beauty | L'Oréal Serum, Dyson Hair Dryer |
| 🛒 Grocery | Organic India Tulsi Tea |

---

## 🛠️ Tech Stack

| Technology | Usage |
|-----------|-------|
| **HTML5** | Semantic structure, SPA routing |
| **CSS3** | Custom design system, animations, responsive grid |
| **Vanilla JavaScript** | All interactivity, state management, localStorage |
| **Google Fonts** | Inter typeface |
| **Unsplash** | Product & banner images |

---

## 🔧 Key Implementation Details

- **SPA Routing** — All 7 pages in one `index.html`, toggled via `display:none/block`
- **State Management** — `State` object with `localStorage` persistence for cart & wishlist
- **Live Timer** — Flash deal countdown using `setInterval`
- **Toast System** — CSS keyframe animations for slide-in/fade-out notifications
- **Search** — Real-time product filtering with debounced suggestions

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 👨‍💻 Author

**Bablu Kumar**
- GitHub: [@bablukumar-1](https://github.com/bablukumar-1)

---

⭐ **Star this repo if you found it useful!**
