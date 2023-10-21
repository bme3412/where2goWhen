document.addEventListener('DOMContentLoaded', function() {
    const cities = [
        {
            name: 'London',
            population: '8.9 million',
            language: 'English',
            weather: 'Temperate maritime climate',
            imageUrl: '/images/london.png'
        },
        {
            name: 'Paris',
            population: '9.9 million',
            language: 'French',
            weather: 'rainy',
            imageUrl: '/images/paris.png'
        },
        {
            name: 'Berlin',
            population: '8.9 million',
            language: 'German',
            weather: 'grungy',
            imageUrl: 'path_to_london_image.jpg'
        },
        {
            name: 'Madrid',
            population: '8.9 million',
            language: 'Spanish',
            weather: 'Temperate maritime climate',
            imageUrl: 'path_to_london_image.jpg'
        },
        {
            name: 'Rome',
            population: '8.9 million',
            language: 'Italian',
            weather: 'Temperate maritime climate',
            imageUrl: 'path_to_london_image.jpg'
        },
        {
            name: 'Lisbon',
            population: '8.9 million',
            language: 'English',
            weather: 'Temperate maritime climate',
            imageUrl: 'path_to_london_image.jpg'
        },
        {
            name: 'Vienna',
            population: '8.9 million',
            language: 'English',
            weather: 'Temperate maritime climate',
            imageUrl: 'path_to_london_image.jpg'
        },
        {
            name: 'Prague',
            population: '8.9 million',
            language: 'English',
            weather: 'Temperate maritime climate',
            imageUrl: 'path_to_london_image.jpg'
        },
        {
            name: 'Dublin',
            population: '8.9 million',
            language: 'English',
            weather: 'Temperate maritime climate',
            imageUrl: 'path_to_london_image.jpg'
        },

        /* ... add similar data structures for other cities ... */
    ];

    const cardsContainer = document.getElementById('cardsContainer');
    const modal = document.getElementById('cityModal');
    const closeModal = document.getElementById('closeBtn');
    const cityNameEl = document.getElementById('cityName');

    for (let city of cities) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.backgroundImage = `url('${city.imageUrl}')`;
        card.dataset.language = city.language;

        const cardOverlay = document.createElement('div');
        cardOverlay.classList.add('card-overlay');

        const cardName = document.createElement('h2');
        cardName.textContent = city.name;
        cardOverlay.appendChild(cardName);

        const cardDetails = document.createElement('div');
        cardDetails.classList.add('card-details');

        const cardIconCurrency = document.createElement('div');
        cardIconCurrency.classList.add('card-icon');
        cardIconCurrency.textContent = '£';
        cardDetails.appendChild(cardIconCurrency);

        const cardIconWeather = document.createElement('div');
        cardIconWeather.classList.add('card-icon');
        cardIconWeather.textContent = '☁️';
        cardDetails.appendChild(cardIconWeather);

        cardOverlay.appendChild(cardDetails);
        card.appendChild(cardOverlay);

        card.addEventListener('click', function() {
            cityNameEl.innerText = city.name;
            document.getElementById('modal-info').innerText = "Population: " + city.population;
            document.getElementById('modal-weather').innerText = "Currently: " + city.weather;
            document.getElementById('modal-language').innerText = city.language;
            modal.style.display = 'block';
        });

        cardsContainer.appendChild(card);
    }

    // Logic for filtering the cities based on language selection
    const languageFilter = document.getElementById('languageFilter');
    languageFilter.addEventListener('change', function() {
        const selectedLanguage = languageFilter.value;

        if (selectedLanguage === 'all') {
            document.querySelectorAll('.card').forEach(card => card.style.display = 'block');
        } else {
            document.querySelectorAll('.card').forEach(card => {
                if (card.dataset.language === selectedLanguage) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    });

    // Logic for switching between tabs in the modal
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Deactivate all tab contents
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            // Deactivate all tab buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));

            // Activate the clicked tab content
            document.getElementById(button.dataset.target).classList.add('active');

            // Activate the clicked tab button
            button.classList.add('active');
        });
    });

    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

