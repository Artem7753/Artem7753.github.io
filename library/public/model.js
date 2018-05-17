function searchBook() {
	return function () {
		clearLibrary();
		var url = "/books?search=" + searchInput.value;
		loadBooks(url);
	};
}

function updateRating(event) {
		var star = event.target;
		var count = star.id;
		count = 5 - count[count.length - 1];
		var idEl = star.name.split('rs')[1];
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
		for (var j = 0; j < 4; j++)
			for (var i = 0; i < books.length; i++) {
				library.removeChild(books[i]);
			}
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

var openForm = function () {
    form.style.display = "block";
}
var closeForm = function () {
    form.style.display = "none";
}

var getTemplate = function(image, name, description, rating, i){
    var template = document.querySelector("#book_template").content.cloneNode(true);
                template.querySelector(".content_library_poster").src = image;
                template.querySelector(".content_library_title").textContent = name;
                template.querySelector(".content_library_description").textContent = description;
                template.querySelector(".book-id").textContent = i;
                var stars = template.querySelector(".content_library_stars").children; 
                for(var j = 0; j<5; j++){
                    stars[j*2].id = 'star'+(i+1)+'_'+j;
                    stars[j*2].name = 'stars'+(i+1);
                    stars[j*2+1].setAttribute("for", ('star'+(i+1)+'_'+j));
                    if(rating == (5-j)){
                        stars[j*2].setAttribute("checked", "checked");
                    }
                }
                return template;
                
}

var loadBooks = function(path){
    $.ajax({
        url : path,
        success: function(data){
            var fragment = document.createDocumentFragment();
            data = JSON.parse(data);
            for(var i = 0; i<data.length; i++){
                var template = getTemplate(data[i].image, data[i].name, data[i].description, data[i].rating, data[i].id);
                fragment.appendChild(template);
            }
            document.querySelector('.content_library').appendChild(fragment);
        }
    })
}