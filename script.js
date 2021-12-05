const classesList = document.querySelector('.classes-list');
const url = 'https://61a7b9a9387ab200171d2e7e.mockapi.io/classes';
const btnUpdate = document.querySelector('#update');
const datePicker = document.querySelector('#date');
const radioPaid = document.querySelector('#paid');
const radioUnpaid = document.querySelector('#unpaid');
const priceInput = document.querySelector('#price');
const clientInput = document.querySelector('#client');

let newClass = {
    client: '',
    price: 0,
    status: 'paid',
    date: '',
};

async function postClass(source) {
    let response = await fetch(source, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newClass)
    })  
}

async function getClasses(source) {
    let response = await fetch(source)
    let data = await response.json()
    let count = data.length
    classesList.innerHTML = ''
    while (count !== 0) {
        if (data[count-1].status == 'paid') {
            let div = document.createElement('div')
            div.className = 'container class paid'
            div.innerHTML = '<p>👤 ' + data[count-1].client + '</p>'
            div.innerHTML += '<p>📅 ' + data[count-1].date + '</p>'
            div.innerHTML += '<p>🟢 ₴' + data[count-1].price + '</p>'
            div.id = count
            classesList.appendChild(div)
            count = --count
        } else {
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

radioPaid.addEventListener('click', ()=>{
    newClass.status = 'paid'
});
radioUnpaid.addEventListener('click', ()=>{
    newClass.status = 'unpaid'
});

btnUpdate.addEventListener('click', () => {
    if (datePicker.value && priceInput.value && clientInput) {
        newClass.client = clientInput.value
        newClass.price = priceInput.value
        newClass.date = datePicker.value
        postClass(url)
    } else {
        window.alert('Fill all the fields first!')
    }
});

getClasses(url);
setInterval(function(){ getClasses(url) }, 4000);