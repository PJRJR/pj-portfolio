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
        "project-ideo-ai": resolve(__dirname, "project-ideo-ai.html"),
        "project-cop28": resolve(__dirname, "project-cop28.html"),
        "project-grand-games": resolve(__dirname, "project-grand-games.html"),
        "project-spex": resolve(__dirname, "project-spex.html"),
        "project-playlab": resolve(__dirname, "project-playlab.html"),
        "project-rive-demo": resolve(__dirname, "project-rive-demo.html"),
        "project-talklot": resolve(__dirname, "project-talklot.html"),
        "project-ideo": resolve(__dirname, "project-ideo.html"),
      },
    },
  },
});
