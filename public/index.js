function warnings() {
	let warn_data = JSON.parse("./warnings.json");
	document.getElementById("warns").innerHTML = warn_data;
}