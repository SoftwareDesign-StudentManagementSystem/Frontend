// src/utils/getRandomProfileImage

import profile1 from "../assets/profile/profile1.png";
import profile2 from "../assets/profile/profile2.png";
import profile3 from "../assets/profile/profile3.png";
import profile4 from "../assets/profile/profile4.png";
import profile5 from "../assets/profile/profile5.png";

// 필요한 만큼 추가

const profileImages = [profile1, profile2, profile3, profile4, profile5];

export function getRandomProfileImage(): string {
  const index = Math.floor(Math.random() * profileImages.length);
  return profileImages[index];
}
