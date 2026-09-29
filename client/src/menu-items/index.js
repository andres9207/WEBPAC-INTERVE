import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import security from './security';     // ← nuevo
import admin from './admin';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, security, admin, pages, utilities, other]
};

export default menuItems;