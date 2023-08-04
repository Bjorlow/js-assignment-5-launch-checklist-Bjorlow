// Write your helper functions here!
require('isomorphic-fetch');

//This function is to update the mission target with informatio about the selected planet 
function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    const missionTarget = document.getElementById('missionTarget');
    missionTarget.innerHTML = `
      <h2>Mission Destination</h2>
      <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
      </ol>
      <img src="${imageUrl}" alt="${name}">
    `;
  }
// Function to validate input values.It checks if the input is empty or not a number.
  function validateInput(testInput) {
    if (testInput === "") {
      return "Empty";
    } else if (isNaN(testInput)) {
      return "Not a Number";
    } else {
      return "Is a Number";
    }
  }
//This function handles form submission and update shuttle requirements based on the input values.
  function formSubmission(document, list, pilot, coPilot, fuelLevel, cargoLevel) {
    // Validate the input values using the validateInput function
    const pilotStatus = validateInput(pilot.value);
    const coPilotStatus = validateInput(coPilot.value);
    const fuelStatus = validateInput(fuelLevel.value);
    const cargoStatus = validateInput(cargoLevel.value);
  
    // Update the list of shuttle requirements with the pilot and co-pilot names
    list.style.visibility = "visible";
    document.getElementById("pilotStatus").innerText = `Pilot ${pilotStatus.value} is ready for launch`;
    document.getElementById("copilotStatus").innerText = `Co-pilot ${coPilotStatus.value} is ready for launch`;
  
    // Check fuel and cargo levels for validation
    if (fuelStatus === "Not a Number" || cargoStatus === "Not a Number") {
      alert("Fuel and Cargo Mass must be numbers");
    } else if (fuelStatus === "Empty" || cargoStatus === "Empty") {
      alert("All fields are required!");
    } else {
      // If all fields are valid, check fuel and cargo levels for launch readiness
      if (fuelLevel.value < 10000) {
        document.getElementById("faultyItems").style.visibility = "visible";
        document.getElementById("fuelStatus").innerText = "Fuel level too low for launch";
        document.getElementById("launchStatus").innerText = "Shuttle not ready for launch";
        document.getElementById("launchStatus").style.color = "red";
      } else if (cargoLevel.value > 10000) {
        document.getElementById("faultyItems").style.visibility = "visible";
        document.getElementById("cargoStatus").innerText = "Cargo mass too high for launch";
        document.getElementById("launchStatus").innerText = "Shuttle not ready for launch";
        document.getElementById("launchStatus").style.color = "red";
      } else {
        document.getElementById("launchStatus").innerText = "Shuttle is ready for launch";
        document.getElementById("launchStatus").style.color = "green";
        document.getElementById("faultyItems").style.visibility = "visible";
        document.getElementById("fuelStatus").innerText = "Fuel level high enough for launch";
        document.getElementById("cargoStatus").innerText = "Cargo mass low enough for launch";
    }
  }
  }
//Function to fetch planetary data from URL
  async function myFetch() {
    let planetsReturned;
  
    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then(function(response) {
      return response.json(); 
    });
  
    return planetsReturned;
  }
//Function to pick a random planet from array of planets
function pickPlanet(planets) {
    const randomIndex = Math.floor(Math.random() * planets.length);
    return planets[randomIndex];
  }
//Export the helper functions to be used in the main script.js file
module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
