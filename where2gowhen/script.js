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
            imageUrl: '/images/berlin.png'
        },
        {
            name: 'Madrid',
            population: '8.9 million',
            language: 'Spanish',
            weather: 'Temperate maritime climate',
            imageUrl: '/images/madrid.png'
        },
        {
            name: 'Rome',
            population: '8.9 million',
            language: 'Italian',
            weather: 'Temperate maritime climate',
            imageUrl: '/images/rome.png'
        },
        {
            name: 'Lisbon',
            population: '8.9 million',
            language: 'Portuguese',
            weather: 'Temperate maritime climate',
            imageUrl: '/images/lisbon.png'
        },
        {
            name: 'Vienna',
            population: '8.9 million',
            language: 'German',
            weather: 'Temperate maritime climate',
            imageUrl: 'images/vienna.png'
        },
        {
            name: 'Prague',
            population: '8.9 million',
            language: 'Czech',
            weather: 'Temperate maritime climate',
            imageUrl: 'images/prague.png'
        },
        {
            name: 'Dublin',
            population: '8.9 million',
            language: 'English',
            weather: 'Temperate maritime climate',
            imageUrl: 'images/dublin.png'
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
    
            cardOverlay.appendChild(cardDetails);
            card.appendChild(cardOverlay);
    
            card.addEventListener('click', function() {
                cityNameEl.innerText = city.name;
                document.getElementById('modal-info').innerText = "Population: " + city.population;
                document.getElementById('modal-language').innerText = city.language;
                modal.style.display = 'block';
            });
    
            cardsContainer.appendChild(card);
        }
    
        const clearFilterButton = document.getElementById('clearFilterButton');
    
        // Logic for filtering the cities based on language selection
        const languageFilter = document.getElementById('languageFilter');
        languageFilter.addEventListener('change', function() {
            const selectedLanguage = languageFilter.value;
    
            if (selectedLanguage === 'all') {
                document.querySelectorAll('.card').forEach(card => card.style.display = 'block');
                clearFilterButton.style.display = 'none';  // hide the clear filter button
                clearFilterButton.style.marginLeft = '0';
            } else {
                document.querySelectorAll('.card').forEach(card => {
                    if (card.dataset.language === selectedLanguage) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
                clearFilterButton.style.display = 'inline-block';  // show the clear filter button
                clearFilterButton.style.marginLeft = '10px';
            }
        });
    
        // Reset the language filter to "all" when the clear filter button is clicked
        clearFilterButton.addEventListener('click', function() {
            languageFilter.value = 'all';
            clearFilterButton.style.display = 'none';  // hide the clear filter button
            document.querySelectorAll('.card').forEach(card => card.style.display = 'block');  // show all cards
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
    
    

    
        

    