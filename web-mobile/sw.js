importScripts('https://xb-3sc.xingbook.com/static/workbox-sw-3.2.0.js');

// JS 请求: 网络优先
workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.networkFirst({
    cacheName: 'huaban:js',
  })
);

// 图片请求: 缓存优先
workbox.routing.registerRoute(
  // Cache image files
  new RegExp('.*\.(?:png|jpg|jpeg|svg|gif|mp3)'),
  // Use the cache if it's available
  workbox.strategies.cacheFirst({
    // Use a custom cache name
    cacheName: 'huaban:image',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images
        maxEntries: 200,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);

workbox.routing.registerRoute(
  /index\.html/,
  workbox.strategies.networkFirst({
    cacheName: 'huaban:html',
  })
);