import { defineConfig } from "vitest/config";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./todo-api/src/", import.meta.url)),
    },
  },
  test: {
    environment: "node",
  },
});
