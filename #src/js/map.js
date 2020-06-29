function initMap() {
    // The location of Uluru
    var uluru = {lat: 59.968368, lng: 30.317514};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.querySelector('.contact__map'), {zoom: 15, center: uluru});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
}