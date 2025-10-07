document.addEventListener("DOMContentLoaded", () => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  let darkmode = localStorage.getItem("darkmode");
  const themeSwitch = document.getElementById("theme-switch");

  const enableDarkmode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
    if (themeSwitch) themeSwitch.setAttribute("aria-pressed", "true");
  };

  const disableDarkmode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkmode", "inactive");
    if (themeSwitch) themeSwitch.setAttribute("aria-pressed", "false");
  };

  if (darkmode === "active") enableDarkmode();

  if (themeSwitch) {
    themeSwitch.addEventListener("click", () => {
      darkmode = localStorage.getItem("darkmode");
      darkmode !== "active" ? enableDarkmode() : disableDarkmode();
    });
  }
});

/* ---------- rest of your reminder code unchanged ---------- */

let timeoutIds = [];

function scheduleReminder() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  const dateTimeString = `${date}T${time}`;
  const scheduledTime = new Date(dateTimeString);
  const currentTime = new Date();
  const timeDifference = scheduledTime - currentTime;

  if (timeDifference > 0) {
    addReminder(title, description, dateTimeString);

    const timeoutId = setTimeout(function () {
      const sound = document.getElementById("notificationSound");
      if (sound) sound.play();

      if (Notification.permission === "granted") {
        new Notification(title, {
          body: description,
          requireInteraction: true,
        });
      }
    }, timeDifference);

    timeoutIds.push(timeoutId);
  } else {
    alert("The scheduled time is in the past!");
  }
}

function setMorning() {
  const date = document.getElementById("date");
  const time = document.getElementById("time");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(7, 0, 0, 0);

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");
  const hours = String(tomorrow.getHours()).padStart(2, "0");
  const minutes = String(tomorrow.getMinutes()).padStart(2, "0");

  date.value = `${year}-${month}-${day}`;
  time.value = `${hours}:${minutes}`;
}

function setLunch() {
  const date = document.getElementById("date");
  const time = document.getElementById("time");

  const lunchtime = new Date();
  lunchtime.setHours(12, 0, 0, 0);

  const year = lunchtime.getFullYear();
  const month = String(lunchtime.getMonth() + 1).padStart(2, "0");
  const day = String(lunchtime.getDate()).padStart(2, "0");
  const hours = String(lunchtime.getHours()).padStart(2, "0");
  const minutes = String(lunchtime.getMinutes()).padStart(2, "0");

  date.value = `${year}-${month}-${day}`;
  time.value = `${hours}:${minutes}`;
}
function setEvening() {
  const date = document.getElementById("date");
  const time = document.getElementById("time");

  const eveningtime = new Date();
  eveningtime.setHours(5, 0, 0, 0);

  const year = eveningtime.getFullYear();
  const month = String(eveningtime.getMonth() + 1).padStart(2, "0");
  const day = String(eveningtime.getDate()).padStart(2, "0");
  const hours = String(eveningtime.getHours()).padStart(2, "0");
  const minutes = String(eveningtime.getMinutes()).padStart(2, "0");

  date.value = `${year}-${month}-${day}`;
  time.value = `${hours}:${minutes}`;
}

function addReminder(title, description, dateTimeString) {
  const tableBody = document.getElementById("reminderTableBody");

  const row = tableBody.insertRow();
  const titleCell = row.insertCell(0);
  const descriptionCell = row.insertCell(1);
  const dateTimeCell = row.insertCell(2);
  const actionCell = row.insertCell(3);

  titleCell.innerText = title;
  descriptionCell.innerText = description;
  dateTimeCell.innerText = dateTimeString;
  actionCell.innerHTML = '<button onclick="deleteReminder(this)">Delete</button>';
}

function deleteReminder(button) {
  const row = button.closest("tr");
  const index = row.rowIndex - 1;
  clearTimeout(timeoutIds[index]);
  timeoutIds.splice(index, 1);
  row.remove();
}




