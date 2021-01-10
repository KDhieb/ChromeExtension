let submit = document.getElementById('submit');
let ul = document.getElementById('requirements');
let requirementsTitle = document.getElementById('requirements-title');
var li = document.createElement("li");
var url;

chrome.runtime.sendMessage({popupOpen: true});
submit.onclick = connect;

function connect() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: "fetchResponsibilities"}, function(response) {
      console.log(response);
    });
  });
}
