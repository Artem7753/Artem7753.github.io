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

var search = document.getElementsByClassName("content_bar_search").item(0);
search.addEventListener("keyup",function(){
	var books = document.getElementsByClassName("content_library_book");
	for(var i = 0;i<books.length;i++){
		books.item(i).style.display = "none";
	}
	var regExp = new RegExp("^" + search.value, "i");
	for(var i = 0;i<books.length;i++){
		if(regExp.test(books.item(i).childNodes.item(3).innerHTML)){
			books.item(i).style.display = "block";
		}
	}
})

var mostPopular = document.getElementById("most_popular");
mostPopular.addEventListener("click",function(){
	var books = document.getElementsByClassName("content_library_book");
	for(var i = 0;i<books.length;i++){
		if(!books.item(i).childNodes.item(7).childNodes.item(1).checked)
			books.item(i).style.display = "none";
	}
})
var allBooks = document.getElementById("all_books");
allBooks.addEventListener("click",function(){
	var books = document.getElementsByClassName("content_library_book");
	for(var i = 0;i<books.length;i++){
		books.item(i).style.display = "block";
	}
})






























