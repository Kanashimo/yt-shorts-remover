document.addEventListener("DOMContentLoaded", () => {
  const settings = ["homepage", "search", "navbar", "url"];

  chrome.storage.local.get(settings, (data) => {
    settings.forEach(id => {
      document.getElementById(id).checked = data[id] ?? true;
    });
    setTimeout(() => {
      document.body.classList.remove("toggler-preload");
    }, 300);
    
  });

  settings.forEach(id => {
    document.getElementById(id).addEventListener("change", (e) => {
      chrome.storage.local.set({
        [id]: e.target.checked
      });
    });
  });
});
