import { uiRenderTasks } from "./ui.js"
import { launchListeners } from "./event-listeners.js";
import { btnForm, form } from "./elements.js"

const url = "https://6810eec427f2fdac24136452.mockapi.io/v1/tasklist";
const headers = { "Content-Type": "application/json"}
let editionTask = false
let id = ""
const changeEditionTask = (value) => { editionTask = value }
const changeId = (value) => { id = value }


document.addEventListener("DOMContentLoaded", () => {
  console.log(editionTask);
  getTasks()
  launchListeners()
})


// Submit form to add or edit a task
form.addEventListener("submit", async (e) => {
  e.preventDefault()
  const title = form.title
  const description = form.description

  if (!title.value || !description.value) {
    return alert("por favor completa el formulario")
  }

  let task = {
    name: title.value,
    description: description.value
  }

  try {
    if (!editionTask) {
      postTask(task)
    } else {
      updateTask(id, task)
      btnForm.textContent = "Guardar"
      editionTask = false
      console.log(editionTask)
    }
    form.reset()

  } catch (error) {
    console.log(error);
  }
})


// Get tasks from api  order: ${"?sortBy=status&order=status"}
async function getTasks() {
  try {
    let response = await fetch(`${url}`)
    if (!response.ok) {
      throw new Error("Error en la solicitud")
    }
    let data = await response.json()
    uiRenderTasks(data)

  } catch (error) {
    console.log(error)
  }
}


// Update status
let updateStatus = async (id, status) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ status: status })
    })
    if (!response.ok) {
      throw new Error("Error en la solicitud")
    }
    const data = await response.json()
    getTasks()
  } catch (error) {
    console.log(error);
  }
}


// Get task to edit on the form
let getTask = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`)
    if (!response.ok) {
      throw new Error("Error en la solicitud")
    }

    const task = await response.json()
    form.title.value = task.name
    form.description.value = task.description

    btnForm.textContent = "Actualizar tarea"
    editionTask = true
    console.log(editionTask)

  } catch (error) {
    console.log(error)
  }
}


// Update task
let updateTask = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        name: form.title.value,
        description: form.description.value,
        //status: form.status.checked
      })
    })
    if (!response.ok) {
      throw new Error("Error en la solicitud")
    }
    const data = await response.json()
    getTasks()
  } catch (error) {
    console.log(error)
  }
}


// Post task
let postTask = async (task) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(task)
    })
    if (!response.ok) {
      throw new Error("Error en la solicitud")
    }
    const data = await response.json()
    getTasks()
  } catch (error) {
    console.log(error)
  }
}


// Delete task
let deleteTask = async (id) => {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
      headers
    })
    if (!response.ok) {
      throw new Error("Error en la solicitud")
    }
    const data = await response.json()
    getTasks()
  }
  catch (error) {
    console.log(error)
  }
}

export { getTasks, updateStatus, getTask, updateTask, postTask, deleteTask, changeId, changeEditionTask}
