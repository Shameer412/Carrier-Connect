const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const { authenticateUser } = require("./Middleware/UserAuthenticationMiddleware");

const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));

// Middlewares
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173"],
        methods: ["GET,POST,DELETE,PUT,PATCH"],
        credentials: true,
    })
);

// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routers
const JobRouter = require("./Router/JobRouter");
const UserRouter = require("./Router/UserRouter");
const AuthRouter = require("./Router/AuthRouter");
const AdminRouter = require("./Router/AdminRouter");
const ApplicationRouter = require("./Router/ApplicationRouter");

// Connecting routes
app.use("/api/v1/Jobs", authenticateUser, JobRouter);
app.use("/api/v1/Users", authenticateUser, UserRouter);
app.use("/api/v1/Auth", AuthRouter);
app.use("/api/v1/Admin", authenticateUser, AdminRouter);
app.use("/api/v1/Application", authenticateUser, ApplicationRouter);

module.exports = app;
