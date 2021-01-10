let submit = document.getElementById('submit');
let ul = document.getElementById('requirements');
let requirementsTitle = document.getElementById('requirements-title');
var li = document.createElement("li");

submit.onclick = connect;

function connect() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {message: "fetchResponsibilities"}, function(response) {
        console.log(response.responsibilities);
        console.log(response.skills);
        requirementsTitle.innerHTML = "Responsibilities";

        for(idx = 0; idx < response.responsibilities.length; idx++) {
          var li = document.createElement("li");
          li.appendChild(document.createTextNode(response.responsibilities[idx]));
          ul.appendChild(li);
        }
      });
    });
}
