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

