const inputToDoEL = document.querySelector('.todo-input');
const inputDueEL = document.querySelector('.due');
const todosContEL = document.querySelector('.todos-cont');




const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

// const todoList = [
//     {
//     name: 'wash cloths',
//     due: '2003-05-25',
//     completed: false
// },
// {
//     name: 'do dishes',
//     due: '2003-05-25',
//     completed: false
// }
// ];

renderToDo();

// function renderToDo(){
//     let htmlToDo = '';
//     for(let i = 0; i<todoList.length; i++){

//         if(todoList[i].completed === false) {
//         htmlToDo += `<div class="todos-cont-box"><p>${todoList[i].name} - on - ${todoList[i].due}</p>`;
//         } else{
//         htmlToDo += `<div class="todos-cont-box"><p class = checked>${todoList[i].name} - on - ${todoList[i].due}</p>`;
//         }
//         htmlToDo += `<button class="delete-btn" onclick="
//         todoList.splice(${i},1);
//         renderToDo();
//         saveData();
//         ">&#10006;</button></div>
//         `;
//     }
//     todosContEL.innerHTML = htmlToDo;
//     saveData();
// }

function renderToDo(){

    let htmlToDo = '';
    todoList.forEach((todo,i) => {

        if (todo.completed === false) {
        htmlToDo += `<div class="todos-cont-box"><p>${todo.name} - on - ${todo.due}</p>`;
        } else {
        htmlToDo += `<div class="todos-cont-box"><p class = checked>${todo.name} - on - ${todo.due}</p>`;
        }
        htmlToDo += `<button class="delete-btn">&#10006;</button></div>`;
    });
    todosContEL.innerHTML = htmlToDo;
    saveData();

    //adding delete event after rendering the html code or delete btn

    document.querySelectorAll('.delete-btn').forEach((btn,i) => {
        btn.addEventListener('click', () => {
            todoList.splice(i, 1);
            renderToDo();
            saveData();
        });
    });
}



document.querySelector('.add-btn')
    .addEventListener('click', () => {
        addToDo();
    });

function addToDo(){
    if(inputToDoEL.value){
        let inputToDoDue = {
            name:inputToDoEL.value,
            due: inputDueEL.value,
            completed: false
        };
    
        todoList.unshift(inputToDoDue);
        renderToDo();
        inputToDoEL.value = '';
        inputDueEL.value = '';
        saveData();
    }else {
        alert(`You didn't specified any task!`);
    }
}


// const todoPEL = document.querySelectorAll('.todo-Para');

// todoPEL.forEach(todo => {
//     todo.addEventListener('click', () => {
//         todo.classList.toggle('checked');
//         renderToDo();
//     });
// });


// todosContEL.addEventListener("click", function(e) {
//     if(e.target.tagName === "P") {
//         e.target.classList.toggle("checked");
//         saveData();
//     }
//     // renderToDo();
// }, false);


// Attach event listener to the parent container
todosContEL.addEventListener("click", function(e) {
    // Check if the clicked element is a paragraph
    if (e.target.tagName === "P") {
        // Toggle the "checked" class on the paragraph
        e.target.classList.toggle("checked");
        // Find the index of the clicked task in the todoList array
        const clickedTaskIndex = Array.from(todosContEL.querySelectorAll('.todos-cont-box')).indexOf(e.target.parentElement);
        // Update the task's completed status in the todoList array
        todoList[clickedTaskIndex].completed = !todoList[clickedTaskIndex].completed;
        // Save the updated data to local storage
        saveData();
    }
}, false);



function saveData() {
    localStorage.setItem('todoList',JSON.stringify(todoList));
}
