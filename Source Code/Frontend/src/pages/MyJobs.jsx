import React, { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";
import Applicant from "../components/MyJobsPage/Applicant";
import Recruiter from "../components/MyJobsPage/Recruiter";
import axios from "axios";

const MyJobs = () => {
    const { user } = useUserContext();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(
                    user?.role === "admin" ? "/api/v1/jobs/admin-jobs" : "/api/v1/jobs/my-jobs"
                );
                setJobs(response.data.result);
                if (response.data.result.length === 0 && response.data.message) {
                    setMessage(response.data.message);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, [user?.role]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Wrapper>
            <div className="title-row">
                {user?.role === "admin" && "Manage Applications"}
                {user?.role === "user" && "My Applications"}
                <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
            </div>
            {message && <div>{message}</div>}
            {user?.role === "user" && <Applicant jobs={jobs} />}
            {user?.role === "admin" && <Recruiter jobs={jobs} />}
        </Wrapper>
    );
};


const Wrapper = styled.section`
    .title-row {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: calc(0.9rem + 0.4vw);
        text-transform: capitalize;
        letter-spacing: 1px;
        font-weight: 600;
        opacity: 0.85;
        color: var(--color-black);
        position: relative;
    }
    .title-row:before {
        content: "";
        position: absolute;
        bottom: -4px;
        left: 0;
        width: calc(30px + 0.7vw);
        height: calc(2px + 0.1vw);
        background-color: var(--color-primary);
    }
`;

export default MyJobs;
