const Leave = require("../models/Leave.model");
const generateSlug = require("../utils/generateSlug");
const { StatusCodes } = require("http-status-codes");

// ============================================ Create API Start =========================================== //

exports.create = async (req, res) => {
  try {
    let { name } = req.body;

    const leaveExist = await Leave.findOne({ name });
    if (leaveExist) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errorCode: 1,
        status: false,
        message: "Leave already exists",
        data: null,
      });
    }

    let defaultSlug = generateSlug(name);

    let newLeave = new Leave({
      name,
      slug: defaultSlug,
    });

    newLeave = await newLeave.save();

    return res.status(StatusCodes.CREATED).json({
      errorCode: 0,
      status: true,
      message: "Leave Type Added Successfully",
      data: newLeave,
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

exports.updateLeave = async (req, res) => {
  try {
    let { leaveId, name } = req.body;

    if (!leaveId)
      return res.status(StatusCodes.FORBIDDEN).json({
        errorCode: 1,
        status: false,
        message: "Leave Id should be Present",
        data: null,
      });

    let updateLeaveDetail = await Leave.findById(leaveId);
    if (!updateLeaveDetail)
      return res.status(StatusCodes.NOT_FOUND).json({
        errorCode: 2,
        status: false,
        message: "Category not found",
        data: null,
      });

    updateLeaveDetail.name = name ? name : updateLeaveDetail.name;
    if (name) {
      let defaultSlug = generateSlug(name);
      updateLeaveDetail.slug = defaultSlug || updateLeaveDetail.slug;
    }

    await updateLeaveDetail.save();

    return res.status(StatusCodes.OK).json({
      errorCode: 0,
      status: true,
      message: "Leave Type Updated Successfully",
      data: updateLeaveDetail,
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

// ============================================ Get All Leaves API Start =================================== //

exports.getAllData = async (req, res) => {
  try {
    const { page = 1, limit = 10, q } = req.query;

    const searchCriteria = q ? { name: { $regex: q, $options: "i" } } : {};

    let leaveList = await Leave.find(searchCriteria)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();

    const totalData = await Leave.countDocuments(searchCriteria);

    return res.status(StatusCodes.OK).json({
      errorcode: 0,
      status: true,
      message: "Get All Leave Types Successfully",
      data: leaveList,
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

// ============================================ Get All Leaves API End ===================================== //

// ============================================ Delete API Start =========================================== //

// exports.deleteLeave = async (req, res) => {
//   try {
//     let { leaveId } = req.params;

//     if (!leaveId)
//       return res.status(StatusCodes.FORBIDDEN).json({
//         errorCode: 1,
//         status: false,
//         message: "Leave Id should be present",
//         data: null,
//       });

//     let leaveDel = await Leave.findById({ _id: leaveId });
//     if (!leaveDel)
//       return res.status(StatusCodes.NOT_FOUND).json({
//         errorCode: 2,
//         status: false,
//         message: "Leave not found",
//         data: null,
//       });

//     await Leave.deleteOne({ _id: leaveId });
//     return res.status(StatusCodes.OK).json({
//       errorCode: 0,
//       status: true,
//       message: "Leave Deleted Successfully",
//       data: null,
//     });
//   } catch (error) {
//     console.log("error", error.message);
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       errorCode: 5,
//       status: false,
//       message: error.message,
//       data: error,
//     });
//   }
// };

exports.deleteLeaves = async (req, res) => {
  try {
    let { leaveIds } = req.body; // Get an array of IDs from the request body

    if (!leaveIds || !Array.isArray(leaveIds) || leaveIds.length === 0)
      return res.status(StatusCodes.FORBIDDEN).json({
        errorCode: 1,
        status: false,
        message: "Array of Leave IDs should be present",
        data: null,
      });

    // Check if all the IDs exist in the database
    const leavesToDelete = await Leave.find({ _id: { $in: leaveIds } });

    if (leavesToDelete.length !== leaveIds.length)
      return res.status(StatusCodes.NOT_FOUND).json({
        errorCode: 2,
        status: false,
        message: "One or more Leave IDs not found",
        data: null,
      });

    // Delete all documents with matching IDs
    await Leave.deleteMany({ _id: { $in: leaveIds } });

    return res.status(StatusCodes.OK).json({
      errorCode: 0,
      status: true,
      message: "Leaves Deleted Successfully",
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

// ============================================ Search API Start =========================================== //
exports.searchData = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    // Define search criteria to match only the `name` field
    const searchCriteria = search
      ? { name: { $regex: search, $options: "i" } } // Case-insensitive search on `name` only
      : {};

    // Fetch the filtered and paginated data
    let searchResults = await Leave.find(searchCriteria)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();

    // Get the total count of documents matching the search criteria
    const totalData = await Leave.countDocuments(searchCriteria);

    return res.status(StatusCodes.OK).json({
      errorcode: 0,
      status: true,
      message: "Search results retrieved successfully",
      data: searchResults,
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

// ============================================ Search API End ============================================= //
