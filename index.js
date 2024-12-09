// Select elements
const inputField = document.getElementById('item-input');
const addButton = document.getElementById('add-btn');
const shoppingList = document.getElementById('shopping-list');
const clearButton = document.getElementById('clear-btn');

// Retrieve from local storage or initialize an empty array
let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Function to save to local storage
const saveToLocalStorage = () => {
    localStorage.setItem('shoppingList', JSON.stringify(items));
};

// Function to render the list
const renderList = () => {
    shoppingList.innerHTML = '';
    items.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item.text;
        listItem.className = item.purchased ? 'purchased' : '';
        listItem.addEventListener('click', () => togglePurchased(index));
        listItem.addEventListener('dblclick', () => editItem(index));
        shoppingList.appendChild(listItem);
    });
};

// Function to add a new item
const addItem = () => {
    const newItem = inputField.value.trim();
    if (newItem) {
        items.push({ text: newItem, purchased: false });
        saveToLocalStorage();
        renderList();
        inputField.value = '';
    }
};

// Function to toggle purchased status
const togglePurchased = (index) => {
    items[index].purchased = !items[index].purchased;
    saveToLocalStorage();
    renderList();
};

// Function to edit an item
const editItem = (index) => {
    const newText = prompt('Edit item:', items[index].text);
    if (newText !== null) {
        items[index].text = newText.trim() || items[index].text;
        saveToLocalStorage();
        renderList();
    }
};

// Function to clear the list
const clearList = () => {
    items = [];
    saveToLocalStorage();
    renderList();
};

// Event listeners
addButton.addEventListener('click', addItem);
clearButton.addEventListener('click', clearList);
window.addEventListener('DOMContentLoaded', renderList);