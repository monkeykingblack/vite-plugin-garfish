import type { Cheerio } from "cheerio";
import type { Element } from "domhandler";

export function scriptTransform(script$: Cheerio<Element>, publicPath: string) {
  let src = script$.attr("src");
  if (!src) return;

  script$
    .removeAttr("src")
    .removeAttr("type")
    .html(`import("${publicPath + src}")`);

  return script$;
}

export function reactHRMScriptTransfrom(script$: Cheerio<Element>, publicPath: string) {
  script$.removeAttr("type").html(`
      ((window) => {
        import("${publicPath}/@react-refresh").then(({default: RefreshRuntime}) => {
          RefreshRuntime.injectIntoGlobalHook(window);
          window.$RefreshReg$ = () => {};
          window.$RefreshSig$ = () => (type) => type;
          window.__vite_plugin_react_preamble_installed__ = true;
        })
      })(new Function("return this")());
  `);
}

export function injectGarfishProvider(script$: Cheerio<Element>, publicPath?: string) {
  let src = script$.attr("src");
  if (!src) return;

  script$.removeAttr("src").removeAttr("type").html(`
    if (window.__GARFISH__ && typeof __GARFISH_EXPORTS__ === "object") {
      let provider = new Promise((resolve) => {
        import("${publicPath + src}").then(({provider}) => resolve(provider))
      })
      if (__GARFISH_EXPORTS__.registerProvider) {
        __GARFISH_EXPORTS__.registerProvider(provider);
      } else {
        __GARFISH_EXPORTS__.provider = provider;
      }
    } else {
      import("${publicPath + src}")
    }
  `);
}
