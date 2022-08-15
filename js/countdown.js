/* COUNTDOWN SCRIPT */

// PRELOAD FUNCTIONS
filterArrAdvanced();


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


// COUNTDOWN TABS
// // // // // //

// DOM ELEMENTS
const tabs = [...document.querySelectorAll('.count--tab')];
const countSections = document.querySelectorAll('.count--section');
// TOGGLE ACTIVE CLASS
tabs.forEach((tab, indx) => {
    tab.addEventListener('click', () => {
        localStorage.setItem('tabIndex', indx);
        // REMOVE ALL ACTIVE CLASSES
        countSections.forEach((sect) => { // SECTIONS
            sect.classList.add('d-none');
        })
        tabs.forEach((tab) => { // TABS
            tab.classList.remove('active');
            tab.classList.remove('main-text');
            tab.classList.remove('main-border');
        });
        // ADD ACTIVE CLASSES AND SHOW THE TARGET SECTION
        countSections[indx].classList.remove('d-none');
        tab.classList.add('active');
        tab.classList.add('main-text');
        tab.classList.add('main-border');
    })
})

// CHOOSE A COUNTDOWN SECTION
// // // // // // // // // //
// DOM
const countDownOptions = [...document.querySelectorAll('.count--select-option')];
// TOGGLE ACTIVE CLASS
countDownOptions.forEach((option) => {
    option.addEventListener('click', () => {
        countDownOptions.forEach((option) => option.classList.remove('main-border'));
        option.classList.add('main-border');
    });
})

// CLOSE ALL MODAL FUNCTION
// // // // // // // // //
// DOM
const closeModal = document.querySelectorAll('.close--count-modal');
const mainCountParentModal = document.getElementById('parent-count-modal');
const mainCountMainModal = document.getElementById('main-count-modal');
// CLOSE ALL MODAL
closeModal.forEach((close) => {
    close.addEventListener('click', () => {
        mainCountMainModal.classList.remove('open');
        mainCountParentModal.classList.add('hidded');
    })
});

// SHOW SELECT MODAL COUNTDOWN
// // // // // // // // // // //
// DOM
const countAddBtn = document.getElementById('new-count'); // BTN
// SHOW MAIN COUNTDOWN MODAL
countAddBtn.addEventListener('click', () => {
    mainCountParentModal.classList.remove('hidded');
    mainCountMainModal.classList.add('open');
})


// GET THE COUNTDOWN TYPE
// // // // // // // // //
// DOM
const getTypeBtn = document.getElementById('get-count-type');
const globalTypes = [...document.querySelectorAll('.count--global')];
const selectOptions = [...document.querySelectorAll('.count--select-option')];
const counSelectModal = document.getElementById('count--select-modal');
// SHOW THE SELECTED COUNTDOWN
getTypeBtn.addEventListener('click', () => {
    // GET INDEX
    let currentIndex = selectOptions.filter((type) => {
        return type.classList.contains('main-border');
    })[0].dataset.index;
    counSelectModal.classList.add('d-none');
    if(currentIndex == 1) {
        mainCountMainModal.style.width = '400px';
    }else mainCountMainModal.style.width = '900px';
    globalTypes[currentIndex].classList.remove('d-none');
})

// ADVANCED COUNTDOWN TYPE
// // // /// // /// // /// 
// DOM
const labelRadio = [...document.querySelectorAll('.label-radio')];
// INPUT RADIO SELECT
labelRadio.forEach((label) => {
    label.addEventListener('click', () => {
        // GET THE RADIO INPUT
        let selectRadio = label.firstElementChild.firstElementChild;
        // REMOVE ALL ACTIVE CLASS
        labelRadio.forEach((one) => {
            let selectRadio = one.firstElementChild.firstElementChild;
            selectRadio.classList.add('radio');
            selectRadio.classList.add('b-75');
            one.nextElementSibling.classList.add('d-none');
        });
        // ADD ACTIVE CLASS TO THE TARGET
        selectRadio.classList.remove('radio');
        selectRadio.classList.remove('b-75');
        label.nextElementSibling.classList.remove('d-none');
    })
})

// LABEL INPUT
/////////////////////
// DOM
const inputLabel = [...document.querySelectorAll('#parent-count-modal .label-input')];
inputLabel.forEach((label) => {
    label.addEventListener('click', () => {
        // FOCUS THE TARGET INPUT
        let mainInputTarget = label.parentElement.firstElementChild;
        mainInputTarget.focus();
    })
})

// INPUT FOCUS EFFECT
/////////////////////
// DOM
const inputDetails = [...document.querySelectorAll('#parent-count-modal .input--details-section')];
inputDetails.forEach((inp) => {
    inp.addEventListener('blur', checkLabel);
    inp.addEventListener('focus', () => {
        let label = inp.nextElementSibling;
        label.classList.add('main-text');
        inp.classList.add('main-border');
    })
})
// CALL THE CHECK LABEL FUNCTION
checkLabel();
// CHECK IF THE INPUT IS EMPTY OR NOT
function checkLabel() {
    inputDetails.forEach((inp) => {
        let labelTarget = inp.nextElementSibling;
        inp.classList.remove('main-border');
        labelTarget.classList.remove('main-text');
        if(inp.value) {
            labelTarget.classList.add('active');
        }else {
            labelTarget.classList.remove('active');
        }
    })
}

// THUMBNAIL CHANGE
//////////////////
// DOM
const thumbnailContainer = document.querySelector('.thumbnail--choosed');
const labelThumb = [...document.querySelectorAll('.label-thumb')];
const inputFileThumb = document.getElementById('origThumb');
// PREVIEW THE THUMBNAIL CONTAINER IMG
labelThumb.forEach((lab) => {
    inputFileThumb.addEventListener('change', function() {
        let reader = new FileReader();
        reader.addEventListener('load', () => {
            let thumbSrc = reader.result;
            thumbnailContainer.classList.remove('d-none');
            thumbnailContainer.nextElementSibling.classList.add('d-none');
            thumbnailContainer.firstElementChild.src = thumbSrc;
        })
        reader.readAsDataURL(this.files[0]);
    })
})

