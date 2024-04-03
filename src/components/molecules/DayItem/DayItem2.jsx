import styled from 'styled-components';
import { useState } from 'react';
import DayButton from '../../atoms/DayButton/DayButton.jsx';
import MapModal from '../Modal/MapModal.jsx';
import WriteDayContents from '../WriteDayContents/WriteDayContents.jsx';

const DayContainer = styled.div`
  display: flex;
  margin-right: 10px;
`;
const SelectedDate = styled.span`
  align-items: center;
  text-align: center;
  margin: 5px;
  padding: 7px;
`;
const AddPlaceBtn = styled.button`
  display: flex;
  align-items: center;
  border: none;
  margin: 5px 0 0 270px;
  font-size: 12px;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

function DayItem2({ startDate, endDate, handleSearch, addPlaceInfo }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [places, setPlaces] = useState({});

  // 선택된 날짜 변경 시 처리하는 함수
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  // 선택된 장소 변경 시 처리하는 함수
  const handleAddPlace = (dayIndex, placeInfo) => {
    if (placeInfo && selectedDate) {
      const { date } = placeInfo;
      if (date === selectedDate.toISOString().slice(0, 10)) {
        setPlaces(prevPlaces => ({
          ...prevPlaces,
          [date]: [...(prevPlaces[date] || []), placeInfo],
        }));
        addPlaceInfo(dayIndex, placeInfo); // 서버에 보낼 placeInfo
      }
    }
  };

  // 선택된 장소 삭제하는 함수
  const handleDeletePlace = (date, index) => {
    const updatedPlaces = places[date].filter((_, idx) => idx !== index);
    setPlaces(prevPlaces => ({
      ...prevPlaces,
      [date]: updatedPlaces,
    }));
  };

  // 날짜 범위 생성 함수
  const createDateRange = (start, end) => {
    const dates = [];
    const currentDate = new Date(start);
    while (currentDate <= end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const dateRange = createDateRange(startDate, endDate);

  return (
    <>
      {dateRange.map((currentDate, index) => (
        <div key={currentDate.toISOString()}>
          <DayContainer>
            <DayButton bgColor="bg-main" day={index + 1} />
            <SelectedDate>
              {`${currentDate.getMonth() + 1}.${currentDate.getDate()}`}
            </SelectedDate>
          </DayContainer>
          <WriteDayContents
            places={places[currentDate.toISOString().slice(0, 10)]}
            handleDeletePlace={i =>
              handleDeletePlace(currentDate.toISOString().slice(0, 10), i)
            }
          />
          <AddPlaceBtn onClick={() => handleDateChange(currentDate)}>
            장소 추가
          </AddPlaceBtn>
          {selectedDate && selectedDate.getTime() === currentDate.getTime() && (
            <MapModal
              handleCloseMap={() => setSelectedDate(null)}
              handleSearch={handleSearch}
              selectedDate={currentDate}
              handleAddPlace={handleAddPlace}
              dayIndex={index}
            />
          )}
        </div>
      ))}
    </>
  );
}

export default DayItem2;
