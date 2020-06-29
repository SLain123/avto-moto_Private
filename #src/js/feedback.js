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
        RATE_STARS[i].addEventListener('click', function() {
            addStar(event, i);
        });
    }

    // Основная функция которая заштриховывает активные звезды в блоке рейтинга;

    function addStar(event, num) {
        let currentStar = event.target;

        checkAllStars(num); // проверка всех звезд кроме текущей;

        // Проверка значения текущей звезды;
        if(currentStar.getAttribute('src') == './img/full.png') {
            setHalfStar(currentStar);
        }

        else {
            setFullStar(currentStar);
        }
        //=====================================================================
        // Подфункция закрашивания звезды;

        function setFullStar(elem) {
            if(elem.previousSibling.nodeName == "SOURCE") {
                elem.previousSibling.setAttribute('srcset', './img/full.webp');
            }
        
            elem.setAttribute('src', './img/full.png');
            elem.setAttribute('data-rate', '1');
            elem.setAttribute('width', '28');
            elem.setAttribute('height', '28');
        }

        // Подфункция закрашивания половины звезды;

        function setHalfStar(elem) {
            if(elem.previousSibling.nodeName == "SOURCE") {
                elem.previousSibling.setAttribute('srcset', './img/half.webp');
            }
        
            elem.setAttribute('src', './img/half.png');
            elem.setAttribute('data-rate', '0.5');
            elem.setAttribute('width', '28');
            elem.setAttribute('height', '28');
        }

        // Подфункция очищающая застрихованную звезду;

        function setEmptyStar(elem) {
            if(elem.previousSibling.nodeName == "SOURCE") {
                elem.previousSibling.setAttribute('srcset', './img/empty.webp');
            }
        
            elem.setAttribute('src', './img/empty.png');
            elem.setAttribute('data-rate', '0');
            elem.setAttribute('width', '28');
            elem.setAttribute('height', '28');
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
                result += Number(RATE_STARS[i].getAttribute('data-rate'));
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
        cloneBlock.setAttribute('data-id', obj.id);
        FEED_NAME.textContent = obj.name;
        FEED_PLUS.textContent = obj.plus;
        FEED_MINUS.textContent = obj.minus;
        FEED_COMMENT.textContent = obj.comment;
        feedRateBlock.append(generateRate(obj.rate));
        feedAnswerBtn.addEventListener('click', function() { // Вешает событие на кнопку "ответить" под отзывом;
            expandAnswerBlock(event);
        });

        closeBtn.addEventListener('click', function() { // Вешает событие на кнопку закрыть в блоке ответа;
            hideAnswerBlock(event, 'close');
            });

        sendBtn.addEventListener('click', function() { // Вешает событие на кнопку отправить в блоке ответа;
            checkAnswer(event);
            });

        FEEDBACK_MAIN_BLOCK.append(cloneBlock);
    }

    // Функция проверяет есть ли отзыв на странице по data-id в блоке и id из localStorage.id;

    function checkId(obj) {
        let result = false;
        for(let i = 3; i < FEEDBACK_MAIN_BLOCK.children.length; i++) {
            if(obj.id != null) {
                if(FEEDBACK_MAIN_BLOCK.children[i].getAttribute('data-id') == obj.id) {
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

            source.setAttribute('type', 'image/webp');
            img.setAttribute('alt', 'star');
            img.setAttribute('width', '28');
            img.setAttribute('height', '28');
            img.classList.add('feedback__red-star');

            if(star >= 1) {
                source.setAttribute('srcset', './img/full.webp');
                img.setAttribute('src', './img/full.png');
                img.setAttribute('width', '28');
                img.setAttribute('height', '28');
                star -= 1;
            }
            else if(star == 0.5) {
                source.setAttribute('srcset', './img/half.webp');
                img.setAttribute('src', './img/half.png');
                img.setAttribute('width', '28');
                img.setAttribute('height', '28');
                star -= 1;
            }
            else {
                source.setAttribute('srcset', './img/empty.webp');
                img.setAttribute('src', './img/empty.png');
                img.setAttribute('width', '28');
                img.setAttribute('height', '28');
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

    function expandAnswerBlock(event) {
        let currentAnswerBlock = event.target.parentElement.nextElementSibling;
        let answerBtn = currentAnswerBlock.querySelector('.feedback__answer-btn');
        let textArea = event.target.parentElement.nextElementSibling.children[0];

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

    function hideAnswerBlock(event, elem) {
        let currentAnswerBlock;
        if(elem == 'close') {
            currentAnswerBlock = event.target.parentElement.parentElement.parentElement;
        }
        else {
            currentAnswerBlock = event.target.parentElement;
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

    function checkAnswer(event) {
        event.preventDefault();
        let textArea = event.target.parentElement.children[0];
        

        if(textArea.value == '') {
            textArea.style.border = '2px solid red';
        }
        else {
            textArea.style.border = '1px solid black';
            textArea.value = '';
            hideAnswerBlock(event);
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
    
}()