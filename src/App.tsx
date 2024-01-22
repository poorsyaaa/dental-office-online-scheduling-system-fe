import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/private-routes";

import Homepage from "./pages/homepage";
import RegistrationPage from "./pages/registration-page";
import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />

        <Route path="/" element={<PrivateRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
