// Load our team's astronomical research data

let researchData = [];

async function loadResearchData() {

    const results = document.getElementById("researchResults");

    results.innerHTML = "<p>Loading astronomical research...</p>";

    try {

        const response = await fetch(
            "lumatrace_research_data.json"
        );

        if (!response.ok) {
            throw new Error("Could not load research data.");
        }

        const data = await response.json();

        researchData = data.targets;

        displayResearch(researchData);

    }

    catch (error) {

        results.innerHTML =
            "<p>Unable to load research data. Please try again.</p>";

        console.error(error);

    }

}


// Display astronomical targets

function displayResearch(targets) {

    const results = document.getElementById("researchResults");

    results.innerHTML = "";

    if (targets.length === 0) {

        results.innerHTML = "<p>No results found.</p>";

        return;

    }

    targets.forEach(target => {

        const card = document.createElement("div");

        card.className = "result-card";

        const title = document.createElement("h3");

        title.textContent = target.target;

        const coordinates = document.createElement("p");

        coordinates.textContent =
            "RA: " + target.ra_deg +
            "° | DEC: " + target.dec_deg + "°";

        const notes = document.createElement("p");

        notes.textContent = target.coordinate_notes;

        const observations = document.createElement("p");

        observations.textContent =
            "SPHEREx observations: " +
            target.observations.length;

        const gaia = document.createElement("p");

        gaia.textContent =
            "Gaia data: " +
            (Object.keys(target.gaia).length > 0
                ? "Available in dataset"
                : "Not yet retrieved");

        card.appendChild(title);
        card.appendChild(coordinates);
        card.appendChild(notes);
        card.appendChild(observations);
        card.appendChild(gaia);

        results.appendChild(card);

    });

}


// Search astronomical targets

document.getElementById("searchInput")
.addEventListener("input", function() {

    const searchText = this.value.toLowerCase();

    const filteredTargets = researchData.filter(target => {

        return (
            target.target.toLowerCase().includes(searchText)
        );

    });

    displayResearch(filteredTargets);

});


// Start loading data

loadResearchData();