// CONTROL THE COUNTDOWN MODAL
//////////////////////////////
// DOM
const timerOptionInputs = [...document.querySelectorAll('.count-specific-input')];
let selectMonth = document.querySelector('.select--input');
// RESET MODAL INFO CLICKING THE ADD BTN
countAddBtn.addEventListener('click', () => {
    resetModalInfo();
    mainCountMainModal.style.width = '900px';
    counSelectModal.classList.remove('d-none');
});
// FUNCTION TO RESET THE COUNTDOWN MODAL
let currError = 0;
function resetModalInfo() {
    // HIDE MODALS TYPES
    globalTypes.forEach((one) => one.classList.add('d-none'));
    // RESET CHOOSE COUNTDOWN
    selectOptions.forEach((select) => select.classList.remove('main-border'));
    selectOptions[0].classList.add('main-border');
    // EMPTY INPUTS IN QUICK COUNTDOWN MODAL
    timerOptionInputs.forEach((timer) => {
        timer.firstElementChild.value = '';
    });
    // MAKE FIRST VALUE AS DEFAULT IN SELECT MONTH INPUT 
    selectMonth.options[0].selected = true;
    // RESET SELECTION IN ADVANCED COUNTDOWN SELECT TYPE
    labelRadio[0].click();
    // RESET DETAILS INPUT
    inputDetails.forEach((inp) => {
        inp.value = '';
        checkLabel();
    });
    // RESET THUMBNAIL
    thumbnailContainer.classList.add('d-none');
    labelThumb[1].classList.remove('d-none');
    document.getElementById('img--choosed').src = "";
    let advErr = document.getElementById('advanced-error');
    advErr.classList.add('d-none');
    advErr.classList.remove('active');
    currError = 0;
}

// MAKE USER TYPE ONLY NUMBERS
//////////////////////////////
timerOptionInputs.forEach((inp, indx) => {
    let input = inp.firstElementChild;
    if(indx !== 1) {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/[^0-9]/ig, '');
        })
    }
});

// ADD ADDING EFFECT TO ADD BTN
///////////////////////////////
// DOM
const quickBtn = document.getElementById('quick-add');
const advancedBtn = document.getElementById('advanced-add');
// QUICK BTN
quickBtn.addEventListener('click', function() {
    this.classList.add('loadBtn');
    this.lastElementChild.innerHTML = 'Adding...';
    this.disabled = true;
    setTimeout(quickValidation, 2000);
});
// ADVANCED BTN
advancedBtn.addEventListener('click', function() {
    this.classList.add('loadBtn');
    this.lastElementChild.innerHTML = 'Adding...';
    this.disabled = true;
    setTimeout(advancedValidation, 2000);
});

// ADVANCED MODAL VALIDATION
////////////////////////////
function advancedValidation() {
    // GET ACTIVE LABEL RADIO AND INPUTS
    let hasSelectMonth;
    let countdownInputs = [...document.querySelectorAll('.count--advanced-modal .count-specific-item')];
    let activeInputs = countdownInputs.filter((count) => {
        return !(count.classList.contains('d-none'));
    })[0];
    let mainCountInputs = [...document.querySelectorAll(`.count--advanced-modal #${activeInputs.id} .count-specific-input`)];
    // CHECK IF THE TARGET INPUTS HAS MONTH SELECT
    for(let i = 0;i < mainCountInputs.length;i++) {
        let input = mainCountInputs[i].firstElementChild;
        if(input.id === 'monthInput') {
            hasSelectMonth = true;
            break;
        }else hasSelectMonth = false;
    }
    let dataCountdownValid;
    // HAS SELECT MONTH
    if(hasSelectMonth) {
        // GET INPUTS AND DATE
        let inp1 = mainCountInputs[0].firstElementChild;
        let inp2 = mainCountInputs[2].firstElementChild;
        let inp3 = mainCountInputs[3].firstElementChild;
        let inp4 = mainCountInputs[4].firstElementChild;
        let inp5 = mainCountInputs[5].firstElementChild;
        let selectInput = mainCountInputs[1].firstElementChild;
        let selectedOption = selectInput.selectedOptions[0].value;
        // CHECK IF THE DATE IS VALID COMPLETELY
        if(inp1.value && inp2.value && inp3.value && inp4.value && inp5.value) {
            let dateSelected  = new Date(`${correctTime(inp1.value)} ${selectedOption}, ${inp2.value} ${correctTime(inp3.value)}:${correctTime(inp4.value)}:${correctTime(inp5.value)}`);
            // CONDITION 1: VALID DATE
            let cond1 = dateSelected == 'Invalid Date';
            // CONDITION 2: COMPARISON
            let a = new Date().getTime();
            let b = dateSelected.getTime();
            let cond2 = (b - a) <= 0;
            // CONDITION 3: EXIST DATE
            let c = dateSelected.toDateString().split(' ').slice(1).join(' ');
            let d = `${selectedOption} ${inp1.value.length == 1 ? correctTime(inp1.value) : inp1.value} ${inp2.value}`;
            let cond3 = c != d;
        // CONDITIONS RESULT
        if(cond1 || cond2 || cond3) {
            dataCountdownValid = false;
        }else dataCountdownValid = true;
        // IF THE INPUTS ARE EMPTY
        }else dataCountdownValid = false;
    }
    // HAS NO SELECT MONTH
    else {
        let inputsTimer = mainCountInputs.map((inp) => inp.firstElementChild);
        let numInpInvalid = inputsTimer.filter((inp) => !(inp.value));
        let isAll0 = inputsTimer.filter((inp) => parseInt(inp.value) == 0);
        if(numInpInvalid.length || (isAll0.length === inputsTimer.length)) {
            dataCountdownValid = false;
        }else dataCountdownValid = true;
    };

    // CHECK IF THE DETAILS INPUTS ARE NOT EMPTY
    let inpDetailsNotEmp;
    let numInpDetInvalid = inputDetails.filter((inp) => !(inp.value.trim()));
    if(numInpDetInvalid.length) {
        inpDetailsNotEmp = false;
    }else inpDetailsNotEmp = true;
    
    // CHECK IF THE THUMBNAIL IS CHOOSED
    let thumbExist;
    let thumbChoosed = document.getElementById('img--choosed');
    thumbExist = thumbChoosed.src.startsWith('data');

    // FINAL VALIDATION
    let finalValidation = dataCountdownValid && inpDetailsNotEmp && thumbExist;
    // START USING PROMISE
    let checkValidationPromise = new Promise((res,rej) => {
        if(finalValidation) {
            res(true);
        }else rej(false);
    });
    // START WITH LOCAL STORAGE TO STORE DATA
    checkValidationPromise.then((data) => {
        // HAS SELECT MONTH
        if(hasSelectMonth) {
        let loc = localStorage.getItem('advanced');
        loc ? arr = JSON.parse(loc) : arr = [];
        // SOME PREVIOUS VARIABLES
        let inp1 = mainCountInputs[0].firstElementChild;
        let inp2 = mainCountInputs[2].firstElementChild;
        let inp3 = mainCountInputs[3].firstElementChild;
        let inp4 = mainCountInputs[4].firstElementChild;
        let inp5 = mainCountInputs[5].firstElementChild;
        let selectInput = mainCountInputs[1].firstElementChild;
        let selectedOption = selectInput.selectedOptions[0].value;
        // GET Date selected
        let dateD  = new Date(`${correctTime(inp1.value)} ${selectedOption}, ${inp2.value} ${correctTime(inp3.value)}:${correctTime(inp4.value)}:${correctTime(inp5.value)}`);
        // GET NAME AND DESCRIPTION
        let countName = inputDetails[0].value;
        let countDescription = inputDetails[1].value;
        // GET THUMBNAIL
        let countThumbnail = thumbChoosed.src;
        // GET CURRENT DATE
        let dnow = new Date().toDateString().split(' ').slice(1);
        let dnowNum = new Date().getTime();
        let currentDate = `${dnow[1]} ${dnow[0]}, ${dnow[2]}`;
        // GET ENDED TIME
        let end = new Date(dateD.getTime()).toDateString().split(' ').splice(1);
        let endedTime = `${end[1]} ${end[0]}, ${end[2]}`;
        // CREATE THE MAIN OBJECT DATA
        let countData = {
            name: countName,
            description: countDescription,
            time: dateD.getTime(),
            start: dnowNum,
            edited: false,
            created: currentDate,
            thumbnail: countThumbnail,
            ended: endedTime
        }
        arr.push(countData);
        // UPDATE LOCAL STORAGE
        localStorage.setItem('advanced', JSON.stringify(arr));
        // CLOSE MODAL
        mainCountMainModal.classList.remove('open');
        mainCountParentModal.classList.add('hidded');
        // RESET BTN ADD ADVANCED
        setTimeout(() => {
            advancedBtn.disabled = false;
            advancedBtn.classList.remove('loadBtn');
            advancedBtn.lastElementChild.innerHTML = 'Add';
        }, 1200);
        // FUNCTIONS
        }
        // HAS NOT SELECT MONTH
        else {
            let loc = localStorage.getItem('advanced');
            loc ? arr = JSON.parse(loc) : arr = [];
            // GET TIME
            let y = parseInt(mainCountInputs[0].firstElementChild.value) * 365 * 24 * 60 * 60 * 1000;
            let d = parseInt(mainCountInputs[1].firstElementChild.value) * 24 * 60 * 60 * 1000;
            let h = parseInt(mainCountInputs[2].firstElementChild.value) * 60 * 60 * 1000;
            let m = parseInt(mainCountInputs[3].firstElementChild.value) * 60 * 1000;
            let s = parseInt(mainCountInputs[4].firstElementChild.value) * 1000;
            let totalTime = (y + d + h + m + s) + new Date().getTime();
            // GET NAME AND DESCRIPTION
            let countName = inputDetails[0].value;
            let countDescription = inputDetails[1].value;
            // GET THUMBNAIL
            let countThumbnail = thumbChoosed.src;
            // GET CURRENT DATE
            let dnow = new Date().toDateString().split(' ').slice(1);
            let dnowNum = new Date().getTime();
            let currentDate = `${dnow[1]} ${dnow[0]}, ${dnow[2]}`;
            // GET ENDED TIME
            let end = new Date(totalTime).toDateString().split(' ').splice(1);
            let endedTime = `${end[1]} ${end[0]}, ${end[2]}`;
            // CREATE THE MAIN OBJECT DATA
            let countData = {
                name: countName,
                description: countDescription,
                time: totalTime,
                start: dnowNum,
                edited: false,
                created: currentDate,
                ended: endedTime,
                thumbnail: countThumbnail
            }
            arr.push(countData);
            // UPDATE LOCAL STORAGE
            localStorage.setItem('advanced', JSON.stringify(arr));
            // CLOSE MODAL
            mainCountMainModal.classList.remove('open');
            mainCountParentModal.classList.add('hidded');
            // RESET BTN ADD ADVANCED
            setTimeout(() => {
                advancedBtn.disabled = false;
                advancedBtn.classList.remove('loadBtn');
                advancedBtn.lastElementChild.innerHTML = 'Add';
            }, 1200);
            // FUNCTIONS
        }
        filterArrAdvanced();
        updateAdvanced();
        updateAdvancedTime();
        updateAdvancedTimeAfterReload();
        isAdvancedEmpty();
        checkEditedAdvanced();
        addedSucc();

    // IF THE ADVANCED MODAL IS NOT COMPLETED    
    }).catch((err) => {
        currError++;
        let advancedErr = document.getElementById('advanced-error');
        for(let i = 0; i < currError; i++) {
            if(i === 0) {
                advancedErr.classList.remove('d-none');
            }
            else if(i > 0) {
                advancedErr.classList.add('active');
                setTimeout(() => {
                    advancedErr.classList.remove('active');
                }, 300)
            }
        }
        // RESET BTN ADD ADVANCED
        advancedBtn.disabled = false;
        advancedBtn.classList.remove('loadBtn');
        advancedBtn.lastElementChild.innerHTML = 'Add';
    });
}

