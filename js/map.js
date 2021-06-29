$(window).on("load", function () {
    const branches = [
        [24.774255, 46.737586534],
        [24.874265, 46.73816],
        [23.774265, 46.73865445654],
        [24.774264, 46.7385454586],
        [24.775265, 46.586],
    ];
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: new google.maps.LatLng(24.774265, 46.738586),
    });
    const contentString =
        '<div class="branch">' +
        '<div class="branch-img">' +
        '<img src="images/services/01.jpg" class="img-fluid">' +
        '</div>' +
        '<div class="branch-info">' +
        '<h4 class="branch-name">' +
        'يسير - فرع الرياض' +
        '</h4>' +
        '<a href="tel:+966920000000" class="branch-contact">' +
        '<i class="fas fa-phone"></i>' +
        '+966920000000' +
        '</a>' +
        '<a href="mailto:info@yassirhub.com" class="branch-contact">' +
        '<i class="far fa-envelope"></i>' +
        'info@yassirhub.com' +
        '</a>' +
        '</div>' +
        "</div>";
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });

    for (let i = 0; i < branches.length; i++) {
        const branch = branches[i];
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(branch[0], branch[1]),
            map,
            icon: "images/pin.png"
        });
        marker.addListener("click", () => {
            infowindow.open(map, marker);
        });
    }
});

