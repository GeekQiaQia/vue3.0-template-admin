# Vue3.0 Template Admin

<p align="center">
  <a href="README.md">中文</a> | 
  <a href="README.en.md">English</a>
</p>

<p align="center">
Vue3.0:
<a href="https://www.npmjs.com/package/vue/v/next">
    <img src="https://img.shields.io/npm/v/vue/next.svg" alt="vue">
  </a>
  </br>
  Vite ⚡:
    <a href="https://npmjs.com/package/vite"><img src="https://img.shields.io/npm/v/vite.svg" alt="npm package"></a>
  </br>
Element-plus:
<a href="https://www.npmjs.org/package/element-plus">
<img src="https://img.shields.io/npm/v/element-plus.svg">
</a>
</p>

- 💪 Vue 3.0 Composition API
- 🔥 Written in TypeScript
- ⚡️ Vite - Lightning fast build tool
- 🎨 Element Plus UI Framework
- 🏠 Preview: [vue3.0-template-admin](https://geekqiaqia.github.io/vue3.0-template-admin/#/login?redirect=/home)

## ⭐️ Show your support

Give a ⭐️ if this project helped you!

## ✨ Features

- [x] Element Plus Integration
- [x] Multi-level Menu (N+1)
- [x] Dashboard with Charts
- [x] Data Tables
- [x] Router Tab Navigation
- [x] Advanced Forms
- [x] Charts (AntV & ECharts)
- [x] QR Code Generator
- [x] Excel Import/Export
- [x] Zip File Export
- [x] Drag & Drop Components
- [x] Rich Text Editor
- [x] Markdown Editor
- [x] User Profile Pages
- [x] Login/Register Pages
- [x] 404 / 403 Error Pages
- [x] Menu Management
- [x] Role Management
- [x] Custom Icons
- [x] Image Upload/Crop
- [x] Theme Switching
- [x] Permission Directives (v-permission)
- [x] Internationalization (i18n)
- [x] Project Kanban

## 🚀 Quick Start

```bash
# Clone the project
git clone https://github.com/GeekQiaQia/vue3.0-template-admin.git

# Navigate to project directory
cd vue3.0-template-admin

# Install dependencies (pnpm recommended)
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

> **Note:** This project uses **pnpm** as the package manager. Please install pnpm first:
> ```bash
> npm install -g pnpm
> ```

## 📦 Tech Stack

### Core
- **Vue 3** - Progressive JavaScript Framework
- **TypeScript** - Typed superset of JavaScript
- **Vite** - Next generation frontend tooling
- **Element Plus** - Vue 3 UI Library
- **Vue Router 4** - Official router for Vue.js
- **Vuex 4** - State management pattern + library

### Libraries & Plugins

- **axios** - Promise-based HTTP client
- **fuse.js** - Lightweight fuzzy-search library
- **echarts** - Data visualization library
- **antv** - Data visualization by Ant Financial
- **xlsx** - Excel file handling (SheetJS)
- **jszip** - JavaScript library for creating and reading zip files
- **mockjs** - Simulation data generator
- **wangeditor** - Rich text editor
- **fullcalendar** - Full-featured calendar component
- **driverJS** - User onboarding/guide library

### Development Tools

- **Git Hooks**: [husky](https://typicode.github.io/husky/#/) + [lint-staged](https://github.com/okonet/lint-staged)
- **Code Standards**: [EditorConfig](http://editorconfig.org) + [Prettier](https://prettier.io/) + [ESLint](https://eslint.org/)
- **Commit Standards**: [Commitizen](http://commitizen.github.io/cz-cli/) + [Commitlint](https://commitlint.js.org/#/)
- **Package Manager**: [pnpm](https://pnpm.io/) with [only-allow](https://www.npmjs.com/package/only-allow)

## 📁 Project Structure

```
vue3.0-template-admin/
├── public/                 # Static assets
├── src/
│   ├── api/               # API service layer
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Reusable components
│   ├── config/            # Configuration files
│   ├── directive/         # Custom directives
│   ├── hooks/             # Composition API hooks
│   ├── layout/            # Layout components
│   ├── locale/            # i18n language files
│   ├── mock/              # Mock data
│   ├── router/            # Router configuration
│   │   ├── routes/        # Route definitions
│   │   │   ├── async.ts   # Dynamic routes
│   │   │   ├── constant.ts # Static routes
│   │   │   └── index.ts   # Route exports
│   │   └── index.ts       # Router instance
│   ├── store/             # Vuex store
│   ├── styles/            # Global styles
│   │   └── common.scss    # Common utility styles
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   │   ├── logger.ts      # Logger utility
│   │   └── request.ts     # Axios wrapper
│   ├── views/             # Page components
│   ├── App.vue            # Root component
│   └── main.ts            # Application entry
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Project dependencies

```

## 🔧 Environment Variables

Create `.env.development`, `.env.production` files for different environments:

```bash
# .env.development
VITE_APP_TITLE=Vue3 Admin
VITE_APP_BASE_API=/api
VITE_APP_PORT=3000
```

## 🛠️ Git Workflow

```bash
# Stage changes
git add *

# Check status
git status

# Commit with Commitizen
git cz

# Push changes
git push
```

> If `git cz` command is not found, install Commitizen globally:
> ```bash
> npm install -g commitizen
> ```

## 🔄 Sync with Upstream

```bash
# Add upstream remote
git remote add upstream https://github.com/GeekQiaQia/vue3.0-template-admin

# Fetch upstream changes
git fetch upstream main

# Switch to main branch
git checkout main

# Merge upstream changes
git merge upstream/main
```

## 🌐 Browser Support

Supports modern browsers (Webkit kernel recommended).

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                                                            last 2 versions                                                                                             |                                                                                                  last 2 versions                                                                                                  |                                                                                                last 2 versions                                                                                                |                                                                                                last 2 versions                                                                                                |

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the [issues page](https://github.com/GeekQiaQia/vue3.0-template-admin/issues).

See [contributors](https://github.com/GeekQiaQia/vue3.0-template-admin/graphs/contributors) for the latest contribution info.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**GeekQiaQia**

- GitHub: [@GeekQiaQia](https://github.com/GeekQiaQia)

## ⭐️ Star History

If you find this project helpful, please consider giving it a star!

---

Made with ❤️ by GeekQiaQia
