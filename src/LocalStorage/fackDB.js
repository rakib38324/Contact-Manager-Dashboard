function addToLocalStorage(person){
    
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
        return JSON.parse(stringifiedPersons);
    }

    else{
        return persons;
    }
}



function updateToLocalStorage(data, person){
    const users = getToLocalStorage();
    const user = users.find(user => user.email === person.email);
    user.name = data.name;
    user.email = data.email;
    user.number = data.number;
    localStorage.setItem("personsData", JSON.stringify(users));

}

function deleteToLocalStorage(person){
    const users = getToLocalStorage();
    console.log(users);
    localStorage.clear("personsData");
    const restUsers = users.filter(user => user.email !== person.email);
    localStorage.setItem("personsData", JSON.stringify(restUsers));

}

export {addToLocalStorage,getToLocalStorage,deleteToLocalStorage, updateToLocalStorage}