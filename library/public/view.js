
function View(model, controller) {
    this.model = model;
    this.controller = controller;

    this.addButton = document.getElementById("add_book");
    this.closeButton = document.getElementById("exit");
    this.form = document.getElementById("add_new_book_form");
    this.allStars = document.getElementsByClassName('book_stars');
    this.addBookBut = document.getElementById("add_book_button");
    this.deleteButton = document.getElementsByClassName("hover-block");
    this.searchInput = document.getElementsByClassName("content_bar_search").item(0);
    this.mostPopularButton = document.getElementById("most_popular");
    this.allBooksButton = document.getElementById("all_books");
}

View.prototype.init = function () {
    var that = this;
 
    this.allStars = Array.prototype.slice.call(this.allStars);
    this.deleteButton = Array.prototype.slice.call(this.deleteButton);
    

    this.addButton.addEventListener("click", function () {
        that.model.openForm(that.form);
    });

    this.closeButton.addEventListener("click", function () {
        that.model.closeForm(that.form);
    });

    for (var i = 0; i < this.allStars.length; i++)
        this.allStars[i].addEventListener("click", function () {
            that.model.updateRating(event);
        });

     for (var i = 0; i < this.deleteButton.length; i++)
        this.deleteButton[i].addEventListener("click", function () {
            that.model.deleteBook(event);
        }); 

    this.searchInput.addEventListener("keyup", function () {
        that.model.searchBook(that.searchInput);
    });

    this.mostPopularButton.addEventListener("click", function () {
        that.model.getPopularBooks(that.allBooksButton, that.mostPopularButton);
    });

    this.allBooksButton.addEventListener("click", function () {
        that.model.getAllBooks(that.allBooksButton, that.mostPopularButton);
    });

    this.addBookBut.addEventListener('click', function () {
        that.model.addBook(that.allStars);
    });
}