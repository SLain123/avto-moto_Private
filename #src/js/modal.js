const feedbackOpenBtn = document.querySelector('.feedback__send-btn');
const modalBackground = document.querySelector('.modal');
const modalFeedbackWindow = document.querySelector('.feed-window');
const feedbackSendBtn = document.querySelector('.feed-window__send-btn');
const feedbackCloseBtn = document.querySelector('.feed-window__close-btn');

// События нажатия кнопок;

feedbackOpenBtn.addEventListener('click', displayModalWindow);
feedbackCloseBtn.addEventListener('click', hideModalWindow);

// Функция отображающая модальное окно с формой для отправки заявки;

function displayModalWindow() {
    modalBackground.style.display = 'flex';
    modalBackground.style.animationName= 'visible';
    modalBackground.style.animationPlayState = 'running';

    modalFeedbackWindow.style.display = 'flex';
    modalFeedbackWindow.style.animationName= 'visible';
    modalFeedbackWindow.style.animationPlayState = 'running';
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
}