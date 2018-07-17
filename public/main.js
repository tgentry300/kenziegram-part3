let currentTime = Date.now()

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
            img.style.height = '100px'
            
            photosDiv.prepend(img)
        })
        
        currentTime = data.timestamp
        
    })

    setTimeout(postToLatest, 2 * 1000)
}

postToLatest()