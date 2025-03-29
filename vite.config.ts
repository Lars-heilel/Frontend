import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	server: { port: 7777 },
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": "/src",
			"@shared": "/src/shared",
			"@zod": "/src/shared/lib/zod",
			"@pages": "/src/pages",
		},
	},
});
