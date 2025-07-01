import { defineConfig } from "vite";
import TemplateTransform from "./src/framework/vite-template-transform";

export default defineConfig({
    root: "example",
    build: {
        outDir: "../dist",
    },
    server: {
        port: 3000,
    },
    plugins: [TemplateTransform()],
});
