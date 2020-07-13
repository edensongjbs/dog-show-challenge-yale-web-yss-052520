function qs(el) {
    return document.querySelector(el)
}

function ce(el) {
    return document.createElement(el)
}

document.addEventListener('DOMContentLoaded', () => {
    const url = 'http://localhost:3000/dogs' 
    const dogTable = qs('tbody#table-body')
    const dogForm = qs('form#dog-form')



    function showDog(dog) {

        const dogRow = ce('tr')
        
        const dogName = ce('td')
        dogName.innerText = dog.name

        const dogBreed = ce('td')
        dogBreed.innerText = dog.breed

        const dogSex = ce('td')
        dogSex.innerText = dog.sex

        const editTD = ce('td')
        const editButton = ce('button')
        editButton.innerText = "Edit"
        editButton.addEventListener("click", () => {
            
            dogForm[0].value = dog.name
            dogForm[1].value = dog.breed
            dogForm[2].value = dog.sex
            
            dogForm.addEventListener("submit", (e)=> {
                e.preventDefault()
                const configObj = {
                    method: "PATCH",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        name: dogForm[0].value,
                        breed: dogForm[1].value,
                        sex: dogForm[2].value
                    })
                }
                fetch(`${url}/${dog.id}`, configObj).then(fetchDogs)
            })
        })
        editTD.append(editButton)

        dogRow.append(dogName, dogBreed, dogSex, editTD)
        dogTable.append(dogRow)
        


    }

    function showDogs(dogs) {
        for (const dog of dogs) {
            showDog(dog)
        }
    }
    function fetchDogs() {
        dogTable.innerHTML=""
        dogForm.reset()
        fetch(url).then(res => res.json()).then(dogs => showDogs(dogs))
    }

    fetchDogs()
})