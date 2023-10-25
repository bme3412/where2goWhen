function getCurrencySymbol(currencyCode) {
    switch (currencyCode) {
        case 'GBP': return '£';
        case 'EUR': return '€';
        case 'CZK': return 'Kč';
        // ... other currency codes
        default: return '$';  // Default to dollar symbol if currency code is not recognized
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const photoGrid = document.getElementById('photoGrid');
    const attractionPopup = document.getElementById('attractionPopup');

    photoGrid.addEventListener('click', (event) => {
        const gridItem = event.target.closest('.photo-grid-item');
        if (!gridItem) return; // Not clicked on a photo

        // Handle closing of popup if close button is clicked
        if (event.target.matches('.close-popup')) {
            attractionPopup.style.display = 'none';
            gridItem.classList.remove('clicked');
            const img = gridItem.querySelector('img');
            img.classList.remove('photo-animation');
            return;
        }
        if (gridItem.classList.contains('clicked')) {
            gridItem.classList.remove('clicked');
            const img = gridItem.querySelector('img');
            img.classList.remove('photo-animation');
        } else {
            gridItem.classList.add('clicked');
            const img = gridItem.querySelector('img');
            img.classList.add('photo-animation');

            // Make the popup a child of the clicked grid item
            gridItem.appendChild(attractionPopup);

            // ... Retrieve attraction data and update popup content
            const attraction = parisAttractions.find(attr => attr.image === img.getAttribute('src'));
            if (attraction) {
                document.getElementById('attractionName').innerText = attraction.name;
                document.getElementById('attractionPrice').innerText = attraction.price;
                document.getElementById('attractionHours').innerText = attraction.hours;
                document.getElementById('attractionAddress').innerText = attraction.address;
                document.getElementById('attractionMetro').innerText = attraction.metro;
            
                // Make the popup visible
                attractionPopup.style.display = 'flex';
            }
        }
    });



    const parisAttractions = [
        {
            name: 'Eiffel Tower',
            image: '/images/eiffel_tower.png',
            description: 'An iconic landmark of Paris.',
            price: '$25',
            hours: '9:30 AM - 11:00 PM',
            address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
            metro: 'Bir-Hakeim'
        },
        {
            name: 'Luxembourg Gardens',
            image: '/images/luxembourg_gardens.png',
            description: 'A serene place for both the locals and tourists, offering a peaceful retreat in the heart of Paris.',
            price: 'Free',
            hours: '7:30 AM - 9:30 PM',
            address: '75006 Paris, France',
            metro: 'Notre-Dame-des-Champs'
        },
        
        {
            name: 'Seine River Cruise',
            image: '/images/bateau_mouche.png',
            description: 'Enjoy the beauty of Paris from the river, cruising under numerous bridges while admiring the cityscape.',
            price: 'Varies',
            hours: 'Varies',
            address: 'Various locations along the Seine River',
            metro: 'Varies'
        },
        {
            name: 'Musée de la Vie Romantique',
            image: '/images/musee_vie_romantique.png',
            description: 'Dive into the romantic era of Paris through art and poetry in a unique setting with a pavilion.',
            price: 'Varies',
            hours: '10:00 AM - 6:00 PM',
            address: '16 Rue Chaptal, 75009 Paris, France',
            metro: 'Pigalle'
        },
        {
            name: 'Les Deux Magots',
            image: '/images/les_deux_magots.png',
            description: 'A popular café offering a taste of authentic French cuisine in a cozy setting.',
            price: 'Varies',
            hours: '7:30 AM - 1:00 AM',
            address: '6 Place Saint-Germain des Prés, 75006 Paris, France',
            metro: 'Saint-Germain-des-Prés'
        },
        {
            name: 'Palace of Versailles',
            image: '/images/versailles.png',
            description: 'A symbol of the absolute monarchy of the Ancien Régime, showcasing luxurious rooms and extensive gardens.',
            price: '€20',
            hours: '9:00 AM - 6:30 PM',
            address: 'Place d"Armes, 78000 Versailles, France',
            metro: 'RER C to Versailles Rive Gauche'
        },
        {
            name: 'Wall of Love',
            image: '/images/wall_of_love.png',
            description: 'A unique wall featuring "I Love You" written in over 250 languages, a popular spot for proposals.',
            price: 'Free',
            hours: 'Open 24 hours',
            address: 'Square Jehan Rictus, 75018 Paris, France',
            metro: 'Abbesses'
        },
        {
            name: 'Montmartre',
            image: '/images/montmartre.png',
            description: 'A historic and artistic neighborhood offering picturesque streets and a vibrant arts scene.',
            price: 'Free',
            hours: 'Open 24 hours',
            address: 'Montmartre, 75018 Paris, France',
            metro: 'Abbesses'
        },
    ];
    

    // Photo Grid
    function populateThingsToDo(cityName) {
        const attractionPopup = document.getElementById('attractionPopup');
        photoGrid.innerHTML = '';  // Clear any existing content
        
        if (cityName === 'Paris') {
            parisAttractions.forEach(attraction => {
                const gridItem = document.createElement('div');
                gridItem.classList.add('photo-grid-item');
                gridItem.innerHTML = `
                <img src="${attraction.image}" alt="${attraction.name || 'Attraction'}">`;

                gridItem.addEventListener('click', (event) => {
                    // Make the popup a child of the clicked grid item
                    gridItem.appendChild(attractionPopup);
                
                    // Update popup content
                    document.getElementById('attractionName').innerText = attraction.name;
                    document.getElementById('attractionPrice').innerText = attraction.price;
                    document.getElementById('attractionHours').innerText = attraction.hours;
                    document.getElementById('attractionAddress').innerText = attraction.address;
                    document.getElementById('attractionMetro').innerText = attraction.metro;
                
                    // Make the popup visible
                    attractionPopup.style.display = 'flex';
                });

                photoGrid.appendChild(gridItem);
            });
        }
        // ... handle other cities
    }
    
    const cities = [
        {
            name: 'London',
            population: '8.9 million',
            language: 'English',
            currency: 'GBP',
            weather: 'Temperate maritime climate',
            imageUrl: '/images/london.png'
        },
        {
            name: 'Paris',
            population: '9.9 million',
            language: 'French',
            currency: 'EUR',
            weather: 'rainy',
            imageUrl: '/images/paris.png'
        },
        {
            name: 'Berlin',
            population: '8.9 million',
            language: 'German',
            currency: 'EUR',
            weather: 'grungy',
            imageUrl: '/images/berlin.png'
        },
        {
            name: 'Madrid',
            population: '8.9 million',
            language: 'Spanish',
            currency: 'EUR',
            weather: 'Temperate maritime climate',
            imageUrl: '/images/madrid.png'
        },
        {
            name: 'Rome',
            population: '8.9 million',
            language: 'Italian',
            currency: 'EUR',
            weather: 'Temperate maritime climate',
            imageUrl: '/images/rome.png'
        },
        {
            name: 'Lisbon',
            population: '8.9 million',
            language: 'Portuguese',
            currency: 'EUR',
            weather: 'Temperate maritime climate',
            imageUrl: '/images/lisbon.png'
        },
        {
            name: 'Vienna',
            population: '8.9 million',
            language: 'German',
            currency: 'EUR',
            weather: 'Temperate maritime climate',
            imageUrl: 'images/vienna.png'
        },
        {
            name: 'Prague',
            population: '8.9 million',
            language: 'Czech',
            currency: 'CZK',
            weather: 'Temperate maritime climate',
            imageUrl: 'images/prague.png'
        },
        {
            name: 'Dublin',
            population: '8.9 million',
            language: 'English',
            currency: 'EUR',
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
        cardIconCurrency.textContent = getCurrencySymbol(city.currency);  // Utilize a function to convert currency code to symbol
        cardDetails.appendChild(cardIconCurrency);
    
            cardOverlay.appendChild(cardDetails);
            card.appendChild(cardOverlay);
    
            card.addEventListener('click', function() {
                cityNameEl.innerText = city.name;
                document.getElementById('modal-info').innerText = "Population: " + city.population;
                document.getElementById('modal-language').innerText = city.language;
                modal.style.display = 'block';
                populateThingsToDo(city.name);
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
        const modalContent = modal.querySelector('.modal-content');
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
            
            // Deactivate all tab contents
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
        // Deactivate all tab buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));

        // Activate the clicked tab content
        const targetContent = document.getElementById(button.dataset.target);
        targetContent.classList.add('active');
            
        // Activate the clicked tab button
        button.classList.add('active');

        if (button.dataset.target === 'modal-things-to-do') {
            modalContent.classList.add('expanded');  // Expand the modal when "Things to Do" tab is active
        } else {
            modalContent.classList.remove('expanded');  // Contract the modal when other tabs are active
        }
    });
});
document.querySelector('[data-target="modal-things-to-do"]').addEventListener('click', function() {
    document.getElementById('cityModal').querySelector('.modal-content').classList.add('expanded-modal-content');
});

// For other tabs, remove the expanded class
var otherTabs = document.querySelectorAll('.tab-button:not([data-target="modal-things-to-do"])');
for (let i = 0; i < otherTabs.length; i++) {
    otherTabs[i].addEventListener('click', function() {
        document.getElementById('cityModal').querySelector('.modal-content').classList.remove('expanded-modal-content');
    });
}

        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    
    });
    
    

    
        

    