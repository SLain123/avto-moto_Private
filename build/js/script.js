'use strict';

// JS-ФУНКЦИЯ ОПРЕДЕЛЕНИЯ ПОДДЕРЖКИ WEBP
(function webP() {

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
        });

    }()); // Подключение скрипта для проверки поддержки webp формата и выбора правильного формата в css;
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
    
}());  // Подключение слайдера;
(function tab() {

    const ALL_TABS = document.querySelectorAll('.product-description__control-block button');
    const CHARACTERS_BLOCK = document.querySelector('.characters-block');
    const FEEDBACK_BLOCK = document.querySelector('.feedback');
    const CONTACT_BLOCK = document.querySelector('.contact');
    const ARR_OF_BLOCKS = [CHARACTERS_BLOCK, FEEDBACK_BLOCK, CONTACT_BLOCK];  // массив блоков-разделов;

    // События на кнопки

    for(let i = 0; i < ALL_TABS.length; i++) {
        ALL_TABS[i].addEventListener('click', function() {
            changeColorButtons(i);
            displaySelectSection(i);
        })
    }

    // Функция скрывает все не выбранные блоки и отображает один выбранный по табу;

    function displaySelectSection(numberOfButton) {
        for(let i = 0; i < ARR_OF_BLOCKS.length; i++) {
            if(i == numberOfButton) {
                ARR_OF_BLOCKS[i].style.display = 'block';
            }
            else ARR_OF_BLOCKS[i].style.display = 'none';
        }
    }

    // Функция переопределяет классы для активной кнопки, окрашивает активную в красный стиль;

    function changeColorButtons(numberOfSelectButton) {
        for(let i = 0; i < ALL_TABS.length; i++) {
            if(i == numberOfSelectButton) {
                ALL_TABS[i].classList.add('product-description__btn-active');
            }
            else ALL_TABS[i].classList.remove('product-description__btn-active');
        }
    }
}());
 // Переключение разделов по табам;
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

}()); // Подключение модального окна с формой отзывов;
(function feedback() {
    // localStorage.clear(); // для очистки localStorage надо раскоментировать;

    const ALL_INPUTS = document.querySelectorAll('.feed-window__column-one input');
    const FEED_NAME = ALL_INPUTS[0];
    const FEED_PLUS = ALL_INPUTS[1];
    const FEED_MINUS = ALL_INPUTS[2];
    const FEED_COMMENT = document.querySelector('.feed-window__column-two textarea');
    const RATE_STARS = document.querySelectorAll('.feed-window__rate img');
    const FEED_SEND_BTN = document.querySelector('.feed-window__send-btn');
    const FEEDBACK_MAIN_BLOCK = document.querySelector('.feedback');
    const FEEDBACK_PATTERN = document.querySelector('.feedback__block');
    const MODERATE_MESSAGE_WINDOW = document.querySelector('.feedback__modarate-message');

    let localArr = [{
        id: -1,
        name: 'Борис Иванов',
        plus: 'мощность, внешний вид',
        minus: 'Слабые тормозные колодки (пришлось заменить)',
        comment: 'Взяли по трейд-ин, на выгодных условиях у дилера. Стильная внешка и крут по базовым характеристикам. Не думал, что пересяду на китайский автопром, но сейчас гоняю и понимаю, что полностью доволен.',
        rate: 4.5
    },
    {
        id: 0,
        name: 'Марсель Исмагилов',
        plus: 'Cтиль, комфорт, управляемость',
        minus: 'Дорогой ремонт и обслуживание',
        comment: 'Дизайн отличный, управление просто шикарно, ощущения за рулём такой машины особые. Но ремонт очень дорогой. Пару месяцев назад пришлось менять двигатель. По стоимости вышло как новый автомобиль. Так что, если покупать эту машину, надо быть готовым к большим расходам на обслуживание.',
        rate: 4.5
    }];


    // Событие нажатия на одну из звезд рейтинга;

    for(let i = 0; i < RATE_STARS.length; i++) {
        RATE_STARS[i].addEventListener('click', function(evt) {
            addStar(evt, i);
        });
    }

    // Основная функция которая заштриховывает активные звезды в блоке рейтинга;

    function addStar(evt, num) {
        let currentStar = evt.target;

        checkAllStars(num); // проверка всех звезд кроме текущей;

        // Проверка значения текущей звезды;

        if(currentStar.dataset.rate == 1) {
            setHalfStar(currentStar);
        }

        else {
            setFullStar(currentStar);
        }
        //=====================================================================
        // Подфункция закрашивания звезды;

        function setFullStar(elem) {
            if(elem.previousSibling.nodeName == "SOURCE") {
                elem.previousSibling.srcset = './img/full.webp';
            }
        
            elem.src = './img/full.png';
            elem.dataset.rate = '1';
            elem.width = 28;
            elem.height = 28;
        }

        // Подфункция закрашивания половины звезды;

        function setHalfStar(elem) {
            if(elem.previousSibling.nodeName == "SOURCE") {
                elem.previousSibling.srcset = './img/half.webp';
            }
        
            elem.src = './img/half.png';
            elem.dataset.rate = '0.5';
            elem.width = 28;
            elem.height = 28;
        }

        // Подфункция очищающая застрихованную звезду;

        function setEmptyStar(elem) {
            if(elem.previousSibling.nodeName == "SOURCE") {
                elem.previousSibling.srcset = './img/empty.webp';
            }
        
            elem.src = './img/empty.png';
            elem.dataset.rate = '0';
            elem.width = 28;
            elem.height = 28;
        }

        // Подфункция перебирающая все звезды вокруг текущей и назначающая им штриховку или пустоту;

        function checkAllStars(num) {
            for(let i = 0; i < RATE_STARS.length; i++) {
                if(i < num) {
                    setFullStar(RATE_STARS[i]);
                }
                else if(i > num) {
                    setEmptyStar(RATE_STARS[i]);
                }
            }
        }
    }

    //===================================================================================================
    // Запускает основные функции для генерации 2 стандартных отзывов и всех отзывов которые есть в localStorage;
    //===================================================================================================

    addDefaultBlockToWeb(); // Парсит на страницу 2 дефолтных отзыва;
    addNewFeedback(); // Парсит все что есть в localStorage;

    // Событие нажатия на кнопку отправки отзыва
    FEED_SEND_BTN.addEventListener('click', function() {
        if(checkNecessaryInputs()) {   // Проверяет заполнены ли все обязательные поля;
            addDataToLocalStorage();  // Данные из полей формы добавляются в localStorage;
            addNewFeedback();         // Парсит все что есть в localStorage;
            window.modal.cleanFormAfterSendFunc();     // Очищает форму отправки и закрывает модальное окно;
        }
    });

    // Функция парсит на страницу все что есть в массиве localArr (деволтные отзывы);

    function addDefaultBlockToWeb() {
        for(let i = 0; i < localArr.length; i++) {
            createFeedbackBlock(localArr[i]);
        }
    }

    // Функция проверки обязательных полей в форме отправки;

    function checkNecessaryInputs() {
        let check;
        let red = '1px red solid';
        let black = '1px solid rgba(72, 73, 77, 0.2)';
        let errorForName = FEED_NAME.previousElementSibling;
        let errorForComment  = FEED_COMMENT.previousElementSibling;

        if(FEED_NAME.value == '' && FEED_COMMENT.value == '') {
            check = false;
            getError(FEED_NAME, red, errorForName, 'visible');
            getError(FEED_COMMENT, red, errorForComment, 'visible');
        }
        else if(FEED_NAME.value == '') {
            check = false;
            getError(FEED_NAME, red, errorForName, 'visible');
            getError(FEED_COMMENT, black, errorForComment, 'hidden');
        }
        else if(FEED_COMMENT.value == '') {
            check = false;
            getError(FEED_COMMENT, red, errorForComment, 'visible');
            getError(FEED_NAME, black, errorForName, 'hidden');
        }
        else {
            check = true;
            getError(FEED_NAME, black, errorForName, 'hidden');
            getError(FEED_COMMENT, black, errorForComment, 'hidden');
        }

        // Подфункция назначающая цвет бордера для обязательного поля, 
        // а также отображающая или скрывающая предупреждение;

        function getError(elem, color, errorText, prop) {
            elem.style.border = color;
            errorText.style.visibility = prop;
        }

        return check;
    }

    // Функция наполнения массива с отзывами, создает новый объект в массиве;

    function addDataToStorage() {
        let newFeedback = {};

        newFeedback.id = localStorage.length + 1;
        newFeedback.name = FEED_NAME.value;
        newFeedback.plus = FEED_PLUS.value;
        newFeedback.minus = FEED_MINUS.value;
        newFeedback.comment = FEED_COMMENT.value;
        newFeedback.rate = getRate();

        // Подфункция которая считает выбранный рейтинг и возвращает значение рейтинга для объекта-отзыва;

        function getRate() {
            let result = 0;

            for(let i = 0; i < RATE_STARS.length; i++) {
                result += Number(RATE_STARS[i].dataset.rate);
            }

            return result;
        }

        return newFeedback;
    }

    // Функция помещает данные в localStorage;

    function addDataToLocalStorage() {
        let newFeedback = addDataToStorage();

        localStorage.setItem(newFeedback.id, JSON.stringify(newFeedback));
    }

    // Функция конструктор блока отзывов;

    function createFeedbackBlock(obj) {
        let cloneBlock = FEEDBACK_PATTERN.cloneNode(true);
        let FEED_NAME = cloneBlock.children[0];
        let FEED_PLUS = cloneBlock.children[1].children[2];
        let FEED_MINUS = cloneBlock.children[2].children[2];
        let FEED_COMMENT = cloneBlock.children[3].children[1];
        let feedRateBlock = cloneBlock.children[4];
        let feedAnswerBtn = cloneBlock.children[5].children[1];
        let sendBtn = cloneBlock.children[6].children[1];
        let closeBtn = cloneBlock.children[6].children[2];

        cloneBlock.classList.remove('feedback__block-hidden');
        cloneBlock.dataset.id = obj.id;
        FEED_NAME.textContent = obj.name;
        FEED_PLUS.textContent = obj.plus;
        FEED_MINUS.textContent = obj.minus;
        FEED_COMMENT.textContent = obj.comment;
        feedRateBlock.append(generateRate(obj.rate));
        feedAnswerBtn.addEventListener('click', function(evt) { // Вешает событие на кнопку "ответить" под отзывом;
            expandAnswerBlock(evt);
        });

        closeBtn.addEventListener('click', function(evt) { // Вешает событие на кнопку закрыть в блоке ответа;
            hideAnswerBlock(evt, 'close');
            });

        sendBtn.addEventListener('click', function(evt) { // Вешает событие на кнопку отправить в блоке ответа;
            checkAnswer(evt);
            });

        FEEDBACK_MAIN_BLOCK.append(cloneBlock);
    }

    // Функция проверяет есть ли отзыв на странице по data-id в блоке и id из localStorage.id;

    function checkId(obj) {
        let result = false;
        for(let i = 3; i < FEEDBACK_MAIN_BLOCK.children.length; i++) {
            if(obj.id != null) {
                if(FEEDBACK_MAIN_BLOCK.children[i].dataset.id == obj.id) {
                    result = true;
                }
            }
        }
        return result;
    }

    // Функция добавляет отзыв на страницу;

    function addNewFeedback() {
        for(let i = 1; i <= localStorage.length; i++) {
            let currentFeedback = JSON.parse(localStorage.getItem(i));

            if(!checkId(currentFeedback)) {   //Проверка на дубли, если отзыва нет на странице то парсить;
                createFeedbackBlock(currentFeedback);
            }
        }
    }

    // Функция наполняющая блок рейтинга нужными картинками звезд;

    function generateRate(rate) {
        let star = rate;
        let block = document.createElement('div');

        for(let i = 0; i < 5; i++) {
            let picture = document.createElement('picture');
            let source = document.createElement('source');
            let img = document.createElement('img');

            source.type = 'image/webp';
            img.alt = 'star';
            img.width = 28;
            img.height = 28;
            img.classList.add('feedback__red-star');

            if(star >= 1) {
                source.srcset = './img/full.webp';
                img.src = './img/full.png';
                img.width = 28;
                img.height = 28;
                star -= 1;
            }
            else if(star == 0.5) {
                source.srcset ='./img/half.webp';
                img.src = './img/half.png';
                img.width = 28;
                img.height = 28;
                star -= 1;
            }
            else {
                source.srcset = './img/empty.webp';
                img.src = './img/empty.png';
                img.width = 28;
                img.height = 28;
            }
        
            picture.append(source);
            picture.append(img);
            block.append(picture);
        }

        // Подфункция создает строку с рекомендацией и выводит ее в зависимости от рейтинга, выше 3;

        function getWouldAdvice(rate) {  
            let span = document.createElement('span');
            if(rate > 3) {
                span.classList.add('feedback__advice');
                span.innerHTML = 'Советует';
            }
            return span;
        }

        block.append(getWouldAdvice(rate));

        return block;
    }



    // =================================================================================================
    // Скрипт для кнопки ответить
    // =================================================================================================

    // Функция раскрывающая блок для введения ответа на отзыв;

    function expandAnswerBlock(evt) {
        let currentAnswerBlock = evt.target.parentElement.nextElementSibling;
        let answerBtn = currentAnswerBlock.querySelector('.feedback__answer-btn');
        let textArea = evt.target.parentElement.nextElementSibling.children[0];

        currentAnswerBlock.style.animationName = 'expandAnswer';
        currentAnswerBlock.style.animationPlayState = 'running';
        currentAnswerBlock.style.display = 'block';
        textArea.style.border = '1px solid black';

        
        setTimeout(function() {
            answerBtn.style.visibility = 'visible';
        }, 800);
    }

    // Функция скрывает блок для введения ответа на отзыв, принимает событие нажатия на объект и аргумент кем именно данный объект является
    // (Кнопка 'закрыть' или 'отправить')

    function hideAnswerBlock(evt, elem) {
        let currentAnswerBlock;
        if(elem == 'close') {
            currentAnswerBlock = evt.target.parentElement.parentElement.parentElement;
        }
        else {
            currentAnswerBlock = evt.target.parentElement;
        }

         
        let answerBtn = currentAnswerBlock.querySelector('.feedback__answer-btn');

        currentAnswerBlock.style.animationName = 'hideAnswer';
        currentAnswerBlock.style.animationPlayState = 'running';
        answerBtn.style.visibility = 'hidden';

        setTimeout(function() {
            currentAnswerBlock.style.display= 'none';
        }, 900);
    }

    // Функция проверяет было ли заполнено поле ответа;

    function checkAnswer(evt) {
        evt.preventDefault();
        let textArea = evt.target.parentElement.children[0];
        

        if(textArea.value == '') {
            textArea.style.border = '2px solid red';
        }
        else {
            textArea.style.border = '1px solid black';
            textArea.value = '';
            hideAnswerBlock(evt);
            getModerateMessage();
        }
    }

    // Функция выдает окно "Ответ на модерации";

    function getModerateMessage() {
        MODERATE_MESSAGE_WINDOW.style.display = 'flex';

        setTimeout(function() {
            MODERATE_MESSAGE_WINDOW.style.display = 'none';
        }, 3000);
    }
    
}()); // Реализация добавления отзывов;
function initMap() {
    // The location of Uluru
    var uluru = {lat: 59.968368, lng: 30.317514};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.querySelector('.contact__map'), {zoom: 15, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
} // Скрипт для отображения google maps;