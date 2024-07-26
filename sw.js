//console.log("service workse inside sw.js");

self.addEventListener("install", (evt) =>
  console.log("Service worker has been installed")
);

//act
self.addEventListener("activate", (evt) =>
  console.log("Service worker has been activated")
);
