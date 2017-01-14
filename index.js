// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

}

/**
 * Uses Bing Computer Vision to analyse an image.
 * 
 * @param {string} imageUrl - Image for Bing Computer Vision query.
 * @param {function(string, string[])} callback - Called when Bing CV returns. 
 *   The callback gets the URL, and a list of tags describing the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */
function analyseImage(imageUrl) {
  const BINGCOMPUTERVISIONKEY = 'd0c9f9d4189d4ee59a99cd10b39afb3a';
  // Build the url we'll be calling to get top news
  var url = "https://api.projectoxford.ai/vision/v1.0/analyze?visualFeatures=Tags";
  // Build options for the request
  var options = {
    method: 'POST', // thie API call is a post request
    headers: {
      'Ocp-Apim-Subscription-Key': BINGCOMPUTERVISIONKEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: imageUrl
    })
  };
  return fetch(url, options)
    .then(response => (response.status >= 200 && response.status < 300)
            ? Promise.resolve(response)
            : Promise.reject(new Error(response.statusText)))
    .then(response => response.json())
    .then(json => json.tags.map(tag => ({name: tag.name, confidence: tag.confidence})))
    // .then(result => result.forEach(tag => console.log(tag.name)))
    .catch(error => console.error(error));
}

/**
 * Uses Bing Computer Vision to analyse a list of images.
 * 
 * @param {string[]} images - List of images to analyse
 */
function analyseImages(images) {
  // TODO
}

/**
 * Returns a list of image urls in the active tab.
 */
function getAllImages() {
  // TODO
}

/**
 * Download a specific image to OneDrive
 * 
 * @param {string} imageUrl - URL to image to download
 */
function downloadImage(imageUrl) {
  // TODO
}