import { transform } from "@swc/core";
import { load } from "cheerio";

import { injectGarfishProvider, reactHRMScriptTransfrom, scriptTransform } from "./utils";

import type { Plugin, ResolvedConfig } from "vite";

export type Options = {
  /**
   * Set the base URL when serving dev server and base assets when building
   *
   * More info https://vite.dev/config/shared-options#base
   */
  base: string;
  /**
   * Set to `true` if you are using plugin [GarfishEsModule](https://www.npmjs.com/package/@garfish/es-module)
   *
   */
  esModule?: boolean;
};

export const vitePluginGarfish = ({
  base = "http://localhost:5173",
  esModule = false,
}: Options): Plugin[] => {
  let config: ResolvedConfig;
  let isUseWithReact: boolean;

  return [
    {
      name: "vite-plugin-garfish-fm:resolve-config",
      enforce: "post",
      config() {
        let url = new URL(base);
        return {
          base,
          server: {
            port: Number(url.port),
            origin: url.origin,
          },
          preview: {
            port: Number(url.port),
          },
        };
      },
      configResolved(resolvedConfig) {
        config = resolvedConfig;
        isUseWithReact =
          config.plugins.findIndex(
            (plugin) => plugin.name === "vite:react-swc" || plugin.name === "vite:react-babel",
          ) !== -1;
      },
    },
    {
      name: "vite-plugin-garfish-fm:html-transfrom",
      enforce: "post",
      apply: "serve",
      transformIndexHtml(html) {
        const $ = load(html);
        const moduleScripts$ = $("body script[src][type], head script[src]");
        injectGarfishProvider(moduleScripts$.last(), base);
        moduleScripts$.each((_, script$) => void scriptTransform($(script$), base));

        if (isUseWithReact) {
          const reactHMRScript = $("script:not([src])[type=module]").filter((_, el) => {
            const content = $(el).html() || "";

            return content.includes("/@react-refresh");
          });

          if (reactHMRScript.length > 0) {
            reactHRMScriptTransfrom($(reactHMRScript[0]), base);
          }
        }

        const htmlStr = $.html();

        return htmlStr;
      },
    },
    {
      name: "vite-plugin-garfish-fm:legacy-transform",
      enforce: "post",
      apply: "serve",
      async transform(code) {
        if (!esModule) {
          return null;
        }
        const result = await transform(code, {
          jsc: {
            target: "es2018",
            parser: {
              syntax: "ecmascript",
            },
          },
          module: {
            type: "es6",
          },
          sourceMaps: true,
        });

        return {
          code: result.code,
          map: result.map,
        };
      },
    },
  ];
};
