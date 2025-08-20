let timeoutIds = [];

function scheduleReminder() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (!title || !date || !time) {
    alert("Please fill in title, date, and time.");
    return;
  }

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
          requireInteraction: true
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification(title, {
              body: description,
              requireInteraction: true
            });
          }
        });
      }
    }, timeDifference);

    timeoutIds.push(timeoutId);
  } else {
    alert("The scheduled time is in the past!");
  }
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
