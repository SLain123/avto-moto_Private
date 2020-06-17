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
        addStar(event, i)
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

// localStorage.clear(); // для очистки localStorage надо раскоментировать;

// Событие нажатия на кнопку отправки отзыва
feedSendBtn.addEventListener('click', function() {
    addDataToLocalStorage();  // Данные из полей формы добавляются в localStorage;
    addNewFeedback();         // Парсит все что есть в localStorage;
    cleanFormAfterSend();     // Очищает форму отправки и закрывает модальное окно;
});

// Функция парсит на страницу все что есть в массиве localArr (деволтные отзывы);

function addDefaultBlockToWeb() {
    for(let i = 0; i < localArr.length; i++) {
        createFeedbackBlock(localArr[i]);
    }
}

// Функция очистки формы и скрытия модального окна;

function cleanFormAfterSend() {
    feedName.value = '';
    feedPlus.value = '';
    feedMinus.value = '';
    feedComment.value = '';

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

    cloneBlock.classList.remove('feedback__block-hidden');
    cloneBlock.setAttribute('data-id', obj.id);
    feedName.innerHTML = obj.name;
    feedPlus.innerHTML = obj.plus;
    feedMinus.innerHTML = obj.minus;
    feedComment.innerHTML = obj.comment;

    feedbackMainBlock.append(cloneBlock);
}

// Функция проверяет есть ли отзыв на странице по data-id в блоке и id из localStorage.id;

function checkId(obj) {
    let result = false;
    for(let i = 3; i < feedbackMainBlock.children.length; i++) {
            if(feedbackMainBlock.children[i].getAttribute('data-id') == obj.id) {
                result = true;
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




