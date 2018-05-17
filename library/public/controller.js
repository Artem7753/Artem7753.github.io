window.onload = function () {
    loadBooks("/books");

    addButton.addEventListener("click", openForm, false);

    closeButton.addEventListener("click", closeForm, false);

    for (var i = 0; i < allStars.length; i++)
        allStars[i].addEventListener("click", updateRating(event));

    for (var i = 0; i < deleteButton.length; i++)
        deleteButton[i].addEventListener("click", deleteBook());

    console.log(allStars);
    console.log(deleteButton);

    searchInput.addEventListener("keyup", searchBook());

    mostPopularButton.addEventListener("click", getPopularBooks());

    allBooksButton.addEventListener("click", getAllBooks());

    addBookBut.addEventListener('click', addBook(allStars));
}


