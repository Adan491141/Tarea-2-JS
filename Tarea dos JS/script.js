class Publicacion {
    constructor(titulo, ano) {
        this.titulo = titulo;
        this.ano = ano;
    }
}

class Libro extends Publicacion {
    constructor(titulo, ano, autor, genero) {
        super(titulo, ano);
        this.autor = autor;
        this.genero = genero;
    }
}

let books = [];

function validateInput(value, type) {
    return new Promise((resolve, reject) => {
        if (type === 'text' && /^[a-zA-Z\s]+$/.test(value)) {
            resolve(true);
        } else if (type === 'number' && /^[0-9]+$/.test(value)) {
            resolve(true);
        } else {
            reject(`Invalid ${type} input`);
        }
    });
}

function addBook() {
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const genero = document.getElementById('genero').value;
    const ano = document.getElementById('ano').value;

    Promise.all([
        validateInput(titulo, 'text'),
        validateInput(autor, 'text'),
        validateInput(genero, 'text'),
        validateInput(ano, 'number')
    ]).then(() => {
        const book = new Libro(titulo, ano, autor, genero);
        books.push(book);
        displayBooks();
        clearInputs();
    }).catch(error => {
        alert(error);
    });
}

function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    books.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.titulo} - ${book.autor} (${book.genero}, ${book.ano})`;
        bookList.appendChild(li);
    });
}

function searchBooks() {
    const searchGenero = document.getElementById('searchGenero').value;
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
    const filteredBooks = books.filter(book => book.genero.toLowerCase() === searchGenero.toLowerCase());
    filteredBooks.forEach(book => {
        const li = document.createElement('li');
        li.textContent = `${book.titulo} - ${book.autor} (${book.genero}, ${book.ano})`;
        searchResults.appendChild(li);
    });
}

function clearInputs() {
    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('genero').value = '';
    document.getElementById('ano').value = '';
}
