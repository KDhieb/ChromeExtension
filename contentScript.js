function fetchResponsibilities() {
    var temp = $(".job-description .jd-info ul li").get();
    var res = []

    for (idx = 0, len = temp.length; idx < len; idx++) {
        str = temp[idx].innerHTML;
        res.push(str);
    }

    return res;
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

function sendToEmsi() {
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
                "text": "... Great candidates also have\n\n Experience with a particular JS MV* framework (we happen to use React)\n Experience working with databases\n Experience with AWS\n Familiarity with microservice architecture\n Familiarity with modern CSS practices, e.g. LESS, SASS, CSS-in-JS ..."
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
                    console.log(data.data.skills);
                    chrome.storage.sync.set({skills: data.data.skills});
                }
            })
        }
    })
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "fetchResponsibilities") {
            sendToEmsi();
            sendResponse({responsibilities: fetchResponsibilities()});
        }
        if (request.message === "extensionOpened") {
            sendResponse({url: window.location.toString()});
        }
    }
);