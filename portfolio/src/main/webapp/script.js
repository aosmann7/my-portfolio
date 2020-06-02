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

function getRandomGreeting() {
    const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

    // Pick a random greeting.
    var greeting = greetings[Math.floor(Math.random() * greetings.length)];
    return greeting;
}

/**
 * Fetches data from server and adds it to home page.
 */
function onloader(){
  fetch("/data").then(response => response.json()).then((infoAboutMe) => {
    document.getElementById("Introduction").append(`${getRandomGreeting()} ${infoAboutMe[0]} ${infoAboutMe[1]} ${infoAboutMe[2]}`)
  });
}
