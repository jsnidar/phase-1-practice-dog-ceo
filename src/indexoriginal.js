const breedsArr = []
const breedsUl = document.querySelector('#dog-breeds')
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener('DOMContentLoaded', () => {
    getImgs()
    initialLoad();
    setTimout(createList(), 1000)
})

//Challenge 1
    //declare global variables
    //fetch the images using this url 
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    function getImgs () {
        fetch(imgUrl)
        //parse images as JSON
        .then(response => response.json())
        //add image elements to the DOM for each image in the array 
        .then(data => addEachImg(data));
    }

    function addEachImg (data) {
        let imgIdCntr = 0
        const dogImgCont = document.querySelector('#dog-image-container')
        for (let i in data.message) {
            let img = document.createElement('img')
            img.src = data.message[i]
            imgIdCntr++
            img.id = imgIdCntr
            dogImgCont.appendChild(img)
        }
    }
    
//Challenge 2
    //on page load, fetch all dog breeds using the url below
    function initialLoad () {
        fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breedsObj = data.message
            for (let key in breedsObj) {
                if (breedsObj[key].length === 0){
                    breedsArr.push(`${key}`)
                }else{
                    for(let subBreed in breedsObj[key]) {
                        breedsArr.push(`${breedsObj[key][subBreed]} ${key}`)
                    }
                }
            }
        })
    }
    function createList(array) {
        
        let breedIdCntr = 0
        debugger
        for (let index of array) {
            let breedLi = document.createElement('li')
            breedIdCntr++
            //assign the text of that list item to be the text contained in the JSON object
            breedLi.className = 'breed-lis'
            breedLi.id = 'breed' + breedIdCntr
            breedLi.innerText = `${index}`
            //append the list item to the unordered list with the id dog-breed
            breedsUl.appendChild(breedLi)
        }
            
    }

    setTimeout(changeColors, 1000)
    
    function changeColors () {
        const lis = breedsUl.childNodes
        lis.forEach(item => {item.addEventListener('click', (e) => {
            e.target.style.color = 'green'
            })
        })
    }
    //Challenge 4
    //dropdown sorter
    //path to dropdown
    const drpDown = document.querySelector('#breed-dropdown')
    const drpDwnOptions = document.querySelector("#breed-dropdown").options
    
    drpDown.addEventListener('change', filterByFirstLetter)
    function filterByFirstLetter(e) {
        const ltr = e.target.value
        filteredList = breedsArr.filter((li) => li.innerText.substr(0,1) === ltr)

        // let breedLis = document.querySelectorAll('.breed-lis')
        // breedLis = [...document.querySelectorAll('.breed-lis')]
        // const ltr = e.target.value
        // for (let liNode in breedLis) {
        //     const breedLi = breedLis[liNode]
        //     console.log(breedLi)
        //     const breedName = breedLi.innerText
        //     if (breedName.substr(0,1) !== ltr) {
        //             breedName.remove
        //         }
        // }
    }
    