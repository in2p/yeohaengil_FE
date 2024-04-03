import React from 'react';
import styled from 'styled-components';
import '../../../styles/globals.css';
import { CiSettings } from 'react-icons/ci';

import { useNavigate } from 'react-router-dom';
import CircleBox from '../../atoms/CircleBox/CircleBox.jsx';
import RectButton from '../../atoms/RectButton/RectButton.jsx';
import MyInfoModule from '../../molecules/MyInfoModule/MyInfoModule.jsx';

const ProfileWrapper = styled.div`
  display: flex;
  height: 150px;
`;

const ProfileLeftView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  max-width: 90px;
  align-items: center;
  height: 100%;
`;

const ProfileRightView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: 100%;
  align-items: center;
`;

function MyProfileModule() {
  const navigate = useNavigate();

  const navigateSetting = () => {
    navigate('/setting');
  };

  return (
    <ProfileWrapper>
      <ProfileLeftView>
        <h4 className="mb-10 wb-all">trip_wallet</h4>
        <CircleBox size="80px" border="none" />
      </ProfileLeftView>
      <ProfileRightView>
        <div className="d-flex flex-around w-80">
          <MyInfoModule title="게시글" number="127" />
          <MyInfoModule title="팔로워" number="1,623" />
          <MyInfoModule title="팔로잉" number="903" />
        </div>
        <div className="d-flex flex-center mt-15">
          <RectButton onClick={navigateSetting} width="85px" $primary>
            프로필 편집
          </RectButton>
          <RectButton width="85px">메시지</RectButton>
          <RectButton>
            <CiSettings className="font-medium" />
          </RectButton>
        </div>
      </ProfileRightView>
    </ProfileWrapper>
  );
}
export default MyProfileModule;
