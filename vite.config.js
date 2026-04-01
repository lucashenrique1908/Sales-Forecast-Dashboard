import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	base: "/Sales-Forecast-Dashboard/", // 👈 nome do repo
});
