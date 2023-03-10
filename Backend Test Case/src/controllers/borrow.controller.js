const Book = require("../models/book.model");
const Member = require("../models/member.model");

// Route untuk meminjam buku
exports.borrowBook = async (req, res) => {
  try {
    const { memberId, bookId } = req.body;

    // Cek apakah member bisa meminjam buku
    const member = await Member.findByPk(memberId, {
      include: [{ model: Book, as: "borrowedBooks" }],
    });
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    if (member.borrowedBooks.length >= 2) {
      return res.status(400).json({ message: "Member has borrowed the maximum number of books" });
    }
    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (book.quantity <= 0) {
      return res.status(400).json({ message: "Book is not available" });
    }
    if (book.borrowerId) {
      return res.status(400).json({ message: "Book is already borrowed by another member" });
    }
    if (member.penaltyEndDate && new Date(member.penaltyEndDate) > new Date()) {
      return res.status(400).json({ message: "Member is currently being penalized" });
    }

    // Tandai buku sebagai dipinjam dan tambahkan ke daftar buku yang dipinjam oleh member
    await book.update({ borrowerId: memberId, quantity: book.quantity - 1 });
    await member.addBorrowedBook(book);

    res.status(200).json({ message: "Book borrowed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
