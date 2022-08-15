/* STOPWATCH SCRIPT */

// DARK MODE & LIGHT THEME
// // // // // // // // //
// ADD LIGHT PROPERTIES TO THE ROOT ELEMENT TO ADD IT TO TO THE HOVER ICONS
document.documentElement.style.setProperty('--hover-bg', '#303640');
document.documentElement.style.setProperty('--bg-active', '#e5e5e5');
// DOM ELEMENTS
const checkTheme = document.getElementById('act');
// CLICK EVENT
checkTheme.addEventListener('click', () => {
    // CHECK IF THE CHECKBOX IS CHECKED
    if(checkTheme.checked) {
        document.body.classList.remove('light');
        document.documentElement.style.setProperty('--hover-bg', '#333683'); // BG FOR DARK
        document.documentElement.style.setProperty('--bg-active', '#22244d'); // BG FOR DARK
        document.body.classList.add('dark');
        localStorage.setItem('dark', true);
    }else {
        document.body.classList.remove('dark');
        document.documentElement.style.setProperty('--bg-active', '#e5e5e5'); // BG FOR LIGHT 
        document.documentElement.style.setProperty('--hover-bg', '#303640'); // BG FOR LIGHT
        document.body.classList.add('light');
        localStorage.setItem('dark', false);
    }
})

// THEME COLOR
// // // // //
// DOM ELEMENTS
const colors = [...document.querySelectorAll('header .color')];
// CHANGE COLOR THEME
colors.forEach((col,) => {
    col.addEventListener('click', () => {
        // GET THE ACTIVE ELEMENT
        let activeElement = colors.filter((item) => {
            return item.classList.contains('active');
        })[0].dataset.color;
        // GET THE ACTIVE ELEMENT CLASS AND STORED TO THE LOCAL STORAGE
        // REMOVE ALL ACTIVE COLORS AND ADD ACTIVE TO THE CURRENT
        colors.forEach((color) => color.classList.remove('active'));
        col.classList.add('active');
        // GET THE DATA COLOR ATTRIBUTE AND ADD IT AS A CLASS TO THE BODY
        let dataColor = col.dataset.color;
        document.body.classList.remove(activeElement);
        document.body.classList.add(dataColor);
        // SOME JQUERY TO GET THE MAIN COLOR
        let bg = $('.main-color').css('backgroundColor');
        document.documentElement.style.setProperty('--main-content-color', bg);
        // SWITCH INPUT
        document.querySelector('.switch-label').style.setProperty('--main-bg-on', bg);
        let actLocal = colors.filter((item) => {
            return item.classList.contains('active');
        })[0];
        localStorage.setItem('themeIndex', colors.indexOf(actLocal));
    })
})

// DROP DOWN SETTINGS MENU
// // // // // // // // //
// DOM ELEMENTS
const headMenu = document.querySelector('.header--menu');
const settBtn = document.querySelector('.header--sett-btn');
const settIcon = document.querySelector('.header--sett-icon');
// TOGGLE MENU DISPLAY
settBtn.addEventListener('click', () => {
    headMenu.classList.toggle('active');
    settIcon.classList.toggle('active');
});


// CHECK IF THE DARK MODE IS ON
///////////////////////////////
isDarkModaOn();
function isDarkModaOn() {
    let darkLoc = localStorage.getItem('dark');
    if(darkLoc && eval(darkLoc)) {
        document.body.classList.remove('light');
        document.documentElement.style.setProperty('--hover-bg', '#333683'); // BG FOR DARK
        document.documentElement.style.setProperty('--bg-active', '#22244d'); // BG FOR DARK
        document.body.classList.add('dark');
        checkTheme.checked = true;
    }
    else {
        checkTheme.checked = false;
        document.body.classList.remove('dark');
        document.documentElement.style.setProperty('--bg-active', '#e5e5e5'); // BG FOR LIGHT 
        document.documentElement.style.setProperty('--hover-bg', '#303640'); // BG FOR LIGHT
        document.body.classList.add('light');
    }
}

// CHECK THE BODY THEME
///////////////////////
checkBodyTheme();
function checkBodyTheme() {
    let theme = localStorage.getItem('themeIndex');
    if(theme) {
        colors[eval(theme)].click();
    }
}

// START WITH POPUPS
const addSucc = document.getElementById("add-succ");
const saveSucc = document.getElementById("save-succ");
const delSucc = document.getElementById("del-succ");

