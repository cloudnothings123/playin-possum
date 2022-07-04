document.getElementById('updateButton').addEventListener('click', updateEntry)

async function updateEntry(){
    try{
        const response = await fetch('updateEntry', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            date: document.getElementsByName("date")[0].value,
            bands: document.getElementsByName("bands")[0].value,
            venue: document.getElementsByName("venue")[0].value,
            ticketPrice: document.getElementsByName("ticketPrice")[0].value,
            startTime: document.getElementsByName("startTime")[0].value,
            ticketLink: document.getElementsByName("ticketLink")[0].value,
        })
    })
    const data = await response.json()
    console.log(data)
    location.reload()

}catch(err){
    console.log(err)
}
}