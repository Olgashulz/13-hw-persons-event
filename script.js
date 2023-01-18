btn.addEventListener('click', handleSubmit);
statsBtn.addEventListener('click', printStats);

id.onkeyup = handleInputChange;
firstName.onkeyup = handleInputChange;
lastName.onkeyup = handleInputChange;
age.onkeyup = handleInputChange;

const persons = [];
const data = ['id', 'first Name', 'last Name', 'age'];
let newPerson = new Person();

function handleInputChange(event) {
    const name = event.target.id;
    let value = event.target.value;

    switch (name) {
        case 'id':
            newPerson.id = value;
            break;

        case 'firstName':
            newPerson.firstName = value;
            break;

        case 'lastName':
            newPerson.lastName = value;
            break;

        case 'age':
            newPerson.age = value;
            break;

        default:
            return;
    }
}

function handleSubmit(event) {
    event.preventDefault();

    for (let key in newPerson) {
        if (newPerson[key] === undefined) {
            alert("You did not enter all the data, please try again.");
            break;
        }
    }

    if (persons.findIndex(p => p.id === newPerson.id) >= 0) {
        alert("A person with this id already exists, check and enter the correct data.");
    }

    persons.push(newPerson);

    newPerson = new Person();
    if (document.querySelector('.blockTable') === null) {
        createTable(persons);
    }
    if (persons.length) {
        fillTable();
    }
}

function createTable(persons) {
    const blockTable = document.createElement('div');
    blockTable.setAttribute('class', 'blockTable');


    const titleEl = createInfoElement('Personal data', 'h3')
    personalData.appendChild(titleEl);

    const tableEl = document.createElement('table');
    tableEl.setAttribute('class', 'table table-dark table-hover');

    const theadEl = document.createElement('thead');
    tableEl.appendChild(theadEl);

    const trEl = document.createElement('tr');
    theadEl.appendChild(trEl);

    for (let i = 0; i < data.length; i++) {
        const thEl = createInfoElement(data[i].toString(), 'th')
        thEl.setAttribute('scope', 'col')
        trEl.appendChild(thEl);
    }

    const tbodyEl = document.createElement('tbody');
    tbodyEl.setAttribute('class', 'body')
    tableEl.append(tbodyEl);

    blockTable.append(tableEl);
    personalData.append(blockTable);
}

function fillTable() {
    const bodyTrEl = document.createElement('tr');
    document.querySelector('.body').appendChild(bodyTrEl);

    for (let key in persons[persons.length - 1]) {
        if (typeof persons[persons.length - 1][key] !== "function") {
            const tdBodyEl = createInfoElement(persons[persons.length - 1][key].toString(), 'td')
            bodyTrEl.appendChild(tdBodyEl);
        }
    }
}

function createTableStats() {
    const stats = document.querySelector('.statistic');
    const statsBtn = document.createElement('button');
    statsBtn.setAttribute('type', 'submit');
    statsBtn.setAttribute('id', 'statsBtn');
    const textBtn = document.createTextNode('Statistic');
    statsBtn.appendChild(textBtn);
    stats.appendChild(statsBtn);
}

function printStats() {
    if (persons.length) {
        const start = persons[0].age
        const minAge = persons.reduce((res, p) => p.age < res ? p.age : res, start);
        const maxAge = persons.reduce((res, p) => p.age > res ? p.age : res, start);
        const avgAge = persons.reduce((res, p) => Number(p.age) + res, 0) / persons.length;
        const divStats = document.createElement('div')
        const h3avg = createInfoElement(`Average age: ${avgAge.toFixed(1)}`, 'p');
        const h3min = createInfoElement(`Min age: ${minAge}`, 'p');
        const h3max = createInfoElement(`Max age: ${maxAge}`, 'p');
        divStats.append(h3avg, h3min, h3max);
        stats.appendChild(divStats);
    } else {
        stats.appendChild(createInfoElement('No stats...', 'h4'));
    }
}

function createInfoElement(content, tag) {
    const element = document.createElement(tag);
    const text = document.createTextNode(content);
    element.appendChild(text);
    return element;
}

function Person(id, firstName, lastName, age) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
}