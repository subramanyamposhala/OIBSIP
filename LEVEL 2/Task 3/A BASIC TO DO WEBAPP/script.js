document.getElementById('todo-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (title && description) {
        addTodoItem(title, description);
        document.getElementById('todo-form').reset();
    }
});

function addTodoItem(title, description) {
    const todoItems = document.getElementById('todo-items');

    const row = document.createElement('tr');

    const titleCell = document.createElement('td');
    titleCell.textContent = title;
    row.appendChild(titleCell);

    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = description;
    row.appendChild(descriptionCell);

    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', function() {
        todoItems.removeChild(row);
    });
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    todoItems.appendChild(row);
}




