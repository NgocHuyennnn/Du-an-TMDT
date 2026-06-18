import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ManagerLayout from './components/manager/ManagerLayout.jsx';

// Import các nguồn route của bạn
import { publicRoutes as indexRoutes } from './routes/index.js'; 
import { privateRoutes, publicRoutes as storeRoutes } from './routes/storeRoutes.js';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Nhóm Route KHÔNG Layout */}
        {indexRoutes.map((route, index) => (
          <Route 
            key={`idx-${index}`} 
            path={route.path} 
            element={<route.component />} 
          />
        ))}

        {/* 2. Nhóm Route CÓ Layout */}
        <Route element={<ManagerLayout/>}>
          {storeRoutes.map((route, index) => (
            <Route 
              key={`store-${index}`} 
              path={route.path} 
              element={<route.component />} 
            />
          ))}
          {privateRoutes.map((route, index) => (
            <Route 
              key={`priv-${index}`} 
              path={route.path} 
              element={<route.component />} 
            />
          ))}
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}