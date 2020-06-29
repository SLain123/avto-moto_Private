(function modal() {

    const FEEDBACK_OPEN_BTN = document.querySelector('.feedback__send-btn');
    const MODAL_BACKGROUND = document.querySelector('.modal');
    const MODAL_FEEDBACK_WINDOW = document.querySelector('.feed-window');
    const FEEDBACK_CLOSE_BTN = document.querySelector('.feed-window__close-btn');
    const NAME_INPUT = document.querySelector('.feed-window__column-one input');
    const ALL_INPUTS = document.querySelectorAll('.feed-window__column-one input');
    const FEED_NAME = ALL_INPUTS[0];
    const FEED_PLUS = ALL_INPUTS[1];
    const FEED_MINUS = ALL_INPUTS[2];
    const FEED_COMMENT = document.querySelector('.feed-window__column-two textarea');
    const RATE_STARS = document.querySelectorAll('.feed-window__rate img');

    // События нажатия кнопок;

    FEEDBACK_OPEN_BTN.addEventListener('click', displayModalWindow);
    FEEDBACK_CLOSE_BTN.addEventListener('click', function(evt) {
        hideModalWindow(evt);
        cleanFormAfterSend(evt); // Очистить поля формы и рейтинг после закрытия;
    });
    MODAL_BACKGROUND.addEventListener('click', checkTarget);
    document.addEventListener('keydown', function(evt) {           // событие esc для закрытия модального окна;
        if(evt.key == 'Escape') {
            hideModalWindow(evt)
            cleanFormAfterSend(evt); // Очистить поля формы и рейтинг после закрытия;
        }
    });

    // Функция отображающая модальное окно с формой для отправки заявки;

    function displayModalWindow() {
        MODAL_BACKGROUND.style.display = 'flex';
        MODAL_BACKGROUND.style.animationName= 'visible';
        MODAL_BACKGROUND.style.animationPlayState = 'running';

        MODAL_FEEDBACK_WINDOW.style.display = 'flex';
        MODAL_FEEDBACK_WINDOW.style.animationName= 'visible';
        MODAL_FEEDBACK_WINDOW.style.animationPlayState = 'running';

        document.querySelector('body').classList.add('no-scroll');

        NAME_INPUT.focus();
    }

    // Функция скрывающая модальное окно с формой для отправки заявки;

    function hideModalWindow() {
        MODAL_BACKGROUND.style.animationName= 'hidden';

        setTimeout(function() {
            MODAL_BACKGROUND.style.display= 'none';
        }, 475);

        MODAL_FEEDBACK_WINDOW.style.animationName= 'hidden';

        setTimeout(function() {
            MODAL_FEEDBACK_WINDOW.style.display= 'none';
        }, 475);

        document.querySelector('body').classList.remove('no-scroll');
    }

    // Функция проверки места клика, определяет был ли клик за блоком отзывов;

    function checkTarget(evt) {
        if(evt.target != MODAL_FEEDBACK_WINDOW) {
            hideModalWindow();
            cleanFormAfterSend(); // Очистить поля формы и рейтинг после закрытия;
        }
    }

    // Функция очистки формы и скрытия модального окна;

    function cleanFormAfterSend() {
        FEED_NAME.value = '';
        FEED_PLUS.value = '';
        FEED_MINUS.value = '';
        FEED_COMMENT.value = '';

        // Подункция обнуления выбранных звезд в модальном окне написания отзывов

        function cleanStar() {
            for(let i = 0; i < RATE_STARS.length; i++) {
                RATE_STARS[i].src ='./img/empty.png';
                RATE_STARS[i].previousElementSibling.srcset= './img/empty.webp';
                RATE_STARS[i].width = 28;
                RATE_STARS[i].height = 28;
            }
    }
        cleanStar();
        hideModalWindow();
    }

    // Экспорт функции из модуля;

    window.modal = {
        cleanFormAfterSendFunc: cleanFormAfterSend
    };

}());