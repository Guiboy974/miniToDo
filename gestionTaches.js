"use strict";

// identifier tache terminer dans tabTask
// supprimer une tache du localStorage
// filtrer taches (toute, terminer, suppr)
// changer txtcontent des li par checkbox et label


const tabTasks = [...loadTask()];

// enregistrer le tache dans le locale storage
function saveTask() {
    localStorage.setItem("Tasks", JSON.stringify(tabTasks));
};

//charger les taches depuis le local storage 
function loadTask() {
    const storageTask = localStorage.getItem("Tasks");
    if (storageTask) {
        return JSON.parse(storageTask)
    } else {
        return [];
    }
};

const inputTask = document.getElementsByClassName("task")[0];
const ulGroup = document.getElementsByClassName("list-group")[0];

// afficher les taches chargé depuis le storage
function displayTask() {
    const tasksFromStorage = loadTask();
    for (let i = 0; i < tasksFromStorage.length; i++) {
        const newListItem = document.createElement("li");
        newListItem.classList.add("list-group-item", "p-2", "d-flex", "justify-content-between");
        newListItem.textContent = tasksFromStorage[i];
        ulGroup.appendChild(newListItem);
        const newButtonDel = document.createElement("button");
        newButtonDel.innerHTML = `<i class="bi bi-trash3-fill"></i>`;
        newButtonDel.classList.add("btn", "btn-outline-danger", "btn-sm", "btn-suppr");
        newListItem.appendChild(newButtonDel);

    }
};
displayTask();

// recuperer nouvelles tache au click et ajouter tache

const btnAdd = document.getElementById("button-addon2");
btnAdd.addEventListener("click", addTask);

function addTask() {
    const newListItem = document.createElement("li");
    newListItem.classList.add("list-group-item", "p-2", "d-flex");
    newListItem.textContent = inputTask.value;
    ulGroup.appendChild(newListItem);

    const newButtonDel = document.createElement("button");
    newButtonDel.innerHTML = `<i class="bi bi-trash3-fill"></i>`;
    newButtonDel.classList.add("btn", "btn-outline-danger", "btn-sm", "btn-suppr");
    newListItem.appendChild(newButtonDel);

    tabTasks.push(newListItem.textContent);
    saveTask();
    inputTask.value = "";
}

// definir tache terminer
ulGroup.addEventListener("click", finishTask)
ulGroup.addEventListener("click", deleteTask)

function finishTask(event) {
    const listItem = document.querySelectorAll('li');
    const btnDel = document.querySelectorAll('.btn-suppr')
    for (let i = 0; i < listItem.length; i++) {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("text-success");

            tabTasks.push()
            saveTask();
        }
    }
};
console.log(localStorage.getItem("Tasks"))

// supprimer tache
function deleteTask(event) {
    if (event.target.tagName === "BUTTON") {
        event.target.parentElement.remove();
        tabTasks.splice()
        saveTask();
    } else if (event.target.tagName === "I") {
        event.target.parentElement.parentElement.remove();
        saveTask();
    }
};


