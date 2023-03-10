const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Book = db.define(
  "Book",
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    borrowedBy: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    borrowedDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Book;
