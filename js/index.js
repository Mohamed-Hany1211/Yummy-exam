// global vars
const mainPage = document.getElementById('rowdata');
const searchByName = document.getElementById('searchByName');
const searchByChar = document.getElementById('searchByFirstChar');
const descRow = document.getElementById('descRow');
const categoRow = document.getElementById('categoRow');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const phoneInput = document.getElementById('phoneInput');
const ageInput = document.getElementById('ageInput');
const passwordInput = document.getElementById('passwordInput');
const RepasswordInput = document.getElementById('Repassword');
const areaRow = document.getElementById('areaRow');
const ingredianRow = document.getElementById('ingredianRow');

$(document).ready(() => {
    // sideBar
    $('.bars-X-button').click(function () {
        let sidebarPos = $('.side-bar').css('left');
        if (sidebarPos == '-257px') {
            $('.side-bar').animate({ left: '0px' }, 500);
            document.querySelector('.bars-X-button').innerHTML = '<i class="fa-solid fa-x fa-2x"></i>';
            $('.li1').animate({ top: '0px' }, 500);
            $('.li2').animate({ top: '0px' }, 600);
            $('.li3').animate({ top: '0px' }, 700);
            $('.li4').animate({ top: '0px' }, 800);
            $('.li5').animate({ top: '0px' }, 900);
        } else {
            $('.side-bar').animate({ left: '-257px' }, 500);
            document.querySelector('.bars-X-button').innerHTML = '<i class="fa-solid fa-bars fa-2x"></i>';
            $('.li1').animate({ top: '400px' }, 500);
            $('.li2').animate({ top: '400px' }, 600);
            $('.li3').animate({ top: '400px' }, 700);
            $('.li4').animate({ top: '400px' }, 800);
            $('.li5').animate({ top: '400px' }, 900);
        }
    })
    //-------------------------------------------------
    // for loading screen
    $('.loadingScreen').fadeOut(1500);
    $('body').css('overflow', 'auto');
    //--------------------------------------------------
    // to switch to search page and some modifications on it
    $('.li1').click(function () {
        $('.area').addClass('d-none');
        $('.inputs').removeClass('d-none');
        $('.loadingScreen').addClass('d-none');
        // $('.inner-loading-screen').fadeOut(1500);
        $('.home').addClass('d-none');
        $('.catego').addClass('d-none');
        $('.description').addClass('d-none');
        $('.side-bar').animate({ left: '-257px' }, 500);
        $('.contactUs').addClass('d-none');
        $('.ingrediants').addClass('d-none');
        document.querySelector('.bars-X-button').innerHTML = '<i class="fa-solid fa-bars fa-2x"></i>';
        $('.li1').animate({ top: '400px' }, 500);
        $('.li2').animate({ top: '400px' }, 600);
        $('.li3').animate({ top: '400px' }, 700);
        $('.li4').animate({ top: '400px' }, 800);
        $('.li5').animate({ top: '400px' }, 900);
    })
    $('.inputs input').click(function () {
        $('.inputs input').css('background-color', 'transparent');
    })
    $('.input1').keyup(function () {
        let nameVal = searchByName.value;
        getDataS('https://www.themealdb.com/api/json/v1/1/search.php?s=' + nameVal);
        $('.home').removeClass('d-none');
    })
    $('.input2').keyup(function () {
        let charVal = searchByChar.value;
        if (charVal.length == 1) {
            getDataS('https://www.themealdb.com/api/json/v1/1/search.php?f=' + charVal)
            $('.home').removeClass('d-none');
        } else {
            validate(searchByChar);
        }
        if (charVal.length == 0) {
            getDataS('https://www.themealdb.com/api/json/v1/1/search.php?f=a')
            $('.home').removeClass('d-none');
        }
    })
    //--------------------------------------------------
    // categories
    $('.li2').click(function () {
        categoData();
        $('.catego').removeClass('d-none');
        $('.area').addClass('d-none');
        $('.home').addClass('d-none');
        $('.inputs').addClass('d-none');
        $('.description').addClass('d-none');
        $('.contactUs').addClass('d-none');
        $('.ingrediants').addClass('d-none');
        $('.side-bar').animate({ left: '-257px' }, 500);
        document.querySelector('.bars-X-button').innerHTML = '<i class="fa-solid fa-bars fa-2x"></i>';
        $('.li1').animate({ top: '400px' }, 500);
        $('.li2').animate({ top: '400px' }, 600);
        $('.li3').animate({ top: '400px' }, 700);
        $('.li4').animate({ top: '400px' }, 800);
        $('.li5').animate({ top: '400px' }, 900);
        // $('.inner-loading-screen').fadeOut(1500);
        $('body').css('overflow', 'auto');
    })
    //----------------------------------------------------------------
    // to list areas
    $('.li3').click(function () {
        area();
        $('.area').removeClass('d-none');
        $('.contactUs').addClass('d-none');
        $('.inputs').addClass('d-none');
        $('.home').addClass('d-none');
        $('.description').addClass('d-none');
        $('.catego').addClass('d-none');
        $('.ingrediants').addClass('d-none');
        $('.side-bar').animate({ left: '-257px' }, 500);
        document.querySelector('.bars-X-button').innerHTML = '<i class="fa-solid fa-bars fa-2x"></i>';
    })
    //-----------------------------------------------------
    // to list ingrediants
    $('.li4').click(function () {
        getIngrediants();
        $('.side-bar').animate({ left: '-257px' }, 500);
        document.querySelector('.bars-X-button').innerHTML = '<i class="fa-solid fa-bars fa-2x"></i>';
        $('.ingrediants').removeClass('d-none');
        $('.area').addClass('d-none');
        $('.contactUs').addClass('d-none');
        $('.inputs').addClass('d-none');
        $('.home').addClass('d-none');
        $('.description').addClass('d-none');
        $('.catego').addClass('d-none');
    })
    //---------------------------------------------------------------
    // contact us
    $('.li5').click(function () {
        $('.area').addClass('d-none');
        $('.contactUs').removeClass('d-none');
        $('.inputs').addClass('d-none');
        $('.home').addClass('d-none');
        $('.description').addClass('d-none');
        $('.catego').addClass('d-none');
        $('.ingrediants').addClass('d-none');
        $('.side-bar').animate({ left: '-257px' }, 500);
        document.querySelector('.bars-X-button').innerHTML = '<i class="fa-solid fa-bars fa-2x"></i>';
    })
})


