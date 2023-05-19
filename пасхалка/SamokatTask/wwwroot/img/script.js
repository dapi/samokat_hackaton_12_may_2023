var toggleMenu = document.getElementById('toggle-menu');
var menuItems = document.getElementById('menu-items');

toggleMenu.addEventListener('click', function () {
    if (menuItems.style.display === 'flex') {
        menuItems.style.display = 'none';
    } else {
        menuItems.style.display = 'flex';
    }
});
