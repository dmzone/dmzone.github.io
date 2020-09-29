window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = '﹖';

    let places = staticLoadPlaces();
    renderPlaces(places);
    //
    setInterval(function () {
        var x = document.getElementById('phoneCoords');

        function getLocation() {
            if (navigator.geolocation) {
                var pos = navigator.geolocation.getCurrentPosition();
                x.innerHTML = "Latitude: " + position.coords.latitude +
                    "<br>Longitude: " + position.coords.longitude;
            } else {
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }
    }, 1000);
};

function staticLoadPlaces() {
    return [{
        name: 'Pokèmon',
        location: {
            lat: 42.692799,
            lng: 12.528937,
        },
    }, ];
}

var models = [{
        url: './assets/magnemite/scene.gltf',
        scale: '0.5 0.5 0.5',
        info: 'Magnemite, Lv. 5, HP 10/10',
        rotation: '0 180 0',
        sound: './assets/magnemite/sound/_sound.mp3'
    },
    {
        url: './assets/articuno/scene.gltf',
        scale: '0.2 0.2 0.2',
        rotation: '0 180 0',
        info: 'Articuno, Lv. 80, HP 100/100',
        sound: './assets/articuno/sound/_sound.mp3'
    },
    {
        url: './assets/dragonite/scene.gltf',
        scale: '0.08 0.08 0.08',
        rotation: '0 180 0',
        info: 'Dragonite, Lv. 99, HP 150/150',
        url: './assets/dragonite/sound/_sound.mp3',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }
    /* 
        if (model.rotation) {
            entity.setAttribute('rotation', model.rotation);
        } */

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('look-at', '[gps-camera]');
    console.log('entity full: ', entity);
    console.log('entity look-at: ', entity['look-at']);

    entity.setAttribute('gltf-model', model.url);
    entity.setAttribute('look-at', '[gps-camera]');

    entity.setAttribute('sound', )

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}