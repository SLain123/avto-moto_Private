// localStorage.clear(); // для очистки localStorage надо раскоментировать;

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

const allInputs = document.querySelectorAll('.feed-window__column-one input');
const feedName = allInputs[0];
const feedPlus = allInputs[1];
const feedMinus = allInputs[2];
const feedComment = document.querySelector('.feed-window__column-two textarea');
const rateStars = document.querySelectorAll('.feed-window__rate img');
const feedSendBtn = document.querySelector('.feed-window__send-btn');
const feedbackMainBlock = document.querySelector('.feedback');
const feedbackPattern = document.querySelector('.feedback__block');


// Событие нажатия на одну из звезд рейтинга;

for(let i = 0; i < rateStars.length; i++) {
    rateStars[i].addEventListener('click', function() {
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
    }

    // Подфункция закрашивания половины звезды;

    function setHalfStar(elem) {
        if(elem.previousSibling.nodeName == "SOURCE") {
            elem.previousSibling.setAttribute('srcset', './img/half.webp');
        }
    
        elem.setAttribute('src', './img/half.png');
        elem.setAttribute('data-rate', '0.5');
    }

    // Подфункция очищающая застрихованную звезду;

    function setEmptyStar(elem) {
        if(elem.previousSibling.nodeName == "SOURCE") {
            elem.previousSibling.setAttribute('srcset', './img/empty.webp');
        }
    
        elem.setAttribute('src', './img/empty.png');
        elem.setAttribute('data-rate', '0');
    }

    // Подфункция перебирающая все звезды вокруг текущей и назначающая им штриховку или пустоту;

    function checkAllStars(num) {
        for(let i = 0; i < rateStars.length; i++) {
            if(i < num) {
                setFullStar(rateStars[i]);
            }
            else if(i > num) {
                setEmptyStar(rateStars[i]);
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
feedSendBtn.addEventListener('click', function() {
    if(checkNecessaryInputs()) {   // Проверяет заполнены ли все обязательные поля;
        addDataToLocalStorage();  // Данные из полей формы добавляются в localStorage;
        addNewFeedback();         // Парсит все что есть в localStorage;
        cleanFormAfterSend();     // Очищает форму отправки и закрывает модальное окно;
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
    let errorForName = feedName.previousElementSibling;
    let errorForComment  = feedComment.previousElementSibling;

    if(feedName.value == '' && feedComment.value == '') {
        check = false;
        getError(feedName, red, errorForName, 'visible');
        getError(feedComment, red, errorForComment, 'visible');
    }
    else if(feedName.value == '') {
        check = false;
        getError(feedName, red, errorForName, 'visible');
        getError(feedComment, black, errorForComment, 'hidden');
    }
    else if(feedComment.value == '') {
        check = false;
        getError(feedComment, red, errorForComment, 'visible');
        getError(feedName, black, errorForName, 'hidden');
    }
    else {
        check = true;
        getError(feedName, black, errorForName, 'hidden');
        getError(feedComment, black, errorForComment, 'hidden');
    }

    // Подфункция назначающая цвет бордера для обязательного поля, 
    // а также отображающая или скрывающая предупреждение;

    function getError(elem, color, errorText, prop) {
        elem.style.border = color;
        errorText.style.visibility = prop;
    }

    return check;
}

// Функция очистки формы и скрытия модального окна;

function cleanFormAfterSend() {
    feedName.value = '';
    feedPlus.value = '';
    feedMinus.value = '';
    feedComment.value = '';

    // Подункция обнуления выбранных звезд в модальном окне написания отзывов

    function cleanStar() {
        for(let i = 0; i < rateStars.length; i++) {
            rateStars[i].setAttribute('src', './img/empty.png');
            rateStars[i].previousElementSibling.setAttribute('srcset', './img/empty.webp');
        }
}
    cleanStar();
    hideModalWindow();
}

// Функция наполнения массива с отзывами, создает новый объект в массиве;

function addDataToStorage() {
    let newFeedback = {};

    newFeedback.id = localStorage.length + 1;
    newFeedback.name = feedName.value;
    newFeedback.plus = feedPlus.value;
    newFeedback.minus = feedMinus.value;
    newFeedback.comment = feedComment.value;
    newFeedback.rate = getRate();

    // Подфункция которая считает выбранный рейтинг и возвращает значение рейтинга для объекта-отзыва;

    function getRate() {
        let result = 0;

        for(let i = 0; i < rateStars.length; i++) {
            result += Number(rateStars[i].getAttribute('data-rate'));
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
    let cloneBlock = feedbackPattern.cloneNode(true);
    let feedName = cloneBlock.children[0];
    let feedPlus = cloneBlock.children[1].children[2];
    let feedMinus = cloneBlock.children[2].children[2];
    let feedComment = cloneBlock.children[3].children[1];
    let feedRateBlock = cloneBlock.children[4];
    let feedAnswerBtn = cloneBlock.children[5].children[1];

    cloneBlock.classList.remove('feedback__block-hidden');
    cloneBlock.setAttribute('data-id', obj.id);
    feedName.innerHTML = obj.name;
    feedPlus.innerHTML = obj.plus;
    feedMinus.innerHTML = obj.minus;
    feedComment.innerHTML = obj.comment;
    feedRateBlock.append(generateRate(obj.rate));
    feedAnswerBtn.addEventListener('click', function() { // Вешает событие на кнопку "ответить" под отзывом;
        expandAnswerBlock(event);
    });

    feedbackMainBlock.append(cloneBlock);
}

// Функция проверяет есть ли отзыв на странице по data-id в блоке и id из localStorage.id;

function checkId(obj) {
    let result = false;
    for(let i = 3; i < feedbackMainBlock.children.length; i++) {
        if(obj.id != null) {
            if(feedbackMainBlock.children[i].getAttribute('data-id') == obj.id) {
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
        img.classList.add('feedback__red-star');

        if(star >= 1) {
            source.setAttribute('srcset', './img/full.webp');
            img.setAttribute('src', './img/full.png');
            star -= 1;
        }
        else if(star == 0.5) {
            source.setAttribute('srcset', './img/half.webp');
            img.setAttribute('src', './img/half.png');
            star -= 1;
        }
        else {
            source.setAttribute('srcset', './img/empty.webp');
            img.setAttribute('src', './img/empty.png');
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

const mainAnswerBtn = document.querySelectorAll('.feedback__answer-link');
const answerBlock = document.querySelectorAll('.feedback__answer');
const closeAnswerBtn = document.querySelectorAll('.feedback__answer-close-btn');
const sendAnswerBtn = document.querySelectorAll('.feedback__answer-btn');
const modarateMessageWindow = document.querySelector('.feedback__modarate-message');



// Функция раскрывающая блок для введения ответа на отзыв + вешает событие на кнопки 'закрыть' и 'отправить';

function expandAnswerBlock(event) {
    let currentAnswerBlock = event.target.parentElement.nextElementSibling;
    let answerBtn = currentAnswerBlock.querySelector('.feedback__answer-btn');
    let closeBtn = event.target.parentElement.nextElementSibling.children[2];
    let sendBtn = event.target.parentElement.nextElementSibling.children[1];
    let textArea = event.target.parentElement.nextElementSibling.children[0];

    currentAnswerBlock.style.animationName = 'expandAnswer';
    currentAnswerBlock.style.animationPlayState = 'running';
    currentAnswerBlock.style.display = 'block';
    textArea.style.border = '1px solid black';

    closeBtn.addEventListener('click', function() { // Вешает событие на кнопку закрыть в блоке ответа;
        hideAnswerBlock(event);
        });

    sendBtn.addEventListener('click', function() { // Вешает событие на кнопку отправить в блоке ответа;
        checkAnswer(event);
        });
    
    setTimeout(function() {
        answerBtn.style.visibility = 'visible';
    }, 800);
}

// Функция скрывает блок для введения ответа на отзыв, принимает событие нажатия на объект и аргумент кем именно данный объект является
// (Кнопка 'закрыть' или 'отправить')

function hideAnswerBlock(event, when) {
    let currentAnswerBlock = event.target.parentElement.nextElementSibling;
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
    let textArea = event.target.parentElement.nextElementSibling.children[0];

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
    modarateMessageWindow.style.display = 'flex';

    setTimeout(function() {
        modarateMessageWindow.style.display = 'none';
    }, 3000);
}
