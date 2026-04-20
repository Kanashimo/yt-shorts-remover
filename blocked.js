document.getElementById("disable").addEventListener("click", (e) => {
    e.preventDefault();
    chrome.storage.local.set({
      "url": false
    });
    chrome.storage.local.get(["url_location"], data => {
        location.href = data["url_location"] ?? "https://youtube.com/shorts"
    });
    
});