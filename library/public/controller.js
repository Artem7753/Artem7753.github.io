function Controller(){
    this.model = new Model();
    this.view = new View(this.model, this);
}

Controller.prototype.start = function(){
    this.model.loadBooks('/books');
    var that = this;
    var timer = setTimeout(function(){
        that.view.init();
    }, 100);
}


    var application = new Controller();
    application.start();



