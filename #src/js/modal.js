const feedbackOpenBtn = document.querySelector('.feedback__send-btn');
const modalBackground = document.querySelector('.modal');
const modalFeedbackWindow = document.querySelector('.feed-window');
const feedbackSendBtn = document.querySelector('.feed-window__send-btn');
const feedbackCloseBtn = document.querySelector('.feed-window__close-btn');
const nameInput = document.querySelector('.feed-window__column-one input');

// События нажатия кнопок;

feedbackOpenBtn.addEventListener('click', displayModalWindow);
feedbackCloseBtn.addEventListener('click', hideModalWindow);
modalBackground.addEventListener('click', checkTarget);
document.addEventListener('keydown', function() {           // событие esc для закрытия модального окна;
    if(event.key == 'Escape') {
        hideModalWindow();
    }
});

// Функция отображающая модальное окно с формой для отправки заявки;

function displayModalWindow() {
    modalBackground.style.display = 'flex';
    modalBackground.style.animationName= 'visible';
    modalBackground.style.animationPlayState = 'running';

    modalFeedbackWindow.style.display = 'flex';
    modalFeedbackWindow.style.animationName= 'visible';
    modalFeedbackWindow.style.animationPlayState = 'running';

    document.querySelector('body').classList.add('no-scroll');

    nameInput.focus();
}

// Функция скрывающая модальное окно с формой для отправки заявки;

function hideModalWindow() {
    modalBackground.style.animationName= 'hidden';

    setTimeout(function() {
        modalBackground.style.display= 'none';
    }, 475);

    modalFeedbackWindow.style.animationName= 'hidden';

    setTimeout(function() {
        modalFeedbackWindow.style.display= 'none';
    }, 475);

    document.querySelector('body').classList.remove('no-scroll');
}

// Функция проверки места клика, определяет был ли клик за блоком отзывов;

function checkTarget(event) {
    if(event.target != modalFeedbackWindow) {
        hideModalWindow();
    }
}
