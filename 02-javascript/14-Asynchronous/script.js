'use strict';

// https://restcountries.com/v2/

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
`;

  countriesContainer.insertAdjacentHTML('beforeend', html);

  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);

  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMessage = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMessage} ${response.status}`);

    return response.json();
  });
};

///////////////////////////////////////
/** //// Welcome to CallBack hell
 *
 
 const getCountryAndNeighbour = function (country) {
   // AJAX call country 1
   const request = new XMLHttpRequest();
   request.open('GET', `https://restcountries.com/v2/name/${country}`);
   request.send();
   
   request.addEventListener('load', function () {
     const [data] = JSON.parse(this.responseText);
     
     // Render country 1
     renderCountry(data);
     
     // Get neighbour country
     const [neighbour] = data?.borders;
     
     // AJAX call country 2
     const request2 = new XMLHttpRequest();
     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
     request2.send();
     
     request2.addEventListener('load', function () {
       const data2 = JSON.parse(this.responseText);
       
       // Render neighbour - country 2
       renderCountry(data2, 'neighbour');
      });
    });
  };
  
  // getCountryAndNeighbour('egypt');
  // getCountryAndNeighbour('Palestine');
  getCountryAndNeighbour('saudi arabia');
  
  // callback hell
  setTimeout(() => {
    console.log('1 Second Passed');
    setTimeout(() => {
      console.log('2 Second Passed');
      setTimeout(() => {
        console.log('3 Second Passed');
        setTimeout(() => {
          console.log('4 Second Passed');
        }, 1000);
      }, 1000);
    }, 1000);
  }, 1000);
  */

///////////////////////////////////////
/** //// Promises and the Fetch API
 *

const getCountryAndNeighbour = function (country) {
  // country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);

      // country 2
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'));
};

// getCountryAndNeighbour('indonesia');
getCountryAndNeighbour('Australia');

 */

///////////////////////////////////////
/** //// Handling Rejected Promises
 const getCountryAndNeighbour = function (country) {
   // country 1
   fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);

      // country 2
      const neighbour = data[0].borders[0];
      
      if (!neighbour) return;
      
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err =>
      renderError(`Something went worng 💥💥💥 ${err.message}. Try again!`)
      )
      .finally(() => (countriesContainer.style.opacity = 1));
    };
    
    btn.addEventListener('click', function () {
      // getCountryAndNeighbour('indonesia');
      getCountryAndNeighbour('Australia');
    });
    */

///////////////////////////////////////
/** //// Throwing Errors Manually

const getCountryAndNeighbour = function (country) {
  // country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const [neighbour] = data[0]?.borders;

      if (!neighbour) throw new Error('No neighbour found!');

      // country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      // console.log(err);
      console.error(`${err} 💥💥💥`);
      renderError(`Something went worng 💥💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  // getCountryAndNeighbour('Germany');
  getCountryAndNeighbour('Australia');
  // getCountryAndNeighbour('indonesiaaa');
});
*/

///////////////////////////////////////
/** ///// Coding Challenge #1
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, 
you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, 
  examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, 
  like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. 
  Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. 
  Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. 
  This is an error with the request. Remember, fetch() does NOT reject the promise in this case. 
  So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, 
  and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, 
    no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474


const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(err);
      renderError(err.message);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

const whereAmI = function (lng, lat) {
  getJSON(`https://geocode.xyz/${lng},${lat}?geoit=json`, 'Please wait a while')
    .then(data => {
      console.log(`You are in ${data.city}, ${data.country}`);
      getCountryData(data.country);
    })
    .catch(err => {
      console.error(err);
      renderError(err.message);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', function () {
  whereAmI(52.508, 13.381);
  whereAmI(19.037, 72.873);
  whereAmI(-33.933, 18.474);
});
*/

///////////////////////////////////////
/** ///// The Event loop in practice

console.log('Task Start');

setTimeout(() => {
  console.log('Timer for 0 Seconds');
}, 0);

Promise.resolve('Play').then(res => {
  for (let i = 0; i < 1000000000; ++i);

  console.log(res);
});

console.log('Task End');
*/

///////////////////////////////////////
/** ///// Build a Simple Promie 
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happing 📢');
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      resolve('You WON 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 1000);
});

lotteryPromise
  .then(res => console.log(res))
  .catch(err => console.error(err.message));


// callback hell
setTimeout(() => {
  console.log('1 Second Passed');
  setTimeout(() => {
    console.log('2 Second Passed');
    setTimeout(() => {
      console.log('3 Second Passed');
      setTimeout(() => {
        console.log('4 Second Passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);


///// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 second passed');
  });

// Static methods @ Promise constructor = excuted immediately
Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Promblem!')).catch(msg => console.error(msg));
*/

///////////////////////////////////////
/** ///// Promisifying the Geolocation API 

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => renderCountry(data[0]))
    .catch(err => {
      console.error(err);
      renderError(err.message);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

const getCurrentPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = function () {
  getCurrentPosition().then(position => {
    const { latitude: lat, longitude: lng } = position.coords;

    getJSON(
      `https://geocode.xyz/${lng},${lat}?geoit=json`,
      'Please wait a while'
    )
      .then(data => {
        console.log(data);
        console.log(`You are in ${data.city}, ${data.prov}`);
        getCountryData('egypt');
      })
      .catch(err => {
        console.error(err);
        renderError(err.message);
      })
      .finally(() => (countriesContainer.style.opacity = 1));
  });
};

btn.addEventListener('click', whereAmI);
*/