// FUNCTION TO CORRECT TIME IN MIN/HRS/SEC
//////////////////////////////////////////
function correctTime(type) {
    return +type < 10 ? `0${type}`: type;
}

// FUNCTION TO REMOVE DUPLICATED ITEMS IN ARRAY
///////////////////////////////////////////////
function removeDuplicated(arr) {
    let arrTest = arr.map((f) => JSON.stringify(f));
    let result = arrTest.filter((item, indx) => {
        return arrTest.indexOf(item) === indx;
    });
    return result.map((g) => JSON.parse(g));
}


// FUNCTION TO ASSIGN ALL ARRAY ITEMS IN ONE ARRAY
/////////////////////////////////////////////////
function oneArray(arr) {
    let initial = [];
    let main = [];
    let result;
    // FOR EACH ITEM
    arr.forEach((item) => {
        // IF THE ITEM IS ARRAY
        if(Array.isArray(item)) {
            main.push(item);
        }else {
            initial.push(item);
        }
    })
    if(main && main.length) {
        result = main.reduce((a,b) => {
            return [...a,...b];
        })
    }
    if(result) {
        return [...initial,...result];
    }else {
        return [...initial];
    }
}   

// START UPDATE CONTENT WITH DATA
////////////////////////////////
let mainCountContainer = document.getElementById('mainCountdownContainer');
updateAdvanced();
function updateAdvanced() {
    mainCountContainer.innerHTML = '';
    let loc = localStorage.getItem('advanced');
    loc ? arr = JSON.parse(loc) : arr = [];
    let mainAr = oneArray(arr);
    let arrIndexes = mainAr.map((f) => mainAr.indexOf(f));
    let currIndex = -1;
    arr.forEach((item) => {
        // CREATE THE MAIN ELEMENT CONTAINER
        let elementContainer = document.createElement('div');
        elementContainer.classList.add('count--container');
        // CERATE THE DATE
        let dateElement = document.createElement('div');
        dateElement.classList.add('date', 'main-pd', 'mgy-half-1rem');
        let nDate = new Date().toDateString().split(' ').slice(1);
        let normDate = `${nDate[1]} ${nDate[0]}, ${nDate[2]}`;
        dateElement.innerHTML = `<p class="p-50">${item[0].created === normDate ? 'Today' : item[0].created}</p>`;
        // APPEND DATE TO THE CONTINER ELEMENT
        elementContainer.appendChild(dateElement);
        // CREATE BOXES
        let boxes = document.createElement('div');
        boxes.classList.add('grid','main-pdx','boxes');
        // APPEND BOXES TO THE ELEMENT CONTAINER
        elementContainer.appendChild(boxes);
        // CREATE THE CONTENT BOX
        let boxesContent = '';
        item.forEach((one) => {
            currIndex++;
            // GET FIX DATE
            let diff = (one.time - one.start) + 1000;
            // GET DATES TYPES
            let y = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
            let d = Math.floor(diff % (1000 * 60 * 60 * 24 * 365) / (1000 * 60 * 60 * 24));
            let h = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            let m = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
            let s = Math.floor(diff % (1000 * 60) / (1000));
            // CREATE THE DATE ARRAY
            let arrTime = [correctTime(y),correctTime(d),correctTime(h),correctTime(m),correctTime(s)];
            let endTypeOfDate = arrTime.splice(4,1);
            let arrDateMaped = arrTime.map((type) => {
                return (parseInt(type) + 0) === 0 ? '' : `${type}:`;
            });
            let fda = [...arrDateMaped,...endTypeOfDate];
            // GET THE FINAL OUTPUT DATE FIXED
            let outputFixDate = `${fda[0]}${fda[1]}${fda[2]}${fda[3]}${fda[4]}`;
            boxesContent += `
            <div class="box b-100" data-indx="${arrIndexes[currIndex]}">
            <!-- up box -->
            <div class="up--box w-50 flex fd-col">
                <!-- control up -->
                <div class="control--up-box full-width flex align-center flex-between">
                    <div class="control--left self-start v-hidden">
                        <div class="edited-element main-color w-color cursor">
                            <p>Edited</p>
                        </div>
                    </div>
                    <div class="control--right flex align-center">
                        <div class="icon--cont b-100 flex align-center justify-center p-50 mgr-half-1rem relative" onclick="editModal(${arrIndexes[currIndex]})">
                            <i class="fas fa-pen main--icon cursor second--icon edit-icon" style="font-size: .9rem !important;"></i>
                            <div class="hover--edit d-hidden hover--info">Edit</div>
                        </div>
                        <div class="icon--cont b-100 flex align-center justify-center p-50 mgr-half-1rem relative" onclick="advDescription(${arrIndexes[currIndex]})">
                            <ion-icon name="information-outline" class="main--icon cursor second--icon"></ion-icon>
                            <div class="hover--description d-hidden hover--info">Description</div>
                        </div>
                        <div class="icon--cont b-100 flex align-center justify-center p-50 relative" onclick="advFullScreen(${arrIndexes[currIndex]})">
                            <ion-icon name="scan-outline" class="main--icon cursor second--icon"></ion-icon>
                            <div class="hover--screen d-hidden hover--info">Full Screen</div>
                        </div>
                    </div>
                </div>
                <!-- time -->
                <div class="time fl-1 flex align-center justify-center">
                    <h2 class="main-text main--time">...</h2>
                </div>
            </div>


            <!-- details -->
            <div class="details pd-15 bb-50">
                <h6 class="p-100">${one.name}</h6>
                <p class="p-50">It will end: ${normDate === one.ended ? 'Today' : one.ended}</p>
            </div>
            <!-- footer box -->
            <div class="footer--box flex align-center flex-between pdx-15 pdy-10">
                <div class="footer--left pdr-15">
                    <span class="p-50">${outputFixDate}</span>
                </div>
                <div class="footer--right flex align-center">
                    <div class="reset--icon relative mgr-1rem" onclick="resetAdv(${arrIndexes[currIndex]})">
                        <ion-icon name="refresh-outline" class="p-50 second--icon"></ion-icon>
                        <div class="hover--reset absolute hover--info d-hidden">Reset</div>
                    </div>
                    <div class="trash--icon relative" onclick="deleteAdvanced(${arrIndexes[currIndex]})">
                        <ion-icon name="trash-outline" class="p-50 second--icon"></ion-icon>
                        <div class="hover--trash main-text main-color w-color absolute hover--info d-hidden">Delete</div>
                    </div>
                </div>




            </div>
        </div>
            
            `
        })
        boxes.innerHTML = boxesContent;
        mainCountContainer.appendChild(elementContainer);
    })   
}

