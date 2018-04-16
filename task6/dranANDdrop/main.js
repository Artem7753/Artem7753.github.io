var button = document.getElementById("add");
var body = document.getElementsByTagName("body").item(0);
button.addEventListener("click",function(){
	var newEl = document.createElement("div");
	newEl.style.width = getRandomInt(10,200) + "px";
	newEl.style.height = getRandomInt(10,200) + "px";
	newEl.style.backgroundColor = getRandomColor();
	newEl.style.position = "absolute";
	newEl.style.left = getRandomInt(0,window.innerWidth) + "px";
	newEl.style.top = getRandomInt(0,window.innerHeight) + "px";
	body.appendChild(newEl);
})


function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var dragObj;
body.addEventListener("mousedown", function(event){
	dragObj = event.target;
	dragObj.style.zIndex = 1000;
	var coords = getCoords(dragObj);
  	var shiftX = event.pageX - coords.left;
  	var shiftY = event.pageY - coords.top;
	console.log(dragObj);
	moveAt(event);

	function moveAt(event) {
    dragObj.style.left = event.pageX - shiftX + 'px';
    dragObj.style.top = event.pageY - shiftY + 'px';
  }

	document.onmousemove = function(event) {
    moveAt(event);
  };

  dragObj.onmouseup = function() {
	  dragObj.style.zIndex = 1;
	 console.log("отжата");
    document.onmousemove = null;
    dragObj.onmouseup = null;
  };

});

function getCoords(elem) {   // кроме IE8-
  var box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

