function fetchResponsibilities() {
    var temp = $(".job-description .jd-info ul li").get();
    var res = []

    for (idx = 0, len = temp.length; idx < len; idx++) {
        str = temp[idx].innerHTML;
        res.push(str);
    }

    return res;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(request);
      if (request.message === "fetchResponsibilities") {
        sendResponse({responsibilities: fetchResponsibilities()});
      }
      if (request.message === "extensionOpened") {
        sendResponse({url: window.location.toString()});
      }
    }
  );