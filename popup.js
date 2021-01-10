let submit = document.getElementById('submit');
let ul = document.getElementById('requirements');
let requirementsTitle = document.getElementById('requirements-title');
var li = document.createElement("li");
var url;

submit.onclick = connect;

var port;

function connect() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    port = chrome.tabs.connect(tabs[0].id, {name: "contentScript"});
    port.postMessage({message: "fetchResponsibilities"});
    port.onMessage.addListener(function(response){
      console.log(response);
    });
  });
}


