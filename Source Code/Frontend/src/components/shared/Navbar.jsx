import styled from "styled-components";
import Logo from "../Logo";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../context/UserContext"; // Adjust the path if necessary
import { FaUserCircle } from "react-icons/fa"; // Import the user profile icon

const Navbar = ({ navbarRef }) => {
    const { user } = useUserContext();

    return (
        <Wrapper ref={navbarRef}>
            <div className="container">
                <Logo />
                <div className="flex justify-end items-center">
                    <NavLink className="nav-item" to="/all-jobs">
                        Jobs
                    </NavLink>
                    {user ? (
                        <NavLink className="nav-item" to="/dashboard">
                            <FaUserCircle className="profile-icon" />
                        </NavLink>
                    ) : (
                        <NavLink className="nav-item" to="/login">
                            <span className="login-button bg-purple-500 p-2 text-white rounded-md">
                                Login
                            </span>
                        </NavLink>
                    )}
                    
                </div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    box-shadow: 0 5px 5px var(--shadow-light);
    padding: 1rem 0;
    .container {
        width: 100%;
        max-width: 1200px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .container .nav-item {
        font-size: 16px;
        font-weight: 500;
        text-transform: capitalize;
        margin-left: 20px;
        color: var(--color-black);
    }
    .container .nav-item.active {
        color: var(--color-primary);
    }
    .profile-icon {
        font-size: 24px;
        color: var(--color-black);
        transition: color 0.3s ease;
    }
    .profile-icon:hover {
        color: var(--color-primary);
    }
    @media screen and (max-width: 1200px) {
        padding: 1rem 2rem;
    }
    @media screen and (max-width: 600px) {
        padding: 1.2rem 1rem;
        .container {
            display: flex;
        }
    }
`;

export default Navbar;
