class PrintEditionItem {
	constructor(name, releaseDate, pagesCount) {
		this.name = name;
		this.releaseDate = releaseDate;
		this.pagesCount = pagesCount
		this.state = 100
		this.type = null
	}
	
	fix() {
		this.state *= 1.5
	}
	
	set state(newState) {
		if (newState < 0) {
			newState = 0;
		}
		else if (newState > 100) {
			newState = 100;
		}
		
		this._state = newState;
	}
	
	get state() {
		return this._state
	}
}

class Magazine extends PrintEditionItem {
	constructor(name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.type = "magazine"
	}
}

class Book extends PrintEditionItem {
	constructor(author, name, releaseDate, pagesCount) {
		super(name, releaseDate, pagesCount);
		this.author = author;
		this.type = "book"
	}
}

class NovelBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "novel"
	}
}

class FantasticBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "fantastic"
	}
}

class DetectiveBook extends Book {
	constructor(author, name, releaseDate, pagesCount) {
		super(author, name, releaseDate, pagesCount);
		this.type = "detective"
	}
}

class Library {
	constructor(name) {
		this.name = name;
		this.books = [];
	}
	
	addBook(book) {
		if (book.state > 30) {
			this.books.push(book);
		}
	}
	
	findBookBy(type, value) {
		return this.books.find(book => book[type] === value) ?? null;
	}
	
	giveBookByName(bookName) {
		let index = this.books.findIndex(book => book.name === bookName);
		return index < 0 ? null : this.books.splice(index, 1)[0];
	}
}

// Создаем библиотеку
let lib = new Library('Библиотека городская');
lib.addBook(new NovelBook('Анджей Сапковский', 'Последнее желание', 1993, 640));
lib.addBook(new FantasticBook('Фрэнк Герберт', 'Дюна', 1965, 412));
console.log(lib.books);

// Создаем книгу, изданную в 1919 году
lib.addBook(new Book('TestAuthor', 'TestBook', 1919, 1));
console.log(lib.books);

// Ищем книгу, изданную в 1919 году
let testBook = lib.findBookBy('releaseDate', 1919);
console.log(testBook);

// Выдаем книгу
let dune = lib.giveBookByName('Дюна');
console.log(dune);
console.log(lib.books);

// Повреждаем книгу
dune.state = 10;
console.log(dune.state);

// Восстанавливаем книгу
dune.fix();
console.log(dune.state);

// Добавляем восстановленную книгу
lib.addBook(dune);
console.log(lib.books);
