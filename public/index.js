function warnings() {
	let warns = JSON.parse('public/warnings.json');
	let data = JSON.parse(warns);
	document.getElementById("warns").innerHTML = data;
}