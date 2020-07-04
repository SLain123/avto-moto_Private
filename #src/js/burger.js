(function burger() {

    const BURGER_BTN = document.querySelector('.burger');
    const MENU_BLOCK = document.querySelector('.nav');
    const MENU_ITEMS = MENU_BLOCK.children;
    const MAIN_WIDTH = document.documentElement.clientWidth;

    BURGER_BTN.addEventListener('click', displayMenu);

// Устанавливает стартовые значения для меню, тем самым скрывая его на всех устройствах где есть поддержка js, в ином случае меню видно всегда;

    function setDefaultConf() {
        if(MAIN_WIDTH < 769) {
            MENU_BLOCK.style.height = '0';
            
            setTimeout(function() {
                MENU_BLOCK.style.transition = 'linear 1s';
            }, 500);

            for(let link of MENU_ITEMS) {
                link.style.display = 'none';
            }
        }
    }

// Функция отображения меню-гамбургера;

    function displayMenu() {
        let dash = BURGER_BTN.children[0];

        MENU_BLOCK.style.height = '200px';
        
        setTimeout(function() {
            for(let link of MENU_ITEMS) {
                link.style.display = 'inline';
            }
        }, 500);

        dash.classList.replace('burger__dash', 'burger__close-btn');
        dash.innerHTML = '&times;';
        

        BURGER_BTN.removeEventListener('click', displayMenu);
        BURGER_BTN.addEventListener('click', hideMenu);
    }

// Функция скрытия меню-гамбургера;

    function hideMenu() {
        let dash = BURGER_BTN.children[0];

        MENU_BLOCK.style.height = '0';
        
        setTimeout(function() {
            for(let link of MENU_ITEMS) {
                link.style.display = 'none';
            }
        }, 500);

        dash.classList.replace('burger__close-btn', 'burger__dash');
        dash.innerHTML = '';

        BURGER_BTN.removeEventListener('click', hideMenu);
        BURGER_BTN.addEventListener('click', displayMenu);
    }

    setDefaultConf();
}());