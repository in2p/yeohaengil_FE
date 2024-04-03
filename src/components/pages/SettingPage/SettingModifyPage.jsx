import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { IoCamera } from 'react-icons/io5';
import axios from 'axios';
import profile from '../../../assets/user.png';

const PageContainer = styled.div``;
const BoxContainer = styled.div``;

const ProfileContainer = styled.div`
  p {
    font-size: 12px;
    text-align: center;
    margin: 20px auto;
  }
`;

const ProfileImg = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;

  background-image: url(${props => props.profile});
  background-repeat: no-repeat;
  background-size: contain;

  margin: 0 auto;
  position: relative;
`;

const CameraBtn = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: pointer;
  right: -2px;
  bottom: -2px;
`;
const Box = styled.div`
  width: 330px;
  height: 49px;
  border-radius: 9px;
  border: 1px solid #9f9d9d;
  .txt {
    font-size: 12px;
    margin-right: 20px;
    line-height: 49px;
    text-align: right;
  }
`;

const Header = styled.div`
  color: #676565;
  font-size: 12px;
  font-weight: 700;
  padding: 0 5px;
  margin-top: 30px;
`;

const VaildNickname = styled.p`
  color: #fe4c40;
  font-size: 12px;
  margin: 5px 25px 0 0;
  text-align: right;
`;

const SaveBtn = styled.button`
  width: 80px;
  height: 20px;
  background-color: #f1f1f1;
  border: none;
  border-radius: 9px;
  font-size: 12px;
  margin: 100px auto;
  display: block;
`;

function SettingModifyPage() {
  const [profileUrl, setProfileUrl] = useState('');
  const profileRef = useRef();

  const onChangeProfile = {};

  return (
    <PageContainer>
      <ProfileContainer>
        <input
          type="file"
          ref={profileRef}
          onChange={onChangeProfile}
          style={{ display: 'none' }}
        />
        <ProfileImg profile={profile}>
          <CameraBtn>
            <IoCamera style={{ color: '#fff', fontSize: '20px' }} />
          </CameraBtn>
        </ProfileImg>
        <p>프로필사진 변경</p>
      </ProfileContainer>
      <BoxContainer>
        <Header>이메일</Header>
        <Box style={{ backgroundColor: '#EAEAEA' }}>
          <div className="txt" style={{ color: '#878787' }}>
            trip._.wallet@yeohaenggil.trip
          </div>
        </Box>
        <Header>닉네임 변경</Header>
        <Box>
          <div className="txt">trip._.wallet</div>
        </Box>
        <VaildNickname>중복되는 닉네임입니다.</VaildNickname>
      </BoxContainer>
      <SaveBtn>저장하기</SaveBtn>
    </PageContainer>
  );
}

export default SettingModifyPage;
