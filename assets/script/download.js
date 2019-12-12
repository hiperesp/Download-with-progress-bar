function updateDownloadProgressBarState(downloadElement, downloading = false, downloaded = 0){
	const progressBarElement = downloadElement.querySelector(".progress-bar");
	const progressElement = progressBarElement.querySelector(".progress");
	const downloadButton = downloadElement.querySelector(".downloadButton");
	if(downloading){
		progressBarElement.classList.remove("not-downloading");
		if(downloaded>-1) {
			const progress = downloaded*100;
			progressBarElement.classList.remove("uncomputable");
			progressElement.style.width = progress+"%";
			progressElement.textContent = (progress).toFixed(2)+"%";
		} else {
			progressBarElement.classList.add("uncomputable");
			progressElement.textContent = "Baixando...";
		}
		downloadButton.disabled = true;
	} else {
		progressBarElement.classList.remove("uncomputable");
		progressBarElement.classList.add("not-downloading");
		downloadButton.disabled = false;
		progressElement.textContent = downloadElement.dataset.downloadSaveAs;
	}
}
function startDownload(downloadElement){
	downloadFile(downloadElement.dataset.downloadPath, (progressComputable, downloaded, total) => {
		updateDownloadProgressBarState(downloadElement, true, progressComputable?downloaded/total:-1);
	})
	.then((url) => {
		updateDownloadProgressBarState(downloadElement, false);
		let downloadAnchor = document.createElement("a");
		downloadAnchor.href = url;
		downloadAnchor.download = downloadElement.dataset.downloadSaveAs;
		downloadAnchor.click();
	})
	.catch((exception) => {
		console.log(exception);
	});
}
function addDownload(downloadPath, saveAs){
	const downloadItem = document.createElement("div");
	downloadItem.classList.add("download-item");
	downloadItem.dataset.downloadPath = downloadPath;
	downloadItem.dataset.downloadSaveAs = saveAs;
	const titleContainer = document.createElement("div");
	titleContainer.classList.add("text");
	const titleTextContainer = document.createElement("h2");
	const downloadTextNode1 = document.createTextNode("Download \"");
	titleTextContainer.appendChild(downloadTextNode1);
	const title = document.createElement("span");
	title.classList.add("title");
	title.textContent = saveAs;
	titleTextContainer.appendChild(title);
	const downloadTextNode2 = document.createTextNode("\"");
	titleTextContainer.appendChild(downloadTextNode2);
	titleContainer.appendChild(titleTextContainer);
	downloadItem.appendChild(titleContainer);
	const downloadButtonContainer = document.createElement("div");
	downloadButtonContainer.classList.add("text");
	const downloadButton = document.createElement("button");
	downloadButton.classList.add("downloadButton");
	downloadButton.textContent = "Download";
	downloadButton.addEventListener("click", function(event) {
		event.target.disabled = true;
		startDownload(downloadItem);
	});
	downloadButtonContainer.appendChild(downloadButton);
	downloadItem.appendChild(downloadButtonContainer);
	const progressBar = document.createElement("div");
	progressBar.classList.add("progress-bar");
	progressBar.classList.add("not-downloading");
	const progress = document.createElement("div");
	progress.classList.add("progress");
	progress.textContent = saveAs;
	progressBar.appendChild(progress);
	downloadItem.appendChild(progressBar);
	document.querySelector("#download-list").appendChild(downloadItem);
}
