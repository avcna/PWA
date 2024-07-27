//console.log("service workse inside sw.js");
const cacheName = "app-shell-rsrs-v1";
const dynamicCacheName = "dynamic-cache-v1";
const assets = [
  "/",
  "index.html",
  "js/app.js",
  "js/common.js",
  "js/materialize.min.js",
  "css/materialize.min.css",
  "css/styles.css",
  "img/pkcontacts.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v142/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "pages/default.html",
];

const limitCachesLimit = (name, size) => {
  caches.open(name).then((cache) =>
    cache.keys().then((key) => {
      if (key.length > size) {
        cache.delete(key[0]).then(limitCachesLimit(name, size));
      }
    })
  );
};

self.addEventListener("install", (evt) =>
  // console.log("Service worker has been installed")
  evt.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(assets);
    })
  )
);

self.addEventListener("activate", (evt) =>
  //console.log("Service worker has been activated")
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys)
        .filter((key) => key !== cacheName)
        .map((key) => caches.delete());
    })
  )
);

self.addEventListener("fetch", (evt) =>
  //console.log(evt)
  evt.respondWith(
    caches.match(evt.request).then(
      (response) =>
        response ||
        fetch(evt.request)
          .then((fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              limitCachesLimit(dynamicCacheName, 15);
              return fetchRes;
            });
          })
          .catch(() => {
            if (evt.request.url.indexOf(".html") > -1) {
              return caches.match("pages/default.html");
            }
          })
    )
  )
);
