import { useRoutes } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import AdminRoutes from './AdminRoutes';
import CustomerRoutes from './CustomerRoutes.tsx';

const AppRoutes = () => {
  return useRoutes([...AuthRoutes, ...AdminRoutes, ...CustomerRoutes]);
};

export default AppRoutes;
