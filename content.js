let settings = {};

function HomepageShortsBlocker() {
  if(!settings["homepage"]) return;
  const shelf = document.querySelectorAll("ytd-rich-shelf-renderer");
  shelf.forEach(el => {
    el.style.display = "none";
  });
}

function SearchShortsBlocker() {
  if(!settings["search"]) return;
  const shelf = document.querySelectorAll("grid-shelf-view-model");
  shelf.forEach(el => {
    el.style.display = "none";
  });
}

function NavShortsBlocker() {
  if(!settings["navbar"]) return;
  const nav = document.querySelectorAll('a[title="Shorts"]');
  nav.forEach(el => {
    el.style.display = "none";
  });
}

function UrlShortsBlocker() {
  if((settings["url"]) && location.pathname.startsWith("/shorts")) {
    chrome.storage.local.set({
      "url_location": location.href
    })
    location.href = chrome.runtime.getURL("/html/blocked.html");
  }
}

chrome.storage.local.get({
  "homepage": true, 
  "search": true, 
  "navbar": true, 
  "url": true
}, data => {
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
