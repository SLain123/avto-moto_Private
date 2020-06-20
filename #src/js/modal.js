const FEEDBACK_OPEN_BTN = document.querySelector('.feedback__send-btn');
const MODAL_BACKGROUND = document.querySelector('.modal');
const MODAL_FEEDBACK_WINDOW = document.querySelector('.feed-window');
const FEEDBACK_CLOSE_BTN = document.querySelector('.feed-window__close-btn');
const NAME_INPUT = document.querySelector('.feed-window__column-one input');

// События нажатия кнопок;

FEEDBACK_OPEN_BTN.addEventListener('click', displayModalWindow);
FEEDBACK_CLOSE_BTN.addEventListener('click', function() {
    hideModalWindow();
    cleanFormAfterSend(); // Очистить поля формы и рейтинг после закрытия;
});
MODAL_BACKGROUND.addEventListener('click', checkTarget);
document.addEventListener('keydown', function() {           // событие esc для закрытия модального окна;
    if(event.key == 'Escape') {
        hideModalWindow();
        cleanFormAfterSend(); // Очистить поля формы и рейтинг после закрытия;
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

function checkTarget(event) {
    if(event.target != MODAL_FEEDBACK_WINDOW) {
        hideModalWindow();
        cleanFormAfterSend(); // Очистить поля формы и рейтинг после закрытия;
    }
}
