"use strict";

/* ajouter "tache terminer" ( add icon checked)
 * supprimer tache 
 * filtrer taches (toute, active, suppr)
 * sauvegarde locale storage
*/

// recuperer nouvelles tache au click et ajouter tache
const inputTask = document.getElementsByClassName("task")[0];
const ulGroup = document.getElementsByClassName("list-group")[0];
const tabTask = [];

const btnAdd = document.getElementById("button-addon2");
btnAdd.addEventListener("click", addTask);

function addTask() {
    const newListItem = document.createElement("li");
    newListItem.classList.add("list-group-item", "p-2", "d-flex", "justify-content-between");
    newListItem.textContent = inputTask.value;
    ulGroup.appendChild(newListItem);

    const newButtonDel = document.createElement("button");
    newButtonDel.textContent = "Supprimer";
    newButtonDel.classList.add("btn", "btn-outline-danger", "btn-sm", "btn-suppr")
    newButtonDel.setAttribute("id", "suppr")
    newListItem.appendChild(newButtonDel);

    tabTask.push(inputTask.value);
    inputTask.value = "";
}

// definir tache terminer
ulGroup.addEventListener("click", finishTask)

function finishTask(event) {
    const listItem = document.querySelectorAll('li');
    for (let i = 0; i < listItem.length; i++) {
        if (event.target.tagName === "LI") {
            event.target.classList.add("disabled", "text-decoration-line-trough", "text-danger");
        }
    }
};

// supprimer tache
const btnDelete = document.getElementById("suppr");
btnDelete.addEventListener("click", (event) => event.target.remove);


console.log(tabTask)

localStorage.setItem("tasks", JSON.stringify(tabTask));



