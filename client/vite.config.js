import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Load environment variables from .env
const env = dotenv.config().parsed;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Pass environment variables to client-side code
    "process.env": env,
  },
});
