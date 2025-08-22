import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import Trip from "./pages/Trip";
import Pricing from "./pages/Pricing";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoutes";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <PublicRoute>
            <PublicLayout />
          </PublicRoute>
        }>
          <Route index element={<Home />} />
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/signup" element={<Signup />} />
          <Route path="pricing" element={<Pricing />} />
        </Route>

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="trip/create" element={<CreateTrip />} />
          <Route path="trip/:tripId" element={<Trip />} />
        </Route>
      </Routes>
    </>
  )
};

export default App;