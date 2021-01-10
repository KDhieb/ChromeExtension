'use strict';


// if (window.File && window.FileReader && window.FileList && window.Blob) {
//     function showFile() {
//        var demoImage = document.querySelector('input');
//        var file = document.querySelector('input[type=file]').files[0];
//        var reader = new FileReader();
//        reader.onload = function (event) {
//           demoImage.src = reader.result;
//        }
//        reader.readAsDataURL(file);
//        console.log(file)
//        console.log(reader.readAsDataURL(file))
//     }
//  } else {
//     alert("Your browser is too old to support HTML5 File API");
//  }

let inputElement = document.getElementById("resume");
inputElement.onchange = showFile;

function showFile(input) {
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
