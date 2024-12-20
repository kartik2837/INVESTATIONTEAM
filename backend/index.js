require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import configurations
// const redisClient = require("./config/redisClient");
const connectToDatabase = require("./config/dbConnection");

// Initialize Express app
const app = express();

// Connect to MongoDB
connectToDatabase();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Require your routers
const adminRouter = require("./routes/Admin.routes");
const leaveRouter = require("./routes/Leave.routes");
const businessNatureRouter = require("./routes/BusinessNature.routes");
const associateFieldsRouter = require("./routes/AssociateFields.routes");
const awardTypeRouter = require("./routes/AwardType.routes");
const warningTypeRouter = require("./routes/WarningType.routes");
const documentTypeRouter = require("./routes/DocumentType.routes");
const terminationTypeRouter = require("./routes/TerminationType.routes");
const arrangementMethodRouter = require("./routes/ArrangementMethod.routes");
const educationLevelRouter = require("./routes/EducationLevel.routes");
const languageSkillsRouter = require("./routes/LanguageSkills.routes");
const skillsRouter = require("./routes/Skills.routes");
const jobCategoryRouter = require("./routes/JobCategory.routes");
const departmentRouter = require("./routes/Department.routes");
const designationRouter = require("./routes/Designation.routes");

app.use("/api/admin", adminRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/business-nature", businessNatureRouter);
app.use("/api/associate-fields", associateFieldsRouter);
app.use("/api/award-type", awardTypeRouter);
app.use("/api/warning-type", warningTypeRouter);
app.use("/api/document-type", documentTypeRouter);
app.use("/api/termination-type", terminationTypeRouter);
app.use("/api/arrangement-method", arrangementMethodRouter);
app.use("/api/education-level", educationLevelRouter);
app.use("/api/language-skills", languageSkillsRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/job-category", jobCategoryRouter);
app.use("/api/department", departmentRouter);
app.use("/api/designation", designationRouter);

// Default route
app.get("/", (req, res) => {
  res.send("API is start");
});

// Error handling middleware
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 6050;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

// Export the app instance for Vercel
module.exports = app;
