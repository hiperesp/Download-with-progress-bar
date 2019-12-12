function downloadFile(file, progress){
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.responseType = "arraybuffer";
		xhr.addEventListener("error", reject);
		xhr.addEventListener("load", (event) => {
			const type = event.target.getResponseHeader("Content-Type");
			const arrayBuffer = event.target.response;
			const blob = new Blob([arrayBuffer], { type });
			const url = URL.createObjectURL(blob);
			resolve(url);
		});
		xhr.addEventListener("progress", (event) => {
			progress(event.lengthComputable, event.loaded, event.total);
		});
		xhr.open("GET", file);
		xhr.send();
	});
}