const db = require("../models/index");
const insertServices = require("../../services/InsertServices");

// [POST] /signup
const insert = async (req, res) => {
  try {
    const response = await insertServices.insertService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at auth controller " + error,
    });
  }
};

module.exports = { insert };
