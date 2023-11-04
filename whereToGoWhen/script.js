document.addEventListener('DOMContentLoaded', function() {
  loadIdeasContent();
  attachFilterButtonEvent();
});

function loadIdeasContent() {
  fetch('ideas.html')
    .then(response => response.text())
    .then(content => {
      document.querySelector('.ideas-content').innerHTML = content;
      populateDate();
      attachIdeaEventListeners();
      fetchDataAndDisplay();
    })
    .catch(error => {
      console.error('There was an error fetching the content:', error);
    });
}

function attachFilterButtonEvent() {
  const filterButton = document.getElementById('filterButton');
  const filtersContainer = document.querySelector('.filters-container');

  filterButton.addEventListener('click', function() {
    filtersContainer.classList.toggle('active');
  });

  // Hide filters when clicking outside of the filters container
  window.addEventListener('click', function(event) {
    if (!filterButton.contains(event.target) && filtersContainer.classList.contains('active')) {
      filtersContainer.classList.remove('active');
    }
  });
}

function populateDate() {
    // Get the current date
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    // Format the current date in the desired format: e.g., "October 28, 2023"
    const currentFormattedDate = `${monthNames[today.getMonth()]} ${dd}, ${yyyy}`;

    // Set the date for the "Today is" section
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        currentDateElement.textContent = currentFormattedDate;
    }

    // Get the number of months selected from the dropdown
    const monthsToAdd = parseInt(document.getElementById('monthSelection').value, 10);

    // Calculate the date "monthsToAdd" months from now, adjusting for the end of the month.
    const futureDate = new Date(yyyy, today.getMonth() + monthsToAdd, dd);
    // Check if the month rolled over unexpectedly due to adding months (e.g., Jan 31 + 1 month = Mar 03)
    if (futureDate.getDate() !== today.getDate()) {
        // Adjust to the last day of the previous month
        futureDate.setDate(0);
    }

    const futureDD = String(futureDate.getDate()).padStart(2, '0');
    const futureMM = String(futureDate.getMonth() + 1).padStart(2, '0'); 
    const futureYYYY = futureDate.getFullYear();

    // Format the future date in the format required for the date input
    const futureFormattedDate = `${futureYYYY}-${futureMM}-${futureDD}`;

    // Set the default date for the search container input
    const startDateElement = document.querySelector('input[aria-label="Start Date"]');
    if (startDateElement) {
        startDateElement.value = futureFormattedDate;
    }
}

function attachFilterEventListeners() {
  const filterButton = document.getElementById('filterButton'); // Make sure 'filterButton' is the correct ID for your button
  const filterWidget = document.querySelector('.filter-widget'); // Updated to the new class for the filters container

  // Hide filter content initially
  function hideFilterContent() {
    filterWidget.classList.add('deactivating');
    setTimeout(() => {
      filterWidget.classList.remove('active', 'deactivating');
      filterWidget.style.display = 'none';
    }, 500); // Ensure this matches your animation duration
  }

  // Show filter content
  function showFilterContent() {
    filterWidget.classList.add('active');
    filterWidget.style.display = 'block'; // Updated to block if you're not using flex here
    filterWidget.classList.remove('deactivating');
  }

  // Toggle filter content visibility
  function toggleFilterContent() {
    const isHidden = filterWidget.style.display === 'none' || filterWidget.classList.contains('deactivating');
    if (isHidden) {
      showFilterContent();
    } else {
      hideFilterContent();
    }
  }

  // Event listener for the filter button
  filterButton.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleFilterContent();
  });

  // Hide filter content when clicking outside of the widget
  function handleCloseFilters(event) {
    if (!filterWidget.contains(event.target) && filterWidget.classList.contains('active')) {
      hideFilterContent();
    }
  }

  // Hide filter content on load
  hideFilterContent();

  // Event listener for closing filters when clicking outside
  document.addEventListener('click', handleCloseFilters);
}

// Initialize the event listeners
attachFilterEventListeners();


