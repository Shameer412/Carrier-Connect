// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useUserContext } from "../context/UserContext";
// import axios from "axios";
// import Swal from "sweetalert2";
// import styled from "styled-components";
// import { TagsInput } from "react-tag-input-component";

// const EditProfile = () => {
//     const { id } = useParams();
//     const { user, handleFetchMe } = useUserContext();
//     const [skills, setSkills] = useState(user?.skills || []);
//     const [certifications, setCertifications] = useState(user?.certifications || []);
//     const [experience, setExperience] = useState(user?.experience || []);
//     const [image, setImage] = useState(null);
//     const navigate = useNavigate();
//     const { register, handleSubmit, reset, formState: { errors } } = useForm();

//     useEffect(() => {
//         reset(user);
//     }, [user, reset]);

//     const onSubmit = async (data) => {
//         try {
//             data.skills = skills;
//             data.certifications = certifications;
//             data.experience = experience;
            
//             const formData = new FormData();
//             Object.keys(data).forEach(key => {
//                 formData.append(key, data[key]);
//             });
//             if (image) {
//                 formData.append('image', image);
//             }
    
//             const response = await axios.patch(
//                 `http://localhost:3000/api/v1/users/${id}`,
//                 formData,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 }
//             );
    
//             reset();
//             handleFetchMe();
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Done',
//                 text: 'Profile Updated',
//             });
//             navigate('/dashboard');
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: error?.response?.data?.message || error.message,
//             });
//         }
//     };
    
//     const handleImageChange = (e) => {
//         setImage(e.target.files[0]);
//     };

//     return (
//         <Wrapper>
//             <div className="edit-profile-card">
//                 <div className="title-row">
//                     Update Profile
//                 </div>
//                 <div className="content-row">
//                     <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
//                         <div className="profile-form">
//                             {/* Username */}
//                             <div className="row">
//                                 <label htmlFor="username">Username</label>
//                                 <input
//                                     type="text"
//                                     id="username"
//                                     name="username"
//                                     placeholder="Type Here"
//                                     defaultValue={user?.username}
//                                     {...register("username", {
//                                         required: "Username required",
//                                         maxLength: {
//                                             value: 30,
//                                             message: "Too long (max 30char)",
//                                         },
//                                         minLength: {
//                                             value: 3,
//                                             message: "Too short (min 3char)",
//                                         },
//                                     })}
//                                 />
//                                 {errors.username && (
//                                     <span className="error-message">
//                                         {errors.username.message}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Email */}
//                             <div className="row">
//                                 <label htmlFor="email">Email</label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     name="email"
//                                     placeholder="Type Here"
//                                     defaultValue={user?.email}
//                                     readOnly
//                                 />
//                                 {errors.email && (
//                                     <span className="error-message">
//                                         {errors.email.message}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Role */}
//                             <div className="row">
//                                 <label htmlFor="role">Role</label>
//                                 <input
//                                     type="text"
//                                     id="role"
//                                     name="role"
//                                     placeholder="Type Here"
//                                     defaultValue={user?.role}
//                                     readOnly
//                                 />
//                                 {errors.role && (
//                                     <span className="error-message">
//                                         {errors.role.message}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Location */}
//                             <div className="row">
//                                 <label htmlFor="location">Location</label>
//                                 <input
//                                     type="text"
//                                     id="location"
//                                     name="location"
//                                     placeholder="Location"
//                                     defaultValue={user?.location}
//                                     {...register("location", {
//                                         maxLength: {
//                                             value: 150,
//                                             message: "Too long (max 150char)",
//                                         },
//                                         minLength: {
//                                             value: 3,
//                                             message: "Too short (min 3char)",
//                                         },
//                                     })}
//                                 />
//                                 {errors.location && (
//                                     <span className="error-message">
//                                         {errors.location.message}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Description */}
//                             <div className="row">
//                                 <label htmlFor="description">Description</label>
//                                 <textarea
//                                     id="description"
//                                     name="description"
//                                     placeholder="Describe yourself"
//                                     defaultValue={user?.description}
//                                     {...register("description", {
//                                         maxLength: {
//                                             value: 500,
//                                             message: "Too long (max 500char)",
//                                         },
//                                         minLength: {
//                                             value: 3,
//                                             message: "Too short (min 3char)",
//                                         },
//                                     })}
//                                 />
//                                 {errors.description && (
//                                     <span className="error-message">
//                                         {errors.description.message}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Resume */}
//                             <div className="row">
//                                 <label htmlFor="resume">Resume Link</label>
//                                 <input
//                                     type="text"
//                                     id="resume"
//                                     name="resume"
//                                     placeholder="Google Drive link"
//                                     defaultValue={user?.resume}
//                                     {...register("resume", {
//                                         required: "Resume link is required",
//                                         maxLength: {
//                                             value: 500,
//                                             message: "Enter valid link",
//                                         },
//                                         minLength: {
//                                             value: 3,
//                                             message: "Too short (min 3char)",
//                                         },
//                                     })}
//                                 />
//                                 {errors.resume && (
//                                     <span className="error-message">
//                                         {errors.resume.message}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Gender */}
//                             <div className="row">
//                                 <label htmlFor="gender">Gender</label>
//                                 <select
//                                     name="gender"
//                                     id="gender"
//                                     defaultValue={user?.gender}
//                                     {...register("gender", {
//                                         validate: (value) => value !== "none" || "Select One",
//                                     })}
//                                 >
//                                     <option value="none">Select Gender</option>
//                                     <option value="male">Male</option>
//                                     <option value="female">Female</option>
//                                     <option value="others">Others</option>
//                                 </select>
//                                 {errors.gender && (
//                                     <span className="error-message">
//                                         {errors.gender.message}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Education */}
//                             <div className="row">
//                                 <label htmlFor="education">Education</label>
//                                 <input
//                                     type="text"
//                                     id="education"
//                                     name="education"
//                                     placeholder="Education"
//                                     defaultValue={user?.education}
//                                     {...register("education", {
//                                         maxLength: {
//                                             value: 200,
//                                             message: "Too long (max 200char)",
//                                         },
//                                         minLength: {
//                                             value: 3,
//                                             message: "Too short (min 3char)",
//                                         },
//                                     })}
//                                 />
//                                 {errors.education && (
//                                     <span className="error-message">
//                                         {errors.education.message}
//                                     </span>
//                                 )}
//                             </div>

