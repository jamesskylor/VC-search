
/*
To Do:
- Test and Fix the results printing (for new JSON file)
*/

// Function that creates cookies
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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
    // Set the cookies
    setCookie("searchStage", srchStage, 1);
    setCookie("searchLoc", srchLoc, 1);
    setCookie("searchSector", srchSector, 1);
    "use strict";
    // Change the URL to the loading screen
    location.assign("loadScreen.html"); // ************************************************************************* Change back to url later
    return false;
}

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