// FUNCTION TO FILTER ARRAY SELON DATE
//////////////////////////////////////

function filterArrAdvanced() {
    let loc = localStorage.getItem('advanced');
    loc ? arr = JSON.parse(loc) : arr = [];
    let mainArr = oneArray(arr);
    let final = [];
    for(let i = 0; i < mainArr.length;i++) {
        let test = [];
        for(let j = 0; j < mainArr.length;j++) {
            if(mainArr[i].created === mainArr[j].created) {
                test.push(mainArr[j]);
            }
        }
        final.push(test);
    }
    localStorage.setItem('advanced', JSON.stringify(removeDuplicated(final)));
}

// FUNCTIONS TO UPDATE TIME AFTER RELOAD

updateAdvancedTime();
function updateAdvancedTime() {
    let loc = localStorage.getItem('advanced');
    loc ? arr = JSON.parse(loc) : arr = [];
    arr = oneArray(arr);
    arr.forEach((item, indx) => {
        // GET DOM
        let box = document.querySelector(`[data-indx="${indx}"]`);
        let time = document.querySelector(`[data-indx="${indx}"] .time h2`);
        // GET MAIN DATES
        let dNow = new Date().getTime();
        let endTime = item.time;
        let df = (endTime - dNow);
        // GET DATES TYPES
        let y = Math.floor(df / (1000 * 60 * 60 * 24 * 365));
        let d = Math.floor(df % (1000 * 60 * 60 * 24 * 365) / (1000 * 60 * 60 * 24));
        let h = Math.floor(df % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        let m = Math.floor(df % (1000 * 60 * 60) / (1000 * 60));
        let s = Math.floor(df % (1000 * 60) / (1000));
        // CREATE THE DATE ARRAY
        let arrTime = [correctTime(y),correctTime(d),correctTime(h),correctTime(m),correctTime(s)];
        let endTypeOfDate = arrTime.splice(4,1);
        let arrDateMaped = arrTime.map((type) => {
            return (parseInt(type) + 0) === 0 ? '' : `${type}:`;
        });
        // GET FINAL DATE
        let fda = [...arrDateMaped,...endTypeOfDate];
        let outDate = `${fda[0]}${fda[1]}${fda[2]}${fda[3]}${fda[4]}`;
        // IF THE TIME IS ENDED
        if(!(outDate.toString().includes(':')) && parseInt(outDate) <= 5) {
            time.classList.remove('main-text');
            time.classList.add('red-danger');
        }else {
            time.classList.add('main-text');
            time.classList.remove('red-danger');
        }
        // CHECK IF THE TIME IS EQUAL TO 0
        if(parseInt(outDate) === 0 || outDate.toString().startsWith('0-')) {
            time.innerHTML = 'Time ended';
        }else {
            time.innerHTML = outDate;
        }
    })
}
updateAdvancedTimeAfterReload();
function updateAdvancedTimeAfterReload() {
    let loc = localStorage.getItem('advanced');
    loc ? arr = JSON.parse(loc) : arr = [];
    arr = oneArray(arr);
    arr.forEach((item, indx) => {
        // GET DOM
        let box = document.querySelector(`[data-indx="${indx}"]`);
        let time = document.querySelector(`[data-indx="${indx}"] .time h2`);
        let reset = document.querySelector(`[data-indx="${indx}"] .reset--icon`);
        let del = document.querySelector(`[data-indx="${indx}"] .trash--icon`);
        let int = setInterval(() => {
            // GET MAIN DATES
            reset.addEventListener('click', () => {
                clearInterval(int);
                clearInterval(int);
                clearInterval(int);
                clearInterval(int);
                clearInterval(int);
                clearInterval(int);
                clearInterval(int);
            })
            del.addEventListener('click', () => {
                clearInterval(int);
                clearInterval(int);
                clearInterval(int);
                clearInterval(int);
                clearInterval(int);
                clearInterval(int);
            });
            if(!(arr.length)) {
                clearInterval(int);
            }
            let dNow = new Date().getTime();
            let endTime = item.time;
            let df = (endTime - dNow);
            // GET DATES TYPES
            let y = Math.floor(df / (1000 * 60 * 60 * 24 * 365));
            let d = Math.floor(df % (1000 * 60 * 60 * 24 * 365) / (1000 * 60 * 60 * 24));
            let h = Math.floor(df % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
            let m = Math.floor(df % (1000 * 60 * 60) / (1000 * 60));
            let s = Math.floor(df % (1000 * 60) / (1000));
            // CREATE THE DATE ARRAY
            let arrTime = [correctTime(y),correctTime(d),correctTime(h),correctTime(m),correctTime(s)];
            let endTypeOfDate = arrTime.splice(4,1);
            let arrDateMaped = arrTime.map((type) => {
                return (parseInt(type) + 0) === 0 ? '' : `${type}:`;
            });
            // GET FINAL DATE
            let fda = [...arrDateMaped,...endTypeOfDate];
            let outDate = `${fda[0]}${fda[1]}${fda[2]}${fda[3]}${fda[4]}`;
            // CHECK IF THE DATE IS LESS THAN 5 SECONDS
            if(!(outDate.toString().includes(':')) && parseInt(outDate) <= 5) {
                time.classList.remove('main-text');
                time.classList.add('red-danger');
            }else {
                time.classList.add('main-text');
                time.classList.remove('red-danger');
            }
            if(parseInt(outDate) === 0 || outDate.toString().startsWith('0-')) {
                clearInterval(int);
                time.innerHTML = 'Time ended';
            }else {
                time.innerHTML = outDate;
            }
        }, 1000)
    })
}

// FUNCTION TO DELETE A SPECIFIC ITEM FROM THE ADVANCED COUNTDOWNS
//////////////////////////////////////////////////////////////////
// DOM
let parentVerifModal = document.getElementById('verificationParentModal');
let mainVerifModal = document.getElementById('verificationMainModal');
let deleteVerifModal = document.getElementById('deleteVerif');
let closeVerif = document.getElementById('closeVerif');
let index;
function deleteAdvanced(dx) {
    // SHOW VERIFICATION MODAL
    parentVerifModal.classList.remove('hidded');
    mainVerifModal.classList.add('open');
    index = dx;
};
// DELETE BTN
deleteVerifModal.addEventListener('click', () => {
    let loc = localStorage.getItem('advanced');
    loc ? arr = JSON.parse(loc) : arr = [];
    arr = oneArray(arr);
    arr.splice(index, 1);
    localStorage.setItem('advanced', JSON.stringify(arr));
    filterArrAdvanced();
    updateAdvanced();
    updateAdvancedTime();
    updateAdvancedTimeAfterReload();
    isAdvancedEmpty();
    checkEditedAdvanced();
    // CLOSE MODAL
    mainVerifModal.classList.remove('open');
    parentVerifModal.classList.add('hidded');
    deletedSucc();
});
closeVerif.addEventListener('click', () => {
    mainVerifModal.classList.remove('open');
    parentVerifModal.classList.add('hidded');
})
// FUNCTION TO SHOW NO ADVANCED SECTION
isAdvancedEmpty();
function isAdvancedEmpty() {
    let loc = localStorage.getItem('advanced');
    loc ? arr = JSON.parse(loc) : arr = [];
    arr = oneArray(arr);
    let emptyAdv = document.querySelector('.count--advanced .count--empty');
    if(!(arr.length)) {
        emptyAdv.classList.remove('d-none');
    }else {
        emptyAdv.classList.add('d-none');
    }
}

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

// FUNCTION TO SHOW THE DESCRIPTION OF THE ADVANCED COUNTDOWN
/////////////////////////////////////////////////////////////
// DOM
let mainDescrModalAdvanced = document.getElementById('descMainAdvanced');
let parentDescrModalAdvanced = document.getElementById('descParentAdvanced');
let mainDescrAdvText = document.getElementById('mainAdvDescr');
let closeDescrModal = document.querySelector('#descMainAdvanced .icon--close-descr')
function advDescription(indx) {
    // GET DATE FROM LS
    let loc = localStorage.getItem('advanced');
    loc ? arr = JSON.parse(loc) : arr = [];
    arr = oneArray(arr);
    // SHOW MODAL DESCRIPTION
    parentDescrModalAdvanced.classList.remove('hidded');
    mainDescrModalAdvanced.classList.add('open');
    // REPLACE DATA
    mainDescrAdvText.innerHTML = arr[indx].description;
}
// CLOSE MODAL
closeDescrModal.addEventListener('click', () => {
    mainDescrModalAdvanced.classList.remove('open');
    parentDescrModalAdvanced.classList.add('hidded');
})

// FUNCTION TO GO FULL SCREEN
/////////////////////////////
// DOM
let mainFullScreenPage = document.querySelector('.full--screen-mode');
let closeFullScreenBtn = document.querySelector('.close--full-screen');
let borderFull = document.querySelector('.full--border'); // BORDER
let titleFull = document.querySelector('.full--title'); // TITLE
let boxesElements = document.querySelectorAll('.full--time .full--box');
let start = 1700;
function advFullScreen(index) {
    let loc = localStorage.getItem('advanced');
    loc ? arr = JSON.parse(loc) : arr = [];
    arr = oneArray(arr);
    // SHOW FULL SCREEN
    mainFullScreenPage.classList.add('active');
    // REPLACE THUMBNAIL
    mainFullScreenPage.style.backgroundImage = `url(${arr[index].thumbnail})`;
    // GET TITLE
    titleFull.firstElementChild.innerHTML = arr[index].name
    // ANIMATION
    mainFullScreenPage.firstElementChild.classList.remove('d-none');
    let arrDelay = [titleFull, borderFull];
    arrDelay.forEach((one) => one.classList.add('active'));
    // BOXES ELEMENTS
    boxesElements.forEach((one) => {
        start += 100;
        one.style.transitionDelay = `${start}ms`;
    });
    boxesElements.forEach((one) => one.classList.add('active'));
    // START WITH ADDING TIME
    let finalArrTime = [...Array(5)].fill('00');
    let target = document.querySelector(`[data-indx="${index}"] .time h2`).innerHTML;
    if(target === 'Time ended') {
        boxesElements.forEach((elem,dx) => {
            elem.firstElementChild.innerHTML = finalArrTime[dx];
        })
    }
    else {
        let arrTime = target.split(':');
        let sliced = finalArrTime.slice(0,finalArrTime.length - arrTime.length);
        let theMainArrTime = [...sliced,...arrTime];
        boxesElements.forEach((one,dx) => {
            one.firstElementChild.innerHTML = theMainArrTime[dx];
        })
    }
    // START WITH TIME
    let inter = setInterval(() => {
        let target = document.querySelector(`[data-indx="${index}"] .time h2`).innerHTML;
        let finalArrTime = [...Array(5)].fill('00');
        let arrTime = target.split(':');
        let sliced = finalArrTime.slice(0,finalArrTime.length - arrTime.length);
        let theMainArrTime = [...sliced,...arrTime];
        if(target === 'Time ended') {
            boxesElements.forEach((elem,dx) => {
                elem.firstElementChild.innerHTML = finalArrTime[dx];
            })
        }
        else {
            boxesElements.forEach((elem,dx) => {
                elem.firstElementChild.innerHTML = theMainArrTime[dx];
            })
        }
    }, 1000);
    closeFullScreenBtn.addEventListener('click',() => clearInterval(inter));
}
// CLOSE FULL SCREEN
closeFullScreenBtn.addEventListener('click',() => {
    mainFullScreenPage.classList.remove('active');
});

// INPUT CLONE EDIT MODAL ADVANCED 
//////////////////////////////////
// LABEL INPUT
/////////////////////
// DOM
const inputLabel2 = [...document.querySelectorAll('#editParentAdvanced .label-input')];
inputLabel2.forEach((label) => {
    label.addEventListener('click', () => {
        // FOCUS THE TARGET INPUT
        let mainInputTarget = label.parentElement.firstElementChild;
        mainInputTarget.focus();
    })
})

// INPUT FOCUS EFFECT
/////////////////////
// DOM
const inputDetails2 = [...document.querySelectorAll('#editParentAdvanced .input--details-section')];
inputDetails2.forEach((inp) => {
    inp.addEventListener('blur', checkLabel2);
    inp.addEventListener('focus', () => {
        let label = inp.nextElementSibling;
        label.classList.add('main-text');
        inp.classList.add('main-border');
    });
})
// CALL THE CHECK LABEL FUNCTION
checkLabel2();
// CHECK IF THE INPUT IS EMPTY OR NOT
function checkLabel2() {
    inputDetails2.forEach((inp) => {
        let labelTarget = inp.nextElementSibling;
        inp.classList.remove('main-border');
        labelTarget.classList.remove('main-text');
        if(inp.value) {
            labelTarget.classList.add('active');
        }else {
            labelTarget.classList.remove('active');
        }
    });
}

// FUNCTION TO EDIT ADVANCED MODAL INFO
///////////////////////////////////////
// DOM
let mainEditAdvanced = document.getElementById('editMainAdvanced');
let parentEditAdvanced = document.getElementById('editParentAdvanced');
let closeEdit = document.getElementById('closeEdit');
let saveEdit = document.getElementById('saveEdit');
let thumbEdit = document.querySelector('.up--modal');
let inpFileEdit = document.getElementById('editThumb');
let current;
function editModal(indx) {
    inputDetails2.forEach((inp) => inp.addEventListener('input', checkEditModal))
    let loc = localStorage.getItem('advanced');
    loc ? arr = JSON.parse(loc) : arr = [];
    arr = oneArray(arr);
    saveEdit.disabled = true;
    parentEditAdvanced.classList.remove('hidded');
    mainEditAdvanced.classList.add('open');
    // // GET THUMB
    thumbEdit.style.backgroundImage = `url(${arr[indx].thumbnail})`;
    // GET INFO DATA
    let data = [arr[indx].name,arr[indx].description]
    inputDetails2.forEach((inp,indx) => inp.value = data[indx]);
    checkLabel2();
    current = indx;
}

// FUNCTION TO CHECK THE EDIT MODAL
//////////////////////////////////
function checkEditModal() {
    let loc = localStorage.getItem('advanced');
    loc ? arr = JSON.parse(loc) : arr = [];
    arr = oneArray(arr);
    let data = [arr[current].name, arr[current].description];
    let condit = inputDetails2[0].value === data[0] && inputDetails2[1].value === data[1]
    if(condit) {
        saveEdit.disabled = true;
    }else {
        saveEdit.disabled = false;
    }
}
inputDetails2.forEach((inp) => inp.addEventListener('input',checkEditModal));
// CHANGE THUMBNAIL
inpFileEdit.addEventListener('change', function() {
    let loc = localStorage.getItem('advanced');
    loc ? arr = JSON.parse(loc) : arr = [];
    arr = oneArray(arr);
    let reader = new FileReader();
    reader.addEventListener('load', () => {
        let thumbSrc = reader.result;
        thumbEdit.style.backgroundImage = `url(${thumbSrc})`;
    })
    reader.readAsDataURL(this.files[0]);
    saveEdit.disabled = false;
    inputDetails2.forEach((inp) => inp.removeEventListener('input', checkEditModal));
});
// CLOSE MODAL
/////////////
closeEdit.addEventListener('click', () => {
    mainEditAdvanced.classList.remove('open');
    parentEditAdvanced.classList.add('hidded');
})
// SAVE BTN
saveEdit.addEventListener('click', () => {
    // CLOSE MODAL
    mainEditAdvanced.classList.remove('open');
    parentEditAdvanced.classList.add('hidded');
    let loc = localStorage.getItem('advanced');
    loc ? arr = JSON.parse(loc) : arr = [];
    arr = oneArray(arr); 
    // UDPATE DATA
    let th = thumbEdit.style.backgroundImage;
    let mainThumb = th.substring(th.indexOf('data'), th.indexOf('"\)'));
    arr[current].name = inputDetails2[0].value;
    arr[current].description = inputDetails2[1].value;
    arr[current].edited = true;
    arr[current].thumbnail = mainThumb;
    // UPDATE LOCAL STORAGE
    localStorage.setItem('advanced', JSON.stringify(arr));
    filterArrAdvanced();
    updateAdvanced();
    updateAdvancedTime();
    updateAdvancedTimeAfterReload();
    isAdvancedEmpty();
    checkEditedAdvanced();
    savedSucc();
})

// FUNCTION TO CHECK IF THE COUNTDONW IS EDITED
///////////////////////////////////////////////
checkEditedAdvanced();
function checkEditedAdvanced() {
    let loc = localStorage.getItem('advanced');
    loc ? arr = JSON.parse(loc) : arr = [];
    arr = oneArray(arr); 
    arr.forEach((one, indx) => {
        if(one.edited) {
            let target = document.querySelector(`[data-indx="${indx}"] .control--left`);
            target.classList.remove('v-hidden');
        }
    })
}

// FUNCTION TO RESET THE ADVANCED COUNTDOWN
//////////////////////////////////////////
function resetAdv(idx) {
    let loc = localStorage.getItem('advanced');
    loc ? arr = JSON.parse(loc) : arr = [];
    arr = oneArray(arr); 
    // GET THE DATE NOW
    let newD = new Date().getTime();
    let start = arr[idx].start;
    let end = arr[idx].time;
    let diff = (end - start);
    // GET THE MAIN TIME
    let time = newD + diff;
    arr[idx].time = time;
    arr[idx].start = newD;
    // UPDATE LOCAL STORAGE
    localStorage.setItem('advanced', JSON.stringify(arr));
    filterArrAdvanced();
    updateAdvanced();
    updateAdvancedTime();
    updateAdvancedTimeAfterReload();
    isAdvancedEmpty();
    checkEditedAdvanced();
}

///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////

// START WITH THE QUICK COUNTDOWN
////////////////////////////////

// FUNCTION TO CHECK THE QUICK VALIDATION
// DOM
const quickInputs = [...document.querySelectorAll('.count--quick-container .count-specific-input input')];
function quickValidation() {
    // BTN NOT DISABLED
    quickBtn.classList.remove('loadBtn');
    quickBtn.lastElementChild.innerHTML = 'Add';
    quickBtn.disabled = false;
    let quickInputsEmpty = true;
    // CHECK IF ALL INPUTS ARE NOT EMPTY
    for(let i = 0; i < quickInputs.length; i++) {
        if(!(quickInputs[i].value)) {
            quickInputsEmpty = false;
            break;
        }
    }
    // CHECK IF ALL INPUTS EQUAL TO 0
    let notEqTo0 = quickInputs.every((val) => {
        return ( parseInt(val.value) + 0 ) === 0;
    })
    // START WITH PROMISES
    let checkValidation = new Promise((res,rej) => {
        if(quickInputsEmpty && !notEqTo0) {
            res(true);
        }else {
            rej(false);
        };
    })
    // START WITH THEN AND CATCH
    checkValidation.then(() => {
        // GET TO THE LOCAL STORAGE
        // GET ALL IMPORTANT DATA
        let y = parseInt(quickInputs[0].value) * 365 * 24 * 60 * 60 * 1000;
        let d = parseInt(quickInputs[1].value) * 24 * 60 * 60 * 1000;
        let h = parseInt(quickInputs[2].value) * 60 * 60 * 1000;
        let m = parseInt(quickInputs[3].value) * 60 * 1000;
        let s = parseInt(quickInputs[4].value) * 1000;
        // CREATE THE MAIN DATE
        let ad = [y,d,h,m,s]; // ARRAY DATES
        let mainTotalDate = ad.reduce((a,b) => a+b,0) + new Date().getTime();
        // GET THE START AND THE END WITH MILLESECOND
        let start = new Date().getTime();
        let time = mainTotalDate;
        // TO STRING
        let endDate = getStrDate(time);
        let startDate = getStrDate(new Date());
        // CREATE THE MAIN OBJECT
        let obj = {
            time: time,
            start: start,
            end: endDate,
            created: startDate,
            paused:  false,
            btn: false,
            pauseTime: time,
            pauseStart: start
        }
        // UPDATE LOCAL STORAGE
        localStorage.setItem('quick', JSON.stringify(obj));
        // FUNCTIONS
        updateQuick1();
        updateQuick2();
        updateQuickContent();
        addedSucc();
        // CLOSE MODAL
        mainCountMainModal.classList.remove('open');
        mainCountParentModal.classList.add('hidded');
    }).catch((err) => {
        // SHOW ERROR
        alert('Make sure that: \n * All inputs are not empty \n * All inputs not equal to 0');
    })
}

// FUNCTION TO GET THE DATE IN STRING
/////////////////////////////////////
function getStrDate(time) {
    let c = new Date(time).toDateString().split(' ').slice(1).join(' ');
    return `${c.split(' ')[1]} ${c.split(' ')[0]}, ${c.split(' ')[2]}`;
}

// FUNCTION TO UPDATE THE QUICK COUNTDOWN
/////////////////////////////////////////
// DOM
let quickBoxes = document.querySelectorAll('.count--quick .quick--box');
updateQuick1();
updateQuick2();
function updateQuick1() {
    let loc = localStorage.getItem('quick');
    if(loc) {
        let data = JSON.parse(loc);
        // GET THE DATE
        let dNow = new Date().getTime();
        let end = data.time;
        let df = (end - dNow);
        let out = getDateTime(df).split(':');
        if(df <= 0) {
            quickBoxes.forEach((one, ind) => {
                one.firstElementChild.innerHTML = '00';
            });
        }else {
            quickBoxes.forEach((one, ind) => {
                one.firstElementChild.innerHTML = out[ind];
            });
        }
    }
}
function updateQuick2() {
    let inter = setInterval(() => {
        let loc = localStorage.getItem('quick');
        if(loc) {
            let data = JSON.parse(loc);
            // GET THE DATE
            let dNow = new Date().getTime();
            let end = data.time;
            let df = (end - dNow);
            let out = getDateTime(df).split(':');
            if(df <= 0) {
                clearInterval(inter);
                quickBoxes.forEach((one, ind) => {
                    one.firstElementChild.innerHTML = '00';
                });
            }else {
                quickBoxes.forEach((one, ind) => {
                    one.firstElementChild.innerHTML = out[ind];
                });
            }
        }else {
            clearInterval(inter);
        }
        let restartQuick = document.querySelector('.reset--btn');
        restartQuick.addEventListener('click', () => {
            clearInterval(inter);
        })
    }, 1000)
}

// FUNCTION TO UPDATE QUICK TIME
////////////////////////////////
let pauseQuick = document.querySelector('.icon--contr-pause');
let playQuick = document.querySelector('.icon--contr-play');
pauseQuick.addEventListener('click', () => {
    pauseQuick.classList.add('d-none');
    playQuick.classList.remove('d-none');
});
playQuick.addEventListener('click', () => {
    playQuick.classList.add('d-none');
    pauseQuick.classList.remove('d-none');
})

// FUNCTION TO UPDATE QUICK CONTENT 
// DOM
let contQuickContainer = document.querySelector('.count--quick-time');
let emptyQuick = document.getElementById('quickEmpty');
updateQuickContent();
function updateQuickContent() {
    let loc = localStorage.getItem('quick');
    if(loc) {
        contQuickContainer.classList.remove('d-none');
        emptyQuick.classList.add('d-none');
    }else {
        contQuickContainer.classList.add('d-none');
        emptyQuick.classList.remove('d-none');
    }
}

// DELETE QUICK COUNTDOWN
// DOM
let deleteQuick = document.querySelector('.delete--btn');
let deleteQuickBtn = document.getElementById('deleteQuickCount');
let closeQuickBtn = document.getElementById('closeQuickCount');
let mainQuickModal = document.getElementById('mainDeleteQuick')
let parentQuickModal = document.getElementById('parentDeleteQuick')
// DELETE VERIFICATION
deleteQuick.addEventListener('click', () => {
    parentQuickModal.classList.remove('hidded');
    mainQuickModal.classList.add('open');
})
// CLOSE MODAL
closeQuickBtn.addEventListener('click', () => {
    mainQuickModal.classList.remove('open');
    parentQuickModal.classList.add('hidded');
})
// DELETE COUNTDOWN
deleteQuickBtn.addEventListener('click', () => {
    localStorage.removeItem('quick');
    updateQuickContent();
    mainQuickModal.classList.remove('open');
    parentQuickModal.classList.add('hidded');
    deletedSucc();
})

// RESTART QUICK COUNTDOWN
let restartQuick = document.querySelector('.reset--btn');
restartQuick.addEventListener('click', () => {
    let loc = localStorage.getItem('quick');
    if(loc) {
        let data = JSON.parse(loc);
        // GET THE DATE NOW
        let newD = new Date().getTime();
        let start = data.start;
        let end = data.time;
        let diff = (end - start);
        // GET THE MAIN TIME
        let time = newD + diff;
        data.time = time;
        data.start = newD;
        data.paused = false;
        // UPDATE LOCAL STORAGE
        localStorage.setItem('quick', JSON.stringify(data));
        updateQuick1();
        updateQuick2();
    }
})

// FUNCTION TO CHECK TABS
////////////////////////
checkTabsActive();
function checkTabsActive() {
    let tabIndex = localStorage.getItem('tabIndex');
    if(tabIndex) {
        tabs[tabIndex].click();
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

// QUICK DETAILS MODAL
/////////////////////
// DOM
let detailsIcon = document.getElementById('details-icon');
let mainDetailsModal = document.getElementById('quickdetailsMain')
let parentDetailsModal = document.getElementById('quickdetailsParent');
let closeDetails = document.querySelector('.close--det-quick');
let dateCr = document.getElementById('dateCre');
let dateEnd = document.getElementById('dateEnd');
let dateOr = document.getElementById('dateOr');
// SHOW DETAILS
detailsIcon.addEventListener('click', () => {
    let loc = localStorage.getItem('quick');
    if(loc) {
        let data = JSON.parse(loc);
        parentDetailsModal.classList.remove('hidded');
        mainDetailsModal.classList.add('open');
        // REPLACE DATA
        dateCr.innerHTML = data.created === getStrDate(new Date()) ? 'Today' : data.created;
        dateEnd.innerHTML = data.end;
        // GET ORIGINAL TIME
        let endTime = data.time;
        let dNow = data.start;
        let df = (endTime - dNow) + 1000;
        // GET DATES TYPES
        let y = Math.floor(df / (1000 * 60 * 60 * 24 * 365));
        let d = Math.floor(df % (1000 * 60 * 60 * 24 * 365) / (1000 * 60 * 60 * 24));
        let h = Math.floor(df % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        let m = Math.floor(df % (1000 * 60 * 60) / (1000 * 60));
        let s = Math.floor(df % (1000 * 60) / (1000));
        // CREATE THE DATE ARRAY
        let arrDate = [correctTime(y),correctTime(d),correctTime(h),correctTime(m),correctTime(s)];
        let endTypeOfDate = arrDate.splice(4,1);
        let arrDateMaped = arrDate.map((type) => {
            return (parseInt(type) + 0) === 0 ? '' : `${type}:`;
        });
        // GET FINAL DATE
        let fda = [...arrDateMaped,...endTypeOfDate];
        let outDate = `${fda[0]}${fda[1]}${fda[2]}${fda[3]}${fda[4]}`;  
        dateOr.innerHTML = outDate;
    }
})
// CLOSE DETAILS
closeDetails.addEventListener('click', () => {
    mainDetailsModal.classList.remove('open');
    parentDetailsModal.classList.add('hidded');
})

// FUNCTION TO GET TIME
function getDateTime(df) {
         let y = Math.floor(df / (1000 * 60 * 60 * 24 * 365));
        let d = Math.floor(df % (1000 * 60 * 60 * 24 * 365) / (1000 * 60 * 60 * 24));
        let h = Math.floor(df % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
        let m = Math.floor(df % (1000 * 60 * 60) / (1000 * 60));
        let s = Math.floor(df % (1000 * 60) / (1000));
        // CREATE THE DATE ARRAY
        let arrTime = [correctTime(y),correctTime(d),correctTime(h),correctTime(m),correctTime(s)];
        let endTypeOfDate = arrTime.splice(4,1);
        let arrDateMaped = arrTime.map((type) => {
            return (parseInt(type) + 0) === 0 ? '00:' : `${type}:`;
        });
        // GET FINAL DATE
        let fda = [...arrDateMaped,...endTypeOfDate];
        let outDate = `${fda[0]}${fda[1]}${fda[2]}${fda[3]}${fda[4]}`;
        return outDate;
}
// FUNCTION TO TELL THE USER THAT STOP AND CONTINUE NOT WORKING
alertMsg(playQuick);
alertMsg(pauseQuick);
function alertMsg(elem) {
    elem.addEventListener('click', () => {
        alert('Pause & Continue not working');
    })
}