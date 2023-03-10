const Book = require("../models/book.model");
const Member = require("../models/member.model");

// Route untuk mengembalikan buku
exports.returnBook = async (req, res) => {
  try {
    const { memberId, bookId } = req.body;

    // Cek apakah member telah meminjam buku
    const member = await Member.findByPk(memberId, {
      include: [{ model: Book, as: "borrowedBooks" }],
    });
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    const book = member.borrowedBooks.find((b) => b.id === bookId);
    if (!book) {
      return res.status(400).json({ message: "Member has not borrowed this book" });
    }

    // Hitung denda jika buku dikembalikan terlambat
    const returnDate = new Date();
    const borrowDate = new Date(book.borrowedAt);
    const daysLate = Math.floor((returnDate - borrowDate) / (1000 * 60 * 60 * 24)) - 7;
    const penaltyEndDate = daysLate > 0 ? new Date(returnDate.getTime() + 3 * 24 * 60 * 60 * 1000) : null;

    // Tandai buku sebagai tidak dipinjam dan hapus dari daftar buku yang dipinjam oleh member
    await book.update({ borrowerId: null, borrowedAt: null, quantity: book.quantity + 1 });
    await member.removeBorrowedBook(book);

    // Update status penalitas member jika terlambat mengembalikan buku
    if (penaltyEndDate) {
      await member.update({ penalty: true, penaltyEndDate });
      return res.status(400).json({ message: `Book returned ${daysLate} days late. Member is penalized until ${penaltyEndDate}` });
    }

    res.status(200).json({ message: "Book returned successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
