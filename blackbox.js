
/*
To Do:
- Code the way you recieve the JSON file
- Code the way to recieve the answers to the form
*/

document.getElementById("theForm").addEventListener('submit', (e)=>{
    //e.stopPropagation();
    e.preventDefault();
    formToResults();
});

function formToResults() {
    var srchStage, srchLoc, srchSector;
    srchStage = document.getElementById("getStage").value;
    srchLoc = document.getElementById("getLocation").value;
    srchSector = document.getElementById("getSector").value;
    "use strict";
    location.assign("https://jackiehj-liu.github.io/atom-capital/loadScreen.html");
    
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
    
    location.replace("https://jackiehj-liu.github.io/atom-capital/results.html");
    
    // Put underneath, the code for displaying the results
    
    // ************************ It seems that .appendChild might actually append to the end, contrary to what was believed earlier in the project. May need to reverse the order of the code
    
    var pointLoop, vcLoop, resultsCount = 0;
    for (pointLoop = 1; pointLoop < selections.length; pointLoop ++) {
        // Create a large "table" for all vc's in this "league"
        var tabel = document.createElement("TABLE");
        tabel.setAttribute("id", "table"+pointLoop);
        document.body.appendChild(tabel);
        // Create a title for the table
        var head1 = document.createElement("H1");
        head1.setAttribute("id", "header1"+pointLoop);
        head1.innerHtML = pointLoop+"/"+(selections.length-1)+" Point Matches";
        document.body.appendChild(head1);
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
            curCell.appendChild(para);
            curCell.appendChild(head2);
            currentRow.appendChild(curCell);
        }
        // Append the row
        document.getElementById().appendChild(currentRow);
        document.body.appendChild(document.createElement("BR"));
    }
  
    if(resultsCount == 0) {
        var srryMes = document.createElement("P");
        srryMes.innerHTML = "Sorry, no VCs were found to match with your company";
        document.body.appendChild(srryMes);
    }
    
    
    // To here
    
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