function fetchDataAndDisplay(region) {
    // Fetch data from the server
    fetch('http://localhost:3000/data')
        .then(response => response.json())
        .then(data => {
            // Filter data for the selected region
            let filteredData;
            if (region === 'Surprise Me!') {
                // Implement logic for surprise me or simply select a random region
                const regions = ['Asia', 'Europe', 'Americas', 'Latin America', 'Africa', 'Pacific'];
                const randomRegion = regions[Math.floor(Math.random() * regions.length)];
                filteredData = data.filter(row => row.Continent === randomRegion);
            } else {
                filteredData = data.filter(row => row.Continent === region);
            }
            displayDataInGrid(filteredData);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

/**
 * Fetches data and updates the display based on the selected region.
 * @param {string} region - The region for which to fetch and display data.
 */
function fetchDataAndDisplay(region) {
    const dataEndpoint = 'http://localhost:3000/data';
    const errorMessage = 'Error occurred while fetching data:';
  
    fetch(dataEndpoint)
      .then(response => response.json())
      .then(data => {
        const filteredData = filterDataByRegion(data, region);
        updateGridDisplay(filteredData);
      })
      .catch(error => console.error(`${errorMessage} ${error}`));
  }
  
  /**
   * Filters data by region or selects a random region if 'Surprise Me!' is chosen.
   * @param {Array} data - The data to be filtered.
   * @param {string} region - The selected region to filter by.
   * @returns {Array} - The filtered data.
   */
  function filterDataByRegion(data, region) {
    if (region === 'Surprise Me!') {
      const regions = ['Asia', 'Europe', 'Americas', 'Latin America', 'Africa', 'Pacific'];
      const randomRegion = regions[Math.floor(Math.random() * regions.length)];
      return data.filter(item => item.Continent === randomRegion);
    }
    return data.filter(item => item.Continent === region);
  }
  
  /**
   * Updates the grid display with the provided data.
   * @param {Array} data - The data to be displayed.
   */
  function updateGridDisplay(data) {
    // Sort the data alphabetically by city name
    const sortedData = data.sort((a, b) => a.CityServed.localeCompare(b.CityServed));
  
    const gridSelector = '.ideas-content .photo-grid';
    const gridContainer = createOrReplaceGrid(gridSelector);
  
    const observer = initializeIntersectionObserver();
  
    // Use sortedData instead of data for creating grid tiles
    sortedData.forEach(item => {
      const gridTile = createGridTile(item, observer);
      gridContainer.appendChild(gridTile);
    });
  
    document.querySelector('.ideas-content').appendChild(gridContainer);
  }

  
  
  /**
   * Creates or replaces the existing grid container.
   * @param {string} selector - The CSS selector for the grid.
   * @returns {HTMLElement} - The created grid container.
   */
  function createOrReplaceGrid(selector) {
    let grid = document.querySelector(selector);
    if (grid) {
      grid.remove();
    }
    grid = document.createElement('div');
    grid.className = 'photo-grid';
    return grid;
  }
  
  /**
   * Initializes an intersection observer for lazy loading images.
   * @returns {IntersectionObserver} - The initialized observer.
   */
  function initializeIntersectionObserver() {
    const observerOptions = {
      rootMargin: '100px',
      threshold: 0.1
    };
  
    return new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          if (!image.src) { // Check if the image src is not already set
            image.classList.add('lazy-loaded');
            image.src = image.dataset.src;
          }
          observer.unobserve(image); // Stop observing the image that has been loaded
        }
      });
    }, observerOptions);
  }
  
  
  /**
   * Creates a grid tile element with lazy-loaded image.
   * @param {Object} dataItem - An object containing the data for the grid tile.
   * @param {IntersectionObserver} observer - The observer for lazy loading.
   * @returns {HTMLElement} - The created grid tile element.
   */
  function createGridTile(dataItem, observer) {
    const tile = document.createElement('div');
    tile.className = 'grid-tile';
  
    if (dataItem.PhotoURL) {
      const photoWrapper = document.createElement('div');
      photoWrapper.className = 'photo-wrapper';
  
      const photo = document.createElement('img');
      photo.dataset.src = dataItem.PhotoURL;
      photo.alt = `${dataItem.CityServed} photo`;
      photo.className = 'grid-photo lazy';
      observer.observe(photo);
  
      photoWrapper.appendChild(photo);
      photoWrapper.appendChild(createOverlay(dataItem));
      tile.appendChild(photoWrapper);
    }
  
    return tile;
  }
  
  /**
   * Creates an overlay element with country and city labels.
   * @param {Object} dataItem - An object containing the country and city data.
   * @returns {HTMLElement} - The created overlay element.
   */
  function createOverlay(dataItem) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
  
    const countryLabel = document.createElement('div');
    countryLabel.className = 'grid-label overlay-label';
    countryLabel.textContent = dataItem.CityServed;
  
    const cityLabel = document.createElement('div');
    cityLabel.className = 'grid-label overlay-label';
    cityLabel.textContent = dataItem.Country;
  
    overlay.appendChild(countryLabel);
    overlay.appendChild(cityLabel);
  
    return overlay;
  }
