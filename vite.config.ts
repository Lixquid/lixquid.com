import { defineConfig } from "vite";
import { templatePlugin } from "./src/templates/templatePlugin";

export default defineConfig({
	publicDir: "src/assets/public",
	plugins: [templatePlugin()],
	server: {
		port: 8080,
	},
});
