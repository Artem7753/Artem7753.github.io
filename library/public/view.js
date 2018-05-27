class View {
    constructor(controller) {
        this.controller = controller;

        this.addButton = document.getElementById("add_book");
        this.closeButton = document.getElementById("exit");
        this.form = document.getElementById("add_new_book_form");
        this.addBookBut = document.getElementById("add_book_button");
        this.searchInput = document.getElementsByClassName("content_bar_search").item(0);
        this.mostPopularButton = document.getElementById("most_popular");
        this.allBooksButton = document.getElementById("all_books");
        this.hiddenId = document.getElementById("next_id");
    }

    init () {
        var that = this;
    
        this.addButton.addEventListener("click", function () {
            that.openForm();
        });
    
        this.closeButton.addEventListener("click", function () {
            that.closeForm();
        });
    
        this.searchInput.addEventListener("keyup", function () {
            that.controller.searchBook(that.searchInput);
        });
    
        this.mostPopularButton.addEventListener("click", function () {
            that.controller.getPopularBooks(that.allBooksButton, that.mostPopularButton);
        });
    
        this.allBooksButton.addEventListener("click", function () {
            that.controller.getAllBooks(that.allBooksButton, that.mostPopularButton);
        });
    
        this.addBookBut.addEventListener('click', function () {
            that.controller.addBook();
        });
    }
    
    openForm () {
        this.form.style.display = "block";
    }
    closeForm () {
        this.form.style.display = "none";
    }

    addBook () {
        var fragment = document.createDocumentFragment();
        var file = document.getElementById('file').value;
        var autor = document.getElementById('autor').value;
        var describe = document.getElementById('describe').value;
        var newId = +this.allStars[allStars.length - 1].name.split('rs')[1] + 1;
        var template = this.getTemplate(file, autor, describe, 3, newId);
        setHistory(new Date(), autor, describe, 'add book', newId % 2 + 1);
    
        fragment.appendChild(template);
        console.log(fragment);
        document.querySelector('.content_library').appendChild(fragment);
    }

    getTemplate (image, name, description, rating, i) {
        var template = document.querySelector("#book_template").content.cloneNode(true);
        template.querySelector(".content_library_poster").src = image;
        template.querySelector(".content_library_title").textContent = name;
        template.querySelector(".content_library_description").textContent = description;
        template.querySelector(".book-id").textContent = i;
        var stars = template.querySelector(".content_library_stars").children;
        for (var j = 0; j < 5; j++) {
            stars[j * 2].id = 'star' + (i + 1) + '_' + j;
            stars[j * 2].name = 'stars' + (i + 1);
            stars[j * 2 + 1].setAttribute("for", ('star' + (i + 1) + '_' + j));
            if (rating == (5 - j)) {
                stars[j * 2].setAttribute("checked", "checked");
            }
        }
        var allStars = template.querySelectorAll('.book_stars');
        var deleteButton = template.querySelector(".hover-block");
        for (var i = 0; i < allStars.length; i++)
            allStars[i].addEventListener("click", (event) => {
                this.controller.updateRating(event);
            });
    
        deleteButton.addEventListener("click", (event) => {
            this.controller.deleteBook(event);
        });
        this.hiddenId.value = +allStars[allStars.length - 1].name.split('rs')[1] + 1;
        return template;
    }
    setHistory (time, name, description, action, pos) {
        var actionField = document.getElementById('action' + pos);
        var nameField = document.getElementById('name' + pos);
        var descriptionField = document.getElementById('autor' + pos);
        var timeField = document.getElementById('time' + pos);
    
        actionField.textContent = action;
        nameField.textContent = name;
        descriptionField.textContent = description;
        timeField.textContent = time;
    }
}

