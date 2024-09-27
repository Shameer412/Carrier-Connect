import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import styled from "styled-components";
import LoadingComTwo from "../shared/LoadingComTwo";
import { MdDelete } from "react-icons/md";

import Swal from "sweetalert2";

const Applicant = () => {
  const {
    isPending,
    isError,
    data: jobs,
    error,
    refetch, // Access refetch function from useQuery
  } = useQuery({
    queryKey: ["my-jobs"],
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/application/applicant-jobs`,
        { withCredentials: true }
      );
      return response?.data?.result;
    },
  });

  const handleDelete = async (id) => {
    // Show confirmation dialog using SweetAlert2
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/v1/application/${id}`, {
          withCredentials: true,
        });
        // Optionally, you can refetch the data after deletion
        refetch(); // This will trigger the useQuery to refetch data
        Swal.fire("Deleted!", "Your job application has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting job application:", error);
        Swal.fire("Error!", "Failed to delete job application.", "error");
      }
    }
  };

  if (isPending) {
    return <LoadingComTwo />;
  }

  if (isError) {
    return <h2 className="">{error?.message}</h2>;
  }

  if (!jobs?.length) {
    return <h2 className="">No job found</h2>;
  }

  return (
    <Wrapper>
      <div className="content-row">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Job Position</th>
              <th>Company</th>
              <th>Status</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs?.map((job, index) => {
              let i = index + 1 < 10 ? `0${index + 1}` : index + 1;
              return (
                <tr key={jobs?.jobId?._id}>
                  <td>{i}</td>
                  <td>{job?.jobId?.position}</td>
                  <td>{job?.jobId?.company}</td>
                  <td className="action-row">{job.status}</td>
                  <td>
                    <button
                      className="action delete"
                      onClick={() => handleDelete(job._id)}
                    >
                      <MdDelete /> 
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
export default Applicant;
