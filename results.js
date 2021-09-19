function displaySearch() {
var amount = 20;

var prev = document.getElementById("resultsView");
if (prev != null) {
    prev.remove();
}

var mainBody = document.getElementsByTagName("body");
var resultList = document.createElement("ul");
resultList.setAttribute("id", "resultsView");
mainBody[0].appendChild(resultList);

    for (var i = 0; i < amount; i++) {
        var resultTag = document.createElement("li");
        var text = document.createTextNode("this");
    
        resultTag.appendChild(text);
        resultTag.className = "indView"

        resultList.appendChild(resultTag);
        console.log(i);
    }

    return false; 
}