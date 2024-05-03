function getCoordinates(address) {
    const base_url = "https://nominatim.openstreetmap.org/search";
    const params = {
        q: address,
        format: "json",
        limit: 1
    };
    const url = new URL(base_url);
    url.search = new URLSearchParams(params).toString();

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                const latitude = data[0].lat;
                const longitude = data[0].lon;
                console.log("Latitude:", latitude);
                console.log("Longitude:", longitude);
            } else {
                console.log("No results found.");
            }
        })
        .catch(error => {
            console.error("There was a problem with the request:", error);
        });
}

// Example usage
// const address = "1600 Amphitheatre Parkway, Mountain View, CA";
// getCoordinates(address);