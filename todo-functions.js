// FETCH EXISTING TODOS FROM LOCAL STORAGE
const getSavedTodos = function () {
    const todosJSON = localStorage.getItem(todos);
    if (todosJSON != null) {
        todos = JSON.parse(todosJSON);
    } else {
        todos = [];
    };
}

// SAVE TODOS TO LOCAL STORAGE
const saveTodos = function (todos) {
	localStorage.setItem('todos', JSON.stringify(todos));
}

// ADDS TODO TO LOCAL STORAGE
const addTodo = function(placeholderValue) {
    todos.push({ 
        id: uuidv4(),
        text: placeholderValue, 
        completed: false 
    },);
}

// RENDER APPLICATION TODOS BASED ON FILTER PARAMS
const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function(todo){
        if (checkStatus.hideCompleted === false) {
            // RETURNS ALL TODOS
            return (todo.text.toLowerCase().includes(filters.searchText.toLowerCase()))
        } else {
            // RETURNS ONLY FITLERED TODOS
            return (todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) && todo.completed !== checkStatus.hideCompleted);
        }
	})

	// CLEARS DOCUMENT SELECTOR W/ ID OF #todo
	document.querySelector('.todoText').innerHTML = ''
	let counter = 0;

	// TAKES FILTERED ARRAY AND PRINTS TODO DIV
	filteredTodos.forEach(function(todo, counter){
        generateSummaryDOM(todo, counter);
	});
	updateCounter();
}

// GENERATE DOM ELEMENTS FOR LIST OF OBJECTS
const generateSummaryDOM = function (todo, counter) {
    // ELEMENT CONSTRUCTORS
    let itemDiv = document.createElement('div');
    const p = document.createElement('span');
    const inputBox = document.createElement('input');
    const removeMeButton = document.createElement('button');
    
    // SETS ATTRIBUTE NAMES
    itemDiv.className = `itemDiv${counter} row`;
    itemDiv.setAttribute("id", "todoText");

    removeMeButton.setAttribute("id", "removeMeButton");
    removeMeButton.textContent = "X"
    removeMeButton.addEventListener('click', function(e){
        removeTodo(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    })

    p.textContent = todo.text;
    p.setAttribute("class", 'spanText');
    
    inputBox.setAttribute("type", "checkbox");
    inputBox.setAttribute("id", `box${counter}`);
    inputBox.addEventListener('click', function(e){
        updateCompleteStatus(todo.id);
        saveTodos(todos);
        renderTodos(todos, filters);
    })

    // APPENDS ITEMS
    document.querySelector('.todoText').appendChild(itemDiv);
    document.querySelector(`.itemDiv${counter}`).appendChild(removeMeButton);
    document.querySelector(`.itemDiv${counter}`).appendChild(p);
    document.querySelector(`.itemDiv${counter}`).appendChild(inputBox);
    if (todo.completed === true) {
        document.getElementById(`box${counter}`).checked = true;
    };
    counter++;
}
   
// FUNCTION UPDATES COMPLETED TASKS & REMAINING TASKS COUNTER 
const updateCounter = function () {

	// RETURNS NON-COMPLETED TODOS
	let countRemaining = todos.filter(function(todo){
		return !todo.completed;
	})

	// RETURNS COMPLETED TODOS
	let completedTasks = todos.filter(function(todo){
		return todo.completed;
	})

	// UPDATES HTML TEXT
	printCounter.textContent = `${countRemaining.length} uncompleted tasks | ${completedTasks.length} completed`
	document.querySelector('.total').appendChild(printCounter);
}

// CLEARS OUT HTML FOR COMPLETED / UNCOMPLETED TASKS H4
const clearCounter = function () {
    todos = [];
    updateCounter();
}

// UPDATES COMPLETED TASK STATUS IN LOCAL STORAGE
const updateCompleteStatus = function (id) {
    const indexTodos = todos.findIndex(function(todo){
        if (todo.id === id) {
            return todo.completed = !todo.completed
        };
    })
}

// REMOVES INDIVIDUAL ELEMENT
const removeTodo = function (id) {
    const todoIndex = todos.findIndex(function(todo){
        return todo.id === id
    })
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    };
}