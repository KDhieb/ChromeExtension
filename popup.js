let submit = document.getElementById('submit');
let requirements = document.getElementById('requirements');
let requirementsTitle = document.getElementById('requirements-title');
var li = document.createElement("li");
var url;

let skillsTitle = document.getElementById('skills-title');
let skills = document.getElementById('skills')

submit.onclick = connect;

function appendItem(parent, child) {
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(child));
  parent.appendChild(li);
}

function connect() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    port = chrome.tabs.connect(tabs[0].id, {name: "contentScript"});
    port.postMessage({message: "fetchResponsibilities"});
  });
}

chrome.storage.sync.get('skills', function(data) {
  skillsTitle.innerHTML = "Skills";
  if(data.skills){
    for(const skill of data.skills) {
      appendItem(skills, skill);
    }
  }
});
