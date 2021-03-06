// Create an event listener for document to load
window.addEventListener('load', (e)=>{
    // Once Loaded, Print out the matches from cookies
    printMatches();
});

function printMatches () {
    "use strict";
    // Get data
    var selections = JSON.parse(sessionStorage.getItem("select"));
    // Create 3 looping variables and a results count for determining if any matches were made
    var pointLoop, vcLoop, resultsCount = 0;
    // Loop through all the matches from most points to least
    var tabel = document.createElement("TABLE");
    for (pointLoop = selections.length-1; pointLoop >= 0; pointLoop --) {
        // Create a title for the table
        if(selections[pointLoop].length <= 0) continue;
        // Create a row
        var currentRow;
        // Loop through all the VC's in this league
        for (vcLoop = 0; vcLoop < selections[pointLoop].length; vcLoop ++) {
            // Check if need to create new row and submit last one
            if (resultsCount % 2 == 0) {
                if (resultsCount != 0) {
                    tabel.appendChild(currentRow);
                }
                currentRow = document.createElement("TR");
            }
            resultsCount++;
            // Create current cell and it's header & paragraph of info
            var curCell = document.createElement("TD");
            // Create the href'd name
            var head2 = document.createElement("A");
            var link = document.createTextNode(selections[pointLoop][vcLoop].name);
            head2.appendChild(link);
            head2.title = selections[pointLoop][vcLoop].name;
            if(selections[pointLoop][vcLoop].hasOwnProperty("Social Link")){
                head2.href = selections[pointLoop][vcLoop]["Social Link"];
            }
            // Create the paragraph of info
            var para = document.createElement("P");
            // Fill Paragraph
            para.innerHTML = "<strong>Contact:</strong><br>"+selections[pointLoop][vcLoop].Email+"<br><br><strong>Company Name:</strong><br>"+selections[pointLoop][vcLoop].company+"<br><br><strong>Company Location:</strong><br>"+selections[pointLoop][vcLoop].location.join(", ")+"<br><br><strong>Stage:</strong><br>"+selections[pointLoop][vcLoop].stage.join(", ")+"<br><br><strong>Sectors:</strong><br>"+selections[pointLoop][vcLoop].sectors.join(", ")+"<br><br>";
            // Append all to their respective "parents"
            curCell.appendChild(head2);
            curCell.appendChild(para);
            currentRow.appendChild(curCell);
        }
        // Append the final row
        tabel.appendChild(currentRow);
    }
    // If no matches were made, display an apology message
    if(resultsCount == 0) {
        var srryMes = document.createElement("P");
        srryMes.innerHTML = "Sorry, no VCs were found to match with your company";
        document.body.appendChild(srryMes);
    }
    else {
        var resultsMessage = document.createElement("H2");
        resultsMessage.innerHTML = "We have found "+resultsCount+" matches for your startup!<br><br>";
        document.body.appendChild(resultsMessage);
        document.body.appendChild(tabel);
    }
    return false;
}