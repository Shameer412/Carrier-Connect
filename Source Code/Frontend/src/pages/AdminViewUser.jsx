import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import axios from "axios";
import avatar from "../assets/media/avatar.jpg";

dayjs.extend(advancedFormat);

const AdminViewUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}`);
        setUser(response.data.result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <LoadingWrapper>Loading...</LoadingWrapper>;
  }

  if (error) {
    return <ErrorWrapper>Error: {error}</ErrorWrapper>;
  }

  const formattedDate = dayjs(user?.createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <ProfileCard>
        <ProfileHeader>
          <Avatar src={avatar} alt="Avatar" />
          <UserName>{user?.name}</UserName>
          <Description>{user?.description}</Description>
          <SkillsSection>
            <SectionTitle>Skills</SectionTitle>
            <SkillsList>
              {user?.skills?.map((skill, index) => (
                <Skill key={index}>{skill}</Skill>
              ))}
            </SkillsList>
          </SkillsSection>
        </ProfileHeader>
        <ProfileDetails>
          <Section>
            <SectionTitle>Email</SectionTitle>
            <Info>{user?.email}</Info>
          </Section>
          <Section>
            <SectionTitle>Location</SectionTitle>
            <Info>{user?.location}</Info>
          </Section>
          <Section>
            <SectionTitle>Education</SectionTitle>
            <Info>{user?.education}</Info>
          </Section>
          <Section>
            <SectionTitle>Certifications</SectionTitle>
            <CertificationsList>
              {user?.certifications?.map((cert, index) => (
                <Certification key={index}>{cert}</Certification>
              ))}
            </CertificationsList>
          </Section>
          <Section>
            <SectionTitle>Job Experiences</SectionTitle>
            {user?.jobExperiences?.map((job, index) => (
              <JobExperience key={index}>
                <JobCompany>{job.company}</JobCompany>
                <JobDetails>
                  <JobPosition>{job.position}</JobPosition>
                  <JobDuration>{job.duration}</JobDuration>
                </JobDetails>
              </JobExperience>
            ))}
          </Section>
        </ProfileDetails>
        <MemberSince>Member since: {formattedDate}</MemberSince>
      </ProfileCard>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
`;

const ProfileCard = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const UserName = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #007bff;
`;

const Description = styled.p`
  width: 80%;
  margin-bottom: 15px;
  color: #666666;
`;

const SkillsSection = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const SectionTitle = styled.h3`
  position: relative;
  display: inline-block;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #007bff;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 50%;
    height: 3px;
    background-color: #007bff;
  }
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Skill = styled.span`
  background-color: #007bff;
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
`;

const ProfileDetails = styled.div`
  margin-top: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Info = styled.p`
  font-size: 16px;
  color: #333333;
`;

const CertificationsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Certification = styled.p`
  background-color: #f0f0f0;
  color: #333333;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 16px;
`;

const JobExperience = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const JobCompany = styled.h4`
  font-size: 18px;
  font-weight: bold;
  color: #333333;
`;

const JobDetails = styled.div`
  font-size: 16px;
  color: #666666;
`;

const JobPosition = styled.p`
  margin: 5px 0;
`;

const JobDuration = styled.p`
  margin: 5px 0;
`;

const MemberSince = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #666666;
  text-align: center;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.2rem;
  color: #666666;
`;

const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.2rem;
  color: #ff0000;
`;

export default AdminViewUser;
