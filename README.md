# 🍽️ Recipe Assistant

Discover global flavors in one sleek, responsive app built with **React**, **Vite**, and **Tailwind CSS**. Search by country, save your favorites, and explore community creations — designed for modern kitchens and curious food lovers.

---

## 🌟 Key Features

- 🌍 Explore recipes by **country or cuisine**
- 🔎 Search and filter from global database
- ❤️ Save favorite recipes locally
- 🧑‍🤝‍🧑 Browse community-submitted dishes
- 📱 Fully responsive design with **dark mode**
- 🔥 Modal-based recipe detail view
- 📌 Persistent bottom navigation

---

## 🚀 Live Demo

- 🟣 [GitHub Pages](https://faisalmalik01.github.io/recipe-assistant)
- 🔵 [Vercel](https://recipe-assistant-gilt.vercel.app/)

The app supports dynamic routing on both platforms thanks to a custom build logic in `vite.config.js`.

---

## ⚙️ Tech Stack

| Layer     | Tools                                      |
|-----------|--------------------------------------------|
| Frontend  | React 19, React Router DOM                 |
| Styling   | Tailwind CSS                               |
| Build     | Vite                                        |
| Icons     | Lucide React                               |
| Linting   | ESLint (Hooks & React Refresh plugins)     |

---

## 🛠️ Getting Started

Clone the repo and run locally:

```bash
git clone https://github.com/Faisalmalik01/recipe-assistant.git
cd recipe-assistant
npm install
npm run dev


🔧 Environment Setup
Create a .env file with the following:
VITE_MEALDB_URL=https://www.themealdb.com/api/json/v1/1/search.php?s=
VITE_MEALDB_FILTER_URL=https://www.themealdb.com/api/json/v1/1/filter.php?a=
VITE_MEALDB_LOOKUP_URL=https://www.themealdb.com/api/json/v1/1/lookup.php?i=
VITE_YT_EMBED_BASE=https://www.youtube.com/embed/
VITE_BASE_PATH=/recipe-assistant


For Vercel deployment, use .env.vercel or dashboard settings with:
VITE_BASE_PATH=/



🔗 API Reference
Recipe data is sourced from TheMealDB:
- Search: https://www.themealdb.com/api/json/v1/1/search.php?s=
- Filter by area: https://www.themealdb.com/api/json/v1/1/filter.php?a=
- Lookup by ID: https://www.themealdb.com/api/json/v1/1/lookup.php?i=

🧪 Preview Production Build
npm run build
npm run preview



📄 License
MIT License

📦 Credits
- API: TheMealDB
- Icons: Lucide

🎉 Built with love by @FaisalMalik01
Modular. Responsive. Delicious.