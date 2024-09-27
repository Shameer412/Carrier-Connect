import React, { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import LoadingComTwo from "../components/shared/LoadingComTwo";
import { getAllHandler } from "../utils/FetchHandlers";

const JobRequest = () => {
  const [filter, setFilter] = useState("pending"); // Initially filter by pending jobs

  const {
    isFetching,
    isError,
    data: jobs,
    error,
    refetch,
  } = useQuery({
    queryKey: ["pending-jobs"],
    queryFn: () =>
      getAllHandler(
        `http://localhost:3000/api/v1/jobs/admin-jobs?status=${filter}`
      ),
  });

  const handleAccept = async (id, recruiterEmail) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/jobs/accept/${id}`,
        {},
        { withCredentials: true }
      );
      refetch();
      // Display recruiter's email before sending the email
      Swal.fire({
        title: "Accept Job",
        html: `You are about to accept the job and send an email to <strong>${recruiterEmail}</strong>. Proceed?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Accept",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          sendEmailToRecruiter(recruiterEmail);
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Sorry!",
        text: error?.response?.data?.message || "Something went wrong.",
        icon: "error",
      });
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v1/jobs/reject/${id}`,
        {},
        { withCredentials: true }
      );
      refetch();
      Swal.fire({
        title: "Rejected!",
        text: "The job has been rejected.",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Sorry!",
        text: error?.response?.data?.message || "Something went wrong.",
        icon: "error",
      });
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const sendEmailToRecruiter = async (recruiterEmail) => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/send-email`,
        { to: recruiterEmail },
        { withCredentials: true }
      );
      Swal.fire({
        title: "Email Sent!",
        text: `Email has been sent to ${recruiterEmail}`,
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Sorry!",
        text: error?.response?.data?.message || "Something went wrong.",
        icon: "error",
      });
    }
  };

  if (isFetching) {
    return <LoadingComTwo />;
  }

  if (isError) {
    console.log(error?.message);
    return (
      <h2 className="text-lg md:text-3xl font-bold text-red-600 text-center mt-12">
        {error?.message}
      </h2>
    );
  }

  if (!jobs?.result?.length) {
    return (
      <Wrapper>
        <div className="title-row">
          Jobs Request
          <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
        </div>
        <div className="content-row">
          <h2 className="text-lg md:text-3xl font-bold text-red-600 text-center mt-12">
            -- No Pending Jobs --
          </h2>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="title-row">
        Jobs Request
        <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
      </div>
      <div className="content-row">
        <div className="filter-container">
          <select value={filter} onChange={handleFilterChange}>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Job Position</th>
              <th>Company</th>
              <th>Created By</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs?.result?.map((job, index) => {
              let i = index + 1 < 10 ? `0${index + 1}` : index + 1;
              return (
                <tr key={job._id}>
                  <td>{i}</td>
                  <td>{job.position}</td>
                  <td>{job.company}</td>
                  <td>{job?.createdBy?.username}</td>
                  <td>{job?.status}</td>
                  <td className="flex gap-3">
                    <Link to={`/job/${job._id}`} className="action view">
                      view
                    </Link>
                    <button
                      className="action accept"
                      onClick={() => handleAccept(job._id, job.recruiterEmail)}
                    >
                      Accept
                    </button>
                    <button
                      className=" action reject"
                      onClick={() => handleReject(job._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
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
  .content-row {
    overflow-x: auto;
    margin-top: calc(2rem + 0.5vw);
  }
  .table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  .table thead {
    background-color: var(--color-accent);
    color: var(--color-white);
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: 400;
    text-transform: capitalize;
  }

  .table th,
  .table td {
    text-align: left;
    padding: 12px;
  }
  .table tbody tr {
    font-size: 15px;
    font-weight: 400;
    text-transform: capitalize;
    letter-spacing: 1px;
    transition: all 0.2s linear;
  }

  .table tbody tr:nth-child(even) {
    background-color: #00000011;
  }

  .table .action-row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    column-gap: 12px;
  }
  .table .action-row .action {
    font-size: 21px;
  }
  .action {
    font-size: 12px;
    text-transform: capitalize;
    font-weight: 500;
    color: #fff;
    padding: 1px 6px;
    border-radius: 4px;
  }
  .action.view {
    background-color: #d38510;
    color: white;
  }
  .action.accept {
    background-color: #168e24;
    color: white;
  }
  .action.reject {
    background-color: #f1322f;
    color: white;
  }
`;

export default JobRequest;
