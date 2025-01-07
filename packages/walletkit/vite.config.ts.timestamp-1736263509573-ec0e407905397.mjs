// vite.config.ts
import { defineConfig } from "file:///Users/liwen/Documents/node-real/walletkit/node_modules/.pnpm/vite@4.5.5_@types+node@22.7.5_lightningcss@1.27.0_terser@5.37.0/node_modules/vite/dist/node/index.js";
import react from "file:///Users/liwen/Documents/node-real/walletkit/node_modules/.pnpm/@vitejs+plugin-react@4.3.4_vite@4.5.5_@types+node@22.7.5_lightningcss@1.27.0_terser@5.37.0_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dts from "file:///Users/liwen/Documents/node-real/walletkit/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@22.7.5_rollup@4.28.1_typescript@5.7.2_vite@4.5.5_@types+nod_hqvoadjptfr5fbnz34ggrdvpia/node_modules/vite-plugin-dts/dist/index.mjs";
import peerDepsExternal from "file:///Users/liwen/Documents/node-real/walletkit/node_modules/.pnpm/rollup-plugin-peer-deps-external@2.2.4_rollup@4.28.1/node_modules/rollup-plugin-peer-deps-external/dist/rollup-plugin-peer-deps-external.js";
import { vanillaExtractPlugin } from "file:///Users/liwen/Documents/node-real/walletkit/node_modules/.pnpm/@vanilla-extract+vite-plugin@3.9.5_@types+node@22.7.5_babel-plugin-macros@3.1.0_lightningcss@_cxnzwayg2birdbvurx6hdeqcfa/node_modules/@vanilla-extract/vite-plugin/dist/vanilla-extract-vite-plugin.cjs.js";
import path from "path";
import mkcert from "file:///Users/liwen/Documents/node-real/walletkit/node_modules/.pnpm/vite-plugin-mkcert@1.17.6_vite@4.5.5_@types+node@22.7.5_lightningcss@1.27.0_terser@5.37.0_/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
var __vite_injected_original_dirname = "/Users/liwen/Documents/node-real/walletkit/packages/walletkit";
var vite_config_default = defineConfig({
  server: {
    https: false
  },
  plugins: [
    react(),
    vanillaExtractPlugin({
      identifiers: ({ hash }) => `wk_${hash}`
    }),
    // cssInjectedByJsPlugin({
    //   injectCode: (cssCode: string) => {
    //     return `try{if(typeof document != 'undefined'){var elementStyle = document.createElement('style');elementStyle.appendChild(document.createTextNode(${cssCode}));document.head.insertBefore(elementStyle,document.head.firstChild);}}catch(e){console.error('vite-plugin-css-injected-by-js', e);}`;
    //   },
    // }),
    dts({
      include: "src"
    }),
    mkcert()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  },
  build: {
    target: "esnext",
    minify: false,
    lib: {
      formats: ["es"],
      entry: {
        "evm/index": "src/evm/index.ts",
        "solana/index": "src/solana/index.ts",
        "tron/index": "src/tron/index.ts",
        "core/index": "src/core/index.ts"
      }
    },
    rollupOptions: {
      plugins: [
        peerDepsExternal({
          includeDependencies: true
        })
      ],
      output: {
        chunkFileNames: "chunks/chunk.js"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbGl3ZW4vRG9jdW1lbnRzL25vZGUtcmVhbC93YWxsZXRraXQvcGFja2FnZXMvd2FsbGV0a2l0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbGl3ZW4vRG9jdW1lbnRzL25vZGUtcmVhbC93YWxsZXRraXQvcGFja2FnZXMvd2FsbGV0a2l0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9saXdlbi9Eb2N1bWVudHMvbm9kZS1yZWFsL3dhbGxldGtpdC9wYWNrYWdlcy93YWxsZXRraXQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5pbXBvcnQgcGVlckRlcHNFeHRlcm5hbCBmcm9tICdyb2xsdXAtcGx1Z2luLXBlZXItZGVwcy1leHRlcm5hbCc7XG5pbXBvcnQgeyB2YW5pbGxhRXh0cmFjdFBsdWdpbiB9IGZyb20gJ0B2YW5pbGxhLWV4dHJhY3Qvdml0ZS1wbHVnaW4nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgbWtjZXJ0IGZyb20gJ3ZpdGUtcGx1Z2luLW1rY2VydCc7XG4vLyBpbXBvcnQgY3NzSW5qZWN0ZWRCeUpzUGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLWNzcy1pbmplY3RlZC1ieS1qcyc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBzZXJ2ZXI6IHtcbiAgICBodHRwczogZmFsc2UsXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHZhbmlsbGFFeHRyYWN0UGx1Z2luKHtcbiAgICAgIGlkZW50aWZpZXJzOiAoeyBoYXNoIH0pID0+IGB3a18ke2hhc2h9YCxcbiAgICB9KSxcbiAgICAvLyBjc3NJbmplY3RlZEJ5SnNQbHVnaW4oe1xuICAgIC8vICAgaW5qZWN0Q29kZTogKGNzc0NvZGU6IHN0cmluZykgPT4ge1xuICAgIC8vICAgICByZXR1cm4gYHRyeXtpZih0eXBlb2YgZG9jdW1lbnQgIT0gJ3VuZGVmaW5lZCcpe3ZhciBlbGVtZW50U3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO2VsZW1lbnRTdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgke2Nzc0NvZGV9KSk7ZG9jdW1lbnQuaGVhZC5pbnNlcnRCZWZvcmUoZWxlbWVudFN0eWxlLGRvY3VtZW50LmhlYWQuZmlyc3RDaGlsZCk7fX1jYXRjaChlKXtjb25zb2xlLmVycm9yKCd2aXRlLXBsdWdpbi1jc3MtaW5qZWN0ZWQtYnktanMnLCBlKTt9YDtcbiAgICAvLyAgIH0sXG4gICAgLy8gfSksXG4gICAgZHRzKHtcbiAgICAgIGluY2x1ZGU6ICdzcmMnLFxuICAgIH0pLFxuICAgIG1rY2VydCgpLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgdGFyZ2V0OiAnZXNuZXh0JyxcbiAgICBtaW5pZnk6IGZhbHNlLFxuICAgIGxpYjoge1xuICAgICAgZm9ybWF0czogWydlcyddLFxuICAgICAgZW50cnk6IHtcbiAgICAgICAgJ2V2bS9pbmRleCc6ICdzcmMvZXZtL2luZGV4LnRzJyxcbiAgICAgICAgJ3NvbGFuYS9pbmRleCc6ICdzcmMvc29sYW5hL2luZGV4LnRzJyxcbiAgICAgICAgJ3Ryb24vaW5kZXgnOiAnc3JjL3Ryb24vaW5kZXgudHMnLFxuICAgICAgICAnY29yZS9pbmRleCc6ICdzcmMvY29yZS9pbmRleC50cycsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgcGx1Z2luczogW1xuICAgICAgICBwZWVyRGVwc0V4dGVybmFsKHtcbiAgICAgICAgICBpbmNsdWRlRGVwZW5kZW5jaWVzOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdjaHVua3MvY2h1bmsuanMnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlXLFNBQVMsb0JBQW9CO0FBQ3RZLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxzQkFBc0I7QUFDN0IsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sWUFBWTtBQU5uQixJQUFNLG1DQUFtQztBQVV6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04scUJBQXFCO0FBQUEsTUFDbkIsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNLE1BQU0sSUFBSTtBQUFBLElBQ3ZDLENBQUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFNRCxJQUFJO0FBQUEsTUFDRixTQUFTO0FBQUEsSUFDWCxDQUFDO0FBQUEsSUFDRCxPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLElBQ3BDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsS0FBSztBQUFBLE1BQ0gsU0FBUyxDQUFDLElBQUk7QUFBQSxNQUNkLE9BQU87QUFBQSxRQUNMLGFBQWE7QUFBQSxRQUNiLGdCQUFnQjtBQUFBLFFBQ2hCLGNBQWM7QUFBQSxRQUNkLGNBQWM7QUFBQSxNQUNoQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLGVBQWU7QUFBQSxNQUNiLFNBQVM7QUFBQSxRQUNQLGlCQUFpQjtBQUFBLFVBQ2YscUJBQXFCO0FBQUEsUUFDdkIsQ0FBQztBQUFBLE1BQ0g7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
