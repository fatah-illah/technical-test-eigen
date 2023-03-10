const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Member = db.define(
  "Member",
  {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    borrowedBooks: {
      type: DataTypes.TEXT,
      defaultValue: "[]",
      get() {
        const value = this.getDataValue("borrowedBooks");
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue("borrowedBooks", JSON.stringify(value));
      },
    },
    penalty: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    penaltyEndDate: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = Member;
