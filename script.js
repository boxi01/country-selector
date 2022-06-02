let countiresList = [];
let isDataLoaded = false;

document.addEventListener("DOMContentLoaded", function () {

});


// window.addEventListener('load', function () {

// });


function loadCountriesList() {
  fetch('https://restcountries.com/v2/all')
    .then(response => {
      return response.json()
    })
    .then(countries => {
      countiresList = countries;
      isDataLoaded = true;
      createCountiersList(countiresList);
      hideLoader();
      showContent();
      addListeners();
    })
}

function createCountiersList(list) {
  var countrySelectorOptions = document.getElementById('country-selector-options');
  countrySelectorOptions.innerHTML = '';
  list.forEach((country, index) => {
    countrySelectorOptions.innerHTML += 
    `<div value="${country.alpha3Code}" id="option${index}" class="country-selector__option">
    <img class="country-selector__option__flag" src="${country.flag}">
    <p class="country-selector__option__name">${country.name}</p>
    </div>`;
  })
}

function toggleCountriesList() {
  const countrySelector = document.getElementById('country-selector');
  countrySelector.classList.toggle('opened')
  // if (countrySelector.classList.contains('opened')) {
  //   countrySelector.classList.remove('opened');
  // } else {
  //   countrySelector.classList.add('opened');
  // }
  // var countrySelectorOptions = document.getElementById('country-selector-options');
  // if (countrySelectorOptions.classList.contains('country-selector__content--hide')) {
  //   countrySelectorOptions.classList.remove('country-selector__content--hide');
  // } else {
  //   countrySelectorOptions.classList.add('country-selector__content--hide');
  // }
}

function setSelectedOption(name) {
  document.getElementById('country-selector__input').value = name;
}

function toggleIconRemove(event) {
  const icon = document.getElementById('remove-icon');
  if (event.target.value) {
    icon.classList.remove('hide');
  } else {
    icon.classList.add('hide');
  }
}

function hideLoader() {
  const loader = document.getElementById('loader');
  loader.classList.add('hide');
}

function showContent() {
  const mainContent = document.getElementById('main');
  mainContent.classList.remove('hide');
}

function addListeners() {
  const input =  document.getElementById('country-selector__input');
  const optionList = document.querySelectorAll('.country-selector__option');
  
  input.addEventListener("click", () => {
    toggleCountriesList();
  });

  input.addEventListener("input", (event) => {
    toggleIconRemove(event);

    let inputValue = input.value.toLowerCase();

    // const countrySelector = document.getElementById('country-selector');
    // if (inputValue) {
    //   countrySelector.classList.add('filtered');
    // } else {
    //   countrySelector.classList.remove('filtered');
    // }
 

    [...optionList].forEach(option => {
      const name = option.querySelector('.country-selector__option__name').innerHTML; 
      if (!name.toLowerCase().includes(inputValue)) {
        option.classList.add('hide');
      } else {
        option.classList.remove('hide');
      }
    })


  //   const filteredList = countiresList.filter(country => {
  //     // const name = option.querySelector('.country-selector__option__name').innerHTML;
  //     // console.log(name.toLowerCase())
  //     // console.log(inputValue)
  //     return country.name.toLowerCase().includes(inputValue)
  //   })

  // this.createCountiersList(filteredList);    
  });

  document.getElementById('country-selector-options').addEventListener("click", function (event) {
    setSelectedOption(event.target.innerHTML);
    toggleCountriesList();
  });
}

loadCountriesList();