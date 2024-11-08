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

// afficher toutes les taches chargé depuis le storage
function displayTasks() {
    const tasksFromStorage = tabTasks;
    ulGroup.innerHTML = ""
    for (let i = 0; i < tasksFromStorage.length; i++) {
        const newListItem = document.createElement("li");
        newListItem.classList.add("list-group-item", "p-2", "d-flex", "justify-content-between");
        newListItem.textContent = tasksFromStorage[i].title;
        ulGroup.appendChild(newListItem);
        const newButtonDel = document.createElement("button");
        newButtonDel.innerHTML = `<i class="bi bi-trash3-fill"></i>`;
        newButtonDel.classList.add("btn", "btn-outline-danger", "btn-sm", "btn-suppr");
        newListItem.appendChild(newButtonDel);
        inputTask.value = "";
    }
};


// affiche uniquement les taches en cour 
function toDoTask() {}

// recuperer nouvelles tache au click et ajouter tache

const btnAdd = document.getElementById("button-addon2");
btnAdd.addEventListener("click", addTask);

function addTask() {
    tabTasks.push({ title:inputTask.value, done:false });
    saveTask();
    displayTasks();
}

// definir tache terminer
ulGroup.addEventListener("click", finishTask);
ulGroup.addEventListener("click", deleteTask);

function finishTask(event) {
    const listItem = document.querySelectorAll('li');
    const btnDel = document.querySelectorAll('.btn-suppr')
    for (let i = 0; i < listItem.length; i++) {
        if (event.target.tagName === "LI") {
            event.target.classList.add("text-succes");

            tabTasks[i].done = true;
            saveTask();
        }
    }
};
console.log(localStorage.getItem("Tasks"))

// supprimer tache
function deleteTask(event) {
    if (event.target.tagName === "BUTTON") {
        const index = tabTasks[event.target.parentElement];
        event.target.parentElement.remove();

        tabTasks.splice(index, 1);
        saveTask();
    } else if (event.target.tagName === "I") {
        const index2 = tabTasks[event.target.parentElement.parentElement];
        event.target.parentElement.parentElement.remove();

        tabTasks.splice(index2, 1);
        saveTask();
    }
};


// trier les taches en cours et terminer
const selectOption = document.getElementsByTagName("select")[0];
selectOption.addEventListener("change", sortTasks)

function sortTasks(event) {
    const optionInSelect = document.getElementsByTagName("option");
    const changeOption = event.target.value
    console.log(event.target.value);
    
}

displayTasks();