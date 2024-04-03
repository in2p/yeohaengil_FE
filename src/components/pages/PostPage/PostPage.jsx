import React from 'react';
import styled from 'styled-components';
import { LuPlane, LuCalendarDays } from 'react-icons/lu';
import profile from '../../../assets/user.png';
import DayButton from '../../atoms/DayButton/DayButton.jsx';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserContainer = styled.div`
  /* 유저 프로필, 닉네임 컨테이너*/
  display: flex;
  margin: 3px 0 0 3px;
  text-align: left;
`;
const UserProfile = styled.div`
  /* 유저 프로필 사진 */
  width: 50px;
  height: 50px;
  border-radius: 100%;

  background-image: url(${props => props.profile});
  background-repeat: no-repeat;
  background-size: contain;
`;

const UserNickname = styled.div`
  /* 유저 닉네임 */
  font-size: 15px;
  font-weight: 400;
  margin-left: 10px;
  line-height: 50px;
`;

const PostPhoto = styled.div`
  width: 333px;
  height: 444px;
  background-color: #f1f1f1;
  margin: 5px auto;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostDestinaion = styled.div`
  display: flex;
`;

const PostDate = styled.div`
  display: flex;
`;

const IconContainer = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 9px;
  background: #fe4c40;
  margin-top: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WrtieText = styled.div`
  margin: 9px 0 0 9px;
  height: 38px;
  font-size: 13px;
  font-weight: 500;
  color: #707070;
  display: flex;
  align-items: center;
`;

const PlaceInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlanContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 12px;
`;

const Circle = styled.div`
  width: 12px;
  height: 12px;
  border: 1px solid #fe4c40;
  border-radius: 50%;
  text-align: center;
  color: #fe4c40;
  margin-right: 5px;
  padding: 1px;
`;

const PlaceContainer = styled.div`
  width: 270px;
  height: 29px;
  border-radius: 9px;
  border: 1px solid #efefef;
  padding: 5px;
  display: flex;
  align-items: center;
`;

const Place = styled.div`
  color: #707070;
  flex-grow: 1;
`;

const Category = styled.div`
  color: #75b5d9;
  font-weight: bold;
`;

function PostPage() {
  return (
    <PostContainer>
      <UserContainer>
        <UserProfile profile={profile} />
        <UserNickname>trip._.wallet</UserNickname>
      </UserContainer>
      <PostPhoto />
      <PostInfo>
        <PostDestinaion>
          <IconContainer>
            <LuPlane style={{ fontSize: '20px', color: 'white' }} />
          </IconContainer>
          <WrtieText>지역</WrtieText>
        </PostDestinaion>
        <PostDate>
          <IconContainer>
            <LuCalendarDays style={{ fontSize: '20px', color: 'white' }} />
          </IconContainer>
          <WrtieText>날짜</WrtieText>
        </PostDate>
        <PlaceInfo>
          <DayButton bgColor="bg-main" day={1} />
          <PlanContainer>
            <Circle>{1}</Circle>
            <PlaceContainer>
              <Place>placeName</Place>
              <Category>categoryName</Category>
            </PlaceContainer>
          </PlanContainer>
        </PlaceInfo>
      </PostInfo>
    </PostContainer>
  );
}

export default PostPage;
