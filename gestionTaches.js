"use strict";

// filtrer taches (toute, terminer, suppr)
// (changer txtcontent des li par checkbox et label)

//charger les taches depuis le local storage 
function loadTask() {
    const storageTask = localStorage.getItem("Tasks");
    if (storageTask) {
        return JSON.parse(storageTask);
    } else {
        return [];
    }
};

// enregistrer le tache dans le locale storage
function saveTask() {
    localStorage.setItem("Tasks", JSON.stringify(tabTasks));
};

const tabTasks = loadTask();

const inputTask = document.getElementsByClassName("task")[0];
const ulGroup = document.getElementsByClassName("list-group")[0];
const selectOption = document.getElementsByTagName("select")[0];
selectOption.addEventListener("change", displayTasks);

// afficher toutes les taches chargé depuis le storage
function displayTasks() {
    ulGroup.innerHTML = "";
    for (let i = 0; i < tabTasks.length; i++) {
        // trier les taches en cours et terminer
        const optionSelect = selectOption.selectedIndex;
        
        // tache a faire
        if (optionSelect === 1) {
            if (tabTasks[i].done === false) {
                displayTask(tabTasks[i]);
            }
            
            // tache terminer  
        } else if (optionSelect === 2) {
            if (tabTasks[i].done === true) {
                displayTask(tabTasks[i]);
            }
            
            // toutes les taches    
        } else {
            displayTask(tabTasks[i]);
        }
    }
};

function displayTask(task) {
    const newListItem = document.createElement("li");
    newListItem.textContent = task.title;

    newListItem.setAttribute("id", task.id)
    ulGroup.appendChild(newListItem);
    const newButtonDel = document.createElement("button");
    newButtonDel.innerHTML = `<i class="bi bi-trash3-fill"></i>`;
    newButtonDel.classList.add("btn", "btn-outline-danger", "btn-sm", "ms-auto", "btn-suppr");
    newListItem.appendChild(newButtonDel);
    inputTask.value = "";
    if (task.done === false) {
        newListItem.classList.add("list-group-item", "p-2", "d-flex");
    } else {
        newListItem.classList.add("list-group-item", "p-2", "d-flex", "fst-italic", "text-danger");
        const newIcon = document.createElement("i");
        newIcon.innerHTML = '<i class="bi bi-check-all p-2"></i>';
        newListItem.insertBefore(newIcon, newButtonDel)
    }
}

/*faire un if dans display task pour affiché les classList en fonction de
de done true ou false */

// recuperer nouvelles tache au click et ajouter tache
const btnAdd = document.getElementById("button-add");
btnAdd.addEventListener("click", addTask);
inputTask.addEventListener("keypress", keyPress)

function addTask() {
    const modalBody = document.querySelector(".modal-body")
    modalBody.textContent = inputTask.value;
    tabTasks.push({ title: inputTask.value, done: false, id: newId(tabTasks) });
    saveTask();
    displayTasks();
}

const newId = function (task) {
    if (task.length === 0) {
        return 0;
      }
      const lastId = task[task.length - 1].id;
      const newId = lastId + 1;
      return newId;
}

function keyPress(event) {
    if (inputTask.value !== "") {
        if (event.key === "Enter") {
            addTask();
        } else if (event.key === "NumpadEnter") {
            addTask();
        }
    }
}

// definir tache terminer ou pas
ulGroup.addEventListener("click", finishTask);
ulGroup.addEventListener("click", deleteTask);

function finishTask(event) {
    if (event.target.tagName === "LI") {
        console.log(event.target.id);
        
        const targetTaskIndex = tabTasks.findIndex((task) => task.id == event.target.id);

        if (targetTaskIndex !== -1) {
            const task = tabTasks[targetTaskIndex];
            if (task.done === false) {
                task.done = true;
            } else if (task.done === true)
                task.done = false;
            saveTask();
            displayTasks();
        } else {
            console.log("erreur");
            
        }
    }
};

console.log(localStorage.getItem("Tasks"))

// supprimer tache
function deleteTask(event) {
    if (event.target.tagName === "BUTTON") {
        const targetTaskIndex = tabTasks.findIndex(function (task) {
            return task.id == event.target.parentElement.id;
        });
        tabTasks.splice(targetTaskIndex, 1);
        saveTask();
    } else if (event.target.className === "bi bi-trash3-fill") {
        const targetTaskIndex2 = tabTasks.findIndex(function (task) {
            return task.id == event.target.parentElement.parentElement.id;
        });
        tabTasks.splice(targetTaskIndex2, 1);
        saveTask();
    }
    displayTasks();
};

displayTasks();