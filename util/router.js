const {addBook,getBook,bookDetail,editBook,deleteBook} = require("../handler/handler");

const router = [
    {
       method: "POST",
       path: "/books",
        handler: addBook
    },
    {
        method: "GET",
        path: "/books",
        handler: getBook
    },
    {
        method: "GET",
        path: "/books/{bookId}",
        handler: bookDetail
    },
    {
        method: "PUT",
        path: "/books/{bookId}",
        handler: editBook
    },
    {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: deleteBook
    }
]

module.exports = router;