// JS-ФУНКЦИЯ ОПРЕДЕЛЕНИЯ ПОДДЕРЖКИ WEBP
function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    
    testWebP(function (support) {
    
    if (support == true) {
    document.querySelector('body').classList.add('webp');
    }else{
    document.querySelector('body').classList.add('no-webp');
    }
    }); // Подключение скрипта для проверки поддержки webp формата и выбора правильного формата в css;
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
}  // Слайдер;
const allTabs = document.querySelectorAll('.product-description__control-block button');
const charactersBlock = document.querySelector('.characters-block');
const feedbackBlock = document.querySelector('.feedback');
const contactBlock = document.querySelector('.contact');
const arrOfBlocks = [charactersBlock, feedbackBlock, contactBlock];  // массив блоков-разделов;

// События на кнопки

for(let i = 0; i < allTabs.length; i++) {
    allTabs[i].addEventListener('click', function() {
        changeColorButtons(i);
        displaySelectSection(i);
    })
}

// Функция скрывает все не выбранные блоки и отображает один выбранный по табу;

function displaySelectSection(numberOfButton) {
    for(let i = 0; i < arrOfBlocks.length; i++) {
        if(i == numberOfButton) {
            arrOfBlocks[i].style.display = 'block';
        }
        else arrOfBlocks[i].style.display = 'none';
    }
}

// Функция переопределяет классы для активной кнопки, окрашивает активную в красный стиль;

function changeColorButtons(numberOfSelectButton) {
    for(let i = 0; i < allTabs.length; i++) {
        if(i == numberOfSelectButton) {
            allTabs[i].classList.add('product-description__btn-active');
        }
        else allTabs[i].classList.remove('product-description__btn-active');
    }
}

 // Переключение разделов по табам;

