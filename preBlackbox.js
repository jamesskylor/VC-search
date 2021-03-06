// Create an event listener for the submission of the form
document.getElementById("theForm").addEventListener('submit', (e)=>{
    // Prevent the form from submitting and interrupting the JS
    console.log("Prevented default");
    e.preventDefault();
    // Call on the function to run and do all the operations
    formToResults();
});

// This function stores data to send to the blackbox
function formToResults() {
    // Initialize the variables we need for calculations before switching the page
    var srchStage, srchLoc, srchSector;
    // Get the values
    srchStage = document.getElementById("getStage").value;
    srchLoc = document.getElementById("getLocation").value;
    var selectedSectors = document.querySelectorAll('#getSector option:checked');
    srchSector = Array.from(selectedSectors).map(sel => sel.value);
    // Store for session
    sessionStorage.setItem("searchStage", srchStage);
    sessionStorage.setItem("searchLoc", srchLoc);
    sessionStorage.setItem("searchSector", JSON.stringify(srchSector));
    "use strict";
    // Change the URL to the loading screen
    location.assign("/VC-search/loadScreen.html");
    return false;
}