// function to get data from the api
async function getDataS(api) {
    let resp = await fetch(`${api}`);
    let data = await resp.json();
    let devs = '';
    for (let i = 0; i < data.meals.length; i++) {
        devs += ` <div class="col-md-3">
        <div onclick="getDetails('${data.meals[i].strMeal}')" class="item  overflow-hidden">
        <div class="position-relative">
            <img src="${data.meals[i].strMealThumb}" class="w-100 imgs" alt="meal">
            <div class="imgs-layer position-absolute d-flex align-items-center overflow-hidden">
                <h3>${data.meals[i].strMeal}</h3>
            </div>
            </div>
        </div>
    </div>`
    }
    mainPage.innerHTML = devs;
    $('.area').addClass('d-none');
    $('.contactUs').addClass('d-none');
    // $('.inputs').addClass('d-none');
    $('.description').addClass('d-none');
    $('.catego').addClass('d-none');
    $('.ingrediants').addClass('d-none');
}

getDataS('https://www.themealdb.com/api/json/v1/1/search.php?s=');

// function to take only one character from the user
function validate(input) {
    input.value = input.value.replace(/\W|\d/g, '').substr(0, 1);
}

// function to display the details of each meal
async function getDetails(word) {
    innerloding();
    let food = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + word);
    let details = await food.json();
    let mealData = details.meals[0];
    let lis = '';
    for(let i = 1 ; i<=20 ; i++){
        if(mealData[`strIngredient${i}`]!=''&&mealData[`strIngredient${i}`]!=null ){
            lis+=`<li>${mealData[`strMeasure${i}`]} ${mealData[`strIngredient${i}`]}</li>`
        }
    }

    let tags = '';
    if(mealData.strTags!=null){
        let temp = mealData.strTags;
        let tag = temp.split(',');
        for(let i = 0 ; i<tag.length ;i++){
            tags+=`<li class="tag mb-2"> ${ tag[i] } </li>`
        }
    }else{
        tags = '';
    }

    let dev = '';
    dev = `<div class="col-md-4">
    <div class="leftPart">
        <img src="${details.meals[0].strMealThumb}" class="w-100" alt="meal">
        <h2 class="text-white">${details.meals[0].strMeal}</h2>
    </div>
</div>
<div class="col-md-8">
    <div class="rightPart">
        <h2 class="text-white">Instructions</h2>
        <p class="text-white">${details.meals[0].strInstructions}</p>
        <h3 class="text-white"><span>Area :</span> ${details.meals[0].strArea}</h3>
        <h3 class="text-white"><span>Category :</span> ${details.meals[0].strCategory}</h3>
        <h3 class="text-white mb-3">Recipes :</h3>
        <ul class="recipesUl d-flex flex-wrap">
            ${lis}
        </ul>
        <h3 class="text-white">Tags :</h3>
        <ul>
        ${tags}
        </ul>
        <a href="${details.meals[0].strSource}" target="_blank" class="btn btn-success text-white">Source</a>
        <a href="${details.meals[0].strYoutube}" target="_blank" class="btn btn-danger text-white">Youtube</a>
    </div>
</div>`;
    descRow.innerHTML = dev;
    $('.area').addClass('d-none');
    $('.home').addClass('d-none');
    $('.description').removeClass('d-none');
    $('.catego').addClass('d-none');
    $('.ingrediants').addClass('d-none');
    $('.inputs').addClass('d-none');
}





























