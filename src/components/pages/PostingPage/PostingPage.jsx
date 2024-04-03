import '../../../styles/globals.css';
import React, { useState } from 'react';
import styled from 'styled-components';
import { MdAddPhotoAlternate } from 'react-icons/md';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CostAlert from '../../atoms/Alert/CostAlert.jsx';
import WriteDestination from '../../organisms/WriteDestination/WriteDestination.jsx';
import PhotoModal from '../../molecules/Modal/PhotoModal.jsx';

const Button = styled.button`
  font-weight: bold;
  font-size: 15px;
  border-radius: 13px;
  padding: 10px;

  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 80px;
  border: none;

  &:hover {
    opacity: 0.8;
  }
`;
const AddPhoto = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  background: gray;
  font-size: 32px;

  position: fixed;
  bottom: 80px;
  margin-left: 300px;
`;

function WritePage() {
  const [photoOpen, setPhotoOpen] = useState(false);
  const [postData, setPostData] = useState({}); // 서버에 보낼 data
  const navigate = useNavigate();

  const handleClosePhoto = () => {
    setPhotoOpen(false);
  };

  // 서버에 보낼 city
  const setCity = cityInfo => {
    setPostData({ city: cityInfo, ...postData });
  };

  // 서버에 보낼 date
  const setDate = (startDateInfo, endDateInfo) => {
    setPostData({
      startDate: startDateInfo,
      endDate: endDateInfo,
      ...postData,
    });
  };

  // 서버에 보낼 placeInfo
  const addPlaceInfo = (day, placeData) => {
    const placePostData = { ...placeData };
    delete placePostData.date;
    setPostData(prevPostData => {
      const updatedPlaceInfo = { ...prevPostData.placeInfo };
      if (updatedPlaceInfo.hasOwnProperty.call(updatedPlaceInfo, day)) {
        updatedPlaceInfo[day].push(placePostData);
      } else {
        updatedPlaceInfo[day] = [placePostData];
      }

      return { ...prevPostData, placeInfo: updatedPlaceInfo };
    });
  };

  // 서버와 통신할 다음으로 버튼
  const handlePostPlaces = async () => {
    console.log(postData);
    await axios({
      method: 'post',
      url: 'http://172.30.1.71:8080/api/board/save',
      withCredentials: false,
      data: postData,
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiZXhwIjoxNzExNTMyNDEyfQ.G3_sd3_iKsxS4OP2lV9Pei9LOnUtGiGZSourpWAWgO3nvOozfBDBJOxfCOajqPe1N7eUMlwYeHG4fHKLrz3hsA',
      },
    })
      .then(res => {
        console.log(res.data);
        navigate('/postingphoto'); // API 요청 성공 시 페이지 이동
      })
      .catch(error => {
        console.error('Error exchanging placeInfo for token:', error);
      });
  };
  return (
    <div className="writeWrapper">
      <CostAlert />
      <WriteDestination
        setCity={setCity}
        setDate={setDate}
        addPlaceInfo={addPlaceInfo}
      />
      <div>
        <Button
          style={{ background: '#fe4c40', color: 'white' }}
          onClick={handlePostPlaces}
        >
          <p style={{ margin: '0px' }}>다음으로 ⮕</p>
        </Button>
        <AddPhoto onClick={() => setPhotoOpen(true)}>
          <MdAddPhotoAlternate />
        </AddPhoto>
        {photoOpen && <PhotoModal handleClosePhoto={handleClosePhoto} />}
      </div>
    </div>
  );
}

export default WritePage;
