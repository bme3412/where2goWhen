document.getElementById('nextPageButton').addEventListener('click', function() {
    // Fetch the content of ideas.html
    fetch('ideas.html')
    .then(response => response.text())
    .then(content => {
        // Insert the content into the ideas-content div
        document.querySelector('.ideas-content').innerHTML = content;
        
        // Smoothly scroll to the ideas-content div
        document.querySelector('.ideas-content').scrollIntoView({ behavior: 'smooth' });
        
        // Populate the date after adding ideas.html to index.html
        populateDate();

        // Add an event listener to the month selection dropdown to update the default date when the dropdown changes
        document.getElementById('monthSelection').addEventListener('change', populateDate);
    })
    .catch(error => {
        console.error('There was an error fetching the content:', error);
    });
});

function populateDate() {
    // Get the current date
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!

    // Format the current date in the desired format: e.g., "October 28, 2023"
    const currentFormattedDate = `${mm}/${dd}/${today.getFullYear()}`;

    // Set the date for the "Today is" section
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        currentDateElement.textContent = currentFormattedDate;
    }

    // Get the number of months selected from the dropdown
    const monthsToAdd = parseInt(document.getElementById('monthSelection').value);

    // Calculate the date "monthsToAdd" months from now
    today.setMonth(today.getMonth() + monthsToAdd);
    const futureDD = String(today.getDate()).padStart(2, '0');
    const futureMM = String(today.getMonth() + 1).padStart(2, '0'); 

    // Format the future date in the format required for the date input
    const futureFormattedDate = `${today.getFullYear()}-${futureMM.padStart(2, '0')}-${futureDD}`;

    // Set the default date for the search container input
    const startDateElement = document.querySelector('input[aria-label="Start Date"]');
    if (startDateElement) {
        startDateElement.value = futureFormattedDate;
    }
}

// Add an event listener to the month selection dropdown to update the default date when the dropdown changes
document.getElementById('monthSelection').addEventListener('change', populateDate);

