
/*
To Do:
- Test and Fix the results printing (for new JSON file)
*/

// Create an event listener for the submission of the form
document.getElementById("theForm").addEventListener('submit', (e)=>{
    // Prevent the form from submitting and interrupting the JS
    e.preventDefault();
    // Call on the function to run and do all the operations
    formToResults();
});

// This function creates cookies to send to the blackbox
function formToResults() {
    // Initialize the variables we need for calculations before switching the page
    var srchStage, srchLoc, srchSector;
    // Get the values
    srchStage = document.getElementById("getStage").value;
    srchLoc = document.getElementById("getLocation").value;
    var selectedSectors = document.querySelectorAll('#getSector option:checked');
    srchSector = Array.from(selectedSectors).map(sel => sel.value);
    // Store for session
    sessionStorage.searchStage = srchStage;
    sessionStorage.searchLoc = srchLoc;
    sessionStorage.searchSector = JSON.stringify(srchSector);
    "use strict";
    // Change the URL to the loading screen
    location.assign("/atom-capital/loadScreen.html");
    return false;
}





