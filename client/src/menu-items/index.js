import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import security from './security';     // ← nuevo

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, security, pages, utilities, other]
};

export default menuItems;