const CACHE_NAME = "level-cache-v1";
const FILES_TO_CACHE = [
   "./",
   "./index.html",
   "./style.css",
   "./app.js"
];
// インストール時にファイルをキャッシュする
self.addEventListener("install", (event) => {
   event.waitUntil(
       caches.open(CACHE_NAME).then((cache) => {
           return cache.addAll(FILES_TO_CACHE);
       })
   );
});

// 通信要求を処理する
self.addEventListener("fetch", (event) => {
   if (event.request.method !== "GET") {
       return;
   }
   event.respondWith(
       caches.match(event.request).then((response) => {
           if (response) {
               return response;
           }
           return fetch(event.request);
       })
   );
});