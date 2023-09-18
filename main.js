let passivesData = [];

// Fetch the data from the external JSON file when the page loads
window.onload = function () {
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
    var checkbox = document.getElementById("lock_levels");
    if (checkbox.checked) {
        ['dropdown1', 'dropdown2', 'dropdown3', 'dropdown4'].forEach(dropdownId, index => {
            const dropdown = document.getElementById(dropdownId);
            dropdown.innerHTML = ''; // Clear the dropdown
    
            // Add default option
            const defaultOption = document.createElement("option");
            defaultOption.value = '';
            defaultOption.textContent = 'Select a value';
            dropdown.appendChild(defaultOption);
    
            passives[index].forEach(passive => {
                const option = document.createElement("option");
                option.value = passive;
                option.textContent = passive;
                dropdown.appendChild(option);
            });
        });
    } else {
        ['dropdown1', 'dropdown2', 'dropdown3', 'dropdown4'].forEach(dropdownId => {
            const dropdown = document.getElementById(dropdownId);
            dropdown.innerHTML = ''; // Clear the dropdown
    
            // Add default option
            const defaultOption = document.createElement("option");
            defaultOption.value = '';
            defaultOption.textContent = 'Select a value';
            dropdown.appendChild(defaultOption);

            passives = [...passives[0], ...passives[1], ...passives[2], ...passives[3]]
    
            passives.forEach(passive => {
                const option = document.createElement("option");
                option.value = passive;
                option.textContent = passive;
                dropdown.appendChild(option);
            });
        });
    }
}

function updateDropdowns(changedDropdown) {
    const dropdowns = [
        document.getElementById('dropdown1'),
        document.getElementById('dropdown2'),
        document.getElementById('dropdown3'),
        document.getElementById('dropdown4')
    ];

    // Get all currently selected values
    const selectedValues = dropdowns.map(dropdown => dropdown.value);

    dropdowns.forEach(dropdown => {
        const currentValue = dropdown.value; // Store the current dropdown's value

        // For each dropdown, we consider its current value as available along with other passives not selected elsewhere
        const availablePassives = [...passivesData].filter(passive => passive === currentValue || !selectedValues.includes(passive));

        populateSingleDropdown(dropdown, availablePassives);
    });
}

function populateSingleDropdown(dropdown, passives) {
    const currentValue = dropdown.value; // Store the current dropdown's value
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

    dropdown.value = currentValue; // Restore the selected value
}

