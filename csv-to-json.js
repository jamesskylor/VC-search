<<<<<<< HEAD


var result= Papa.parse("https://jackiehj-liu.github.io/atom-capital/atom-capital.csv", {


=======
var result= Papa.parse("https://jackiehj-liu.github.io/atom-capital/atom-capital.csv", {
>>>>>>> d48759614e18faf8aa4b76fac306dc720e9511a3
	download: true,
    header: true,
	complete: function(results) {
		console.log(results);
	}
     });