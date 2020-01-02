// BLANK ARRAY OF OBJECTS. HOLDS ALL TODOS
let todos = [];

// CHECKS LOCAL STORAGE FOR SAVED TODOS
getSavedTodos();

// ADD PLACEHOLDER DATA
addTodo('Placeholder Data');

// SETS PRINTCOUNTER AS AN ELEMENT
const printCounter = document.createElement('h4');

// USED FOR CHECKBOXES AND LOCAL STORAGE
let checkedBox = undefined;
let textForCheckbox = undefined;

// BLANK FILTER VARIABLE
const filters = {
	searchText: '',
}

// PLACEHOLDER VAR USED BY RENDERTODOS() & HIDECOMPLETED()
let checkStatus = {
	hideCompleted: false,
}

// INITIATES WEB APP BY READING TODOS ARRAY OF OBJECT
renderTodos(todos, filters)

// SEARCHES TEXT FROM <input> USING RENDERTODOS FUNCTION
document.querySelector('#search-todo').addEventListener('input', function(e) {
	filters.searchText = e.target.value;
	renderTodos(todos, filters);
	updateCounter();
});

// REMOVES ALL TASKS, CLEARS LOCAL STORAGE, UPDATES COUNTER
document.querySelector('#remove-all').addEventListener('click', function(e){
	document.querySelectorAll('#todoText').forEach(function(e){
		e.remove();
		localStorage.clear();
		clearCounter();
	})
});

// ADDS UNCOMPLETED TASK TO ARRAY OF OBJECTS 'TODOS' VIA FORM ENTRY
document.querySelector('#form').addEventListener('submit', function(e){
	e.preventDefault();
	if (e.target.formEntry.value === "") {
		return window.alert('Please Enter Valid Task')
	} else {
		// PUSHES TASK TO ARRAY OF OBJECTS
		let placeholderValue = e.target.formEntry.value
		addTodo(placeholderValue);
		saveTodos(todos);
	}
	// RENDERTODOS & RESET FIELDS
	renderTodos(todos, filters);
	e.target.formEntry.value = "";
});

// IF CHECKED BUTTON CHANGES CHECKSTATUS VAR & RENDERTODOS WILL RETURN OBJECTS W/ MATCHING ATTRIBUTE
document.querySelector('#hideCompleted').addEventListener('change', function(e){
	console.log(e.target.checked);
	checkStatus.hideCompleted = e.target.checked
	renderTodos(todos, filters);
});

// CHANGES CHECKED STATUS IN LOCAL STORAGE
document.querySelector('.todoText').addEventListener('change', function(e){
	checkedBox = e.target.checked;
	updateCompleteStatus(todos);
})

// REMOVES INDIVIDUAL TASK FROM TASK LIST
// document.querySelector('#removeMeButton').addEventListener('click', function(e){
// 	console.log(e)
// 	let todoTextValue = e.target.parentElement.attributes[1].value;
// 	console.log(todoTextValue)
// 	removeElementFunc(todoTextValue);
// 	renderTodos(todos, filters);
// })
