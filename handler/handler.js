let books = require("../data/books");
const nanoid = require("nanoid");

const addBook  = (req, h) => {
    try {
        data = req.payload;
        if(!data.name) {
            return h.response({
                status: "fail",
                message: "Gagal Menambahkan Buku. Mohon Isi Nama Buku"
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
                status: "Success",
                message: "Buku berhasil ditambahkan",
                data: {
                    bookId: data.id
                }
            }).code(201);
        }
    } catch (error) {
        return h.response({
            status: "error",
            message: "Buku Gagal Ditambahkan"
        }).code(500)                
    }
} 

const getBook = (req,h) => {
    let data = {
        status: "Success",
        data: {
            books:books
        }
    }
    return h.response(data).code(200);
}

const bookDetail = (req, h) => {
    const {bookId} = req.params;
    const detail = books.find(book => book.id === bookId);
    return detail ? h.response(detail).code(200) : h.response({status: "fail", message: "Buku Tidak Ditemukan"}).code(404);
}

const editBook = (req, h) => {
    const {bookId} = req.params;
    const input = req.payload;
    let edited = books.find(book => book.id === bookId);
    if(input === null || !input.name) {
        return h.response({
            status: "fail",
            message: "Gagal Memperbarui Buku. Mohon Isi Nama Buku"
        }).code(400) 
    } else if(input.readPage > input.pageCount) {
        return h.response({
            status: "fail",
            message: "Gagal Memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
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
        status: "Success",
        message: "Buku Berhasil Diperbarui"
    }).code(200);
}

const deleteBook = (req, h) => {
    const {bookId} = req.params;
    let find = books.find(book => book.id === bookId);
    books = books.filter(book => book.id !== bookId)
    return find
    ? h.response({status: "Success", message: "Buku berhasil dihapus"}).code(200) 
    : h.response({status: "fail", message: "Buku Gagal Dihapus, Id Tidak Ditemukan"}).code(404); 
}

module.exports = {
    addBook,getBook,bookDetail,editBook,deleteBook
}