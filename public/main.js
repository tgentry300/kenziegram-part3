let currentTime = Date.now()
let errorCount = 0

function postToLatest() {
    fetch('/latest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            clientTimestamp: currentTime
        }),
    })
    .then(res => res.json())
    // .catch(err => console.error(err))
    .then(data => {
        photosDiv = document.getElementById('photos')
        data.images
        
        data.images.forEach(photo => {
            img = document.createElement('img')
            img.src = './uploads/' + photo
            img.style.height = '250px'
            
            photosDiv.prepend(img)
        })
        
        currentTime = data.timestamp
        
        setTimeout(postToLatest, 5 * 1000)
    })
    .catch(err =>{
        errorCount++
        if(errorCount == 1){
            setTimeout(postToLatest, 2000)
        }
        if(errorCount == 2){
            photosDiv.innerHTML = 'Connection Lost'    
        }
            
        
        
        console.log(err)
    })

}

postToLatest()