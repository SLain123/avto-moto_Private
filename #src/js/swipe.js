(function swipe() { 
    const BTN_BLOCK = document.querySelector('.product-description__control-block');
    const BTNS = BTN_BLOCK.children;
    const MAIN_WIDTH = document.documentElement.clientWidth;

    BTN_BLOCK.addEventListener('touchstart', handleTouchStart, false);  
    BTN_BLOCK.addEventListener('touchmove', handleTouchMove, false);

    let xDown = null;                                                           

    function handleTouchStart(evt) {                                         
        xDown = evt.touches[0].clientX;                                      
    };                                                

    function handleTouchMove(evt) {
        if ( ! xDown) {
            return;
        }
        else if(MAIN_WIDTH > 500) {
            return;
        }

        let xUp = evt.touches[0].clientX;                                    

        let xDiff = xDown - xUp;
        
            if ( xDiff > 0 ) {
                for(let btn of BTNS) {
                    if(MAIN_WIDTH < 400) {
                        btn.style.transform = 'translateX(-270px)';
                    }
                    else btn.style.transform = 'translateX(-200px)';
                    
                }
            } else {
                for(let btn of BTNS) {
                    btn.style.transform = 'translateX(0)';
                }
            }                       
        xDown = null;                                          
    };
}());