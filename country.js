const countryName = new URLSearchParams(location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.country-details h1')
const nativename = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subregion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const domain = document.querySelector('.domain')
const currency = document.querySelector('.currency')
const language = document.querySelector('.language')
const bordercountries = document.querySelector('.border-countries')
const themechanger = document.querySelector('.theme-changer')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => res.json())
.then(([country]) => {
    flagImage.src = country.flags.svg
    countryNameH1.innerText = country.name.common

    if(country.name.nativeName) {
        nativename.innerText = Object.values(country.name.nativeName)[0].common   
    } else{
        nativename.innerText = country.name.common
    }
    population.innerText = country.population.toLocaleString('en-IN')
    region.innerText = country.region
    domain.innerText = country.tld.join(', ')
    if (country.subregion) {
        subregion.innerText = country.subregion
    }
    if (country.capital?.[0]) {
        capital.innerText = country.capital?.[0]
    }
    if (country.currencies) {
        currency.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ');   
    } 
    if(country.languages){
        language.innerText = Object.values(country.languages).join(', ')
    }
    if (country.borders) {
        country.borders.forEach((borders) => {
            fetch(`https://restcountries.com/v3.1/alpha/${borders}`)
            .then((res) => res.json())
            .then(([borderCountry]) => {
                //console.log(borderCountry)
                const borderCountryTag = document.createElement('a')
                borderCountryTag.innerText = borderCountry.name.common
                borderCountryTag.href = `/PROJECT2/country.html?name=${borderCountry.name.common}`
                bordercountries.append(borderCountryTag)
            })
        })
    }
})

themechanger.addEventListener('click', () => {
    document.body.classList.toggle('dark')
  })

