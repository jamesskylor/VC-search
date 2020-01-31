// Create an event listener document to load
window.addEventListener('load', (e)=>{
    loadMatches();
});

// Function that creates a cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
 function Papa.parse("https://jackiehj-liu.github.io/atom-capital/atom-capital.csv", {
	download: true,
    header: true,
	complete: function(results) {
		console.log(results);
	}
     });

// Function that retrieves a cookie
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function loadMatches () {
    "use strict";
    // Load the JSON file
    var jsonFile;
    $.getJSON('https://jackiehj-liu.github.io/atom-capital/vc-match.json', function(jsonFile) {
        // Read the cookies
        var srchStage = getCookie("searchStage");
        var srchLoc = getCookie("searchLoc");
        var sectorString = getCookie("searchSector");
        var srchSector = sectorString.split(",");
        // Set up finder thing
        // Length of the answer array
        var maxPts = (srchSector.length * 2) + 1;
        // The answer array
        var selections = [];
        // A loop to initialize the answer array with more empty arrays
        var repeat;
        for (repeat = 0; repeat < maxPts; repeat += 1) {
            selections.push([]); // Push in a new empty array
        }

        // Add up points -1 and if > 0 (since only 1pt (-1pt = 0pt) if only location match which is no good), put into selections[pts].push(jsonFile[ind])
        var tempPts;
        // A loop that goes through all of the json file to look at each investor
        var ind;
        for (ind = 0; ind < jsonFile.length; ind += 1) {

            // Set to -1 to reset to default value
            // -1 is default value so any investor with no match or just a +1pt (location) match are ignored
            tempPts = -1;

            // Only care at all if the stage matches
            // Check if the set containing all the investor's stages has the stage the company applying is in
            if (new Set(jsonFile[ind].stage).has(srchStage)) {

                // Search if same location and assign a point if so
                if (new Set(jsonFile[ind].location).has(srchLoc)) {
                    tempPts += 1;
                }

                // Now search for matches in sectors
                // Create 2 sets, set estSize to their sizes added together, union them and tempPts+=2*(estSize-union.size);
                // This uses the logic that a set doesn't copy duplicates, so each duplicate (match) would result in the combined size
                //  being 1 less per match than just the sizes of both sets added together. Then for each discrepancy, multiple by their point value of 2
                var estSize = srchSector.length + jsonFile[ind].sectors.length;
                var set = new Set(srchSector);
                jsonFile[ind].sectors.forEach(set.add, set);
                tempPts += 2 * (estSize - set.size);

                // Put the investor into an array storing the information on how good a match they are
                if (tempPts > 0) {
                    selections[tempPts].push(jsonFile[ind]);
                }
            }
        }
        // Create Cookie by first stringifying the object
        var tempStrings = JSON.stringify(selections);
        setCookie("select", tempStrings, 1);
        // Replace the URL with that of the results screen
        location.replace("https://jackiehj-liu.github.io/atom-capital/results.html");
        return false;
    });
}