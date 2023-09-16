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
            populateDropdowns(data.passives);
        })
        .catch(error => {
            console.error("There was a problem fetching the JSON data:", error);
        });
}

function populateDropdowns(passives) {
    passives.forEach(passive => {
        const option = document.createElement("option");
        option.value = passive;
        option.textContent = passive;
        document.getElementById("dropdown1").appendChild(option.cloneNode(true));
        document.getElementById("dropdown2").appendChild(option.cloneNode(true));
        document.getElementById("dropdown3").appendChild(option.cloneNode(true));
        document.getElementById("dropdown4").appendChild(option.cloneNode(true));
    });
}