import { deleteTask, getTask, updateStatus } from "./index.js"
import { container, btnCancel, form, btnForm } from "./elements.js"
import { changeId, changeEditionTask } from "./index.js"

// buttons listeners

export function launchListeners() {

    container.addEventListener("click", (e) => {
        // delete task
        if (e.target.classList.contains("btn-delete")) {
            deleteTask(e.target.dataset.id)
        }

        // edit task
        if (e.target.classList.contains("btn-update")) {
            getTask(e.target.dataset.id)
            changeId(e.target.dataset.id)
            btnCancel.removeAttribute("hidden")
            form.classList.add("animate__shake")
            setTimeout(() => form.classList.remove("animate__shake"), 2000)
        }

        // change status
        if (e.target.classList.contains("checkbox")) {
            let id = e.target.parentElement.parentElement.querySelector(".btn-update").dataset.id
            let status = e.target.checked
            updateStatus(id, status)
            //let currentTask = e.target.closest(".task-card")
        }
    })

    // cancel form
    btnCancel.addEventListener("click", (e) => {
        form.reset()
        changeEditionTask(false)
        changeId("")
        btnCancel.setAttribute("hidden", true)
        btnForm.textContent = "Añadir tarea"
    })
}

