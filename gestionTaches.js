"use strict";

/*   filtrer taches (toute, terminer, suppr)
* sauvegarde locale storage
*/

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

// afficher les taches chargé depuis le storage
function displayTask() {
    for (let i = 0; i < tabTasks.length; i++) {
        tabTasks[i] = addTask();
    }
};

// recuperer nouvelles tache au click et ajouter tache
const inputTask = document.getElementsByClassName("task")[0];
const ulGroup = document.getElementsByClassName("list-group")[0];

const btnAdd = document.getElementById("button-addon2");
btnAdd.addEventListener("click", addTask);

function addTask() {
    const newListItem = document.createElement("li");
    newListItem.classList.add("list-group-item", "p-2", "d-flex", "justify-content-between");
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
        console.log("ok");
    } else if(event.target.tagName === "I"){
        event.target.parentElement.parentElement.remove();
    }
};