//                             {/* Skills */}
//                             <div className="row">
//                                 <label htmlFor="skills">Skills</label>
//                                 <TagsInput
//                                     value={skills}
//                                     onChange={setSkills}
//                                     name="skills"
//                                     placeHolder="HTML, CSS"
//                                     separators={["Enter", ","]}
//                                     onRemoved={["Backspace"]}
//                                     classNames={{
//                                         tag: "tag-cls",
//                                         input: "input-cls",
//                                     }}
//                                 />
//                             </div>

//                             {/* Certifications */}
//                             <div className="row">
//                                 <label htmlFor="certifications">Certifications</label>
//                                 <TagsInput
//                                     value={certifications}
//                                     onChange={setCertifications}
//                                     name="certifications"
//                                     placeHolder="Web Developer 2020"
//                                     separators={["Enter", ","]}
//                                     onRemoved={["Backspace"]}
//                                     classNames={{
//                                         tag: "tag-cls",
//                                         input: "input-cls",
//                                     }}
//                                 />
//                             </div>

//                             {/* Experience */}
//                             <div className="row">
//                                 <label htmlFor="experience">Experience</label>
//                                 <TagsInput
//                                     value={experience}
//                                     onChange={setExperience}
//                                     name="experience"
//                                     placeHolder="2020-2021: Junior Developer at IT school Questa"
//                                     separators={["Enter", ","]}
//                                     onRemoved={["Backspace"]}
//                                     classNames={{
//                                         tag: "tag-cls",
//                                         input: "input-cls",
//                                     }}
//                                 />
//                             </div>

//                             {/* Image Upload */}
//                             <div className="row">
//                                 <label htmlFor="image">Profile Image</label>
//                                 <input
//                                     type="file"
//                                     id="image"
//                                     name="image"
//                                     accept="image/*"
//                                     onChange={handleImageChange}
//                                 />
//                             </div>

//                             <div className="row submit-row">
//                                 <button type="submit" className="btn-submit">
//                                     Update
//                                 </button>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </Wrapper>
//     );
// };

