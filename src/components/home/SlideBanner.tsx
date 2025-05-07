import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import banner1 from "../../assets/banner/송도고.jpg";
import banner2 from "../../assets/banner/iedubanner.png";
import banner3 from "../../assets/banner/banner1.png";
import banner4 from "../../assets/banner/banner2.png";
import banner5 from "../../assets/banner/banner3.png";

const images = [banner1, banner2, banner3, banner4, banner5];

export default function SlideBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <BannerWrapper>
      <ArrowButton onClick={handlePrev}>
        <ChevronLeft size={24} />
      </ArrowButton>

      <ImageContainer>
        <SlidingImage key={index} src={images[index]} alt={`banner-${index}`} />
      </ImageContainer>

      <ArrowButton onClick={handleNext}>
        <ChevronRight size={24} />
      </ArrowButton>
    </BannerWrapper>
  );
}

const BannerWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 385px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  box-sizing: border-box;
`;

const ImageContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(30%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const SlidingImage = styled.img`
  max-height: 90%;
  max-width: 100%;
  object-fit: contain;
  animation: ${slideIn} 0.5s ease-out;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 4px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;
