const Book = require("../models/book.model");
const Member = require("../models/member.model");

// Route untuk menampilkan semua member
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.findAll({
      include: [{ model: Book, as: "borrowedBooks" }],
    });
    res.status(200).json({ members });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error " + error });
  }
};

// Route untuk menampilkan status peminjaman buku oleh member tertentu
exports.checkMemberStatus = async (req, res) => {
  try {
    const { memberId } = req.params; // Cek apakah member ditemukan
    const member = await Member.findByPk(memberId, {
      include: [{ model: Book, as: "borrowedBooks" }],
    });
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Hitung jumlah buku yang sedang dipinjam oleh member
    const borrowedCount = member.borrowedBooks.length;

    res.status(200).json({ borrowedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
