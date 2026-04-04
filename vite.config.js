import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        projects: resolve(__dirname, "projects.html"),
        illustration: resolve(__dirname, "illustration.html"),
        work: resolve(__dirname, "work.html"),
        "project-ideo-ai": resolve(__dirname, "src/pages/project-ideo-ai.html"),
        "project-cop28": resolve(__dirname, "src/pages/project-cop28.html"),
        "project-grand-games": resolve(
          __dirname,
          "src/pages/project-grand-games.html",
        ),
        "project-spex": resolve(__dirname, "src/pages/project-spex.html"),
        "project-playlab": resolve(__dirname, "src/pages/project-playlab.html"),
        "project-rive-demo": resolve(
          __dirname,
          "src/pages/project-rive-demo.html",
        ),
      },
    },
  },
});
