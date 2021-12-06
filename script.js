const url = 'https://61a7b9a9387ab200171d2e7e.mockapi.io/classes'; // setting url to our mockapi
// Getting all the ui elements we need to operate:
const classesList = document.querySelector('.classes-list');
const btnUpdate = document.querySelector('#update');
const datePicker = document.querySelector('#date');
const radioPaid = document.querySelector('#paid');
const radioUnpaid = document.querySelector('#unpaid');
const priceInput = document.querySelector('#price');
const clientInput = document.querySelector('#client');
// Creating empty Class object to use as template pushed to the database:
let newClass = {
    client: '',
    price: 0,
    status: 'paid',
    date: '',
};
// Function declaration for posting new Class to the database:
async function postClass(source) {
    let response = await fetch(source, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newClass)
    })  
};
// Function declaration for getting all the Classes from database and generating respective ui:
async function getClasses(source) {
    let response = await fetch(source)
    let data = await response.json()
    let count = data.length
    classesList.innerHTML = '' // Initial clear of all the container to fill it with new inputs from database
    while (count !== 0) {
        if (data[count-1].status == 'paid') {  // Flow for adding paid Classes
            let div = document.createElement('div')
            div.className = 'container class paid'
            div.innerHTML = '<p>👤 ' + data[count-1].client + '</p>'
            div.innerHTML += '<p>📅 ' + data[count-1].date + '</p>'
            div.innerHTML += '<p>🟢 ₴' + data[count-1].price + '</p>'
            div.id = count
            classesList.appendChild(div)
            count = --count
        } else { // Flow for adding unpaid Classes
            let div = document.createElement('div')
            div.className = 'container class unpaid'
            div.innerHTML = '<p>👤 ' + data[count-1].client + '</p>'
            div.innerHTML += '<p>📅 ' + data[count-1].date + '</p>'
            div.innerHTML += '<p>🔴 ₴' + data[count-1].price + '</p>'
            div.id = count
            classesList.appendChild(div)
            count = --count
        }
    }
};

// Handling paid or unpaid radio buttons to include respective option to the new Class:
radioPaid.addEventListener('click', ()=>{
    newClass.status = 'paid'
});
radioUnpaid.addEventListener('click', ()=>{
    newClass.status = 'unpaid'
});

// Handling adding new Class through the form:
btnUpdate.addEventListener('click', () => {
    // Check all the fields have values choosen:
    if (datePicker.value && priceInput.value && clientInput) {
        newClass.client = clientInput.value
        newClass.price = priceInput.value
        newClass.date = datePicker.value
        postClass(url)
        window.alert('New class record added!')
        // Restoring all the inputs to default:
        datePicker.value = ''
        priceInput.value = 250
        clientInput.value = ''
    } else {
        window.alert('Fill all the fields first!')
    }
});

getClasses(url); // Initial list update
setInterval(function(){ getClasses(url) }, 4000); // Background list update every 4 sec