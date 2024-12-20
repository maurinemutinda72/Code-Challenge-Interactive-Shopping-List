// DOM Elements
const itemInput = document.getElementById("item-input");
const priceInput = document.getElementById("item-price");
const addButton = document.getElementById("add-button");
const clearButton = document.getElementById("clear-button");
const shoppingListContainer = document.getElementById("shopping-list");

// Base URL for the JSON server
const baseUrl = "http://localhost:3000/shoppingList";

// Function to fetch and render the list from db.json
async function fetchAndRenderList() {
    try {
        const response = await fetch(baseUrl);
        const shoppingList = await response.json();

        // Clear current list in DOM
        shoppingListContainer.innerHTML = "";

        // Render each item
        shoppingList.forEach((item) => {
            const listItem = document.createElement("li");

            // Create item structure
            listItem.innerHTML = `
                <div>
                    <span class="item-name">${item.name}</span> - 
                    <span class="item-price">$${item.price}</span>
                </div>
                <div>
                    <button class="purchase-btn">${item.purchased ? "Undo" : "Mark Purchased"}</button>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;

            // Add event listeners
            const purchaseButton = listItem.querySelector(".purchase-btn");
            const editButton = listItem.querySelector(".edit-btn");
            const deleteButton = listItem.querySelector(".delete-btn");

            // Mark as purchased
            purchaseButton.addEventListener("click", () => togglePurchased(item.id, item.purchased));

            // Edit item
            editButton.addEventListener("click", () => editItem(item.id, item.name, item.price));

            // Delete item
            deleteButton.addEventListener("click", () => deleteItem(item.id));

            // Add purchased style
            if (item.purchased) {
                listItem.style.textDecoration = "line-through";
            }

            // Append item to DOM
            shoppingListContainer.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching the shopping list:", error);
    }
}

// Function to add a new item
async function addItem() {
    const name = itemInput.value.trim();
    const price = parseFloat(priceInput.value);

    // Validate inputs
    if (name && !isNaN(price)) {
        const newItem = { name, price, purchased: false };

        try {
            await fetch(baseUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newItem),
            });

            // Clear inputs and refresh list
            itemInput.value = "";
            priceInput.value = "";
            fetchAndRenderList();
        } catch (error) {
            console.error("Error adding a new item:", error);
        }
    } else {
        alert("Please enter a valid name and price.");
    }
}

// Function to toggle purchased status
async function togglePurchased(id, currentStatus) {
    try {
        await fetch(`${baseUrl}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ purchased: !currentStatus }),
        });

        fetchAndRenderList();
    } catch (error) {
        console.error("Error updating purchased status:", error);
    }
}

// Function to edit an item
async function editItem(id, currentName, currentPrice) {
    const newName = prompt("Edit item name:", currentName);
    const newPrice = prompt("Edit item price:", currentPrice);

    // Validate inputs
    if (newName && !isNaN(parseFloat(newPrice))) {
        try {
            await fetch(`${baseUrl}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newName.trim(), price: parseFloat(newPrice) }),
            });

            fetchAndRenderList();
        } catch (error) {
            console.error("Error editing the item:", error);
        }
    } else {
        alert("Please enter valid inputs for name and price.");
    }
}

// Function to delete an item
async function deleteItem(id) {
    try {
        await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
        fetchAndRenderList();
    } catch (error) {
        console.error("Error deleting the item:", error);
    }
}

// Function to clear the entire list
async function clearList() {
    if (confirm("Are you sure you want to clear the entire list?")) {
        try {
            const response = await fetch(baseUrl);
            const shoppingList = await response.json();

            // Delete each item
            await Promise.all(
                shoppingList.map((item) =>
                    fetch(`${baseUrl}/${item.id}`, { method: "DELETE" })
                )
            );

            fetchAndRenderList();
        } catch (error) {
            console.error("Error clearing the shopping list:", error);
        }
    }
}

// Add event listeners
addButton.addEventListener("click", addItem);
clearButton.addEventListener("click", clearList);

// Initial render
fetchAndRenderList();
