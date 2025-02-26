import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3010,
    proxy: {
      "/api": {
        target: 'http://192.168.40.232:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

// [ 
//   MasterCategoryModel {
//      id: 1019,
//      name: 'Battery Manager',
//      status: 'ACTIVE',
//      createdby: 'JOSEPH ORENCIO',
//      createddate: '2024-02-19 14:45'
//    },
//    MasterCategoryModel {
//      id: 1020,
//      name: 'BATTERY ACESSORIES',
//      status: 'ACTIVE',
//      createdby: 'JOSEPH ORENCIO',
//      createddate: '2024-02-19 14:46'
//    },
//    MasterCategoryModel {
//      id: 1021,
//      name: 'POS Terminal',
//      status: 'ACTIVE',
//      createdby: 'JOSEPH ORENCIO',
//      createddate: '2024-04-11 07:59'
//    },
//    MasterCategoryModel {
//      id: 1022,
//      name: 'POS Printer',
//      status: 'ACTIVE',
//      createdby: 'JOSEPH ORENCIO',
//      createddate: '2024-04-11 07:59'
//    }
//  ]