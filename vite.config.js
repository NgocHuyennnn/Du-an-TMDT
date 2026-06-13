import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "url"; // Thêm dòng này để xử lý ES Modules
import path from "path";

// Tạo __dirname kiểu mới cho chuẩn ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Định nghĩa dấu @ trỏ vào thư mục src
    },
  },
});
