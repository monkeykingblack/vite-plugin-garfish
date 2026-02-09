## vite-plugin-garfish-mf

A Vite plugin that helps you run a Vite sub-application inside a micro-frontend architecture powered by [Garfish](https://www.garfishjs.org).

This plugin adapts Vite-based apps to work smoothly as sub-applications, handling base URL configuration and sandbox compatibility.

### Installation

```
npm install --save-dev vite-plugin-garfish-mf
```

### Getting Started

Add the plguin to sub-application's Vite configuration like below:

```js
// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import garfish from "vite-plugin-garfish-mf";

export default defineConfig({
  plugins: [react(), garfish({
      base: "http://localhost:3000",
      sandbox: true
    })
  ],
});
```

|  Property   | Prequire |  Type   |          Default          | Description                                                                                                                  |
| :---------: | :------: | :-----: | :-----------------------: | :--------------------------------------------------------------------------------------------------------------------------- |
|  **base**   |   [x]    | string  | **http://localhost:5173** | Base origin where the sub-application is served. Overrides server.port and server.origin                                     |
| **sandbox** |   [ ]    | boolean |         **true**          | Enable this when running the sub-application inside a  [Sandbox](https://www.garfishjs.org/api/run.html#sandbox) environment |


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
