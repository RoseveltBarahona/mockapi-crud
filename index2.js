const form = document.querySelector("#form-task")
const container = document.getElementById("container")
const btnForm = document.querySelector("#btn-task-form")
const btnCancel = document.querySelector("#btn-task-cancel")
const title = form.title
const description = form.description
let editionTask = false
let id = ""
let tasks = []

document.addEventListener("DOMContentLoaded", () => {
  tasks = JSON.parse(localStorage.getItem("myTasks")) ?? []
  renderTasks(tasks)
})
function saveToStorage () {
  localStorage.setItem("myTasks" , JSON.stringify(tasks))
}


// buttons listeners
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-delete")) {
    deleteTask(e.target.dataset.id)
  }
  if (e.target.classList.contains("btn-edit")) {
    id = e.target.dataset.id
    getTask()
  }
  if (e.target.classList.contains("checkbox")) {
    let id = e.target.parentElement.querySelector(".btn-edit").dataset.id
    let status = e.target.checked
    updateStatus(id, status)
  }
})

// cancel form
btnCancel.addEventListener("click", (e) => {
  form.reset()
  editionTask = false
  id = ""
  btnForm.textContent = "Guardar"
})

// update status
let updateStatus = (id, status) => {
  tasks = tasks.map((task) => {
    if (task.id == id) {
      task.status = status
    }
    return task
  })
  
  saveToStorage ()
  renderTasks(tasks)
}

// get task to edit
let getTask = () => {
  let taskToEdit = tasks.find((task) => task.id == id)

  form.title.value = taskToEdit.name
  form.description.value = taskToEdit.description
  btnForm.textContent = "Actualizar"
  editionTask = true
}

// update task
let updateTask = (id, taskUpdate) => {
  tasks = tasks.map((task) => {
    if (task.id == id) {
      task.name = form.title.value
      task.description = form.description.value
      /* task = taskUpdate
      task.id = id */
    }
    return task
  })
}

// delete task
let deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id != id)
  renderTasks(tasks)
}

// render tasks on the screen
function renderTasks(tasks) {
  let html = ""
  tasks.forEach((task) => {
    html += `
      <div class="card">
        <div class="card-header">
          <h3>${task.name}</h3>
          <span class="card-id">${task.id}</span>
        </div>
        <div class="card-body">        
          <p>${task.description}</p>
          <input  class="checkbox" type="checkbox" ${task.status ? "checked" : ""} />
          <button class="btn-edit" data-id="${task.id}">Editar</button>
          <button class="btn-delete" data-id="${task.id}">Eliminar</button>
        </div>
      </div>`
  })
  container.innerHTML = html
}

function verifyFields() {
  if (!title.value || !description.value) {
    alert("por favor completa el formulario")
    return true
  }
}

//  submit form to add new task or update a task 
form.addEventListener("submit", async (e) => {
  e.preventDefault()

  if (verifyFields()) return

  let task = {
    id: Date.now(),
    status: false,
    name: title.value,
    description: description.value
  }

  if (!editionTask) {
    tasks.push(task);
  } else {
    updateTask(id)
    btnForm.textContent = "Guardar"
    editionTask = false
  }
  
  renderTasks(tasks)
  form.reset()
  saveToStorage ()
})


