## vite-plugin-garfish-mf

A Vite plugin that helps you run a Vite sub-application inside a micro-frontend architecture powered by [Garfish](https://www.garfishjs.org).

This plugin adapts Vite-based apps to work smoothly as sub-applications, handling base URL configuration and sandbox compatibility.

### Installation

```
npm install --save-dev vite-plugin-garfish-mf
```

### Getting Started

Add the plugin to sub-application's Vite configuration shown below (make sure the plugin is placed after the **react** or **vue** plugin, if present):

```js
// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import garfish from "vite-plugin-garfish-mf";

export default defineConfig({
  plugins: [react(), garfish({
      base: "http://localhost:3000",
    })
  ],
});
```

### How It Works

- Overrides Vite’s dev server origin so the sub-app can be correctly loaded by Garfish
- Ensures assets and HMR work as expected in a micro-frontend context
- Supports sandboxed execution to avoid global scope conflicts

### Inspiration

This plugin is inspired by the following projects and communities:

- [vite-plugin-qiankun](https://github.com/tengmaoqing/vite-plugin-qiankun)
- [vite-plugin-qiankun-lite](https://github.com/kotarella1110/vite-plugin-qiankun-lite)

Their ideas and implementations were invaluable references when building this plugin.

### License

MIT
