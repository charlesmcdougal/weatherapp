const weatherForm = document.querySelector('form');
const searchLocation = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = searchLocation.value
    // if(!value) {
    //     messageOne.textContent = 'Please write a location into the text box.'
    //     return
    // }
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = `Showing the weather report for ${data.location}:`
                messageTwo.textContent = `It is ${data.description.toLowerCase()}. The temperature is currently ${data.temperature}°F, but feels like ${data.feelsLike}°F. `
            }
        })
    })
})