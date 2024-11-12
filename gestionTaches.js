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
    tabTasks.push({ title: inputTask.value, done: false });
    saveTask();
    displayTasks();
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

// definir tache terminer
ulGroup.addEventListener("click", finishTask);
ulGroup.addEventListener("click", deleteTask);

function finishTask(event) {
    if (event.target.tagName === "LI") {
        const targetTaskIndex = tabTasks.findIndex(function (task) {
            return task.title === event.target.textContent;
        });
        if (tabTasks[targetTaskIndex].done === false) {
            tabTasks[targetTaskIndex].done = true;
        } else if (tabTasks[targetTaskIndex].done === true)
            tabTasks[targetTaskIndex].done = false;
        saveTask();
        displayTasks();
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

function openModal() {
    const divModal = document.createElement("div");

}

displayTasks();