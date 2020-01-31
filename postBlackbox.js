// Create an event listener for document to load
console.log("Opened");
window.addEventListener('load', (e)=>{
    console.log("Loaded");
    printMatches();
});

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

function printMatches () {
    "use strict";
    // Get cookies
    
    var selections = JSON.parse(getCookie("select"));
    console.log(selections);
    
    // Create 3 looping variables and a results count for determining if any matches were made
    var pointLoop, vcLoop, resultsCount = 0;
    // Loop through all the matches from most points to least
    for (pointLoop = selections.length-1; pointLoop >= 0; pointLoop --) {
        // Create a title for the table
        if(selections[pointLoop].length <= 0) continue;
        var head1 = document.createElement("H2");
        head1.setAttribute("id", "header1"+pointLoop);
        head1.innerHTML = pointLoop+"/"+(selections.length-1)+" Point Matches";
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
            var head2 = document.createElement("H3");
            var para = document.createElement("P");
            // Set values for headers and paragraph
            head2.innerHTML = selections[pointLoop][vcLoop].name;
            para.innerHTML = "Company Name: "+selections[pointLoop][vcLoop].company+"<br><br>Company Location: "+selections[pointLoop][vcLoop].location+"<br><br>Stage: "+selections[pointLoop][vcLoop].stage+"<br><br>Sectors: "+selections[pointLoop][vcLoop].sectors+"<br><br>";
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