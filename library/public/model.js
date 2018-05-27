class Model{
    constructor(view){
        this.view = view;
    }

    searchBook (searchInput) {
        this.clearLibrary();
        var url = "/books?search=" + searchInput.value;
        this.loadBooks(url);
    }

    updateRating (event) {
        var star = event.target;
        var count = star.id;
        count = 5 - count[count.length - 1];
        var idEl = star.parentNode.parentNode.childNodes[1].textContent;
        var autor = star.parentNode.parentNode.childNodes[7].textContent;
        var describe = star.parentNode.parentNode.childNodes[9].textContent;
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
        this.view.setHistory(new Date(), autor, describe, 'update rating', idEl % 2 + 1);
    }

    getAllBooks (allBooksButton, mostPopularButton) {
        allBooksButton.style.background = "grey";
        allBooksButton.style.color = "white";
        mostPopularButton.style.background = "";
        mostPopularButton.style.color = "grey";
        this.clearLibrary();
        this.loadBooks("/books");
    }

    clearLibrary () {
        var library = document.getElementsByClassName('content_library').item(0);
        var books = document.getElementsByClassName('content_library_book');
        for (var j = 0; j < 4; j++)
            for (var i = 0; i < books.length; i++) {
                library.removeChild(books[i]);
            }
    }

    getPopularBooks (allBooksButton, mostPopularButton) {
        allBooksButton.style.background = "";
        allBooksButton.style.color = "grey";
        mostPopularButton.style.background = "grey";
        mostPopularButton.style.color = "white";
        var library = document.getElementsByClassName('content_library').item(0);
        var books = document.getElementsByClassName('content_library_book');
        this.clearLibrary();
        this.loadBooks("/books?filter=most_recent");
    }

    deleteBook (event) {
        var book = event.target;
        var idBook = book.parentNode.childNodes[1].textContent;
        var autor = book.parentNode.childNodes[7].textContent;
        var describe = book.parentNode.childNodes[9].textContent;
        var obj = {
            id: idBook,
    
        };
        obj = JSON.stringify(obj);
        var request = new XMLHttpRequest();
        request.open("PUT", "/books");
        request.setRequestHeader("Content-type", "Application/json");
        request.send(obj);
        book.parentNode.style.display = "none";
        this.view.setHistory(new Date(), autor, describe, 'delete book', idBook % 2 + 1);
    }

    loadBooks (path) {
        $.ajax({
            url: path,
            success: (data) => {
                var fragment = document.createDocumentFragment();
                data = JSON.parse(data);
                for (var i = 0; i < data.length; i++) {
                    var template = this.view.getTemplate(data[i].image, data[i].name, data[i].description, data[i].rating, data[i].id);
                    fragment.appendChild(template);
                }
                document.querySelector('.content_library').appendChild(fragment);
            }
        })
    }

    getHistory (path){
        $.ajax({
            url: path,
            success: (data) => {
                data = JSON.parse(data);
                this.view.setHistory(new Date(data[0].datetime), data[0].name, data[0].description, data[0].action, 1);
                this.view.setHistory(new Date(data[1].datetime), data[1].name, data[1].description, data[1].action, 2)
            }
        })
    }
    
}
