function fetchResponsibilities() {  
  var res = Set();

  $('body *').each(function(){
    var line = $(this).text();
    line = line.replace("\n", "").trim();
    if(line)
    {
      res.add(line);
    }
  });

  return res;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(request);
      if (request.message === "fetchResponsibilities") {
        sendResponse({responsibilities: fetchResponsibilities(window.location.toString())});
      }
    }
  );