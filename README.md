### Shopping List Application

This is a simple interactive shopping list application that provides users with the ability to manage their shopping items. Users can add new items, update existing ones, mark them as purchased, and delete them. The application integrates with a db.json file for persistent data storage using a JSON server. click here for the app - https://maurinemutinda72.github.io/Code-Challenge-Interactive-Shopping-List/


### Features

* Add Items: Add items to the list with a name and price.
* Mark as Purchased: Toggle the purchased status of any item, with visual updates.
* Edit Items: Modify the name and price of any existing item.
* Delete Items: Remove individual items from the list.
* Clear List: Clear all items after confirmation.
* Persistent Data: Uses a JSON server for storage, ensuring changes persist even after a page reload.
* Responsive UI: Buttons and input fields are styled for ease of use.

### Files

* index.html – Contains the structure of the shopping list application.
* style.css – Styles the interface, including form fields, buttons, and the shopping list.
* index.js – Provides the functionality to interact with the shopping list and manage data.
* db.json – Acts as the backend for the application, storing the shopping list data.

### Requirements

To run the application, you need the following:

1. Web Browser: Open index.html in a browser to access the application.
2. JSON Server:
   * Install JSON Server globally using: npm install -g json-server
   * Run the server with: json-server --watch db.json
   * Ensure the server is running at http://localhost:3000.

### How to Use

1. Clone the repository or copy the files to your local system.
2. Start the JSON Server: json-server --watch db.json
3. Open index.html in your web browser.
4. Interact with the shopping list:
   * Add a new item by entering its name and price, then click Add Item.
   * Mark an item as purchased by clicking Mark Purchased.
   * Edit an item by clicking Edit and updating its details.
   * Delete an item by clicking Delete.
   * Clear the entire list by clicking Clear List.

### Future Enhancements

* User Accounts: Add support for multiple users with individual lists.
* Sorting Options: Enable sorting by name or price.
* Filtering: Add options to view purchased or unpurchased items only.
* Mobile Optimization: Improve responsiveness for mobile devices.

### Author

Queen moh

### License

This project is licensed under the MIT License.  
You are free to use, modify, and distribute this software in compliance with the license terms. See the LICENSE file for more details.