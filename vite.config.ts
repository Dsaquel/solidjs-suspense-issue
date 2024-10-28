import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import fs from "fs";

export default defineConfig({
  plugins: [solid()],
});
