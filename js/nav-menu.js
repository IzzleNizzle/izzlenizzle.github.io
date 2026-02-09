(() => {
  const NAV_LINK_SELECTOR = '.nav-link';
  const MENU_TOGGLE_ID = 'menu-toggle';
  const INIT_FLAG = '__isaacpcodesNavMenuInit';

  const closeMenuIfOpen = () => {
    const menuToggle = document.getElementById(MENU_TOGGLE_ID);
    if (menuToggle && menuToggle.checked) {
      menuToggle.checked = false;
    }
  };

  const handleNavLinkClick = (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) {
      return;
    }

    const link = target.closest(NAV_LINK_SELECTOR);
    if (!link) {
      return;
    }

    closeMenuIfOpen();
  };

  const init = () => {
    if (window[INIT_FLAG]) {
      return;
    }

    window[INIT_FLAG] = true;
    document.addEventListener('click', handleNavLinkClick);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
