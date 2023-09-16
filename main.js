let passivesData = [];

// Fetch the data from the external JSON file when the page loads
window.onload = function() {
    fetch('passives.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            passivesData = data.passives;
            populateDropdowns(passivesData);
        })
        .catch(error => {
            console.error("There was a problem fetching the JSON data:", error);
        });
}

function populateDropdowns(passives) {
    ['dropdown1', 'dropdown2', 'dropdown3', 'dropdown4'].forEach(dropdownId => {
        const dropdown = document.getElementById(dropdownId);
        dropdown.innerHTML = ''; // Clear the dropdown

        // Add default option
        const defaultOption = document.createElement("option");
        defaultOption.value = '';
        defaultOption.textContent = 'Select a value';
        dropdown.appendChild(defaultOption);

        passives.forEach(passive => {
            const option = document.createElement("option");
            option.value = passive;
            option.textContent = passive;
            dropdown.appendChild(option);
        });
    });
}

function updateDropdowns(changedDropdown) {
    const selectedValues = [
        document.getElementById('dropdown1').value,
        document.getElementById('dropdown2').value,
        document.getElementById('dropdown3').value,
        document.getElementById('dropdown4').value
    ];

    const availablePassives = passivesData.filter(passive => !selectedValues.includes(passive));

    populateDropdowns(availablePassives);

    // Restore the selected values
    ['dropdown1', 'dropdown2', 'dropdown3', 'dropdown4'].forEach((dropdownId, index) => {
        document.getElementById(dropdownId).value = selectedValues[index];
    });
}
