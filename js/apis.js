/* APIS */

// GET COUNTRY WITH API
// 
async function getCountry() {
    let fetched = await fetch('https://api.ipregistry.co/?key=gn597io4kfsls02c');
    let data = await fetched.json();
    let c = data.location;
    // ASSIGN DATA LOCATION TO AN OBJECT
    let locationInfo = {
        country : data.location.country.name,
        city : c.city ? c.city : c.country.capital,
        flag: data.location.country.flag.emojitwo
    }
    return locationInfo;
}
// STORE THE VALUE TO THE LOCAL STORAGE
getCountry().then((data) => localStorage.setItem('location',JSON.stringify(data)));

// GET SOME IMGS FROM THIS COUNTRY
// 
async function getImages() {
    let Key = '563492ad6f91700001000001ac3e861d736846ae94749becda106954';
    // FIRST IMAGE RESULTS
    let response1 = await fetch(`https://api.pexels.com/v1/search?query=${JSON.parse(localStorage.getItem('location')).country}`, {
        headers: {
            // API KEY
            Authorization: Key 
        }
    });
    // GET THE NEXT IMAGES RESULT
    let out1 = await response1.json();
    let response2 = await fetch(out1.next_page,{
        headers: {Authorization: Key}
    });
    // OUTPUT
    let out2 = await response2.json();
    // GET AN ARRAY OF IMAGES
    let images1 = out1.photos.map((it) => it.src.large2x);
    let images2 = out2.photos.map((it) => it.src.large2x);
    let images = [...images1,...images2];
    return images;
}

// WORK WITH IMGS
// 
getImages().then((imgs) => {
    // DECLARE THE CURRENT INDEX FROM ARRAY IMAGES
    let home = document.querySelector('main.home .background-img');
    let wrapper = document.getElementById('wrapper');
    let loader = document.getElementById('loader');
    let homeDates = document.querySelectorAll('.home--date-group');
    // GET THE FIRST IMG
    let ran = Math.floor(Math.random() * imgs.length);
    let imgTest = document.createElement('img');
    imgTest.src = imgs[ran];
    imgTest.addEventListener('load', () => {
        home.style.backgroundImage = `url('${imgs[ran]}')`;
        imgTest = null;
        wrapper.classList.remove('d-none');
        $(loader).fadeOut(100);
        wrapper.classList.add('active');
        homeDates.forEach((grp) => grp.classList.add('active'));
    })
});

// GET THE CURRENT WEATHER

async function getWeather() {
    let key = 'c4d40d903fc57d902e3add34df8cff21';
    // GET LOCATION INFO FROM LOCAL STORAGE
    let locat = JSON.parse(localStorage.getItem('location'));
    let city = locat.city;
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`);
    let data = await response.json();
    // CHECK IF THE RESPONSE SUCCESS OR FAILED
    return response.ok ? data : '';
}

// WORK WITH WEATHER
// 
getWeather().then((data) => {
    // DOM
    let degree = document.getElementById('degree');
    let city = document.getElementById('city');
    let weath = document.getElementById('weather');
    let cityLocal = JSON.parse(localStorage.getItem('location')).city;
    if(data){
        // GET DATA
        const {temp} = data.main;
        const {main,description} = data.weather[0];
        // REPLACE DATA
        city.innerHTML = `${cityLocal}`;
        degree.innerHTML = `${Math.round(temp)} °C`;
        weath.src = `images/weather/${main}.png`;
        weath.alt = description;
        // IF THE RESPONSE FAILED
    }else{
        city.innerHTML = `• ${cityLocal}`;
        weath.classList.add('d-none');
    }
});

// GET THE FLAG AVATAR
let countryAvatar = document.getElementById("country-avatar");
let flag = JSON.parse(localStorage.getItem('location')).flag;
// SET THE AVATAR
countryAvatar.src = flag;
