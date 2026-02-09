import { load } from "cheerio";
import merge from "lodash.merge";
import { type PluginOption, type ResolvedConfig, type UserConfig } from "vite";

import { injectGarfishProvider, reactRefreshScriptTransform, scriptTransform } from "./utils";

export type Options = {
  name: string;
  base: string;
  sandbox?: boolean;
};

export const vitePluginGarfish = ({
  name,
  base = "http://localhost:5173",
  sandbox = true,
}: Options): PluginOption => {
  let config: ResolvedConfig;
  let publicPath = new URL(base);
  return [
    {
      name: "garfish:resolve-config",
      enforce: "post",
      config() {
        return {
          base,
          server: {
            port: Number(publicPath.port),
            origin: publicPath.origin,
          },
          preview: {
            port: Number(publicPath.port),
          },
        };
      },
      configResolved(resolvedConfig) {
        config = resolvedConfig;
      },
    },
    {
      name: "garfish:serve",
      enforce: "post",
      apply: "serve",
      configureServer(server) {
        return () =>
          server.middlewares.use((_, res, next) => {
            if (config.isProduction) return next();
            const end = res.end.bind(res);

            res.end = (...args: any[]) => {
              let [htmlStr, ...rest] = args;
              if (typeof htmlStr === "string") {
                const $ = load(htmlStr);
                scriptTransform($($("script[src=/@vite/client]").get(0)), base);

                const moduleScripts$ = $("script:not([src])[type=module]");
                moduleScripts$.each((_, script) => {
                  const moduleScript$ = $(script);
                  if (moduleScript$.text().includes(`${config.base}@react-refresh`)) {
                    reactRefreshScriptTransform(moduleScript$, base + "/@react-refresh");
                  }
                });
                htmlStr = $.html();
              }
              return end(htmlStr, ...rest);
            };

            return next();
          });
      },
    },
    {
      name: "garfish:html-transfrom",
      enforce: "post",
      transformIndexHtml(html) {
        const $ = load(html);
        const moduleScripts$ = $("body script[src][type], head script[src][crossorigin='']");
        if (sandbox) {
          injectGarfishProvider(moduleScripts$.last(), config.command === "build" ? "" : base);
        }
        moduleScripts$.each((_, script$) => void scriptTransform($(script$), base));
        const htmlStr = $.html();
        return htmlStr;
      },
    },
  ];
};
