const BusinessNature = require("../models/BusinessNature.model");
const generateSlug = require("../utils/generateSlug");
const { StatusCodes } = require("http-status-codes");

// ============================================ Create API Start =========================================== //

exports.create = async (req, res) => {
  try {
    let { name } = req.body;

    const detailExist = await BusinessNature.findOne({ name });
    if (detailExist) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errorCode: 1,
        status: false,
        message: "Business Nature already exists",
        data: null,
      });
    }

    let defaultSlug = generateSlug(name);

    let newDetail = new BusinessNature({
      name,
      slug: defaultSlug,
    });

    newDetail = await newDetail.save();

    return res.status(StatusCodes.CREATED).json({
      errorCode: 0,
      status: true,
      message: "Business Nature Added Successfully",
      data: newDetail,
    });
  } catch (error) {
    console.log("error", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errorCode: 5,
      status: false,
      message: error.message,
      data: error,
    });
  }
};

// ============================================ Create API End ============================================= //

// ============================================ Update API Start =========================================== //

exports.update = async (req, res) => {
  try {
    let { updateId, name } = req.body;

    if (!updateId)
      return res.status(StatusCodes.FORBIDDEN).json({
        errorCode: 1,
        status: false,
        message: "Business Nature should be Present",
        data: null,
      });

    let updateDetail = await BusinessNature.findById(updateId);
    if (!updateDetail)
      return res.status(StatusCodes.NOT_FOUND).json({
        errorCode: 2,
        status: false,
        message: "Business Nature not found",
        data: null,
      });

    updateDetail.name = name ? name : updateDetail.name;
    if (name) {
      let defaultSlug = generateSlug(name);
      updateDetail.slug = defaultSlug || updateDetail.slug;
    }

    await updateDetail.save();

    return res.status(StatusCodes.OK).json({
      errorCode: 0,
      status: true,
      message: "Business Nature Updated Successfully",
      data: updateDetail,
    });
  } catch (error) {
    console.log("error", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errorCode: 5,
      status: false,
      message: error.message,
      data: error,
    });
  }
};

// ============================================ Update API End ============================================= //

// ============================================ Get All Data Start ========================================= //

exports.getAllData = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    let getData = await BusinessNature.find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .lean()
      .limit(parseInt(limit));

    const totalData = await BusinessNature.countDocuments({});

    return res.status(StatusCodes.OK).json({
      errorcode: 0,
      status: true,
      message: "Get All Business Nature Successfully",
      data: getData,
      total: totalData,
      page: parseInt(page),
      pages: Math.ceil(totalData / limit),
    });
  } catch (error) {
    return res.status(StatusCodes.NO_CONTENT).json({
      errorcode: 5,
      status: false,
      message: error.message,
      data: error,
    });
  }
};

// ============================================ Get All Data End =========================================== //

// ============================================ Delete API Start =========================================== //

exports.bulkDelete = async (req, res) => {
  try {
    let { delId } = req.body;

    if (!delId || !Array.isArray(delId) || delId.length === 0)
      return res.status(StatusCodes.FORBIDDEN).json({
        errorCode: 1,
        status: false,
        message: "Array of Bulk IDs should be present",
        data: null,
      });

    const bulkDeleteAll = await BusinessNature.find({ _id: { $in: delId } });

    if (bulkDeleteAll.length !== delId.length)
      return res.status(StatusCodes.NOT_FOUND).json({
        errorCode: 2,
        status: false,
        message: "One or more Bulk IDs not found",
        data: null,
      });

    await BusinessNature.deleteMany({ _id: { $in: delId } });

    return res.status(StatusCodes.OK).json({
      errorCode: 0,
      status: true,
      message: "Business Nature Deleted Successfully",
      data: null,
    });
  } catch (error) {
    console.log("error", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errorCode: 5,
      status: false,
      message: error.message,
      data: error,
    });
  }
};

// ============================================ Delete API End ============================================= //
