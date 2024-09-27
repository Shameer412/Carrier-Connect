import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingComTwo from "../shared/LoadingComTwo";

const AdminApplications = () => {
    const { data: applications, isError, error, isLoading } = useQuery({
        queryKey: ["all-applications"],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:3000/api/v1/application/all-applications`,
                {
                    withCredentials: true,
                }
            );
            return response?.data?.result;
        },
    });

    if (isLoading) {
        return <LoadingComTwo />;
    }

    if (isError) {
        return (
            <h2 className="mt-8 text-2xl font-semibold text-center text-red-600">
                -- {error?.response?.data} --
            </h2>
        );
    }

    if (!applications?.length) {
        return <h2 className="">No Applications found</h2>;
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
                            <th>Applicant</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app, index) => {
                            let i =
                                index + 1 < 10 ? `0${index + 1}` : index + 1;
                            return (
                                <tr key={app?._id}>
                                    <td>{i}</td>
                                    <td>{app?.jobId?.position}</td>
                                    <td>{app?.jobId?.company}</td>
                                    <td>{app?.userId?.name}</td>
                                    <td>{app?.status}</td>
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
`;

export default AdminApplications;
