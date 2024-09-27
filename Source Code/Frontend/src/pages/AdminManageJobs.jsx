import React, { useState } from "react";
import styled from "styled-components";
import { CiSquarePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllHandler } from "../utils/FetchHandlers";
import LoadingComTwo from "../components/shared/LoadingComTwo";
import Swal from "sweetalert2";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdVisibility } from "react-icons/md";

const AdminManageJobs = () => {
  const [filter, setFilter] = useState("all");

  const {
    isPending,
    isError,
    data: jobs,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin-jobs", filter],
    queryFn: () =>
      getAllHandler(
        `http://localhost:3000/api/v1/jobs/admin-jobs?status=${
          filter !== "all" ? filter : ""
        }`
      ),
  });

  const deleteModal = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#19b74b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteJobHandler(id);
      }
    });
  };

  const deleteJobHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/jobs/${id}`, {
        withCredentials: true,
      });

      refetch(); // Refetch data after deletion
      Swal.fire({
        title: "Deleted!",
        text: "Your job has been deleted.",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error?.message,
        icon: "error",
      });
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    refetch(); // Fetch data with the new filter
  };

  if (isPending) {
    return <LoadingComTwo />;
  }

  if (isError) {
    console.error("Error fetching data:", error?.message);
    return (
      <h2 className="text-lg md:text-3xl font-bold text-red-600 text-center mt-12">
        {error?.message}
      </h2>
    );
  }

  // Display message when no jobs are found for the selected filter
  const noJobsMessage =
    filter === "all"
      ? "No jobs found."
      : `No ${filter} jobs found.`;

  return (
    <Wrapper>
      <div className="title-row">
        Manage Jobs
        <CiSquarePlus className="ml-1 text-xl md:text-2xl" />
      </div>
      <div className="content-row">
        <div className="filter-container">
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {jobs?.result?.length ? (
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
              {jobs.result.map((job, index) => (
                <tr key={job._id}>
                  <td>{index + 1}</td>
                  <td>{job.position}</td>
                  <td>{job.company}</td>
                  <td>{job.createdBy?.username}</td>
                  <td>{job.status}</td>
                  <td className="action-row">
                    <Link to={`/job/${job._id}`} className="action view">
                      <MdVisibility />
                    </Link>
                    <Link
                      to={`/dashboard/admin-edit-job/${job._id}`}
                      className="action edit"
                    >
                      <FaRegEdit />
                    </Link>
                    <button
                      className="action delete"
                      onClick={() => deleteModal(job._id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="text-lg md:text-3xl font-bold text-red-600 text-center mt-12">
            {noJobsMessage}
          </h2>
        )}
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
  .filter-container {
    display: flex;
    justify-content: flex-end;
    align-self: flex-end;
    margin-bottom: 1rem;
  }

  .filter-container select {
    padding: 0.5rem;
    font-size: 14px;
    border-radius: 4px;
    border: 1px solid #ddd;
    outline: none;
  }

  .table .action-row .action {
    font-size: 21px;
  }
  .action.view {
    color: #22d637;
  }
  .action.edit {
    color: #f1c72f;
  }
  .action.delete {
    color: #f1322f;
  }
`;

export default AdminManageJobs;
