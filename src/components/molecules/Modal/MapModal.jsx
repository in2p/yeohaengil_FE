import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiFillCloseCircle } from 'react-icons/ai';
import SearchBox from '../../atoms/SearchBox/SearchBox.jsx';

const { google } = window;

const MapContainer = styled.div`
  width: 100%;
  height: 16vh;
  border-radius: 15px;
  margin: 10px auto;
`;

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.08); //투명도
`;

const CloseIcon = styled(AiFillCloseCircle)`
  color: #9f9f9f;
  font-size: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ModalBody = styled.div`
  position: fixed;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
  height: 500px;
  border-radius: 10px;
  padding: 7px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(34, 36, 38, 0.15);
  text-align: center;
`;

const UploadBtn = styled.button`
  width: 200px;
  height: 23px;
  border-radius: 5px;
  border: none;

  font-weight: 800;
  font-size: 13px;
  text-align: center;
  padding: 1px;
  margin-top: 5px;
`;

function MapModal({ handleCloseMap, selectedDate, handleAddPlace }) {
  const [selectedMarkerPlace, setSelectedMarkerPlace] = useState(null);

  const searchMap = useCallback(searchedPlace => {
    const infowindow = new google.maps.InfoWindow();
    const mapOptions = {
      center: { lat: 37.553836, lng: 126.969652 },
      zoom: 10,
    };
    const map = new google.maps.Map(
      document.getElementById('myMap'),
      mapOptions,
    );

    function displayMarker(place) {
      const marker = new google.maps.Marker({
        map,
        position: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
      });

      google.maps.event.addListener(marker, 'mouseover', () => {
        infowindow.setContent(`<div class="info-window">${place.name}</div>`);
        infowindow.open(map, marker);
      });

      google.maps.event.addListener(marker, 'mouseout', () => {
        if (!marker.clicked) {
          infowindow.close();
        }
      });

      google.maps.event.addListener(marker, 'click', () => {
        setSelectedMarkerPlace(place);
        marker.clicked = true;
      });
    }

    function placesSearchCB(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i += 1) {
          displayMarker(results[i]);
        }
      }
    }

    // 검색어가 제공된 경우에만 검색 실행
    if (searchedPlace) {
      const placesService = new google.maps.places.PlacesService(map);
      placesService.textSearch({ query: searchedPlace }, placesSearchCB);
    }
  }, []);

  const handleSearch = searchedPlace => {
    searchMap(searchedPlace);
  };

  const handleAddButtonClick = () => {
    if (selectedMarkerPlace) {
      const googleCategories = [
        'cafe',
        'store',
        'food',
        'point_of_interest',
        'establishment',
      ];

      const placeCategories = ['카페', '상점', '음식점', '가볼만한곳', '기타'];

      let selectedCategory = null;

      for (let i = 0; i < googleCategories.length; i += 1) {
        if (selectedMarkerPlace.types.includes(googleCategories[i])) {
          selectedCategory = placeCategories[i];
          break;
        }
      }

      const placeInfo = {
        date: selectedDate.toISOString().slice(0, 10),
        placeName: selectedMarkerPlace.name,
        categoryName: selectedCategory,
        placePosition: {
          lat: selectedMarkerPlace.geometry.location.lat(),
          lng: selectedMarkerPlace.geometry.location.lng(),
        },
      };

      console.log('placeInfo', placeInfo);
      handleCloseMap();
      handleAddPlace(placeInfo);
    }
  };

  useEffect(() => {
    searchMap();
  }, [searchMap]);

  return (
    <Modal>
      <ModalBody>
        <CloseIcon onClick={handleCloseMap} />
        <SearchBox searchMap={handleSearch} />
        <MapContainer id="myMap" style={{ width: '100%', height: '400px' }} />
        <UploadBtn className="bg-main" onClick={handleAddButtonClick}>
          추가하기
        </UploadBtn>
      </ModalBody>
    </Modal>
  );
}

export default MapModal;