import { Outlet } from 'react-router-dom';
import MathBackground from './MathBackground';
import Navigation from './Navigation';

const Layout = () => {
  return (
    <div className="relative min-h-screen">
      <MathBackground />
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Layout;
