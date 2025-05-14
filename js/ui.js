
import { container } from "./elements.js"

// render tasks on the screen
export function uiRenderTasks(tasks) {
    let html = ""
    tasks.forEach((task) => {
  
      let date = new Date(task.createdAt * 1000).toLocaleDateString()
  
      html += `
        <li class="animate__fadeInUp task-card ${task.status ? "completed" : "pending"}">
          <div class="task-info">
            <img class="task-image" src="${task.avatar}" alt="task image">
            <h3 class="task-name">${task.name}</h3>
            <span class="task-created-day">${date}</span>
          </div>
          <div class="task-description">        
            <p>${task.description}</p>         
            <div class="wrap-buttons">
              <div class="task-status">
                <input id="${task.createdAt}" class="checkbox" type="checkbox" ${task.status ? "checked" : ""} />
                <label for="${task.createdAt}">Finalizada</label><br>
              </div>
              <button class="btn btn-secondary btn-update" data-id="${task.id}">Editar</button>
              <button class="btn btn-tertiary btn-delete" data-id="${task.id}"></button>
            </div>
          </div>
        </li>`
    })
    container.innerHTML = html
  }

