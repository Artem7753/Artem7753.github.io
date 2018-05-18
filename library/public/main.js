var addButton = document.getElementById("add_book");
var closeButton = document.getElementById("exit");
var form = document.getElementById("add_new_book_form");

window.onload = function () {
	addButton.addEventListener("click", openForm, false);
	closeButton.addEventListener("click", closeForm, false);

	var allStars = document.getElementsByClassName('book_stars');
	allStars = Array.from(allStars);

	for (var i = 0; i < allStars.length; i++)
		allStars[i].addEventListener("click", updateRating());

	var addBookBut = document.getElementById("add_book_button");
	addBookBut.addEventListener('click', addBook(allStars));

	var deleteButton = document.getElementsByClassName("hover-block");
	deleteButton = Array.from(deleteButton);
	for (var i = 0; i < deleteButton.length; i++)
	deleteButton[i].addEventListener("click", deleteBook());

}
var openForm = function () {
	form.style.display = "block";
}
var closeForm = function () {
	form.style.display = "none";
}

var searchInput = document.getElementsByClassName("content_bar_search").item(0);
searchInput.addEventListener("keyup", searchBook());

var mostPopularButton = document.getElementById("most_popular");
mostPopularButton.addEventListener("click", getPopularBooks());

var allBooksButton = document.getElementById("all_books");
allBooksButton.addEventListener("click", getAllBooks());

function searchBook() {
	return function () {
		clearLibrary();
		var url = "/books?search=" + searchInput.value;
		loadBooks(url);
	};
}

function updateRating() {
	return function (event) {
		var star = event.target;
		var count = star.id;
		count = 5 - count[count.length - 1];
		var idEl = star.parentNode.parentNode.childNodes[1].textContent;
		var obj = {
			id: idEl,
			star: count
		};
		obj = JSON.stringify(obj);
		console.log(obj);
		var request = new XMLHttpRequest();
		request.open("PUT", "/stars");
		request.setRequestHeader("Content-type", "Application/json");
		request.send(obj);
	};
}

function addBook(allStars) {
	return function () {
		var fragment = document.createDocumentFragment();
		var file = document.getElementById('file').value;
		var autor = document.getElementById('autor').value;
		var describe = document.getElementById('describe').value;
		var newId = +allStars[allStars.length - 1].name.split('rs')[1] + 1;
		var template = getTemplate(file, autor, describe, 3, newId);
		fragment.appendChild(template);
		console.log(fragment);
		document.querySelector('.content_library').appendChild(fragment);
	};
}

function getAllBooks() {
	return function () {
		allBooksButton.style.background = "grey";
		allBooksButton.style.color = "white";
		mostPopularButton.style.background = "";
		mostPopularButton.style.color = "grey";
		clearLibrary();
		loadBooks("/books");
	};
}

function clearLibrary() {
	var library = document.getElementsByClassName('content_library').item(0);
	var books = document.getElementsByClassName('content_library_book');
	for (var j = 0; j < 4; j++)
		for (var i = 0; i < books.length; i++) {
			library.removeChild(books[i]);
		}
}

function getPopularBooks() {
	return function () {
		allBooksButton.style.background = "";
		allBooksButton.style.color = "grey";
		mostPopularButton.style.background = "grey";
		mostPopularButton.style.color = "white";
		var library = document.getElementsByClassName('content_library').item(0);
		var books = document.getElementsByClassName('content_library_book');
		clearLibrary();
		loadBooks("/books?filter=most_recent");
	};
}

function deleteBook() {
	return function (event) {
		var book = event.target;
		var idBook = book.parentNode.childNodes[1].textContent;
		var obj = {
			id: idBook
		};
		obj = JSON.stringify(obj);
		var request = new XMLHttpRequest();
		request.open("DELETE", "/books");
		request.setRequestHeader("Content-type", "Application/json");
		request.send(obj);
		book.parentNode.style.display = "none";
	};
}

