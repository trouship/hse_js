const menus = [...document.querySelectorAll('.menu__link')];

const handleMenuClick = (menuLink) => {
  const parentMenuItem = menuLink.closest('.menu__item');
  const childMenu = parentMenuItem.querySelector('.menu');

  if (childMenu) {
    const isActive = childMenu.classList.contains('menu_active');

    const parentMenu = menuLink.closest('.menu');
    const childMenus = [...parentMenu.querySelectorAll('.menu')];
    childMenus.forEach((menu) => menu.classList.remove('menu_active'));

    if (!isActive) {
      childMenu.classList.add('menu_active');
    }

    return false;
  }
};

menus.forEach((menuLink) => menuLink.onclick = () => handleMenuClick(menuLink));