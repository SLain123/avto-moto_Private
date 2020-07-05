(function refresh() {
    let currentWidth = document.documentElement.clientWidth;
    let mainWidth = document.documentElement.clientWidth;

    setInterval(function() {
        currentWidth = document.documentElement.clientWidth;
        let check = mainWidth - currentWidth;

        if(check > 25 || check < -25) {
                mainWidth = document.documentElement.clientWidth;
                window.location.reload();
        }
    }, 1000);
}());