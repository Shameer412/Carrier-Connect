import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import DashboardLayout from "../Layout/DashboardLayout";

// Pages
import {
    Register,
    Login,
    Landing,
    Error,
    AllJobs,
    Stats,
    Profile,
    Admin,
    EditJob,
    AddJob,
    ManageJobs,
    Job,
    MyJobs,
    EditProfile,
    ManageUsers,
    AdminManageJobs,
    JobRequest,
    Dashboard,
    RecruiterJob,
    AdminViewUser,
    Courses
} from "../pages";

import { JobContext } from "../context/JobContext";

import CommonProtectRoute from "../components/shared/CommonProtectRoute";
import ProtectAdminRoute from "../components/shared/ProtectAdminRoute";
import RecruiterRoute from "../components/shared/RecruiterRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: "all-jobs",
                element: (
                    <CommonProtectRoute>
                        <JobContext>
                            <AllJobs />
                        </JobContext>
                    </CommonProtectRoute>
                ),
            },
            {
                path: "job/:id",
                element: (
                    <CommonProtectRoute>
                        <JobContext>
                            <Job />
                        </JobContext>
                    </CommonProtectRoute>
                ),
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "admin-dashboard",
                element: (
                        <Dashboard />
                ),
            },
            {
                path: "dashboard",
                element: (
                    <CommonProtectRoute>
                        <JobContext>
                            <DashboardLayout />
                        </JobContext>
                    </CommonProtectRoute>
                ),
                children: [
                    {
                        index: true,
                        element: <Profile />,
                    },
                    {
                        path: "edit-profile/:id",
                        element: <EditProfile />,
                    },
                    {
                        path: "stats",
                        element: (
                            <ProtectAdminRoute>
                                <Stats />
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "job-request",
                        element: (
                            <ProtectAdminRoute>
                                <JobRequest />
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "add-jobs",
                        element: (
                            <RecruiterRoute>
                                <AddJob />
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "all-jobs",
                        element: (
                            <RecruiterRoute>
                                <RecruiterJob />
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "manage-jobs",
                        element: (
                            <RecruiterRoute>
                                <ManageJobs />
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "admin-manage-jobs",
                        element: (
                            <ProtectAdminRoute>
                                <AdminManageJobs />
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "admin-edit-job/:id",
                        element: (
                            <ProtectAdminRoute>
                                <EditJob />
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "manage-users",
                        element: (
                            <ProtectAdminRoute>
                                <ManageUsers />
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "admin",
                        element: (
                            <ProtectAdminRoute>
                                <Admin />
                            </ProtectAdminRoute>
                        ),
                    },
                    {
                        path: "edit-job/:id",
                        element: (
                            <RecruiterRoute>
                                <EditJob />
                            </RecruiterRoute>
                        ),
                    },
                    {
                        path: "my-jobs",
                        element: (
                            <CommonProtectRoute>
                                <MyJobs />
                            </CommonProtectRoute>
                        ),
                    },
                    {
                        path: "Courses",
                        element: (
                            <CommonProtectRoute>
                                <Courses />
                            </CommonProtectRoute>
                        ),
                    },
                    {
                        path: "my-jobs/:userId",
                        element: (
                          <CommonProtectRoute>
                            <AdminViewUser />
                          </CommonProtectRoute>
                        ),
                      }
                                      ],
            },
        ],
    },
]);

export default router;
