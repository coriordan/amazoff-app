class LocalCache {
  constructor() {
    this.book = null ;
  }

  setBook(book) {
    this.book = book;
  }

  getBook() {
    return this.book;
  }

}

export default (new LocalCache() );