let breedsArr = []
let breedsUl = document.querySelector('#dog-breeds')

document.addEventListener('DOMContentLoaded', () => {
    getImgs()
    initialLoad()
    const drpDown = document.querySelector('#breed-dropdown')    
    drpDown.addEventListener('change', filterByFirstLetter)
})

function getImgs () {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
  fetch(imgUrl)
  .then(response => response.json())
  .then(data => addEachImg(data))
}

function addEachImg (data) {
  const dogImgCont = document.querySelector('#dog-image-container')
  let imgIdCntr = 0
  for (let i in data.message) {
    let img = document.createElement('img')
    img.src = data.message[i]
    imgIdCntr++
    img.id = imgIdCntr
    dogImgCont.appendChild(img)
  }
}

function initialLoad () {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
  .then(response => response.json())
  .then(data => {
    const breedsObj = data.message
    for (let key in breedsObj) {
      if (breedsObj[key].length === 0) {
          breedsArr.push(`${key}`)
      } else {
        for (let subBreed in breedsObj[key]) {
          breedsArr.push(`${breedsObj[key][subBreed]} ${key}`)
        }
      }
    }
    createList(breedsArr) 
  })
}
    
function createList(array) {
  let breedIdCntr = 0
//   let breedsArr
let breedsUl = document.querySelector('#dog-breeds')
breedsUl.innerHTML = ''
breedsUl.id = "dog-breeds"
  for (let index of array) {
    let breedLi = document.createElement('li')
    breedIdCntr++
    breedLi.className = 'breed-lis'
    breedLi.id = 'breed' + breedIdCntr
    breedLi.innerText = `${index}`
    breedsUl.appendChild(breedLi)
  }
} 

changeColors = function () {
    const breedsUl = document.querySelector('#dog-breeds')
  const lis = breedsUl.childNodes
  debugger
  lis.forEach(item => {item.addEventListener('click', (e) => {
      e.target.style.color = 'green'
    })
  })
}

setTimeout(changeColors
    , 1000)

function filterByFirstLetter(e) {
    const ltr = e.target.value
    filteredList = breedsArr.filter((breed) => breed.substr(0,1) === ltr)
    createList(filteredList);
    changeColors()
}