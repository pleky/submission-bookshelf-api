const {
  getAllBooks, addNewBook, getBookById, updateBookbyId, deleteBookById,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addNewBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookById,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookbyId,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookById,
  },
];

module.exports = routes;
