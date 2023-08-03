// Write your JavaScript code here!

// Event listener for form submission and fetching planetary data
document.addEventListener("DOMContentLoaded", function () {
    // Find the form element and add an event listener for the submit event
        // This event listener is triggered when the DOM (Document Object Model) is fully loaded.
    // It ensures that all the elements in the HTML document are ready to be manipulated.

    // Find the form element and add an event listener for the submit event
    let form = document.querySelector("form");
     // Here, we are using document.querySelector() to find the first <form> element in the HTML document and store it in the variable "form".
    form.addEventListener("submit", function (event) {
        // This event listener is triggered when the user submits the form.

        // Prevent the default form submission behavior
        event.preventDefault();
        //Get the necessarry form elements 
        const list = document.getElementById("faultyItems");
        const pilot = document.querySelector("input[name='pilotName']");
        const coPilot = document.querySelector("input[name='copilotName']");
        const fuelLevel = document.querySelector("input[name='fuelLevel']");
        const cargoLevel = document.querySelector("input[name='cargoMass']");
         // Here, we are using document.getElementById() and document.querySelector() to select specific form elements from the HTML document and store them in variables for later use.
        //Call the formSubmission function with correct arguments
        formSubmission(document, list, pilot, coPilot, fuelLevel, cargoLevel);
        // This line calls the formSubmission function, passing the necessary arguments (the selected form elements) to it.
    });

    // Fetch planetary data and update mission target
    // This block of code fetches planetary data from an external source using the myFetch() function.
    myFetch().then(function (result) {
        //When the data if fetched , store it in the variable listedPlanets
        let listedPlanets = result;
        // We log the fetched planetary data to the console for debugging purposes.
        console.log(listedPlanets);
        //Pick a random planet from the fetched data
        let planet = pickPlanet(listedPlanets);
        // The pickPlanet() function is used to randomly select a planet from the fetched planetary data and store it in the "planet" variable.
        //Update the mission target with information about the selected planet
        addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image);
        // The addDestinationInfo() function is used to update the mission target (the element with the ID "missionTarget") with information about the selected planet.
    });
});