// const Wrapper = styled.section`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 2rem;
//   background-color: #f9f9f9;

//   .edit-profile-card {
//     background-color: #fff;
//     border-radius: 8px;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//     max-width: 800px;
//     width: 100%;
//     padding: 2rem;
//     text-align: center;
//   }

//   .title-row {
//     font-size: 1.5rem;
//     font-weight: bold;
//     margin-bottom: 2rem;
//   }

//   .content-row {
//     text-align: left;
//   }

//   .profile-form .row {
//     margin-bottom: 1.5rem;
//   }

//   .profile-form .row label {
//     display: block;
//     margin-bottom: 0.5rem;
//     font-weight: bold;
//   }
//   .edit-profile-card .row input[type="file"] {
//     display: block;
//     margin: 10px 0;
//   }
//   .profile-form .row input,
//   .profile-form .row select,
//   .profile-form .row textarea {
//     width: 100%;
//     padding: 0.5rem;
//     border: 1px solid #ddd;
//     border-radius: 4px;
//   }

//   .error-message {
//     font-size: 0.875rem;
//     color: red;
//     margin-top: 0.5rem;
//   }

//   .submit-row {
//     text-align: center;
//   }

//   .btn {
//     background-color: #007bff;
//     color: #fff;
//     padding: 0.75rem 1.5rem;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//   }

//   .btn:hover {
//     background-color: #0056b3;
//   }
// `;

// export default EditProfile;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import Swal from "sweetalert2";
import styled from "styled-components";
import { TagsInput } from "react-tag-input-component";

