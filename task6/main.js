var selected;
var accordeon = document.getElementsByClassName("wrapper").item(0);
console.log(accordeon);
accordeon.addEventListener("click",function(event){
	var target = event.target;
	openBody(target);
});

var openBody = function(node){
	if(selected){
		selected.nextElementSibling.style.display = "none";
	}
	selected = node;
	selected.nextElementSibling.style.display = "block";
}
