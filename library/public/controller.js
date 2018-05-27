class Controller {
    constructor() {
        this.view = new View(this);
        this.model = new Model(this.view);
    }
    start () {
        this.model.loadBooks('/books');
        this.model.getHistory('history');
        var that = this;
        that.view.init();
    }

    deleteBook (event) {
        this.model.deleteBook(event);
    }

    searchBook (searchInput) {
        this.model.searchBook(searchInput)
    }

    getPopularBooks (allBooksButton, mostPopularButton) {
        this.model.getPopularBooks(allBooksButton, mostPopularButton);
    }
    getAllBooks (allBooksButton, mostPopularButton) {
        this.model.getAllBooks(allBooksButton, mostPopularButton);
    }
    updateRating  (event) {
        this.model.updateRating(event);
    }
    addBook () {
        this.view.addBook();
    }
}


var application = new Controller();
application.start();



