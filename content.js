let settings = {};

function HomepageShortsBlocker() {
  if(!settings["homepage"] && settings["homepage"] != undefined) return;
  const shelf = document.querySelectorAll("ytd-rich-shelf-renderer");
  shelf.forEach(el => {
    el.style.display = "none";
  });
}

function SearchShortsBlocker() {
  if(!settings["search"] && settings["search"] != undefined) return;
  const shelf = document.querySelectorAll("grid-shelf-view-model");
  shelf.forEach(el => {
    el.style.display = "none";
  });
}

function NavShortsBlocker() {
  if(!settings["navbar"] && settings["navbar"] != undefined) return;
  const nav = document.querySelectorAll('a[title="Shorts"]');
  nav.forEach(el => {
    el.style.display = "none";
  });
}

function UrlShortsBlocker() {
  if((settings["url"] || settings["url"] == undefined) && location.pathname.startsWith("/shorts")) {
    chrome.storage.local.set({
      "url_location": location.href
    })
    location.href = chrome.runtime.getURL("/html/blocked.html");
  }
}

chrome.storage.local.get(["homepage", "search", "navbar", "url"], data => {
  settings = data;
  HomepageShortsBlocker();
  SearchShortsBlocker();
  NavShortsBlocker();
  UrlShortsBlocker();
});



const observer = new MutationObserver(() => {
  HomepageShortsBlocker();
  SearchShortsBlocker();
  NavShortsBlocker();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

