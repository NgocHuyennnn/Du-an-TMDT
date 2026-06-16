import ManagerLayout from "./components/manager/ManagerLayout";
import { publicRoutes } from "./routes/storeRoutes";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ManagerLayout />}>
          {/* Route mặc định */}
          <Route path="/" element={<Navigate to="/stores" replace />} />

          {/* Các route */}
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;