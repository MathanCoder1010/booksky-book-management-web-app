var popover = document.querySelector(".popup-overlay");
var popupbox = document.querySelector(".popup-box"); 
var addpopupbutton = document.getElementById("add-popup-button");

addpopupbutton.addEventListener("click", function () {
    popover.style.display = "block";
    popupbox.style.display = "block";
});

var cancelbutton = document.getElementById("cancel-popup");
cancelbutton.addEventListener("click", function (event) {
    event.preventDefault();
    popover.style.display = "none";
    popupbox.style.display = "none";
});

var container = document.getElementById("books-container");
var addbook = document.getElementById("add-book");
var booktitleinput = document.getElementById("book-title-input");
var bookauthorinput = document.getElementById("book-author-input");
var bookdescriptioninput = document.getElementById("book-description-input");
var searchInput = document.getElementById("search-input");

document.addEventListener("DOMContentLoaded", displayBooks);

addbook.addEventListener("click", function (event) {
    event.preventDefault();

    if(booktitleinput.value.trim() === "" || bookauthorinput.value.trim() === "" || bookdescriptioninput.value.trim() === "") {
        alert("Please fill in all fields!");
        return;
    }

    var newBook = {
        id: Date.now(),
        title: booktitleinput.value,
        author: bookauthorinput.value,
        description: bookdescriptioninput.value
    };

    var books = JSON.parse(localStorage.getItem("books")) || [];
    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));

    displayBooks();

    booktitleinput.value = "";
    bookauthorinput.value = "";
    bookdescriptioninput.value = "";
    popover.style.display = "none";
    popupbox.style.display = "none";
});

function displayBooks() {
    var books = JSON.parse(localStorage.getItem("books")) || [];
    container.innerHTML = "";

    books.forEach(function(book) {
        var div = document.createElement("div");
        div.setAttribute("class", "book-container");
        div.innerHTML = `
            <div>
                <h2>${book.title}</h2>
                <h5>${book.author}</h5>
                <p>${book.description}</p>
            </div>
            <button onclick="deleteBook(${book.id})">Delete</button>`;
        container.append(div);
    });
}

function deleteBook(id) {
    var books = JSON.parse(localStorage.getItem("books")) || [];
    books = books.filter(book => book.id !== id);
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
}

searchInput.addEventListener("keyup", function() {
    var filter = searchInput.value.toLowerCase();
    var bookContainers = container.getElementsByClassName("book-container");

    for (var i = 0; i < bookContainers.length; i++) {
        var title = bookContainers[i].getElementsByTagName("h2")[0];
        var author = bookContainers[i].getElementsByTagName("h5")[0];
        
        if (title || author) {
            var textValue = title.textContent || title.innerText;
            var authorValue = author.textContent || author.innerText;
            
            if (textValue.toLowerCase().indexOf(filter) > -1 || authorValue.toLowerCase().indexOf(filter) > -1) {
                bookContainers[i].style.display = "";
            } else {
                bookContainers[i].style.display = "none";
            }
        }
    }
});