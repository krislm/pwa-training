/**
* Copyright 2016 Google Inc. All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
(function(global) {
  'use strict';

  // The route for any requests from the googleapis origin
  global.toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'googleapis',
      maxEntries: 20,
    },
    origin: /\.googleapis\.com$/
  });

  // We want no more than 50 images in the cache. We check using a cache first strategy
  global.toolbox.router.get(/\.(?:png|gif|jpg)$/, global.toolbox.cacheFirst, {
    cache: {
      name: 'images-cache',
      maxEntries: 50
    }
  });

  // pull html content using network first
  global.addEventListner('fetch', function(event) {
    if (event.request.headers.get('accept').includes('text/html')) {
      event.respondWith(toolbox.networkFirst(event.request));
    }
    // you can add additional synchronous checks based on event.request.
  });

  // pull video using network only. We don't want such large files in the cache
  global.toolbox.router.get('/video/(.+)', global.toolbox.networkOnly);
  // If the video comes from youtube or vimeo still use networkOnly
  global.toolbox.router.get('(.+)', global.toolbox.networkOnly, {
    origin: /\.(?:youtube|vimeo)\.com$/
  });

  // the default route is global and uses cacheFirst
  global.toolbox.router.get('/*', global.toolbox.cacheFirst);
})(self);
