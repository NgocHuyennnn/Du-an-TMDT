// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';

function App() {
  return (
    <Router>
      <Routes>
        {/* Tự động duyệt qua danh sách cấu hình để tạo tuyến đường */}
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          return (
            <Route 
              key={index} 
              path={route.path} 
              element={<Page />} 
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;