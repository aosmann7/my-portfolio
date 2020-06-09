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
  const infoWindow = new google.maps.InfoWindow({content: "My hometown for the past 11 years. A quiet city with no attractions really other than George Mason's home."});
  homeTownMarker.addListener("click", () => {infoWindow.open(myMap, homeTownMarker);});
  createMarkers(myMap);
}
/**
 * Creates markers of all major cities I've been to and adds to page.
 */
function createMarkers(myMap){
  const ethiopiaMarker = new google.maps.Marker({position: {lat: 8.9806, lng: 38.7578}, map: myMap, title: "My Heritage!"});
  const dubaiMarker = new google.maps.Marker({position: {lat: 25.2048, lng: 55.2708 }, map: myMap, title: "Vacation!"});
  const jeddahMarker = new google.maps.Marker({position: {lat: 21.4858, lng: 39.1925 }, map: myMap, title: "Visiting an Uncle for the first time!"});
  const torontoMarker = new google.maps.Marker({position: {lat: 43.6532, lng: -79.3832 }, map: myMap, title: "First time travelling outside the U.S!"});
  const sanFranMarker = new google.maps.Marker({position: {lat: 37.7749, lng: -122.4194 }, map: myMap, title: "First time travelling to west coast!"});
  const sanDiegoMarker = new google.maps.Marker({position: {lat: 32.7157, lng: -117.1611 }, map: myMap, title: "Beautiful Beaches here!"});
  const LAMarker = new google.maps.Marker({position: {lat: 34.0522, lng: -118.2437 }, map: myMap});
  const manhattanMarker = new google.maps.Marker({position: {lat: 40.7831, lng: -73.9712 }, map: myMap});
  const orlandoMarker = new google.maps.Marker({position: {lat: 28.5383, lng: -81.3792 }, map: myMap});
  const myrtleBeachMarker = new google.maps.Marker({position: {lat: 33.6891, lng: -78.8867 }, map: myMap});
  const DCMarker = new google.maps.Marker({position: {lat: 38.9072, lng: -77.0369 }, map: myMap});
  createInfoWindows(myMap, ethiopiaMarker, "I came here in the summer of 2018 for the first time to see my family's upbringing.");
  createInfoWindows(myMap, dubaiMarker, "Visited Dubai before going to Ethiopia and saw some of the main tourist attractions including the Burj Khalifa, Burj Al-Arab, Dubai Mall, and experienced the immense heat.")
  createInfoWindows(myMap, jeddahMarker, "Visited here in the winter of 2016 to see an uncle I've never met before.");
  createInfoWindows(myMap, torontoMarker, "Visted family here in 2011. It was the first time I travelled outside of the U.S and went on a plane.");
  createInfoWindows(myMap, sanFranMarker, "Visted here summer of 2019 as part of a California Trip. Went on a bike ride across the Golden Gate Bridge, saw Alcatraz Island, and went to Pier 39.");
  createInfoWindows(myMap, sanDiegoMarker, "Visited the beautiful beaches here and saw exotic animals at the San Diego Zoo.");
  createInfoWindows(myMap, LAMarker, "The infamous LA. Saw Hollywood, Beverly Hills, and went to Venice Beach!");
  createInfoWindows(myMap, manhattanMarker, "Have been to New York a few times. Main attractions are times square, empire state building, and the statue of liberty.");
  createInfoWindows(myMap, orlandoMarker, "Came here in summer of 2012 and spent a week at Disney World having fun at all the parks!");
  createInfoWindows(myMap, myrtleBeachMarker, "Spent a week here having fun in this beach town in South Carolina!");
  createInfoWindows(myMap, DCMarker, "DC is about 20 minutes from my house. Main attractions here are the White House, Lincoln Memorial, 9-11 Memorial, and the US Monument.");

}
/**
 * Adds Info Windows for markers.
 */
function createInfoWindows(map, marker, description){
  const infoWindow = new google.maps.InfoWindow({content: description});
  marker.addListener("click", () => {infoWindow.open(map, marker);});
}

window.onload = onloader;
