function fetchResponsibilities() {  
  var res = new Set();

  $('.job-description').each(function(){
    var line = $(this).text();
    line = line.replace("\n", "").trim();
    if(line)
    {
      console.log(line);
      res.add(line);
    }
  });
  

  return Array.from(res).join(" ");
}

let auth_endpoint = "https://auth.emsicloud.com/connect/token"

let client_id = "ihil071p6tbsgy18";
let secret = "uUzekrLN";
let scope = "emsi_open";

let data = {
    client_id: client_id,
    client_secret: secret,
    grant_type: "client_credentials",
    scope: scope
}

function sendToEmsi(inputText) {
    let token = "";
    $.post({
        type: "POST",
        url: auth_endpoint,
        data: data,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Content-Type", "application/x-www-form-urlencoded");
        },
        success: function(data){
            token = data.access_token;
            
            let text = {
                "text": inputText
            }

            $.post({
                type: "POST",
                url: "https://cors-anywhere.herokuapp.com/https://emsiservices.com/skills/versions/latest/extract/trace",
                data: JSON.stringify(text),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", `Bearer ${token}`);
                    xhr.setRequestHeader ("Content-Type", "application/json");
                },
                success: function(data){
                    console.log(data);
                    chrome.storage.local.set({'emsi': data});
                }
            })
        }
    })
}

chrome.runtime.onConnect.addListener(function(port){
  console.assert(port.name == "contentScript");
  port.onMessage.addListener(function(request) {
      if (request.message === "fetchResponsibilities") {
        var text = fetchResponsibilities();
        var emsiData = sendToEmsi(text);
        port.postMessage({responsibilities: emsiData});
      }
    }
  )
});
