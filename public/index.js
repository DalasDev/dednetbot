function warnings() {
	let warns = JSON.parse("https://retrobotproject.herokuapp.com/warnings.json", "utf8");
	let data = JSON.parse(warns);
	document.getElementById("warns").innerHTML = data;
}