///////////////////////////////////////
/** ///// Coding Challenge #2
For this challenge you will actually have to watch the video! Then, build the image 
loading functionality that I just showed you on the screen.
Your tasks:
Tasks are not super-descriptive this time, so that you can figure out some stuff by 
yourself. Pretend you're working on your own.

PART 1
1. Create a function 'createImage' which receives 'imgPath' as an input. 
  This function returns a promise which creates a new image (use 
  document.createElement('img')) and sets the .src attribute to the 
  provided image path
2. When the image is done loading, append it to the DOM element with the 
  'images' class, and resolve the promise. The fulfilled value should be the 
  image element itself. In case there is an error loading the image (listen for 
  the'error' event), reject the promise
3. If this part is too tricky for you, just watch the first part of the solution

PART 2
4. Consume the promise using .then and also add an error handler
5. After the image has loaded, pause execution for 2 seconds using the 'wait'
  function we created earlier
6. After the 2 seconds have passed, hide the current image (set display CSS 
  property to 'none'), and load a second image (Hint: Use the image element 
  returned by the 'createImage' promise to hide the current image. You will 
  need a global variable for that)
7. After the second image has loaded, pause execution for 2 seconds again
8. After the 2 seconds have passed, hide the current image

Test data: Images in the img folder. Test the error handler by passing a wrong 
  image path. Set the network speed to “Fast 3G” in the dev tools Network tab, 
  otherwise images load too 
  
  const imagesContainer = document.querySelector('.images');

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imagesContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject('imgae not found');
    });
  });
};

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

let curImg;

createImage('img/img-1.jpg')
  .then(imgEl => {
    curImg = imgEl;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    curImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(imgEl => {
    curImg = imgEl;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    curImg.style.display = 'none';
  })
  .catch(errMsg => {
    console.error(errMsg);
  });
*/

///////////////////////////////////////
/*///// Consuming Promises with Async/Await
   ///// Error Handling With try...catch 

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse Geolocation
    const revGeo = await fetch(`https://geocode.xyz/${lng},${lat}?geoit=json`);
    if (!revGeo.ok) throw new Error('Problem with getting location 💥');

    const dataGeo = await revGeo.json();

    // Country Data
    const res = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Country not found');

    const data = await res.json();

    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    renderError(`Something went wrong ... ${err.message}`);

    throw err;
  }
};

console.log('1: Start getting Location');

(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }
  console.log('3: Finished getting location');
})();
*/

///////////////////////////////////////
/*///// Running Promises in Parallel 

const get3Countries = async function (c1, c2, c3) {
  try {
    // excute sequentially
    const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);
    console.log(data1.capital, data2.capital, data3.capital);

    // excure in parallel
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);

    data.map(d => console.log(d[0].capital));
  } catch (err) {
    throw err;
  }
};

get3Countries('egypt', 'palestine', 'syria');
*/

///////////////////////////////////////
/*///// Promise Combinators: race, allSettled, any 

// Promise.race: acts like a short circit for the first winning promise
(async function () {
  const data = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/syria`),
    getJSON(`https://restcountries.com/v2/name/tanzania`),
  ]);
  console.log(data[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v2/name/egypt`),
  timeout(1),
  // getJSON(`https://restcountries.com/v2/name/egypt`),
  // getJSON(`https://restcountries.com/v2/name/tanzania`),
])
  .then(data => console.log(data[0]))
  .catch(err => console.error(err.message));

/// allSettled vs. all ///
// allSettled: returns an array all promises
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
]).then(data => console.log(data));

// Promise.all = short circit first rejected
Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
]).then(data => console.log(data));

// Promise.any [ES2021]: return first fulfilled promise, and ignores rejected ones
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another Success'),
]).then(data => console.log(data));
*/

/* ///// Coding Challenge #3
Your tasks:
PART 1
1. Write an async function 'loadNPause' that recreates Challenge #2, this time 
  using async/await (only the part where the promise is consumed, reuse the 
  'createImage' function from before)
2. Compare the two versions, think about the big differences, and see which one 
  you like more
3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
  in the dev tools Network tab

  PART 2
1. Create an async function 'loadAll' that receives an array of image paths 
  'imgArr'
2. Use .map to loop over the array, to load all the images with the 
  'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array
5. Add the 'parallel' class to all the images (it has some CSS styles)
Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function
*/

const imagesContainer = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// Part1: Creating Promises
const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imagesContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('imgae not found'));
    });
  });
};

// Part2: Consuming promises
const loadNPause = async function () {
  try {
    // load image 1
    let img = await createImage('img/img-1.jpg');
    await wait(2);
    img.style.display = 'none';

    // load image 2
    img = await createImage('img/img-2.jpg');
    await wait(2);
    img.style.display = 'none';

    // handle error
  } catch (err) {
    renderError(err.message);
  }
};
// loadNPause();

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async path => await createImage(path));
    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);

    imgsEl.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};
loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
