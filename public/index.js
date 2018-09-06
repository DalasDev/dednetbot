function warnings() {
	var request = new XMLHttpRequest();
	request.open("GET", "warnings.json", false);
	request.send(null)
	var JSONobj = JSON.parse(request.responseText);

	let data = JSON.parse(JSONobj);
	document.getElementById("warns").innerHTML = data;
}