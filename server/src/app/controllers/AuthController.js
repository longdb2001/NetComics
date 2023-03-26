const CRUDService = require("../../services/CRUDService");
const db = require("../models/index");
const authService = require("../../services/AuthService");

class AuthController {
  // [POST] /signup
  async signUp(req, res) {
    const { fullName, email, userName, password } = req.body;
    try {
      if (!fullName || !email || !userName || !password)
        return res.status(400).json({
          err: 1,
          msg: "Missing input",
        });

      const response = await authService.signUpService(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        err: -1,
        msg: "Failed at auth controller " + error,
      });
    }
  }

  // [POST] /login
  async logIn(req, res) {
    const { userName, password } = req.body;
    try {
      if (!userName || !password)
        return res.status(400).json({
          err: 1,
          msg: "Missing input",
        });

      const response = await authService.logInService(req.body);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        err: -1,
        msg: "Failed at auth controller " + error,
      });
    }
  }
}

module.exports = new AuthController();