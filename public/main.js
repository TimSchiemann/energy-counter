const deleteButtons = document.querySelectorAll('.delete-button')

Array.from(deleteButtons).forEach(button => {
    button.addEventListener('click', deleteEntry)
})

async function deleteEntry(){
    const id = this.parentNode.parentNode.childNodes[1].innerText
    console.log(id)
    try{
        const res = await fetch('deleteEntry', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                '_id' : id
            })
        })
        const data = await res.json()
        location.reload()
    } catch(error) {
        console.error(error)
    }
}

console.log(deleteButtons)