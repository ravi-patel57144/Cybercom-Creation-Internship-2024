document.getElementById('getCatImages').addEventListener('click', function () {
    fetch('https://api.thecatapi.com/v1/images/search?limit=10')
        .then(response => response.json())
        .then(images => displayCatImages(images))
        .catch(error => console.error('Error fetching cat images:', error));
});

function displayCatImages(images) {
    var catImagesDiv = document.getElementById('catImages');
    catImagesDiv.innerHTML = '';
    images.forEach(function (image) {
        var card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4', 'card');

        var img = document.createElement('img');
        img.src = image.url;
        img.classList.add('card-img-top', 'img-fluid');
        img.alt = 'Cat Image';

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('image-checkbox');

        card.appendChild(checkbox);
        card.appendChild(img);
        catImagesDiv.appendChild(card);
    });
}

document.getElementById('saveImages').addEventListener('click', function () {
    var selectedImages = [];
    var checkboxes = document.querySelectorAll('.image-checkbox:checked');
    checkboxes.forEach(function (checkbox) {
        var imageSrc = checkbox.nextElementSibling.src;
        if (!selectedImages.includes(imageSrc)) {
            selectedImages.push(imageSrc);
        }
    });
    if (selectedImages.length > 0) {
        var savedImages = JSON.parse(localStorage.getItem('catImages')) || [];
        var alreadySavedImages = [];
        selectedImages.forEach(function (src) {
            if (!savedImages.includes(src)) {
                savedImages.push(src);
            } else {
                alreadySavedImages.push(src);
            }
        });
        localStorage.setItem('catImages', JSON.stringify(savedImages));
        if (alreadySavedImages.length > 0) {
            alert('The following images were already saved: \n' + alreadySavedImages.join('\n'));
        } else {
            alert('Selected images saved successfully!');
        }
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
    } else {
        alert('Please select at least one image to save.');
    }
});

document.getElementById('viewSavedImages').addEventListener('click', function () {
    var savedImages = JSON.parse(localStorage.getItem('catImages')) || [];
    if (savedImages.length > 0) {
        var catImagesDiv = document.getElementById('catImages');
        catImagesDiv.innerHTML = '';
        savedImages.forEach(function (src) {
            var card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4', 'card');

            var img = document.createElement('img');
            img.src = src;
            img.classList.add('card-img-top', 'img-fluid');
            img.alt = 'Cat Image';

            card.appendChild(img);
            catImagesDiv.appendChild(card);
        });
        document.getElementById('backToImages').classList.remove('d-none');
        document.getElementById('getCatImages').classList.add('d-none');
        document.getElementById('saveImages').classList.add('d-none');
        document.getElementById('viewSavedImages').classList.add('d-none');
    } else {
        alert('No saved images found.');
    }
});

document.getElementById('backToImages').addEventListener('click', function () {
    document.getElementById('backToImages').classList.add('d-none');
    document.getElementById('getCatImages').classList.remove('d-none');
    document.getElementById('saveImages').classList.remove('d-none');
    document.getElementById('viewSavedImages').classList.remove('d-none');
    fetch('https://api.thecatapi.com/v1/images/search?limit=10')
        .then(response => response.json())
        .then(images => displayCatImages(images))
        .catch(error => console.error('Error fetching cat images:', error));
});