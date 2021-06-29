const inputApp = document.getElementById("inputApp");
const btnAdd   = document.querySelector(".btnAddTask");
const container_for_newTask = document.querySelector(".container_for_newTask");

let tasksArray ;

!localStorage.task ?  tasksArray = [] : tasksArray = JSON.parse(localStorage.getItem("task"));

let updataTasks = () => {
  localStorage.setItem("task" , JSON.stringify(tasksArray))
}

let arrayItemsElems = [];

function Task (descriptions) {
  this.descriptions = descriptions;
  this.completed = false;
}

let addInerHtml = (task , index) => {
  return ` <div class='todo-item ${task.completed ?  "checked" : ""}' }>
  <p class="description-task">${task.descriptions}</p>
  <div class="buttons">
      <input  onclick = "completedTask(${index})" type="checkbox" class = "chek"  ${task.completed ?  "checked" : "" }>
      <button onclick = "deliteTask(${index})" class="btn_task-delite">Delit</button>
  </div>
</div>`

}


let addTask = () => {
  container_for_newTask.innerHTML = "";
  if(tasksArray.length > 0) {
    tasksArray.forEach((item , index) => {
      container_for_newTask.innerHTML += addInerHtml(item , index)
    })
    arrayItemsElems = document.querySelectorAll(".todo-item");
  }
}

addTask()

let completedTask = index => {
  console.log(index)
  tasksArray[index].completed = !tasksArray[index].completed;
  if (tasksArray[index].completed) {
    arrayItemsElems[index].classList.add("checked");
  }else {
    arrayItemsElems[index].classList.remove("checked");

  }


    updataTasks()

    addTask()

}

btnAdd.addEventListener("click", () => {

  if (inputApp.value) {
  tasksArray.push(new Task(inputApp.value));
  updataTasks()
  inputApp.value = "";
  addTask()

  }

})

let deliteTask = (index) => {
  console.log(index)
  tasksArray.splice(index, 1)

  updataTasks()
  addTask()

}

