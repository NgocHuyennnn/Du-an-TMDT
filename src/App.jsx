import { Routes, Route, Navigate } from "react-router-dom";

import ManagerLayout from "./components/manager/ManagerLayout";
import { publicRoutes } from "./routes/storeRoutes";


function App() {
  return (
    <Routes>
      <Route element={<ManagerLayout />}>
        <Route path="/" element={<Navigate to="/stores" />} />

        {publicRoutes.map((route, storeRoutes) => {
          const Page = route.component;

          return (
            <Route
              key={storeRoutes}
              path={route.path}
              element={<Page />}
            />
          );
        })}
      </Route>
    </Routes>
  );
}

export default App;