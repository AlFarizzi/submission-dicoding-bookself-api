let books = require("../data/books");
const nanoid = require("nanoid");

const addBook  = (req, h) => {
    try {
        data = req.payload;
        if(!data.name) {
            return h.response({
                status: "fail",
                message: "Gagal menambahkan buku. Mohon isi nama buku"
            }).code(400)  
        } else if(data.readPage > data.pageCount) {
            return h.response({
                status: "fail",
                message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
            }).code(400)  
        } else {
            data = {
                ...data, id:nanoid.nanoid(), 
                finished: data.readPage === data.pageCount, 
                insertedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }            
            books.push(data);
            return h.response({
                status: "success",
                message: "Buku berhasil ditambahkan",
                data: {
                    bookId: data.id
                }
            }).code(201);
        }
    } catch (error) {
        return h.response({
            status: "error",
            message: "Buku gagal ditambahkan"
        }).code(500)                
    }
} 

const getBook = (req,h) => {
    let bookData = [];
    books.forEach(book => {
        bookData.push({
            id: book.id,
            name: book.name,
            publisher: book.publisher
        });
    })
    
    let data = {
        status: "success",
        data: {
            books:bookData
        }
    }
    return h.response(data).code(200);
}

const bookDetail = (req, h) => {
    const {bookId} = req.params;
    const detail = books.find(book => book.id === bookId);
    return detail 
    ? h.response({
        status: "success",
        data: {
            book: {
                id: detail.id,
                name: detail.name,
                year: detail.year,
                author: detail.author,
                summary: detail.summary,
                publisher: detail.publisher,
                pageCount: detail.pageCount,
                readPage: detail.readPage,
                finished: detail.finished,
                reading: detail.reading,
                insertedAt: detail.insertedAt,
                updatedAt: detail.updatedAt
            }
        }
    }).code(200) 
    : h.response({status: "fail", message: "Buku Tidak Ditemukan"}).code(404);
}

const editBook = (req, h) => {
    const {bookId} = req.params;
    const input = req.payload;
    let edited = books.find(book => book.id === bookId);
    if(input === null || !input.name) {
        return h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku"
        }).code(400) 
    } else if(input.readPage > input.pageCount) {
        return h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        }).code(400)  
    } else if(!edited) {
        return h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan"
        }).code(404)  
    } 
    edited.name = input.name ? input.name : edited.name;
    edited.year = input.year ? input.year : edited.year;
    edited.author = input.author ? input.author : edited.author;
    edited.summary = input.summary ? input.summary : edited.summary;
    edited.publisher = input.publisher ? input.publisher : edited.publisher;
    edited.pageCount = input.pageCount ? input.pageCount : edited.pageCount;
    edited.readPage = input.readPage ? input.readPage : edited.readPage;
    edited.reading = input.reading ? input.reading : edited.reading;
    edited.finisher = input.finished ? input.finished : edited.finished;
    edited.updatedAt = new Date().toISOString();
    return h.response({
        status: "success",
        message: "Buku berhasil diperbarui"
    }).code(200);
}

const deleteBook = (req, h) => {
    const {bookId} = req.params;
    let find = books.find(book => book.id === bookId);
    books = books.filter(book => book.id !== bookId)
    return find
    ? h.response({
        status: "success",
        message: "Buku berhasil dihapus"
    }).code(200) 
    : h.response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan"
    }).code(404); 
}

module.exports = {
    addBook,getBook,bookDetail,editBook,deleteBook
}