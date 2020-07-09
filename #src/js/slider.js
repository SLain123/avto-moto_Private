(function slider() {   
   
    const ALL_SLIDES = document.querySelectorAll('.slider__item');
    const LEFT_BTN = document.querySelector('.slider__btn-left');
    const RIGHT_BTN = document.querySelector('.slider__btn-right');
    const ALL_MINI_PICTURES = document.querySelectorAll('.slider__mini-pic');

    // Событие на кнопки

    LEFT_BTN.addEventListener('click', function() {
        moveSlideFromBtn(-1);
    });
    RIGHT_BTN.addEventListener('click', function() {
        moveSlideFromBtn(1);
    });

    // Событие нажатия по мини картинке под слайдером

    for(let i = 0; i < ALL_MINI_PICTURES.length; i++) {
        ALL_MINI_PICTURES[i].addEventListener('click', function() {
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
        for(let i = 0; i < ALL_SLIDES.length; i++) {
            if(!ALL_SLIDES[i].classList.contains('slider__item-opacity')) {
                return (i);
            }
        }
    }

    // Устанавливает disabled на кнопки в крайнем положении слайдов;

    function checkAvailabilityButtons(current) {
        if(current == 0) {
            LEFT_BTN.disabled  = true;
            RIGHT_BTN.disabled  = false;
        }
        else if(current == ALL_SLIDES.length - 1) {
            LEFT_BTN.disabled  = false;
            RIGHT_BTN.disabled  = true;
        }
        else {
            LEFT_BTN.disabled  = false;
            RIGHT_BTN.disabled  = false;
        }
    }

    // Скрывает все слайды кроме текущего который нужно отобразить;

    function displayRightSlide(numOfSlide) {
        for(let i = 0; i < ALL_SLIDES.length; i++) {
            if(numOfSlide == i) {
                ALL_SLIDES[i].classList.remove('slider__item-opacity');
            }
            else ALL_SLIDES[i].classList.add('slider__item-opacity');
        }
    }
    
})();