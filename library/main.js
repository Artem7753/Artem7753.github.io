var addButton = document.getElementById("add_book");
var addForm = document.getElementById("add_new_book_form");
addButton.addEventListener("click",function(){
    addForm.style.display = "block";
})
var closeButton = document.getElementById("exit");
closeButton.addEventListener("click",function(){
    addForm.style.display = "none";
})