import { useRoutes } from 'react-router-dom';
import AuthRoutes from './AuthRoutes';
import AdminRoutes from './AdminRoutes';

const AppRoutes = () => {
  return useRoutes([...AuthRoutes, ...AdminRoutes]);
};

export default AppRoutes;
