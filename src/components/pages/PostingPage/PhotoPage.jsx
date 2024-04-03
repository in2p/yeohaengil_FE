import React, { useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { FaMinusCircle } from 'react-icons/fa';
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
  IoMdAdd,
} from 'react-icons/io';

const Container = styled.div`
  text-align: center;
`;

const PhotoUpload = styled.div`
  /* 파일업로드 box */
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 10px auto;
`;

const ContentContainer = styled.div`
  /* 글 작성 컨테이너 */
  width: 100%;
  height: 350px;
  margin-top: 10px;

  background: rgba(217, 217, 217, 0.3);
  border-radius: 10px;
`;

const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewImage = styled.img`
  /* 첨부한 사진 미리보기*/
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

const DeleteIcon = styled(FaMinusCircle)`
  /* 첨부한 사진 삭제 아이콘 */
  position: absolute;
  top: 5px;
  right: 5px;
  color: red;
  cursor: pointer;
  z-index: 1;
`;

const AddContainer = styled.label`
  /* 업로드할 (+)사진추가 */
  box-sizing: border-box;
  position: relative;

  width: 150px;
  height: 200px;

  background: #f7f7f7;
  border: 1px dashed rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  color: #707070;
`;

const PhotoButton = styled.button`
  /* 업로드 버튼 */
  font-weight: bold;
  font-size: 12px;
  width: 90px;
  border-radius: 12px;

  padding: 10px;
  margin: 10px;
  background-color: #fe4c40;
  color: #fff;

  border: none;

  &:hover {
    opacity: 0.8;
  }
`;

const StyledSlider = styled(Slider)`
  .slick-arrow {
    display: block;
    font-size: 24px;
    position: absolute;
    top: 22%;
    transform: translateY(-50%);
    color: #fe4c40;
    z-index: 1;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  .slick-next {
    right: 40px;
  }
  .slick-prev {
    left: 40px;
  }
`;

function NextArrow(props) {
  const { className, onClick } = props;
  return <IoIosArrowDroprightCircle className={className} onClick={onClick} />;
}

function PrevArrow(props) {
  const { className, onClick } = props;
  return <IoIosArrowDropleftCircle className={className} onClick={onClick} />;
}

function PhotoPage() {
  const [showImages, setShowImages] = useState([]);

  // 이미지 상대경로 저장
  const uploadFile = e => {
    const imageLists = e.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i += 1) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    // 최대 9장까지 사진 첨부
    if (imageUrlLists.length > 9) {
      imageUrlLists = imageUrlLists.slice(0, 9);
      alert('9장 초과');
    }

    setShowImages(imageUrlLists);
    console.log(imageUrlLists);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = id => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // 한 번에 한 개의 슬라이드
    slidesToScroll: 1, // 스크롤 시 한장씩
  };

  return (
    <Container>
      <PhotoUpload>
        <AddContainer htmlFor="file" onChange={uploadFile}>
          <IoMdAdd />
          <input
            type="file"
            id="file"
            accept="image/*"
            style={{ display: 'none' }}
            multiple
          />
        </AddContainer>
        <StyledSlider
          dots={settings.dots}
          infinite={settings.infinite}
          speed={settings.speed}
          slidesToShow={settings.slidesToShow}
          slidesToScroll={settings.slidesToScroll}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
        >
          {showImages.map((url, id) => (
            <ImageContainer key={url.id}>
              <PreviewImage src={url} alt="미리보기" />
              <DeleteIcon onClick={() => handleDeleteImage(id)} />
            </ImageContainer>
          ))}
        </StyledSlider>
        <p style={{ fontSize: '10px', color: '#707070' }}>
          {showImages.length}/9
        </p>
      </PhotoUpload>
      <ContentContainer />
      <PhotoButton>업로드</PhotoButton>
    </Container>
  );
}

export default PhotoPage;
