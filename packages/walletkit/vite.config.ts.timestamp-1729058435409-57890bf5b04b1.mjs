// vite.config.ts
import { defineConfig } from "file:///Users/liwen/Documents/node-real/walletkit/node_modules/.pnpm/vite@4.5.3_@types+node@22.5.1_terser@5.31.6/node_modules/vite/dist/node/index.js";
import react from "file:///Users/liwen/Documents/node-real/walletkit/node_modules/.pnpm/@vitejs+plugin-react@4.3.1_vite@4.5.3_@types+node@22.5.1_terser@5.31.6_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dts from "file:///Users/liwen/Documents/node-real/walletkit/node_modules/.pnpm/vite-plugin-dts@3.9.1_@types+node@22.5.1_rollup@4.20.0_typescript@5.5.3_vite@4.5.3_@types+node@22.5.1_terser@5.31.6_/node_modules/vite-plugin-dts/dist/index.mjs";
import peerDepsExternal from "file:///Users/liwen/Documents/node-real/walletkit/node_modules/.pnpm/rollup-plugin-peer-deps-external@2.2.4_rollup@4.20.0/node_modules/rollup-plugin-peer-deps-external/dist/rollup-plugin-peer-deps-external.js";
import { vanillaExtractPlugin } from "file:///Users/liwen/Documents/node-real/walletkit/node_modules/.pnpm/@vanilla-extract+vite-plugin@3.9.5_@types+node@22.5.1_babel-plugin-macros@3.1.0_terser@5.31.6_3pss56u2iadxj727nr45ddylfy/node_modules/@vanilla-extract/vite-plugin/dist/vanilla-extract-vite-plugin.cjs.js";
import path from "path";
import mkcert from "file:///Users/liwen/Documents/node-real/walletkit/node_modules/.pnpm/vite-plugin-mkcert@1.17.6_vite@4.5.3_@types+node@22.5.1_terser@5.31.6_/node_modules/vite-plugin-mkcert/dist/mkcert.mjs";
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
        "core/index": "src/core/index.ts",
        "solana/index": "src/solana/index.ts",
        "evm/index": "src/evm/index.ts",
        "tron/index": "src/tron/index.ts"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbGl3ZW4vRG9jdW1lbnRzL25vZGUtcmVhbC93YWxsZXRraXQvcGFja2FnZXMvd2FsbGV0a2l0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbGl3ZW4vRG9jdW1lbnRzL25vZGUtcmVhbC93YWxsZXRraXQvcGFja2FnZXMvd2FsbGV0a2l0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9saXdlbi9Eb2N1bWVudHMvbm9kZS1yZWFsL3dhbGxldGtpdC9wYWNrYWdlcy93YWxsZXRraXQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG5pbXBvcnQgcGVlckRlcHNFeHRlcm5hbCBmcm9tICdyb2xsdXAtcGx1Z2luLXBlZXItZGVwcy1leHRlcm5hbCc7XG5pbXBvcnQgeyB2YW5pbGxhRXh0cmFjdFBsdWdpbiB9IGZyb20gJ0B2YW5pbGxhLWV4dHJhY3Qvdml0ZS1wbHVnaW4nO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgbWtjZXJ0IGZyb20gJ3ZpdGUtcGx1Z2luLW1rY2VydCc7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBzZXJ2ZXI6IHtcbiAgICBodHRwczogZmFsc2UsXG4gIH0sXG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHZhbmlsbGFFeHRyYWN0UGx1Z2luKHtcbiAgICAgIGlkZW50aWZpZXJzOiAoeyBoYXNoIH0pID0+IGB3a18ke2hhc2h9YCxcbiAgICB9KSxcbiAgICBkdHMoe1xuICAgICAgaW5jbHVkZTogJ3NyYycsXG4gICAgfSksXG4gICAgbWtjZXJ0KCksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgIG1pbmlmeTogZmFsc2UsXG4gICAgbGliOiB7XG4gICAgICBmb3JtYXRzOiBbJ2VzJ10sXG4gICAgICBlbnRyeToge1xuICAgICAgICAnY29yZS9pbmRleCc6ICdzcmMvY29yZS9pbmRleC50cycsXG4gICAgICAgICdzb2xhbmEvaW5kZXgnOiAnc3JjL3NvbGFuYS9pbmRleC50cycsXG4gICAgICAgICdldm0vaW5kZXgnOiAnc3JjL2V2bS9pbmRleC50cycsXG4gICAgICAgICd0cm9uL2luZGV4JzogJ3NyYy90cm9uL2luZGV4LnRzJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBwbHVnaW5zOiBbXG4gICAgICAgIHBlZXJEZXBzRXh0ZXJuYWwoe1xuICAgICAgICAgIGluY2x1ZGVEZXBlbmRlbmNpZXM6IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2NodW5rcy9jaHVuay5qcycsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVcsU0FBUyxvQkFBb0I7QUFDdFksT0FBTyxXQUFXO0FBQ2xCLE9BQU8sU0FBUztBQUNoQixPQUFPLHNCQUFzQjtBQUM3QixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLFVBQVU7QUFDakIsT0FBTyxZQUFZO0FBTm5CLElBQU0sbUNBQW1DO0FBU3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixxQkFBcUI7QUFBQSxNQUNuQixhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU0sTUFBTSxJQUFJO0FBQUEsSUFDdkMsQ0FBQztBQUFBLElBQ0QsSUFBSTtBQUFBLE1BQ0YsU0FBUztBQUFBLElBQ1gsQ0FBQztBQUFBLElBQ0QsT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxJQUNwQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxNQUNILFNBQVMsQ0FBQyxJQUFJO0FBQUEsTUFDZCxPQUFPO0FBQUEsUUFDTCxjQUFjO0FBQUEsUUFDZCxnQkFBZ0I7QUFBQSxRQUNoQixhQUFhO0FBQUEsUUFDYixjQUFjO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixTQUFTO0FBQUEsUUFDUCxpQkFBaUI7QUFBQSxVQUNmLHFCQUFxQjtBQUFBLFFBQ3ZCLENBQUM7QUFBQSxNQUNIO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
