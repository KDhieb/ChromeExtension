let submit = document.getElementById('submit');
let requirements = document.getElementById('requirements');
let requirementsTitle = document.getElementById('requirements-title');
var li = document.createElement("li");
var url;

let skillsTitle = document.getElementById('skills-title');
let skills = document.getElementById('skills')

chrome.runtime.sendMessage({popupOpen: true});
submit.onclick = connect;

function appendItem(parent, child) {
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(child));
  parent.appendChild(li);
}

function connect() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {message: "extensionOpened"}, function(response){
      url = response.url;
    });
  });

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {message: "fetchResponsibilities"}, function(response) {
      requirementsTitle.innerHTML = "Responsibilities";

      for(idx = 0; idx < response.responsibilities.length; idx++) {
        appendItem(requirements, response.responsibilities[idx]);
      }
    });
  });
}

chrome.storage.sync.get('skills', function(data) {
  skillsTitle.innerHTML = "Skills";
  for(idx = 0; idx < data.skills.length; idx++) {
    appendItem(skills, data.skills[idx].skill.name);
  }
});