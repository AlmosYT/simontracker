//this project is meant to track the fuckups that my friend simon has made. it should show a realtime timer since the last fuckup.
//it should also show the total number of fuckups that have happened over all time

//load fuckups from a json file and store them in an array
//fuckups should be an array of objects with the following properties:
//date: the date of the fuckup (UNIX timestamp)
//description: a description of the fuckup

var fuckups = [];
var fuckupsCount = 0;


function loadFuckups() {
	//load fuckups from the fuckups.json file (https://raw.githubusercontent.com/AlmosYT/simontracker/main/fuckups.json)
	//use the fetch() function to load the file
	//use the .then() function to parse the json file


	fetch("https://raw.githubusercontent.com/AlmosYT/simontracker/main/fuckups.json")
	.then(response => response.json())
	.then(data => {
		fuckups =
		data;
		fuckupsCount = fuckups.length;
		console.log(fuckups);
		console.log(fuckupsCount);
	})
	//wait for the fetch to finish, then return "done"
	return "done";
}

function refreshFuckups() {
	//load the fuckups again
	//if the fuckup count has changed, play a sound effect and update the fuckup count

	var fuckupsCountBefore = fuckupsCount;
	loadFuckups();
	if (fuckupsCountBefore != fuckupsCount) {
		var audio = new Audio("https://raw.githubusercontent.com/AlmosYT/simontracker/main/sound.mp3");
		audio.play();
	}

}


function displayTimerSinceLastFuckup() {
	//get the current time
	//get the date of the last fuckup
	//calculate the difference between the current time and the last fuckup
	//display the difference in a timer on the page
	//the timer is a span with the id "timer"

	var now = new Date();
	console.log(now);
	console.log(fuckups[fuckups.length - 1].date)
	var lastFuckup = new Date(fuckups[fuckups.length - 1].date * 1000);

	var days = Math.floor((now - lastFuckup) / (1000 * 60 * 60 * 24));
	var hours = Math.floor((now - lastFuckup) / (1000 * 60 * 60) % 24);
	var minutes = Math.floor((now - lastFuckup) / (1000 * 60) % 60);
	var seconds = Math.floor((now - lastFuckup) / 1000 % 60);


	var timer = document.getElementById("timer");
	timer.style = "font-style: normal;";
	timer.innerHTML = days + " days, " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds";

	//update the timer every second
}

function displaylistOfFuckups() {
	//display the fuckups into the div with the id "fuckups"
	//use h3 elements for the date and p elements for the description
	//use the .innerHTML property to set the html of the div
	//use the fuckups array to get the fuckups

	var fuckupsDiv = document.getElementById("fuckups");

	var innerHTML = "";

	for (var i = 0; i < fuckups.length; i++) {
		//format the date like this: YYYY-MM-DD HH:MM
		innerHTML += "<h3> Simon did something unproductive on " + new Date(fuckups[i].date * 1000).toLocaleString() + "</h3>";
		innerHTML += "<p>" + fuckups[i].description + "</p>";
	}

	fuckupsDiv.innerHTML = innerHTML;
	
}
	
loadFuckups()
setInterval(displayTimerSinceLastFuckup, 1000)
setInterval(displaylistOfFuckups, 1000)