function addedSucc(){
    addSucc.classList.add("active");
    setTimeout(() => {
        addSucc.classList.remove("active");
    }, 2500)
}
function savedSucc(){
    saveSucc.classList.add("active");
    setTimeout(() => {
        saveSucc.classList.remove("active");
    }, 2500)
}
function deletedSucc(){
    delSucc.classList.add("active");
    setTimeout(() => {
        delSucc.classList.remove("active");
    }, 2500)
}

// START WITH STOP WATCH PLAY ICON
//////////////////////////////////
/* 
INITIAL
 => count of 0;
PLAY BTN CLICK
 => start ++
 => parse 
 => toggle play
*/
// DOM
const playStop = document.getElementById('playStop');
const pauseStop = document.getElementById('pauseStop');
const mainStop = document.getElementById('mainStop');
const reSTop = document.getElementById('reSTop');
// INITAIL VALUE
let countS = 0;
let paused = false;
let int;
// TOGGLE CLASS BTN CONTROL
playStop.addEventListener('click', function() {
    this.classList.add('d-none');
    pauseStop.classList.remove('d-none');
})
pauseStop.addEventListener('click', function() {
    this.classList.add('d-none');
    playStop.classList.remove('d-none');
})
// FUNCTIN TO PLAY THE STOP WATCH
playStop.addEventListener('click', () => {
    paused = false;
    playWatch();
})
function playWatch() {
    int = setInterval(() => {
        if(paused) {
            clearInterval(int);
        }else {
            countS += 1000;       
            mainStop.innerHTML = getDateTime(countS);
        }
    }, 1000)
}
// FUNCTION TO PAUSE THE STOP WATCH
pauseStop.addEventListener('click', () => paused = true);
// FUNCTION TO RESET THE STOP WATCH
reSTop.addEventListener('click', () => {
    clearInterval(int);
    countS = 0 // RESET 
    pauseStop.classList.add('d-none') // RESET BTNS
    playStop.classList.remove('d-none') // RESET BTNS
    mainStop.innerHTML = getDateTime(countS);
});
// FUNCTION TO GET TIME
function getDateTime(df) {
   let h = Math.floor(df % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
   let m = Math.floor(df % (1000 * 60 * 60) / (1000 * 60));
   let s = Math.floor(df % (1000 * 60) / (1000));
   // CREATE THE DATE ARRAY
   let arrTime = [correctTime(h),correctTime(m),correctTime(s)];
   let endTypeOfDate = arrTime.splice(2,1);
   let arrDateMaped = arrTime.map((type) => {
       return (parseInt(type) + 0) === 0 ? '00:' : `${type}:`;
   });
   // GET FINAL DATE
   let fda = [...arrDateMaped,...endTypeOfDate];
   let outDate = `${fda[0]}${fda[1]}${fda[2]}`;
   return outDate;
}

// FUNCTION TO CORRECT TIME IN MIN/HRS/SEC
//////////////////////////////////////////
function correctTime(type) {
    return +type < 10 ? `0${type}`: type;
}

// START WORKING WITH LOCAL STORAGE
///////////////////////////////////
/* 
FCT => UPDATE TABLE CONTENT
PAUSE || RESTART =>  STORE DATA 
FCT => TABLE CONTENT IS EMPTY

*/

pauseStop.addEventListener('click', storeStop);

function storeStop() {
    let loc = localStorage.getItem('stop');
    loc ? arr = JSON.parse(loc) : arr = [];
    // GET DATE
    let dnow = new Date();
    let formDate = getStrDate(dnow).substring(0,6);
    let formTime = `${correctTime(dnow.getHours())}:${correctTime(dnow.getMinutes())}`;
    let finalDate = `${formDate} • ${formTime}`;
    // CREATE DATA OBJECT
    let obj = {
        marked: false,
        date: finalDate,
        dur: getDateTime(countS),
        name: ''
    }
    // ARR PUSH
    arr.push(obj);
    // UPDATE LOCAL STORAGE
    localStorage.setItem('stop', JSON.stringify(arr));
    updateStop();
    isHistEmp();
    updateNameStop();
}

// FUNCTION TO GET THE DATE IN STRING
/////////////////////////////////////
function getStrDate(time) {
    let c = new Date(time).toDateString().split(' ').slice(1).join(' ');
    return `${c.split(' ')[1]} ${c.split(' ')[0]}, ${c.split(' ')[2]}`;
}

// FUNCTION TO UPDATE CONTENT
// DOM
let tabelCont = document.querySelector('.tb--row');
updateStop();
function updateStop() {
    let loc = localStorage.getItem('stop');
    loc ? arr = JSON.parse(loc) : arr = [];
    let content = '';
    arr.forEach((elem, indx) => {
        content += `
        <tr class="tab--main p-100 bb-50" data-idx="${indx}">
        <td class="rank pdx-15">${indx + 1}</td>
        <td class="name">
            <input type="text" class="tab--name p-100" name="" id="" placeholder="Tap to edit" maxlength="10" style="width: 120px;" value="${elem.name}">
        </td>
        <td class="temp">${elem.dur}</td>
        <td class="dat">${elem.date}</td>
        <td class="icons--tab">
            <ion-icon name="close-outline" style="height: 100%;" class="close--ic cursor" onclick="delHist(${indx})"></ion-icon>
        </td>
    </tr>
    </tr>
        `
    })
    tabelCont.innerHTML = content;
    addBgOdded();
}

// FUNCTIN TO CHECK IF THE ARR STOP WATCH EMPTY
let tableEmpty = document.querySelector('.table--empty');
let dataHid = document.querySelectorAll('[data-hidden="true"]');
isHistEmp();
function isHistEmp() {
    let loc = localStorage.getItem('stop');
    loc ? arr = JSON.parse(loc) : arr = [];
    if(arr.length) {
        tableEmpty.classList.add('d-none');
        dataHid.forEach((one) => one.classList.remove('d-none'));
    }else {
        dataHid.forEach((one) => one.classList.add('d-none'));
        tableEmpty.classList.remove('d-none');
    }
}

// CLEAR ALL HISTORY
let clearHist = document.getElementById('clearHist');
clearHist.addEventListener('click', () => {
    localStorage.removeItem('stop');
    updateStop();
    isHistEmp();
    updateNameStop();
})

// REMOVE SPECIFIC ITEM HISTORY
function delHist(indx) {
    let loc = localStorage.getItem('stop');
    loc ? arr = JSON.parse(loc) : arr = [];
    arr.splice(indx, 1);
    localStorage.setItem('stop', JSON.stringify(arr));
    updateStop();
    isHistEmp();
    updateNameStop();
    deletedSucc();
}

// UPDATE NAME
updateNameStop();
function updateNameStop() {
    let loc = localStorage.getItem('stop');
    loc ? arr = JSON.parse(loc) : arr = [];
    arr.forEach((elem, indx) => {
        let inputName = document.querySelector(`[data-idx="${indx}"] input`);
        inputName.addEventListener('blur', function() {
            if(this.value.trim()) {
                let loc = localStorage.getItem('stop');
                loc ? arr = JSON.parse(loc) : arr = [];
                arr[indx].name = this.value;
            }else {
                let loc = localStorage.getItem('stop');
                loc ? arr = JSON.parse(loc) : arr = [];
                arr[indx].name = '';
            }
            localStorage.setItem('stop', JSON.stringify(arr));
            updateStop();
            addBgOdded();
            updateNameStop();
        })
    })
}

// // ADD CLASS TO ODD ELEMENT
addBgOdded();
function addBgOdded() {
    let loc = localStorage.getItem('stop');
    loc ? arr = JSON.parse(loc) : arr = [];
    if(arr.length) {
        let rows = [...document.querySelectorAll(`[data-idx]`)];
        let filt = rows.filter((o, indx) => !(indx%2));
        filt.forEach((o, dx) => !(dx % 2));
        filt.forEach((one) => one.classList.add('w-50'));
    }
}

// FUNCTION TO GO FULL SCREEN
// DOM
let enter = document.querySelector('.enter');
let exit = document.querySelector('.exit');
let stopContainer = document.querySelector('.stop--section');
let history = document.querySelector('.stop--history');
// ENTER FULL SCREEN
enter.addEventListener('click', () => {
    enter.classList.add('d-none');
    stopContainer.classList.remove('bb-100')
    stopContainer.classList.add('active');
    history.classList.add('d-none');
    exit.classList.remove('d-none');
})
// EXIT FULL SCREEN
exit.addEventListener('click', () => {
    exit.classList.add('d-none');
    stopContainer.classList.add('bb-100')
    stopContainer.classList.remove('active');
    history.classList.remove('d-none');
    enter.classList.remove('d-none');
})
