// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random fun fact to the page.
 */
function addRandomFunFact() {
  const fun_facts =
      ['I\'m from Ethiopia', 'I have over 50 cousins', 'I love Kabobs', 'Favorite Movie: The Hunger Games'];

  // Pick a random fun fact.
  const fact = fun_facts[Math.floor(Math.random() * fun_facts.length)];

  // Add it to the page.
  const factContainer = document.getElementById('fact-container');
  factContainer.innerText = fact;
}
/**
 * Returns a greeting in different languagues randomly.
 */
function getRandomGreeting() {
    const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

    // Pick a random greeting.
    var greeting = greetings[Math.floor(Math.random() * greetings.length)];
    return greeting;
}

/**
 * Constructs the given array in a readable format for html page.
 * @param {Array} - the list of comments
 */
function printUserComments(comments){
  for(let index=0; index<comments.length; index++){
    var commentHolder = document.createElement("li");
    var comment = document.createTextNode(`${comments[index]}`);
    commentHolder.appendChild(comment);
    document.getElementById('Comments').appendChild(commentHolder);
  }
}

/**
 * Deletes user comments from datastore and page.
 */
function deleteUserComments(){
  fetch('/delete-comment', {method: 'POST'});
  location.reload();
}
/**
 * Fetches data from server and adds it to home page.
 */
function onloader(){
  document.getElementById("Introduction").append(`${getRandomGreeting()} My name is Awad. I'm 19 years old.`);
  fetch('/data').then(response => response.json()).then((userComments) => {
    printUserComments(userComments);
  });
  createMap();
}
/**
 * Creates a map and adds it to the page.
 */
function createMap(){
  const homeTown = {lat: 38.7043, lng: -77.2278};
  const myMap = new google.maps.Map(document.getElementById("map"), {center: homeTown, zoom: 16});
  const homeTownMarker = new google.maps.Marker({position: homeTown, map: myMap, title: "My Hometown!"});
  createMarkers(myMap);
}
/**
 * Creates markers of all major cities I've been to and adds to page.
 */
function createMarkers(myMap){
  const ethiopiaMarker = new google.maps.Marker({position: {lat: 8.9806, lng: 38.7578}, map: myMap, title: "My Heritage!"});
  const dubaiMarker = new google.maps.Marker({position: {lat: 25.2048, lng: 55.2708 }, map: myMap, title: "Vacation!"});
  const jeddahMarker = new google.maps.Marker({position: {lat: 21.4858, lng: 39.1925 }, map: myMap, title: "Visiting an Uncle for the first time!"});
  const bramptonMarker = new google.maps.Marker({position: {lat: 43.7315, lng: -79.7624 }, map: myMap, title: "First time travelling outside the U.S!"});
  const sanFranMarker = new google.maps.Marker({position: {lat: 37.7749, lng: -122.4194 }, map: myMap, title: "First time travelling to west coast!"});
  const sanDiegoMarker = new google.maps.Marker({position: {lat: 32.7157, lng: -117.1611 }, map: myMap, title: "Beautiful Beaches here!"});
  const LAMarker = new google.maps.Marker({position: {lat: 34.0522, lng: -118.2437 }, map: myMap});
  const manhattanMarker = new google.maps.Marker({position: {lat: 40.7831, lng: -73.9712 }, map: myMap});
  const orlandoMarker = new google.maps.Marker({position: {lat: 28.5383, lng: -81.3792 }, map: myMap});
  const myrtleBeachMarker = new google.maps.Marker({position: {lat: 33.6891, lng: -78.8867 }, map: myMap});
  const DCMarker = new google.maps.Marker({position: {lat: 38.9072, lng: -77.0369 }, map: myMap});
  const baltimoreMarker = new google.maps.Marker({position: {lat: 39.2904, lng: -76.6122 }, map: myMap});

}

window.onload = onloader;
