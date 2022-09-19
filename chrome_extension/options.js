const KEY_SERVER_ADDRESS = "serverAddress";

window.addEventListener("load", () => {
  const serverAddress = document.getElementById(KEY_SERVER_ADDRESS);
  chrome.storage.local.get([KEY_SERVER_ADDRESS], (items) => {
    serverAddress.value = items.serverAddress;
  });
});

const saveButton = document.getElementById("save");
saveButton.addEventListener("click", (e) => {
  e.preventDefault();
  const serverAddress = document.getElementById(KEY_SERVER_ADDRESS);
  chrome.storage.local.set({
    "serverAddress": serverAddress.value,
  });
});
