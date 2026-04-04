import { lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppRoutes } from '../types/app.definitions';
import { AppLayout } from '../features/shared/layouts/AppLayout';

// Placeholder standard pages
const HomeView = lazy(() => import('../features/plants/modules/dashboard'));
const LoginView = () => <div className="p-4"><p>Login Page</p></div>;
const RegisterView = () => <div className="p-4"><p>Register Page</p></div>;
const AddPlantView = () => <div className="p-4"><p>Add Plant Form</p></div>;
const PlantDetailView = () => <div className="p-4"><p>Plant Detail</p></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={AppRoutes.HOME} element={<HomeView />} />
          <Route path={AppRoutes.ADD_PLANT} element={<AddPlantView />} />
          <Route path={AppRoutes.PLANT_DETAIL} element={<PlantDetailView />} />
          <Route path={AppRoutes.LOGIN} element={<LoginView />} />
          <Route path={AppRoutes.REGISTER} element={<RegisterView />} />
          
          {/* Catch all route - returns to Home */}
          <Route path="*" element={<Navigate to={AppRoutes.HOME} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
