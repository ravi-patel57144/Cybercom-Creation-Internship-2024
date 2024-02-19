document.getElementById('getCatImages').addEventListener('click', function () {
    //Using XMLHttpRequest
    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', 'https://api.thecatapi.com/v1/images/search?limit=10', true);
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState == 4 && xhr.status == 200) {
    //         var response = JSON.parse(xhr.responseText);
    //         displayCatImages(response);
    //     }
    // };
    // xhr.send();

    //Using Fetch
    fetch('https://api.thecatapi.com/v1/images/search?limit=10')
        .then(response => response.json())
        .then(images => displayCatImages(images))
        .catch(error => console.error('Error fetching cat images:', error));
}

);

function displayCatImages(images) {
    var catImagesDiv = document.getElementById('catImages');
    catImagesDiv.innerHTML = '';
    images.forEach(function (image) {
        var card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4');

        var img = document.createElement('img');
        img.src = image.url;
        img.classList.add('card-img-top', 'img-fluid');
        img.alt = 'Cat Image';

        card.appendChild(img);
        catImagesDiv.appendChild(card);
    });
}
