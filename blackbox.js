
/*
To Do:
- Code the way you recieve the JSON file
- Code the way to recieve the answers to the form
- Figure out whether or not to use Sets or not for the sector matching
*/



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








