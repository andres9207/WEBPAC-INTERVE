import dashboard from './dashboard';
import pages from './pages';
import utilities from './utilities';
import other from './other';
import security from './security';     // ← nuevo
import admin from './admin';
import work from './work';
import billing from './billing';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, work, billing, admin, security, pages, utilities, other]
};

export default menuItems;