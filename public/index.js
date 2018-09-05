let warns = JSON.parse("https://retrobotproject.herokuapp.com/warnings.json", "utf8");

function warnings() {
	let data = JSON.parse(warns);
	document.getElementById("warns").innerHTML = data;
}