// function to display the categories
async function categoData() {
    innerloding();
    let catData = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let catItem = await catData.json();
    let divs = '';
    for (let i = 0; i < 14; i++) {
        divs += ` <div class="col-md-3">
            <div onclick="fillter('${catItem.categories[i].strCategory}')" class="categoItem  position-relative overflow-hidden mb-4">
                <div class="categoLayer position-absolute text-black text-center">
                    <h3 class="mt-3">${catItem.categories[i].strCategory}</h3>
                    <p>${catItem.categories[i].strCategoryDescription.slice(0, 104)}</p>
                </div>
                <img src="${catItem.categories[i].strCategoryThumb}" class="w-100" alt="mealCategories">
            </div>
        </div>`
    }
    categoRow.innerHTML = divs;

}

// to filter by main ingrediant
async function fillter(word) {
    innerloding();
    let catData = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + word);
    let catItem = await catData.json();
    let divs = '';
    for (let i = 0; i < 20; i++) {
        divs += ` <div class="col-md-3">
            <div onclick="getDetails('${catItem.meals[i].strMeal}')" class="item  overflow-hidden">
            <div class="position-relative">
                <img src="${catItem.meals[i].strMealThumb}" class="w-100 imgs" alt="meal">
                <div class="imgs-layer position-absolute d-flex align-items-center overflow-hidden">
                    <h3 class="catH3">${catItem.meals[i].strMeal}</h3>
                </div>
                </div>
            </div>
        </div>`
    }
    categoRow.innerHTML = divs;
}


function innerloding(){
    $('.inner-loading-screen').removeClass('d-none');
    $('.inner-loading-screen').fadeIn(300).fadeOut(1000);
}


// list areas
async function area() {
innerloding();
    let areaData = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    let areaItem = await areaData.json();
    let devs = '';
    for (let i = 0; i < areaItem.meals.length; i++) {
        devs += `<div class="col-md-3">
        <div onclick="getMealsByArea('${areaItem.meals[i].strArea}')"  class="areaItem mb-4 d-flex flex-column justify-content-center align-items-center">
            <i class="fa-solid fa-house-laptop"></i>
            <h3>${areaItem.meals[i].strArea}</h3>
        </div>
    </div>`
    }
    areaRow.innerHTML = devs;
}

async function getMealsByArea(word) {
innerloding();
    let areaData = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=' + word);
    let areaItemo = await areaData.json();
    let devs = '';
    for (let i = 0; i < 20; i++) {
        devs += ` <div class="col-md-3">
            <div onclick="getDetails('${areaItemo.meals[i].strMeal}')" class="item  overflow-hidden">
            <div class="position-relative">
                <img src="${areaItemo.meals[i].strMealThumb}" class="w-100 imgs" alt="meal">
                <div class="imgs-layer position-absolute d-flex align-items-center overflow-hidden">
                    <h3 class="catH3">${areaItemo.meals[i].strMeal}</h3>
                </div>
                </div>
            </div>
        </div>`
    }
    areaRow.innerHTML = devs;
}




