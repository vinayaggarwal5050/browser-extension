// Set a default password if not already stored
chrome.storage.local.get(["password"], function (result) {
  if (!result.password) {
      chrome.storage.local.set({ password: "mypassword123" });
  }
});

document.getElementById("loginButton").addEventListener("click", function () {
  let enteredPassword = document.getElementById("password").value;

  chrome.storage.local.get(["password"], function (result) {
      if (enteredPassword === result.password) {
          document.getElementById("login").style.display = "none";
          document.getElementById("historySection").style.display = "block";
          loadHistory();
      } else {
          document.getElementById("errorMessage").style.display = "block";
      }
  });
});

function loadHistory() {
  let historyList = document.getElementById("historyList");
  chrome.storage.local.get(["history"], function (result) {
      let history = result.history || [];
      historyList.innerHTML = ""; // Clear previous data
      history.forEach(entry => {
          let li = document.createElement("li");
          li.textContent = `${entry.time}: ${entry.url}`;
          historyList.appendChild(li);
      });
  });
}

// Clear history
document.getElementById("clearHistory").addEventListener("click", function () {
  chrome.storage.local.set({ history: [] }, function () {
      alert("History Cleared!");
      location.reload();
  });
});

// Change Password
document.getElementById("changePassword").addEventListener("click", function () {
  let newPassword = prompt("Enter new password:");
  if (newPassword) {
      chrome.storage.local.set({ password: newPassword }, function () {
          alert("Password changed successfully!");
      });
  }
});
