document.addEventListener("DOMContentLoaded", () => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  let darkmode = localStorage.getItem("darkmode");
  const themeSwitch = document.getElementById("theme-switch");

  const enableDarkmode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
  };

  const disableDarkmode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkmode", "inactive");
  };

  if (darkmode === "active") enableDarkmode();

  themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
  });
});



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
      document.getElementById("notificationSound").play();

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

function setTime() {
  
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




