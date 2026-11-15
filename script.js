// Display research entries

function displayResearch(data) {

    const results = document.getElementById("researchResults");

    results.innerHTML = "";

    if (data.length === 0) {
        results.innerHTML = "<p>No research entries found.</p>";
        return;
    }

    data.forEach(item => {

        const card = document.createElement("div");

        card.className = "result-card";

        const title = document.createElement("h3");
        title.textContent = item.title;

        const description = document.createElement("p");
        description.textContent = item.description;

        const source = document.createElement("p");
        source.textContent = "Source: " + item.source;

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(source);

        if (item.link) {
            const link = document.createElement("a");
            link.href = item.link;
            link.textContent = "View reference";
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            card.appendChild(link);
        }

        results.appendChild(card);

    });

}


// Search functionality

document.getElementById("searchInput").addEventListener("input", function() {

    const searchText = this.value.toLowerCase();

    const filteredData = researchData.filter(item => {

        return (
            item.title.toLowerCase().includes(searchText) ||
            item.description.toLowerCase().includes(searchText)
        );

    });

    displayResearch(filteredData);

});


// Load research when website opens

displayResearch(researchData);
