import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { MdAccessTime } from "react-icons/md";
import Swal from "sweetalert2";

import Navbar from "../components/shared/Navbar";
import LoadingComTwo from "../components/shared/LoadingComTwo";
import { useUserContext } from "../context/UserContext"; // Ensure the correct path
import { getSingleHandler, postHandler } from "../utils/FetchHandlers";

dayjs.extend(advancedFormat);

const Job = () => {
    const { id } = useParams();
    const { user } = useUserContext();

    const {
        isLoading,
        isError,
        data: job,
        error,
    } = useQuery({
        queryKey: ["job", id],
        queryFn: () => getSingleHandler(`http://localhost:3000/api/v1/jobs/${id}`),
    });

    const date = dayjs(job?.jobDeadline).format("MMM Do, YYYY");

    const handleApply = async (jobId) => {
        let currentDate = new Date();
        let date = currentDate.toISOString().slice(0, 10);
        const appliedJob = {
            applicantId: user?._id,
            recruiterId: job?.createdBy,
            jobId: jobId,
            status: "pending",
            dateOfApplication: date,
            resume: user?.resume || "",
        };
        try {
            const response = await postHandler({
                url: "http://localhost:3000/api/v1/application/apply",
                body: appliedJob,
            });
            Swal.fire({
                icon: "success",
                title: "Hurray...",
                text: response?.data?.message,
            });
        } catch (error) {
            console.log(error);
            const errorMessage = error?.response?.data || "An error occurred";
            let displayMessage = errorMessage;
            
            if (errorMessage === "Already Applied") {
                displayMessage = "You have already applied for this job.";
            } else if (error?.response?.data?.error) {
                displayMessage = error?.response?.data?.error[0]?.msg || errorMessage;
            }
    
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: displayMessage,
            });
        }
    };
        if (isLoading) {
        return <LoadingComTwo />;
    }
    if (isError) {
        return <h2 className="">{error?.message}</h2>;
    }

    return (
        <>
            <Navbar />
            <Wrapper>
                <div className="top-row">
                    <h2 className="title">
                        <span className="capitalize">job title: </span>
                        {job?.position}
                    </h2>
                    <h4 className="company">
                        <span className="fancy">posted by: </span>
                        {job?.company}
                    </h4>
                    <h4 className="post-date">
                        <MdAccessTime className="text-lg mr-1" />
                        {dayjs(job?.result?.createdAt).format("MMM Do, YYYY")}
                    </h4>
                </div>
                <div className="middle-row">
                    <div className="description">
                        <h3 className="sec-title">description</h3>
                        <p>{job?.jobDescription}</p>
                    </div>
                    <h4 className="deadline">
                        Deadline: <span>{date}</span>
                    </h4>
                    <h4 className="vacancy">
                        Job Vacancy: <span>{job?.jobVacancy}</span>
                    </h4>
                    <div className="requirement">
                        <h3 className="sec-title">Requirements</h3>
                        <ul>
                            {job?.jobSkills?.map((skill) => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="facility">
                        <h3 className="sec-title">Facilities</h3>
                        <ul>
                            {job?.jobFacilities?.map((facility) => (
                                <li key={facility}>{facility}</li>
                            ))}
                        </ul>
                    </div>
                    <h4 className="salary">
                        Salary: <span>{job?.jobSalary} TK</span>
                    </h4>
                    <div className="apply">
                        <h3 className="sec-title">To apply</h3>
                        <p className="intro">send your cv/resume</p>
                        <p className="info">Email: {job?.jobContact}</p>
                        {user?.role === "user" && (
                            <button className="apply-btn" onClick={() => handleApply(job._id)}>
                                Apply
                            </button>
                        )}
                    </div>
                </div>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.section`
    padding: 2rem 0;
    max-width: 1000px;
    margin: 0 auto;
    margin-bottom: calc(20px + 1vw);
    width: 100%;

    .top-row {
        margin-bottom: calc(30px + 1vw);
    }
    .apply-btn {
        margin-top: 2%;
        padding: 14px 18px;
        text-transform: capitalize;
        background-color: var(--color-accent);
        color: var(--color-white);
        border-radius: 4px;
        letter-spacing: 1px;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.3s linear;
        border: none;
        outline: none;
        margin-left: 90%;
    }
    .end-row .apply-btn:hover {
        background-color: var(--color-black);
    }
    .top-row .title {
        font-weight: bold;
        font-size: 2rem;
        background-color: #138088;
        color: white;
        border-radius: 5px;
padding: 5px;
        text-align: center;
    }
    .top-row .company {
        font-size: calc(20px + 0.35vw);
        text-align: center;
        text-transform: capitalize;
        font-weight: 600;
        margin-top: 2%;
        opacity: 0.75;
    }
    .top-row .post-date {
        font-size: 13px;
        font-weight: 600;
        text-transform: capitalize;
        text-align: center;
        opacity: 0.75;
        margin-top: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .middle-row .description h3 {
        font-size: calc(14px + 0.15vw);
        font-size: 1.5rem;
        font-weight: 600;
        text-transform: capitalize;
        opacity: 0.8;
    }
    .middle-row .description p {
        margin-top: 6px;
        font-size: calc(12px + 0.15vw);
        font-weight: 400;
        opacity: 0.95;
        text-align: justify;
        line-height: 25px;
    }
    .middle-row .deadline {
        font-size: calc(13px + 0.1vw);
        font-weight: 600;
        opacity: 0.8;
        margin-top: calc(10px + 0.3vw);
        font-size: 1.5rem;
    }
    .middle-row .vacancy {
        font-size: calc(13px + 0.1vw);
        font-weight: 600;
        opacity: 0.8;
        margin-top: 4px;
        margin-bottom: calc(10px + 0.3vw);
        font-size: 1rem;
    }
    .middle-row .requirement {
        margin-bottom: calc(10px + 0.3vw);
        
    }
    .middle-row .requirement .sec-title {
        font-size: calc(14px + 0.15vw);
        font-weight: 600;
        text-transform: capitalize;
        opacity: 0.8;
        font-size: 1.5rem;
    }
    .middle-row .requirement p {
        margin-top: 6px;
        font-size: calc(12px + 0.15vw);
        font-weight: 400;
        opacity: 0.95;
        text-align: justify;
        line-height: 25px;
    }
    .middle-row .requirement ul {
        margin-top: 6px;
        list-style: none;
        margin-left: calc(30px + 0.5vw);
        
    }
    .middle-row .requirement ul li {
        font-size: calc(12px + 0.15vw);
        font-weight: 400;
        opacity: 0.95;
        text-transform: capitalize;
        padding: 2px 0;
    }

    .middle-row .facility .sec-title {
        font-size: calc(14px + 0.15vw);
        font-weight: 600;
        text-transform: capitalize;
        opacity: 0.8;
        font-size: 1.5rem;
    }
    .middle-row .facility {
        margin-bottom: calc(10px + 0.3vw);
    }
    .middle-row .facility p {
        margin-top: 6px;
        font-size: calc(12px + 0.15vw);
        font-weight: 400;
        opacity: 0.95;
        text-align: justify;
        line-height: 23px;
    }
    .middle-row .facility ul {
        margin-top: 6px;
        list-style: circle;
        margin-left: calc(30px + 0.5vw);
    }
    .middle-row .facility ul li {
        font-size: calc(12px + 0.15vw);
        font-weight: 400;
        opacity: 0.95;
        text-transform: capitalize;
        padding: 2px 0;
    }
    .middle-row .salary {
        font-size: 1.5rem;
        font-weight: 600;
        opacity: 0.85;
        margin-bottom: calc(10px + 0.3vw);
    }
    .middle-row .apply{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .middle-row .apply h3 {
        font-size: calc(14px + 0.15vw);
        font-weight: 600;
        text-transform: capitalize;
        opacity: 0.8;
        text-decoration: underline;
    }
    .middle-row .apply p {
        margin-top: 6px;
        font-size: calc(12px + 0.15vw);
        font-weight: 400;
        opacity: 0.95;
    }
    .middle-row .apply p.intro {
        text-transform: capitalize;
    }
    .middle-row .apply p.info {
        font-weight: 600;
        opacity: 0.8;
    }
`;

export default Job;
