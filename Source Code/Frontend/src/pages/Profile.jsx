import React from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import styled from "styled-components";
import avatar from "../assets/media/avatar.jpg"; // Default avatar image
import { useUserContext } from "../context/UserContext";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";

dayjs.extend(advancedFormat);

const Profile = () => {
    const { user } = useUserContext();
    const date = dayjs(user?.createdAt).format("MMM Do, YYYY");

    return (
        <Wrapper>
            {user.role === "recruiter" || user.role === "admin" ? (
                <RecruiterAdminProfile user={user} date={date} />
            ) : (
                <RegularUserProfile user={user} date={date} />
            )}
        </Wrapper>
    );
};

const RegularUserProfile = ({ user, date }) => (
    <div className="profile-card">
        <div className="profile-header">
            <img
                src={user?.image ? user.image : avatar}
                alt="avatar"
                className="userAvatar  rounded-full bor"
            />
            <h2 className="name">{user?.certifications[0]}</h2>
            <p className="description">
                {user?.description}
            </p>
            <div className="section">
                <h3 className="section-title"><strong>Skills</strong></h3>
                <div className="skills">
                    {user?.skills?.map(skill => (
                        <span className="skill" key={skill}>{skill}</span>
                    ))}
                </div>
            </div>

            <Link to={`/dashboard/edit-profile/${user?._id}`} className="edit-profile">
                <FiEdit />
                <span>Edit Profile</span>
            </Link>
        </div>
        <div className="profile-details">
            <div className="section">
                <h3 className="section-title"><strong>Email:</strong></h3>
                <p className="info">{user?.email}</p>
            </div>
            <div className="section">
                <h3 className="section-title"><strong>Location:</strong></h3>
                <p className="info">{user?.location}</p>
            </div>
            <div className="section">
                <h3 className="section-title"><strong>Education</strong></h3>
                <p className="info">{user?.education}</p>
            </div>
            <div className="section">
                <h3 className="section-title"><strong>Certifications</strong></h3>
                {user?.certifications?.map((cert, index) => (
                    <p className="info" key={index}>{cert}</p>
                ))}
            </div>
            <div className="section">
                <h3 className="section-title"><strong>Experience</strong></h3>
                {user?.experience?.map((exp, index) => (
                    <p className="info" key={index}>{exp}</p>
                ))}
            </div>
        </div>
    </div>
);

const RecruiterAdminProfile = ({ user, date }) => (
    <Wrapper>
        <div className="wrapper">
            <h5 className="title">Informations</h5>
            <div className="profile-container">
                <div className="first-col">
                   <div className=" flex flex-col justify-center items-center mt-6">
                    </div>
                </div>
                <table className="information-table">
                    <tbody>
                        <tr className="row">
                            <td className="info">Username :</td>
                            <td className="value">{user?.username}</td>
                        </tr>
                        <tr className="row">
                            <td className="info">Role :</td>
                            <td className="value">{user?.role}</td>
                        </tr>
                        <tr className="row">
                            <td className="info">email:</td>
                            <td className="value email">{user?.email}</td>
                        </tr>
                        <tr className="row">
                            <td className="info">Join :</td>
                            <td className="value">{date}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </Wrapper>
);

const Wrapper = styled.section`
    width: 100%;
    height: 100%;
    padding-top: calc(1rem + 1vh);
    padding-bottom: calc(1rem + 1vh);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;

    .wrapper {
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1),
            -2px -2px 4px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        border-radius: 6px;
        width: 100%;
        max-width: 600px;
    }
    .title {
        font-size: calc(22px + 0.5vw);
        text-transform: capitalize;
        font-weight: 700;
        color: #0000009c;
        margin-bottom: calc(20px + 1vw);
    }
    .avatar {
        width: 100%;
        max-width: 250px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    }
    .userAvatar{
        width: 25%;
        max-width: 250px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 100px;
        height: 20vh;
        margin: 4px;

    }
    .profile-container {
        display: flex;
        justify-content: center;
        gap: calc(20px + 2vw);
    }
    @media screen and (max-width: 600px) {
        .wrapper {
            width: 100%;
            padding: 2rem 1rem;
        }
    }
    @media screen and (max-width: 485px) {
        .profile-container {
            flex-direction: column;
        }
        .avatar {
            max-width: 200px;
        }
    }
    .first-col {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .information-table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
    }

    .information-table .info {
        width: 120px;
        font-weight: bold; /* Make titles bold */
        color: #000000; /* Change color */
    }
    .information-table .value {
        width: calc(100% - 120px);
    }
    .information-table .value.email {
        width: calc(100% - 120px);
        text-transform: none;
    }

    th.row,
    td {
        text-align: left;
        padding: 5px;
    }
.profile-card{
    display: flex;
    /* border: 2px solid red; */
}
.profile-header{
    /* border: 2px solid red; */
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;

}
.description{
    /* border: 2px solid red; */
    width: 70%;
    margin-top: 2%;
    text-align: center;
}
.profile-details{
    width: 50%;
    border-left: 2px solid #e6e2e2;
/* padding-left: 4%; */
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}
.username{
    font-weight: bold;
    color: #007bff;
}
    td {
        font-size: calc(12px + 0.15vw);
        font-weight: 500;
        text-transform: capitalize;
        color: #00000097;
        margin-bottom: 20px;
    }
    td.value {
        color: #000000e0;
    }
    @media screen and (max-width: 785px) {
        .title {
            margin-bottom: 25px;
        }
        .information-table .info {
            width: 40%;
        }
        .information-table .value {
            width: 60%;
        }
    }

    .edit-profile {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 2rem;
        font-size: 1rem;
        color: #007bff; /* Match previous blue color */
        text-decoration: none;
        font-weight: bold; /* Make button text bold */
    }
    .section-title {
    position: relative;
    display: inline-block;

}
.section{
    width: 70%;
}
.section-title:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 1%;
    width: 70%;
    border-bottom: 3px solid #007bff;
}
.section{
    /* border: 2px solid red; */
    padding: 10px;
}
.name{
    margin: 2%;
    font-weight: bold;
    color: #007bff;
}
.skills{
    /* border: 2px solid red; */
}
    .edit-profile svg {
        margin-right: 0.5rem;
    }
    .skills-section {
    text-align: center;
}

.section-title {
    position: relative;
    display: inline-block;
    font-size: 1rem;
}

.section-title:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 1%;
    width: 50%;
    border-bottom: 3px solid #007bff;
}

.skills {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
}

.skill {
    background-color: #ffff;
    color: #007bff;
    border-radius: 20px;
    padding: 5px 15px;
    font-size: 0.9rem;
    border: 2px solid #007bff;
    display: inline-block;

}

`;

export default Profile;
