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

function purge(arr1, arr2, len1, len2, temps) {
    arr1 = [];
    arr2 = [];
    len1 = 0;
    len2 = 0;
    temps = "";
}

function cloneArray(arr1, arr2) {
    for (var i = 0; i < arr1.length; i++) {
        arr2.push(arr1[i]);
    }
}

function cleanTemp(temp) {
    if (temp.charAt(temp.length - 1).localeCompare(" ") == 0) {
        temp = temp.substring(0, temp.length - 1);
    }
    return temp; 
}

function commandType(subcmd, cmd, idx, len) {
    if (idx + subcmd.length <= len && cmd.substring(idx, idx + subcmd.length).localeCompare(subcmd) == 0) {
        return true; 
    }
    return false; 
}

function commandParser(cmd) {
    // all lowercase and trim whitespace at end
    cmd = cmd.toLocaleLowerCase();

    // main array to store search terms
    let mainSearch = []; 
    var mainSearchIdx = 0; 

    // array to store and search terms
    let andSearch = []; 
    var andSearchIdx = 0; 

    // temp array to store search terms so far
    var tempTerms = "";
    
    for (var letter = 0; letter < cmd.length; letter++) {
        if (commandType("or", cmd, letter, cmd.length)) {
            if (andSearch.length != 0) {
                andSearch.push(tempTerms);
                mainSearch[mainSearchIdx] = new Array(); 
                cloneArray(andSearch, mainSearch[mainSearchIdx]);
                mainSearchIdx++;
                tempTerms = "";
                andSearch = [];
                andSearchIdx = 0;
            } else if (tempTerms) {
                tempTerms = cleanTemp(tempTerms);
                mainSearch[mainSearchIdx] = tempTerms; 
                mainSearchIdx++; 
                tempTerms = "";
            }
            letter = letter + 2; 
        } else if (commandType("and", cmd, letter, cmd.length)) {
            if (tempTerms) {
                tempTerms = cleanTemp(tempTerms);
                andSearch[andSearchIdx] = tempTerms; 
                andSearchIdx++;
                tempTerms = ""; 
            }
            letter = letter + 3;
            orTrue = false; 
        } else if (commandType("guest", cmd, letter, cmd.length)) {
            purge(mainSearch, andSearch, mainSearchIdx, andSearchIdx, tempTerms);

        } else if (commandType("episode", cmd, letter, cmd.length)) {
            purge(mainSearch, andSearch, mainSearchIdx, andSearchIdx, tempTerms);
             
        } else if (commandType("all", cmd, letter, cmd.length)) {
            purge(mainSearch, andSearch, mainSearchIdx, andSearchIdx, tempTerms);

        } else if (commandType("random", cmd, letter, cmd.length)) {
            purge(mainSearch, andSearch, mainSearchIdx, andSearchIdx, tempTerms);

        } else {
            tempTerms += cmd.charAt(letter); 
        }
    }
    // add last term to search
    if (tempTerms) {
        tempTerms = cleanTemp(tempTerms);
        if (andSearch.length != 0) {
            andSearch.push(tempTerms);
            mainSearch[mainSearchIdx] = new Array(); 
            cloneArray(andSearch, mainSearch[mainSearchIdx]);
            console.log(mainSearch);
            return; 
        }
        cleanTemp(tempTerms);
        mainSearch[mainSearchIdx] = tempTerms; 
    }

    return mainSearch;
}

function commandData() {
    var input = document.getElementById("search").value;
    console.log(commandParser(input));
    displaySearch();
}