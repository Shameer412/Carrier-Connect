import React from "react";
import { IoIosStats } from "react-icons/io";
import { RiMenuAddFill } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FaRegFileAlt } from 'react-icons/fa';
// import { FaBriefcase } from "react-icons/fa";
const AdminLinks = [
    {
        text: "profile",
        path: ".",
        icon: <FiUser />,
    },
    {
        text: "stats",
        path: "stats",
        icon: <IoIosStats />,
    },
    {
        text: "admin",
        path: "admin",
        icon: <FaUserShield />,
    },
    {
        text: "Job Request",
        path: "job-request",
        icon: <FaRegFileAlt />,
    },
    {
        text: "Applications",
        path: "my-jobs",
        icon: <FaBriefcase />,
    },
    {
        text: "manage jobs",
        path: "admin-manage-jobs",
        icon: <MdManageAccounts />,
    },
    {
        text: "manage users",
        path: "manage-users",
        icon: <FaUsers />,
    },
];

const RecruiterLinks = [
    {
        text: "profile",
        path: ".",
        icon: <FiUser />,
    },
    {
        text: "add job",
        path: "add-jobs",
        icon: <RiMenuAddFill />,
    },
    {
        text: "manage jobs",
        path: "manage-jobs",
        icon: <MdManageAccounts />,
    },
];

const UserLinks = [
    {
        text: "profile",
        path: ".",
        icon: <FiUser />,
    },
    {
        text: "Applications",
        path: "my-jobs",
        icon: <FaBriefcase />,
    },
];

export { AdminLinks, RecruiterLinks, UserLinks };
