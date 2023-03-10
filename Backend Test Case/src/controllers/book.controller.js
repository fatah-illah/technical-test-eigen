const Book = require("../models/book.model");
const Member = require("../models/member.model");

// Route untuk menampilkan semua buku
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Route untuk menampilkan semua buku beserta status jumlah tersedia
exports.checkBookStatus = async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: ["id", "title", "author", "quantity"],
      include: [{ model: Member, as: "borrower", attributes: ["id", "name"] }],
    });
    res.status(200).json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
