const allSlides = document.querySelectorAll('.slider__item');
const leftBtn = document.querySelector('.slider__btn-left');
const rightBtn = document.querySelector('.slider__btn-right');
const allMiniPictures = document.querySelectorAll('.slider__mini-pic');

// Событие на кнопки

leftBtn.addEventListener('click', function() {
    moveSlideFromBtn(-1);
});
rightBtn.addEventListener('click', function() {
    moveSlideFromBtn(1);
});

// Событие нажатия по мини картинке под слайдером

for(let i = 0; i < allMiniPictures.length; i++) {
    allMiniPictures[i].addEventListener('click', function() {
        moveSlideFromPic(i);
    });
}

// Основная функция для сдвига слайдера по кнопке

function moveSlideFromBtn(num) {
    // Запуск функции по нахождению активного слайда;

    let currentSlide = findCurrentSlide();

    // Изменяет значение переменной номера слайда
    if(currentSlide < 3 && num == 1) {
        currentSlide += num;
    }
    else if(currentSlide > 0 && num == -1) {
        currentSlide += num;
    }
    
    // Запускает функцию которая отрегулирует доступност кнопок;

    checkAvailabilityButtons(currentSlide);

    // Запускает функция которая скрывает неактивные слайды;

    displayRightSlide(currentSlide);
 
}

// Основная функция для сдвига слайдера по клику на картинку

function moveSlideFromPic(num) {
    checkAvailabilityButtons(num);
    displayRightSlide(num);
}

// Находит текущий (выбранный) слайд;

function findCurrentSlide() {
    for(let i = 0; i < allSlides.length; i++) {
        if(!allSlides[i].classList.contains('slider__item-opacity')) {
            return (i);
        }
    }
}

// Устанавливает disabled на кнопки в крайнем положении слайдов;

function checkAvailabilityButtons(current) {
    if(current == 0) {
        leftBtn.setAttribute('disabled', '');
        rightBtn.removeAttribute('disabled', '');
    }
    else if(current == allSlides.length - 1) {
        leftBtn.removeAttribute('disabled', '');
        rightBtn.setAttribute('disabled', '');
    }
    else {
        leftBtn.removeAttribute('disabled', '');
        rightBtn.removeAttribute('disabled', '');
    }
}

// Скрывает все слайды кроме текущего который нужно отобразить;

function displayRightSlide(numOfSlide) {
    for(let i = 0; i < allSlides.length; i++) {
        if(numOfSlide == i) {
            allSlides[i].classList.remove('slider__item-opacity');
        }
        else allSlides[i].classList.add('slider__item-opacity');
    }
}