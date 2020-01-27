
/*
To Do:
- Code the way you recieve the JSON file
- Code the way to recieve the answers to the form
*/



function formToResults(srchStage, srchLoc, srchSector) {
    "use strict";
    location.assign(/* Put in the URL of loadingScreen.html */);
    
    // Get the JSON file first and other pre stuff
    // The other info is part of the arguments
    var jsonFile = JSON.parse();
    
    // Set up finder thing
    var maxPts = (srchSector.length * 2) + 1;
    var selections = [];
    var repeat;
    for (repeat = 0; repeat < maxPts; repeat += 1) {
        selections.push([]); // Push in a new empty array
    }
    
    // Add up points -1 and if > 0 (since only 1pt (-1pt = 0pt) if only location match which is no good), put into selections[pts].push(jsonFile[ind])
    var tempPts;
    var ind;
    for (ind = 0; ind < jsonFile.length; ind += 1) {

        // Set to -1 to reset to default value
        tempPts = -1;

        // Only care at all if the stage matches
        if (new Set(jsonFile[ind].stage).has(srchStage)) {

            // Search if same location and assign a point if so
            // Only check while tempPts == 0 since if it == 1, then it's already found it's answer
            if (new Set(jsonFile[ind].location).has(srchLoc)) {
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
    
    location.replace(/* Put in the URL of results.html */);
    
    // Put underneath, the code for displaying the results
    
    var pointLoop, vcLoop, resultCount = 0;
    for (pointLoop = selections.length - 1; pointLoop > 0; pointLoop --) {
        // Check if there is anyone in this league
        if (selections[pointLoop].length <= 0) {
            continue;
        }
        // Display this league's points: 'X/Y Point Matches' where X is num of points and Y is total amnt
        
        
        
        // Create a large "table" for all vc's in this "league"
        
        
        
        for (vcLoop = 0; vcLoop < selections[pointLoop].length; vcLoop ++) {
            // Put in the code that creates the little index for this particular person
            // Start by incrementing counter of results
            resultCount++;
            // Append a row into table with all info
            //  Include a href displaying VC name and linking to their website
            
            
            
            // Loop through sectors to append in a single cell
            
            
            
        }
        // Close this "table"
        // Create space for next one
        
        
        
    }
    
    if (resultCount == 0) {
        // Display a sorry message about not finding any matches
        
        
        
    }
    
    // To here
    
    return false;
}



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






