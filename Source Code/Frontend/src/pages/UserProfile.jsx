
import React from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import styled from "styled-components";
import avatar from "../assets/media/avatar.jpg";
import { useUserContext } from "../context/UserContext";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
dayjs.extend(advancedFormat);

const Profile = () => {
    const { user } = useUserContext();
    const date = dayjs(user?.createdAt).format("MMM Do, YYYY");

    return (
        <Wrapper>
            <div className="profile-card">
                <div className="profile-header">
                    <img src={user?.avatar || avatar} alt="avatar" className="avatar" />
                    <h2 className="name">{user?.username}</h2>
                    <p className="title">{user?.role}</p>
                    <p className="description">
                        {user?.description}
                    </p>
                </div>
                <div className="profile-details">
                    <div className="section">
                        <h3 className="section-title">Skills</h3>
                        <div className="skills">
                            {user?.skills?.map(skill => (
                                <span className="skill" key={skill}>{skill}</span>
                            ))}
                        </div>
                    </div>
                    <div className="section">
                        <h3 className="section-title">Contact</h3>
                        <p className="info"><strong>Email:</strong> {user?.email}</p>
                        <p className="info"><strong>Address:</strong> {user?.location}</p>
                    </div>
                    <div className="section">
                        <h3 className="section-title">Education</h3>
                        <p className="info"><strong>{user?.education}</strong></p>
                    </div>
                    <div className="section">
                        <h3 className="section-title">Certifications</h3>
                        {user?.certifications?.map((cert, index) => (
                            <p className="info" key={index}>{cert}</p>
                        ))}
                    </div>
                    <div className="section">
                        <h3 className="section-title">Experience</h3>
                        {user?.experience?.map((exp, index) => (
                            <p className="info" key={index}>{exp}</p>
                        ))}
                    </div>
                </div>
                <Link to={`/dashboard/edit-profile/${user?._id}`} className="edit-profile">
                    <FiEdit />
                    <span>Edit Profile</span>
                </Link>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background-color: #f9f9f9;
    
    .profile-card {
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        max-width: 800px;
        width: 100%;
        padding: 2rem;
        text-align: center;
    }

    .profile-header {
        margin-bottom: 2rem;
    }

    .avatar {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-bottom: 1rem;
    }

    .name {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .title {
        font-size: 1.25rem;
        color: #666;
    }

    .description {
        font-size: 1rem;
        color: #666;
        margin-bottom: 1.5rem;
    }

    .profile-details {
        text-align: left;
    }

    .section {
        margin-bottom: 1.5rem;
    }

    .section-title {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .skills {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .skill {
        background-color: #007bff;
        color: #fff;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.875rem;
    }

    .info {
        font-size: 1rem;
        margin-bottom: 0.5rem;
    }

    .edit-profile {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 2rem;
        font-size: 1rem;
        color: #007bff;
        text-decoration: none;
    }

    .edit-profile svg {
        margin-right: 0.5rem;
    }
`;

export default Profile;