import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import profile from '../../../assets/user.png';

const ProfileImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;

  background-image: url(${props => props.profile});
  background-repeat: no-repeat;
  background-size: contain;

  margin: 0 auto;
`;

const UserID = styled.div`
  display: flex;
  font-size: 15px;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const ModifyBtn = styled.button`
  width: 330px;
  height: 48px;
  border-radius: 9px;
  border: 1px solid #000;
  background: #fff;

  display: flex;
  margin: 0 auto;
  margin-top: 10px;

  align-items: center;
  justify-content: center;
`;

function SettingProfile() {
  const navigate = useNavigate();
  const handleKakao = async () => {
    await axios({
      method: 'get',
      url: 'http://172.30.1.71:8080/api/setting/myPage',
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiZXhwIjoxNzEyMTI5NTA2fQ.l7oX2KtwBemI874BVSVKe30MennZKu6JFycE3Dg-1TYSa8mmr8IYjvIM78HvGGcLUftLwX1ab8S1tO9GfqKGPA',
      },
    })
      .then(res => {
        console.log(res.data);
        navigate('/modifyProfile');
      })
      .catch(error => {
        console.error('Error exchanging placeInfo for token:', error);
      });
  };

  return (
    <div>
      <ProfileImg profile={profile} />
      <UserID> user_id </UserID>
      <ModifyBtn onClick={handleKakao}>프로필 수정</ModifyBtn>
    </div>
  );
}

export default SettingProfile;
