function addToLocalStorage(person){
    console.log(person)
    
    const persons = getToLocalStorage();
    // console.log(persons)
    if(persons.length === 0){
        persons.push(person);
        const stringifiedPersons = JSON.stringify(persons); 
        localStorage.setItem("personsData", stringifiedPersons);
    }
    else{
        localStorage.setItem("personsData", JSON.stringify([...persons,person]))
    }

}

function getToLocalStorage(){
    let persons = [];
    const stringifiedPersons = localStorage.getItem("personsData");
    // console.log(stringifiedPersons);
    if(stringifiedPersons){
        // console.log(stringifiedPersons)
        return JSON.parse(stringifiedPersons);
    }

    else{
        return persons;
    }
}



function updateToLocalStorage(person){

}

export {addToLocalStorage,getToLocalStorage}