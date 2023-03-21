const min_duration = 500;

const addButton = document.getElementById("add-button");
addButton.addEventListener("click", addToast);

const clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", clearToasts);

function addToast() {
  const message = document.getElementById("message-content").value;
  const cancelable = document.getElementById("cancelable").checked;
  const type = document.querySelector('input[name="type"]:checked').value;

  const newToast = createToast(message, cancelable, type);

  document.getElementById("toasts").prepend(newToast);

  setTimeout(() => newToast.remove(), getDuration());
}

function createToast(message, cancelable, type) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.classList.add(`${type}-toast`);

  const p = document.createElement("p");
  p.classList.add("message");
  p.textContent = message.length > 0 ? message : getDefaultMessage(type);
  toast.appendChild(p);

  if (cancelable) {
    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("cancel-button");
    cancelBtn.textContent = "X";
    cancelBtn.addEventListener("click", () => toast.remove());
    toast.appendChild(cancelBtn);
  }

  return toast;
}

function getDefaultMessage(type) {
  return type === "error" ? "Error." : "Success!";
}

function getDuration() {
  const duration = document.getElementById("duration").valueAsNumber;

  if (isNaN(duration) || duration < min_duration) {
    return min_duration;
  }
  return duration;
}

function clearToasts() {
  document.getElementById("toasts").innerHTML = "";
}
