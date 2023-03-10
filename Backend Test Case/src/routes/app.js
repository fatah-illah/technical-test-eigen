const express = require("express");
const { getAllBooks, checkBookStatus } = require("../controllers/book.controller");
const { borrowBook } = require("../controllers/borrow.controller");
const { getAllMembers, checkMemberStatus } = require("../controllers/member.controller");
const { returnBook } = require("../controllers/return.controller");

const router = express.Router();

// Route untuk menampilkan semua buku
router.get("/books", getAllBooks);

// Route untuk meminjam buku
router.post("/books/borrow", borrowBook);

// Route untuk mengembalikan buku
router.post("/books/return", returnBook);

// Route untuk menampilkan semua member
router.get("/members", getAllMembers);

// Route untuk menampilkan semua buku beserta status jumlah tersedia
router.get("/books/status", checkBookStatus);

// Route untuk menampilkan status peminjaman buku oleh member tertentu
router.get("/members/:memberId/status", checkMemberStatus);

module.exports = router;
