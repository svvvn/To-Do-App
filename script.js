const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const empty = document.querySelector(".empty");
const progressBar = document.getElementById("progress");
const doneCount = document.getElementById("done-count");
const totalCount = document.getElementById("total-count");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const save = () => localStorage.setItem("tasks", JSON.stringify(tasks));

function updateProgress() {
  const done = tasks.filter(t => t.done).length;
  const total = tasks.length;
  const percent = total ? (done / total) * 100 : 0;
  
  progressBar.style.width = percent + "%";
  doneCount.textContent = done;
  totalCount.textContent = total;
  
  empty.style.display = total ? "none" : "block";
}

function renderTasks() {
  taskList.innerHTML = "";
  
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    li.innerHTML = `
      <div class="task-content">
        <i class="fa-regular ${task.done ? 'fa-circle-check' : 'fa-circle'}"></i>
        <span class="task-text">${task.text}</span>
      </div>
      <button class="del-btn"><i class="fa-solid fa-trash-can"></i></button>
    `;

    // Toggle Done
    li.querySelector(".task-content").onclick = () => {
      task.done = !task.done;
      save();
      renderTasks();
    };

    // Delete Task
    li.querySelector(".del-btn").onclick = (e) => {
      li.classList.add("removing");
      setTimeout(() => {
        tasks.splice(i, 1);
        save();
        renderTasks();
      }, 300);
    };

    taskList.appendChild(li);
  });

  updateProgress();
}

// Background Motivation Animation Logic
function initMotivation() {
  const spans = document.querySelectorAll(".motivation span");
  spans.forEach(span => {
    span.style.left = Math.random() * 90 + "vw";
    span.style.setProperty('--duration', (10 + Math.random() * 20) + "s");
    span.style.animationDelay = Math.random() * 10 + "s";
  });
}

form.onsubmit = (e) => {
  e.preventDefault();
  const val = input.value.trim();
  if (!val) return;
  
  tasks.unshift({ text: val, done: false }); // Add to top
  input.value = "";
  save();
  renderTasks();
};

initMotivation();
renderTasks();
