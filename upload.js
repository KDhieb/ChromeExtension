'use strict';
 

let inputElement = document.getElementById("resume");

// inputElement.onchange = showFile;

function showFile() {
    let files = inputElement.files;
    let file = files[0];
    console.log("testing!!!")
    console.log(file)

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "fetchresume"}, function(response) {
          requirementsTitle.innerHTML = "IT WORKS";
          console.log("PRINT SOMETHING!!!!!")
          const reader = new FileReader();
          reader.readAsDataURL(file);

         console.log(file)
        const fileURL = URL.createObjectURL(file);
        console.log(fileURL);
        getText(fileURL)
        })
    })
}

function readFile() {
    var input = document.getElementById("resume").value
    console.log(input)
}

function add() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {message: "fetchresume"}, function(response) {
                  requirementsTitle.innerHTML = "IT WORKS";
                  console.log("PRINT SOMETHING!!!!!")
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
        
                 console.log(file)
                const fileURL = URL.createObjectURL(file);
                console.log(fileURL);
                getText(fileURL)

                
                })
            })}

let getTextButton = document.getElementById('getTextButton');
getTextButton.onclick = readInputText;

function readInputText() {
                        // Selecting the input element and get its value 
                var inputVal = document.getElementById("myInput").value;
                        // Displaying the value
                // alert(inputVal);
                console.log(inputVal)
                keyWordDetection(inputVal)
}






var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://sdk.amazonaws.com/js/aws-sdk-2.824.0.min.js"

// Initialize the Amazon Cognito credentials provider

AWS.config.region = 'us-west-2'; 
AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: ""});



async function keyWordDetection(test) {
    const resolved = await new Promise(function (resolve, reject) {
        const params = { TextList: [test] };
        var comprehend = new AWS.Comprehend();
        comprehend.BatchDetectEntities(params, function (err, data) {
            if (err)
                return reject(err, err.stack);
            else {
                const { ResultList } = data;
                const entities = ResultList[0]["Entities"];
                const detectedEntity = entities[3];
                //   const detectedEntityText = detectedEntity["LanguageCode"];
                resolve(detectedEntity);
            }
        });
    });
    console.log(resolved);
    alert(resolved);
  }