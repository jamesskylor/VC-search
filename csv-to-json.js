



var result= Papa.parse("https://jackiehj-liu.github.io/atom-capital/atom-capital.csv", {





	download: true,
    header: true,
	complete: function(results) {
		console.log(results);
	}
     });