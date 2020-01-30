
/*
To Do:
- Code the way you recieve the JSON file
- Code the way to recieve the answers to the form
*/

// Create an event listener for the submission of the form
document.getElementById("theForm").addEventListener('submit', (e)=>{
    //e.stopPropagation(); // This is pointless code, we didn't end up needing it
    // Prevent the form from submitting and interrupting the JS
    e.preventDefault();
    // Call on the function to run and do all the operations
    formToResults();
});

// This function moves the browser from the form to the loading screen, does the matching and then moves you to a completed results page
// It requires that the page it is called on is a form with the required variables shown below
function formToResults() {
    // Initialize the variables we need for calculations before switching the page
    var srchStage, srchLoc, srchSector;
    // Get the values
    srchStage = document.getElementById("getStage").value;
    srchLoc = document.getElementById("getLocation").value;
    var selectedSectors = document.querySelectorAll('#getSector option:checked');
    srchSector = Array.from(selectedSectors).map(sel => sel.value);
    "use strict";
    // Change the URL to the loading screen
    location.assign("https://jackiehj-liu.github.io/atom-capital/loadScreen.html");
    
    // Get the JSON file first and other pre stuff
    // The other info is part of the arguments
    var jsonFile = JSON.parse();
    
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
    
    // Replace the URL with that of the results screen
    location.replace("https://jackiehj-liu.github.io/atom-capital/results.html");
    
    // Create 3 looping variables and a results count for determining if any matches were made
    var pointLoop, vcLoop, resultsCount = 0;
    // Loop through all the matches from most points to least
    for (pointLoop = selections.length; pointLoop >= 0; pointLoop --) {
        // Create a title for the table
        var head1 = document.createElement("H1");
        head1.setAttribute("id", "header1"+pointLoop);
        head1.innerHtML = pointLoop+"/"+(selections.length-1)+" Point Matches";
        document.body.appendChild(head1);
        // Create a large "table" for all vc's in this "league"
        var tabel = document.createElement("TABLE");
        tabel.setAttribute("id", "table"+pointLoop);
        document.body.appendChild(tabel);
        var currentRow;
        // Loop through all the VC's in this league
        resultsCount += selections[pointLoop].length;
        for (vcLoop = 0; vcLoop < selections[pointLoop].length; vcLoop ++) {
            // Check if need to create new row and submit last one
            if (vcLoop % 2 == 0) {
                if (vcLoop != 0) {
                    document.getElementById("table"+pointLoop).appendChild(currentRow);
                }
                currentRow = document.createElement("TR");
            }
            // Create current cell and it's header & paragraph of info
            var curCell = document.createElement("TD");
            var head2 = document.createElement("H2");
            var para = document.createElement("P");
            // Set values for headers and paragraph
            head2.innerHTML = selections[pointLoop].name;
            para.innerHTML = "Company Name: "+selections[pointLoop].company+"<br><br>Company Location: "+selections[pointLoop].location+"<br><br>Stage: "+selections[pointLoop].stage+"<br><br>Sectors: "+selections[pointLoop].sectors+"<br><br>";
            // Append all to their respective "parents"
            curCell.appendChild(head2);
            curCell.appendChild(para);
            currentRow.appendChild(curCell);
        }
        // Append the row
        document.getElementById("table"+pointLoop).appendChild(currentRow);
        // Append a break for spacing
        document.body.appendChild(document.createElement("BR"));
    }
    // If no matches were made, display an apology message
    if(resultsCount == 0) {
        var srryMes = document.createElement("P");
        srryMes.innerHTML = "Sorry, no VCs were found to match with your company";
        document.body.appendChild(srryMes);
    }
    
    return false;
}

/*
Ascending loop of selections
    Check if <= 0 vc then continue
    Create h1 for that table
    Create table
    Loop through VCs
        check if current loopVal % 2 == 0
            Create row and append to table
        Create cell and append in current row
        Append h2 in current cell
        Create p w/ information
        Append p in current cell
    Create space to next table
*/

/*

// Get the JSON file first and other pre stuff
// Get info on what the searcher is looking for

var jsonFile = JSON.parse();
var srchStage = ""; // Mandatory
var srchLoc = ""; // Matching = +1 pt
var srchSector = []; // Matching = +2 pts per match

// Set up finder thing
var maxPts = (srchSector.length * 2) + 1;
var selections = [];
var repeat;
for (repeat = 0; repeat < maxPts; repeat += 1) {
    selections.push([]); // Push in a new empty array
}
// Create an array that holds key of maxPoint : Set<All companies with matching # points>

*/

/*

Format for JSON file

[
    {
        "name": "",
        "company": "",
        "stage": ["", ""],
        "location": ["", ""],
        "sectors"; ["", ""]
    },
    {
        "name": "",
        "company": "",
        "stage": ["", ""],
        "location": ["", ""],
        "sectors"; ["", ""]
    },
    {
        "name": "",
        "company": "",
        "stage": ["", ""],
        "location": ["", ""],
        "sectors"; ["", ""]
    }
]

*/

/*

// Add up points -1 and if > 0 (since only 1pt (-1pt = 0pt) if only location match which is no good), put into selections[pts].push(jsonFile[ind])
var tempPts;
var ind;
for (ind = 0; ind < jsonFile.length; ind += 1) {
    
    // Set to -1 to reset to default value
    tempPts = -1;
    
    // Only care at all if the stage matches
    if (new Set(jsonFile[ind].stage).has(srchStage)) { // Fix w/ set.has() srchStage
        
        // Search if same location and assign a point if so
        // Only check while tempPts == 0 since if it == 1, then it's already found it's answer
        var locSrch;
        if(new Set(jsonFile[ind].location).has(srchLoc)) {
            tempPts += 1;
        }
        
        // Now search for matches in sectors
        // Create 2 sets, set estSize to their sizes added together, union them and tempPts+=2*(estSize-union.size);
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

*/






