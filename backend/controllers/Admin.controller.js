const Admin = require("../models/Admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateSlug = require("../utils/generateSlug");
const { StatusCodes } = require("http-status-codes");

// ============================================ Create API Start =========================================== //

exports.create = async (req, res) => {
  try {
    const { name, email, password, number } = req.body;

    const adminExist = await Admin.findOne({ email }).lean();
    if (adminExist) {
      return res.status(StatusCodes.FORBIDDEN).json({
        errorCode: 1,
        status: false,
        message: "Email already exits",
        data: null,
      });
    }

    let defaultUsername = generateSlug(name);

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      // profilepic: req.file && req.file.location ? req.file.location : null,
      name,
      username: defaultUsername,
      email,
      password: hashedPassword,
      number,
    });

    await admin.save();

    return res.status(StatusCodes.CREATED).json({
      errorCode: 0,
      status: true,
      message: "Admin Created Successfully",
      data: admin,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errorCode: 5,
      status: false,
      message: error.message,
      data: error,
    });
  }
};

// ============================================ Create API End ============================================= //

// ============================================ Login API Start ============================================ //

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email }).lean();
    if (!existingAdmin) {
      return res.status(StatusCodes.FORBIDDEN).json({
        errorCode: 1,
        status: false,
        message: "Email doesn't exist",
        data: null,
      });
    }

    const passwordMatch = await bcrypt.compare(password, existingAdmin.password);
    if (!passwordMatch) {
      return res.status(StatusCodes.FORBIDDEN).json({
        errorCode: 2,
        status: false,
        message: "Incorrect Password",
        data: null,
      });
    }

    const token = jwt.sign({ adminid: existingAdmin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Set cookie with token
    res.cookie(String(existingAdmin._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(StatusCodes.OK).json({
      errorCode: 0,
      status: true,
      message: "Admin Login Successfully",
      data: { ...existingAdmin, password: undefined, token },
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errorCode: 5,
      status: false,
      message: error.message,
      data: null,
    });
  }
};
// ============================================ Login API End ============================================== //
