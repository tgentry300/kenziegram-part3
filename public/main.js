//fetch request
//send JSON.stringify 'after' timestamp time object

function postToLatest() {
    fetch('/latest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            clientTimestamp: Date.now()
        }),
    })
    .then(res => {
        res.json()
    })
    .catch(err => console.error(err))
    .then(data => {
        console.log(data)
    })
}

postToLatest()