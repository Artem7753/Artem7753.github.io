var wrapper = document.getElementById("wrapper");
var inside = document.createElement("div");
inside.setAttribute("id","inside");
inside.innerHTML = "it is inside";
var prepend = function(container,newElement){
    var firstChild = container.firstChild;
    container.insertBefore(newElement,firstChild);
}
prepend(wrapper,inside);

var text = document.createTextNode("any text");
wrapper.appendChild(text);

var deleteTextNodes = function(element){
    for(var i = 0;i<=element.childElementCount;i++){
        if(element.childNodes[i].nodeType == 3){
            element.removeChild(element.childNodes[i]);
        }
    }
}
deleteTextNodes(wrapper);


var deleteTextNodesRec = function(element){
    if(element.childElementCount == 0){
        return element;
    }
    for(var i = 0; i<=element.childElementCount; i++){
        if(element.childNodes[i].nodeType == 1){
            var subEl = element.childNodes[i];
            deleteTextNodesRec(subEl);
        }
        else{
            element.removeChild(element.childNodes[i]);
        }
    }
    
}
var list = document.querySelector(".list");
console.log(list);
deleteTextNodesRec(list);
console.log(list.childNodes);


var page = document.querySelectorAll("body")
console.log(page);
console.log(page.item(0).childNodes[1].tagName);

var bodyTags = new Array();
var bodyClass = new Array();

var indexOfTag = function(tag){
    var result = -1;
    for(var i = 0; i<bodyTags.length; i++){
        if(bodyTags[i][0] == tag)
            result = i;
    }
    return result;
}

var indexOfClass = function(className) {
    var result = -1;
    for(var i = 0; i<bodyClass.length; i++){
        if(bodyClass[i][0] == className)
            result = i;
    }
    return result;
}

var scanDOMtags = function(element){
    if(element.childElementCount == 0){
        return element;
    }
    for(var i = 0; i<element.childElementCount;i++){
        if(indexOfTag(element.childNodes[i].tagName) == -1){
            var subArr = new Array(2);
            subArr[0] = element.childNodes[i].tagName;
            subArr[1] = 1;
            bodyTags.push(subArr);
            var subEl = element.childNodes[i];
            scanDOMtags(subEl);
        }
        else{
            bodyTags[indexOfTag(element.childNodes[i].tagName)][1]++;
            var subEl = element.childNodes[i];
            scanDOMtags(subEl);
        }
    }
}

var scanDOMclass = function(element){
    if(element.childElementCount == 0){
        return element;
    }
    for(var i = 0; i<element.childElementCount;i++){
        for(var j = 0; j<element.childNodes[i].classList.length; j++){
            if(indexOfClass(element.childNodes[i].classList[j]) == -1){
                var subArr = new Array(2);
                subArr[0] = element.childNodes[i].classList[j];
                subArr[1] = 1;
                bodyClass.push(subArr);
                var subEl = element.childNodes[i];
                scanDOMclass(subEl);
            }
            else{
                bodyClass[indexOfClass(element.childNodes[i].classList[j])][1]++;
                var subEl = element.childNodes[i];
                scanDOMclass(subEl);
            }
        }
        
    }
}
var scanDOM = function(){
    deleteTextNodesRec(page.item(0));
    scanDOMtags(page.item(0));
    scanDOMclass(page.item(0));
    for(var i = 0; i< bodyTags.length; i++){
        console.log("tag: " + bodyTags[i][0] + " -- " + bodyTags[i][1]);
    }
    
    for(var i = 0; i< bodyClass.length; i++){
        console.log("class: " + bodyClass[i][0] + " -- " + bodyClass[i][1]);
    }
}
scanDOM();















