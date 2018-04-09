var addButton = document.getElementById("add_book");
var closeButton = document.getElementById("exit");
var form = document.getElementById("add_new_book_form");

window.onload = function(){
    addButton.addEventListener("click",openForm,false);
    closeButton.addEventListener("click",closeForm,false);
}
var openForm = function(){
    form.style.display = "block";
}
var closeForm = function(){
    form.style.display = "none";
}
