/* MAIN FILE JS */

// CLOCK TIME PART
// 
// GET A VALID DATE
function validDate(type) {
    return type < 10 ? `0${type}`: type;
}
// GET TIME EVERY SECOND
let timeInt = setInterval(timeNow, 1000);
function timeNow() {
    let dateNow = new Date();
    // GET THE TIME DETAILS
    let min = validDate(dateNow.getMinutes());
    let hours = validDate(dateNow.getHours());
    let sec = validDate(dateNow.getSeconds());
    // DOM
    let clockNow = document.getElementById('clock-now');
    // SET TIME
    clockNow.innerHTML = `${hours} : ${min} : ${sec}`;
}
// CALL THE FUNCTION TO GET CURRENT TIME
timeNow();

// GET DATES NOW
// 
// MILADI DATE

const miladDate = document.getElementById('miladDate');
let dateNow = new Date();
let fullDate = dateNow.toDateString();
let [,month,monthDay,year] = fullDate.split(' ');
// SET THE MILADI DATE
miladDate.innerHTML = `${month} ${monthDay}, ${year}`;

// HIJRI DATE

let hijriNow = new Intl.DateTimeFormat('fr-TN-u-ca-islamic', {day: 'numeric', month: 'long',weekday: 'long',year : 'numeric'}).format(Date.now());
let [,dayHijri,monthHijri,yearHijri] = hijriNow.split(' ');
let hijriDate = document.getElementById('hijriDate');
// SET THE HIJRI DATE
hijriDate.innerHTML = `${monthHijri} ${dayHijri}, ${yearHijri}`;

// CURR DAY

// FUNCTION TO GET THE CURRENT DAY
function getTheCurrentDay(index) {
     let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
     return days[index];
}
let currDay = document.getElementById('currDay');
currDay.innerHTML = getTheCurrentDay(dateNow.getDay());

// CURR SEASON

// FUNCTION TO GET THE CURRENT SEASON
function getSeason(dayOfMonth,result) {
    let months = [
        [12,1,2],
        [3,4,5],
        [6,7,8],
        [9,10,11]
    ];
    let seasons = ['Winter','Spring','Summer','Autumn'];
    months.forEach((item,indx) => {
        if(item.includes(dayOfMonth)){
            result = seasons[indx];
        }
    })
    return result;
};
// DOM
let season = document.getElementById('season');
let imgSeason = document.getElementById('img-season');
// SET THE CURRENT SEASON
let validMonth = dateNow.getMonth() + 1;
season.innerHTML = getSeason(validMonth);
// GET THE IMG SEASON
switch(getSeason(validMonth)){
    case 'Winter':
     imgSeason.src = 'images/season/winter.png';break;
    case 'Spring':
     imgSeason.src = 'images/season/spring.png';break;
    case 'Summer':
     imgSeason.src = 'images/season/summer.png';break;
    case 'Autumn':
     imgSeason.src = 'images/season/fall.png';break;
}


// ASS SOME ANIMATION TO THE DATE SECTION
//////////////////////////////////////////
// DOM
let homeDates = document.querySelectorAll('.home--date-group');
homeDates.forEach((date,indx) => {
    date.style.transitionDelay = `${(indx + 1) * 100}ms`;
})