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
