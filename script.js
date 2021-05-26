const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('Loader')
let photosArray = []
let ready = false
let imagesLoaded = 0
let totalImages = 0

const apiKey = `AF7tP2-q0PFnicXPjkhcs3G5XLV4L6VHM_lcITlmGug`
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=30`

const setAttributes = (element,attribute) =>{
    for(const key in attribute){
        element.setAttribute(key,attribute[key])
    } 
}

const imageLoaded = (event) =>{
    imagesLoaded++
    if(imagesLoaded === totalImages){
        loader.hidden = true
        ready = true
    }
}

const displayPhotos = () =>{
    totalImages = photosArray.length
    imagesLoaded = 0

    photosArray.forEach(photo=>{
        const item = document.createElement('a')
        setAttributes(item,{
            href : photo.links.html,
            target : '_blank'
        })

        const img = document.createElement('img')
        setAttributes(img,{
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description
        })

        img.addEventListener('load',imageLoaded)

        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}


const getPhotos = async ()=>{
    try{
        let data = await fetch(apiURL)
        photosArray = await data.json()
        displayPhotos()
    } catch(err){

    }
}

window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){ 
        getPhotos()
    }
})

getPhotos()