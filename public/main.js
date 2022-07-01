document.getElementById('deleteButton').addEventListener('click', deleteEntry)
document.getElementById('updateButton').addEventListener('click', updateEntry)

async function deleteEntry(){
    const input = document.getElementById("deleteInput")
    console.log(input.value)
    try{
        const response = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              name: input.value
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

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
        })
    })
    const data = await response.json()
    console.log(data)
    location.reload()

}catch(err){
    console.log(err)
}
}