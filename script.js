const addBtn = document.querySelector('#add');

//Adding cards to DOM.  
function addCard(text = '') {
    const card = document.createElement('div');
    const cardTop = document.createElement('div');
    const main = document.createElement('div');
    const textArea = document.createElement('textarea');
    card.classList.add('card');
    cardTop.classList.add('card-top');
    main.classList.add('main');
    cardTop.appendChild(addEditButton());
    cardTop.appendChild(addRemoveButton());
    card.appendChild(cardTop);

    //If any text content has been written , we want to textArea has to be unvisible. 
    text ? textArea.classList.add('hidden') : main.classList.add('hidden');
    card.appendChild(main);
    card.appendChild(textArea);
    document.body.appendChild(card);

    const editBtn = card.querySelector('.edit');
    const removeBtn = card.querySelector('.remove');

    textArea.value = text;
    main.innerHTML = text;

    editBtn.addEventListener('click', () => {
        main.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });

    textArea.addEventListener('input', (e) => {
        const { value } = e.target;
        main.innerHTML = value;
        updateLocalStorage();
    });

    removeBtn.addEventListener('click', () => {
        removeFromLocalStorage(card.lastElementChild.value);
        card.remove();
    });
}

// If any spesific card has been updated , we want to update it from local storage.
function updateLocalStorage() {
    const texts = document.querySelectorAll('textarea');
    const storage = [];
    texts.forEach(text => {
        storage.push(text.value);
    })
    localStorage.setItem('items', JSON.stringify(storage));
}

// Every loading of page triggers to display card items that has been storaged in local storage.
function displayFromLocalStorage() {
    const elements = JSON.parse(localStorage.getItem('items'));
    elements.forEach(element => {
        addCard(element);
    });
}

// Remove an item from local storage which we parametrized.
function removeFromLocalStorage(item){
    let arrayOfLocalStorage = localStorageArray();
    arrayOfLocalStorage = arrayOfLocalStorage.filter(element => element !== item);
    localStorage.setItem('items' , JSON.stringify(arrayOfLocalStorage));
}

// We get the values in the current state of local Storage.
function localStorageArray(){
    let itemsFromLocalStorage ;
    if(localStorage.getItem('items') === null){
        itemsFromLocalStorage = [];
    } else {
        itemsFromLocalStorage = JSON.parse(localStorage.getItem('items'));
    }
    return itemsFromLocalStorage;
}

function addEditButton() {
    const editBtn = document.createElement('button');
    const i = document.createElement('i');
    editBtn.classList.add('edit');
    i.classList.add('fas', 'fa-edit');
    editBtn.appendChild(i);
    return editBtn;
}

function addRemoveButton() {
    const removeBtn = document.createElement('button');
    const i = document.createElement('i');
    removeBtn.classList.add('remove');
    i.classList.add('fas', 'fa-trash-alt');
    removeBtn.appendChild(i);
    return removeBtn;
}

function init() {
    addBtn.addEventListener('click', () => addCard(''));
    document.addEventListener('DOMContentLoaded' , displayFromLocalStorage);
}
init();