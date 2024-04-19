const { nanoid } = require('nanoid');
const books = require('./books');

const mappingResp = (values) => values.map((row) => ({
  id: row.id,
  name: row.name,
  publisher: row.publisher,
}));

const addNewBook = (request, h) => {
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);

    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);

    return response;
  }

  books.push(newBook);

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  });
  response.code(201);
  return response;
};

const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;

  if (name && reading && finished) {
    const filteredBooks = books.filter((book) => {
      const lowerBookName = book.name.toLowerCase();
      const lowerQueryName = name.toLowerCase();
      return (
        lowerBookName.includes(lowerQueryName)
        && Number(book.reading) === Number(reading)
        && Number(book.finished) === Number(finished)
      );
    });

    const response = h.response({
      status: 'success',
      data: {
        books: mappingResp(filteredBooks),
      },
    });

    response.code(200);

    return response;
  }

  if (name && reading) {
    const filteredBooks = books.filter((book) => {
      const lowerBookName = book.name.toLowerCase();
      const lowerQueryName = name.toLowerCase();

      return (
        lowerBookName.includes(lowerQueryName)
        && Number(book.reading) === Number(reading)
      );
    });

    const response = h.response({
      status: 'success',
      data: {
        books: mappingResp(filteredBooks),
      },
    });

    response.code(200);

    return response;
  }

  if (name && finished) {
    const filteredBooks = books.filter((book) => {
      const lowerBookName = book.name.toLowerCase();
      const lowerQueryName = name.toLowerCase();
      return (
        lowerBookName.includes(lowerQueryName)
        && Number(book.finished) === Number(finished)
      );
    });

    const response = h.response({
      status: 'success',
      data: {
        books: mappingResp(filteredBooks),
      },
    });

    response.code(200);

    return response;
  }

  if (reading && finished) {
    const filteredBooks = books.filter(
      (book) => Number(book.reading) === Number(reading)
        && Number(book.finished) === Number(finished),
    );

    const response = h.response({
      status: 'success',
      data: {
        books: mappingResp(filteredBooks),
      },
    });

    response.code(200);

    return response;
  }

  if (name) {
    const filteredBooks = books.filter((book) => {
      const lowerBookName = book.name.toLowerCase();
      const lowerQueryName = name.toLowerCase();
      return lowerBookName.includes(lowerQueryName);
    });

    const response = h.response({
      status: 'success',
      data: {
        books: mappingResp(filteredBooks),
      },
    });

    response.code(200);

    return response;
  }

  if (reading) {
    const filteredBooks = books.filter(
      (book) => Number(book.reading) === Number(reading),
    );

    const response = h.response({
      status: 'success',
      data: {
        books: mappingResp(filteredBooks),
      },
    });

    response.code(200);

    return response;
  }

  if (finished) {
    const filteredBooks = books.filter(
      (book) => Number(book.finished) === Number(finished),
    );

    const response = h.response({
      status: 'success',
      data: {
        books: mappingResp(filteredBooks),
      },
    });

    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: mappingResp(books),
    },
  });

  response.code(200);

  return response;
};

const getBookById = (request, h) => {
  const { bookId } = request.params;

  const book = books.find((item) => item.id === bookId);

  if (book) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });

  response.code(404);

  return response;
};
const updateBookbyId = (request, h) => {
  const { bookId } = request.params;
  const updatedAt = new Date().toISOString();
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const finished = pageCount === readPage;

  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);

    return response;
  }

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);

    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);

    return response;
  }

  books[index] = {
    ...books[index],
    name,
    year,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    author,
    reading,
    updatedAt,
  };

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
  response.code(200);
  return response;
};
const deleteBookById = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });

    response.code(404);

    return response;
  }

  books.splice(index, 1);

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil dihapus',
  });

  response.code(200);

  return response;
};

module.exports = {
  addNewBook,
  getAllBooks,
  getBookById,
  updateBookbyId,
  deleteBookById,
};