// function to display ingrediants
async function getIngrediants() {
innerloding();
    let ingrediantsData = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    let ingrediantItem = await ingrediantsData.json();
    let devs = '';
    for (let i = 0; i < 20; i++) {
        devs += `<div class="col-md-3 mb-5">
        <div onclick="fillter2('${ingrediantItem.meals[i].strIngredient}')" class="ingrdiantItem  text-center text-white">
            <i class="fa-solid fa-drumstick-bite"></i>
            <h3>${ingrediantItem.meals[i].strIngredient}</h3>
            <p>${ingrediantItem.meals[i].strDescription.slice(0, 109)}</p>
        </div>
    </div>`
    }
    ingredianRow.innerHTML = devs;
}



async function fillter2(word) {
innerloding();
    let catData = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=' + word);
    let catItem = await catData.json();
    let divs = '';
    for (let i = 0; i < 20; i++) {
        divs += ` <div class="col-md-3">
            <div onclick="getDetails('${catItem.meals[i].strMeal}')" class="item  overflow-hidden">
            <div class="position-relative">
                <img src="${catItem.meals[i].strMealThumb}" class="w-100 imgs" alt="meal">
                <div class="imgs-layer position-absolute d-flex align-items-center overflow-hidden">
                    <h3 class="catH3">${catItem.meals[i].strMeal}</h3>
                </div>
                </div>
            </div>
        </div>`
    }
    ingredianRow.innerHTML = divs;
}












let done1 = false;
let done2 = false;
let done3 = false;
let done4 = false;
let done5 = false;
let done6 = false;



nameInput.addEventListener('keyup', function () {
    if (nameValidation()) {
        $('.name-notes').removeClass('d-block');
        $('.name-notes').addClass('d-none');
        done1 = true;
    } else {
        $('.name-notes').removeClass('d-none');
        $('.name-notes').addClass('d-block');
        done1 = false;
    }
    
})

emailInput.addEventListener('keyup', function () {
    if (emailValidation()) {
        $('.email-notes').removeClass('d-block');
        $('.email-notes').addClass('d-none');
        done2 = true;
    } else {
        $('.email-notes').removeClass('d-none');
        $('.email-notes').addClass('d-block');
        done2 = false;
    }
    
})

phoneInput.addEventListener('keyup', function () {
    if (phoneValidation()) {
        $('.phone-notes').removeClass('d-block');
        $('.phone-notes').addClass('d-none');
        done3 = true;
    } else {
        $('.phone-notes').removeClass('d-none');
        $('.phone-notes').addClass('d-block');
        done3 = false;
    }
    
})

ageInput.addEventListener('keyup', function () {
    if (ageValidation()) {
        $('.age-notes').removeClass('d-block');
        $('.age-notes').addClass('d-none');
        done4 = true;
    } else {
        $('.age-notes').removeClass('d-none');
        $('.age-notes').addClass('d-block');
        done4 = false;
    }
    
})

passwordInput.addEventListener('keyup', function () {
    if (passwordValidation()) {
        $('.password-notes').removeClass('d-block');
        $('.password-notes').addClass('d-none');
        done5 = true;
    } else {
        $('.password-notes').removeClass('d-none');
        $('.password-notes').addClass('d-block');
        done5 = false;
    }
    
})



RepasswordInput.addEventListener('keyup', function () {
    if (repasswordValidation()) {
        $('.repassword-notes').removeClass('d-block');
        $('.repassword-notes').addClass('d-none');
        done6 = true;
    } else {
        $('.repassword-notes').removeClass('d-none');
        $('.repassword-notes').addClass('d-block');
        done6 = false;
    }
    
})


if (done1 && done2 && done3 && done4 && done5 && done6) {
    $('.Sbutton').removeAttr('disabled');
} else {
    $('.Sbutton').attr('disabled','');
}





function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}