const EditProfile = () => {
    const { id } = useParams();
    const { user, handleFetchMe } = useUserContext();
    const [skills, setSkills] = useState(user?.skills || []);
    const [certifications, setCertifications] = useState(user?.certifications || []);
    const [experience, setExperience] = useState(user?.experience || []);
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        reset(user);
    }, [user, reset]);

    const onSubmit = async (data) => {
        try {
            data.skills = skills;
            data.certifications = certifications;
            data.experience = experience;
    
            const response = await axios.patch(
                `http://localhost:3000/api/v1/users/${id}`, // Ensure this matches your backend route
                data,
                { withCredentials: true }
            );
    
            reset();
            handleFetchMe();
            Swal.fire({
                icon: 'success',
                title: 'Done',
                text: 'Profile Updated',
            });
            navigate('/dashboard');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error?.response?.data?.message || error.message,
            });
        }
    };
    
    return (
        <Wrapper>
            <div className="edit-profile-card">
                <div className="title-row">
                    Update Profile
                </div>
                <div className="content-row">
                    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                        <div className="profile-form">
                            {/* Username */}
                            <div className="row">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Type Here"
                                    defaultValue={user?.username}
                                    {...register("username", {
                                        required: "Username required",
                                        maxLength: {
                                            value: 30,
                                            message: "Too long (max 30char)",
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Too short (min 3char)",
                                        },
                                    })}
                                />
                                {errors.username && (
                                    <span className="error-message">
                                        {errors.username.message}
                                    </span>
                                )}
                            </div>

                            {/* Email */}
                            <div className="row">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Type Here"
                                    defaultValue={user?.email}
                                    readOnly
                                />
                                {errors.email && (
                                    <span className="error-message">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>

                            {/* Role */}
                            <div className="row">
                                <label htmlFor="role">Role</label>
                                <input
                                    type="text"
                                    id="role"
                                    name="role"
                                    placeholder="Type Here"
                                    defaultValue={user?.role}
                                    readOnly
                                />
                                {errors.role && (
                                    <span className="error-message">
                                        {errors.role.message}
                                    </span>
                                )}
                            </div>

                            {/* Location */}
                            <div className="row">
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    placeholder="Location"
                                    defaultValue={user?.location}
                                    {...register("location", {
                                        maxLength: {
                                            value: 150,
                                            message: "Too long (max 150char)",
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Too short (min 3char)",
                                        },
                                    })}
                                />
                                {errors.location && (
                                    <span className="error-message">
                                        {errors.location.message}
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            <div className="row">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe yourself"
                                    defaultValue={user?.description}
                                    {...register("description", {
                                        maxLength: {
                                            value: 500,
                                            message: "Too long (max 500char)",
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Too short (min 3char)",
                                        },
                                    })}
                                />
                                {errors.description && (
                                    <span className="error-message">
                                        {errors.description.message}
                                    </span>
                                )}
                            </div>

                            {/* Resume */}
                            <div className="row">
                                <label htmlFor="resume">Resume Link</label>
                                <input
                                    type="text"
                                    id="resume"
                                    name="resume"
                                    placeholder="Google Drive link"
                                    defaultValue={user?.resume}
                                    {...register("resume", {
                                        required: "Resume link is required",
                                        maxLength: {
                                            value: 500,
                                            message: "Enter valid link",
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Too short (min 3char)",
                                        },
                                    })}
                                />
                                {errors.resume && (
                                    <span className="error-message">
                                        {errors.resume.message}
                                    </span>
                                )}
                            </div>

                            {/* Gender */}
                            <div className="row">
                                <label htmlFor="gender">Gender</label>
                                <select
                                    name="gender"
                                    id="gender"
                                    defaultValue={user?.gender}
                                    {...register("gender", {
                                        validate: (value) => value !== "none" || "Select One",
                                    })}
                                >
                                    <option value="none">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </select>
                                {errors.gender && (
                                    <span className="error-message">
                                        {errors.gender.message}
                                    </span>
                                )}
                            </div>

                            {/* Education */}
                            <div className="row">
                                <label htmlFor="education">Education</label>
                                <input
                                    type="text"
                                    id="education"
                                    name="education"
                                    placeholder="Education"
                                    defaultValue={user?.education}
                                    {...register("education", {
                                        maxLength: {
                                            value: 200,
                                            message: "Too long (max 200char)",
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "Too short (min 3char)",
                                        },
                                    })}
                                />
                                {errors.education && (
                                    <span className="error-message">
                                        {errors.education.message}
                                    </span>
                                )}
                            </div>

                            {/* Skills */}
                            <div className="row">
                                <label htmlFor="skills">Skills</label>
                                <TagsInput
                                    value={skills}
                                    onChange={setSkills}
                                    name="skills"
                                    placeHolder="HTML, CSS"
                                    separators={["Enter", ","]}
                                    onRemoved={["Backspace"]}
                                    classNames={{
                                        tag: "tag-cls",
                                        input: "input-cls",
                                    }}
                                />
                            </div>

                            {/* Certifications */}
                            <div className="row">
                                <label htmlFor="certifications">Certifications</label>
                                <TagsInput
                                    value={certifications}
                                    onChange={setCertifications}
                                    name="certifications"
                                    placeHolder="Web Developer 2020"
                                    separators={["Enter", ","]}
                                    onRemoved={["Backspace"]}
                                    classNames={{
                                        tag: "tag-cls",
                                        input: "input-cls",
                                    }}
                                />
                            </div>

                            {/* Experience */}
                            <div className="row">
                                <label htmlFor="experience">Experience</label>
                                <TagsInput
                                    value={experience}
                                    onChange={setExperience}
                                    name="experience"
                                    placeHolder="2020-2021: Junior Developer at IT school Questa"
                                    separators={["Enter", ","]}
                                    onRemoved={["Backspace"]}
                                    classNames={{
                                        tag: "tag-cls",
                                        input: "input-cls",
                                    }}
                                />
                            </div>

                        </div>

                        <div className="submit-row">
                            <input type="submit" value="Update" className="btn" />
                        </div>
                    </form>
                </div>
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

  .edit-profile-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 800px;
    width: 100%;
    padding: 2rem;
    text-align: center;
  }

  .title-row {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
  }

  .content-row {
    text-align: left;
  }

  .profile-form .row {
    margin-bottom: 1.5rem;
  }

  .profile-form .row label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  .edit-profile-card .row input[type="file"] {
    display: block;
    margin: 10px 0;
  }
  .profile-form .row input,
  .profile-form .row select,
  .profile-form .row textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .error-message {
    font-size: 0.875rem;
    color: red;
    margin-top: 0.5rem;
  }

  .submit-row {
    text-align: center;
  }

  .btn {
    background-color: #007bff;
    color: #fff;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .btn:hover {
    background-color: #0056b3;
  }
`;

export default EditProfile;
