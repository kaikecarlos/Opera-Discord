
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}
function setStatus(tabId, changeInfo, tab) {
    if (tab.active === true && !(tab.url == undefined)) {
        var url = new URL(tab.url);

        readTextFile("./blacklist.json", function (text) {
            var data = JSON.parse(text);
            if  (text.indexOf(url.hostname) > -1) {
                var data = {
                    url: "Unavailable",
                    details: "Unavailable",
                    state: "Unavailable",
                    smallText: "Unavailable",
                    largeText: "Unavailable"
                };

                var xhttp = new XMLHttpRequest();
                xhttp.open("POST", "http://127.0.0.1:3000/", true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.send(JSON.stringify(data));
                console.log(data);
            } else {
                var data = {
                    url: tab.url,
                    details: url.hostname,
                    state: tab.title,
                    smallText: tab.title,
                    largeText: tab.url
                };

                var xhttp = new XMLHttpRequest();
                xhttp.open("POST", "http://127.0.0.1:3000/", true);
                xhttp.setRequestHeader("Content-type", "application/json");
                xhttp.send(JSON.stringify(data));
                console.log(data);
            }
        });
    }
}



console = chrome.extension.getBackgroundPage().console;


// Eventos;
chrome.tabs.onUpdated.addListener(setStatus);
