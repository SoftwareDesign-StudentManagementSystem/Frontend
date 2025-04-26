import { useState, useRef, useEffect } from "react";
import styled from "styled-components";

interface DropDownMenuProps {
  options: string[];
  onSelect?: (option: string) => void; // 🔥 onSelect 추가
}

const DropDownMenu = ({ options, onSelect }: DropDownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);

    if (onSelect) {
      onSelect(option); // 🔥 부모에게 선택한 option 전달
    }
  };

  return (
    <DropDownMenuWrapper ref={dropdownRef}>
      <DropDownButton
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {selected}
        <DropDownArrow>▼</DropDownArrow>
      </DropDownButton>

      {isOpen && (
        <DropDownList>
          {options.map((option) => (
            <DropDownItem
              key={option}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(option);
              }}
            >
              {option}
            </DropDownItem>
          ))}
        </DropDownList>
      )}
    </DropDownMenuWrapper>
  );
};

export default DropDownMenu;

// Styled Components
const DropDownMenuWrapper = styled.div`
  width: 181px;
  height: 32px;
  position: relative;
  font-family: "Pretendard", sans-serif;
`;

const DropDownButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 10px 12px;
  background-color: #ffffff;
  border: transparent;
  border-radius: 8px;
  font-size: 16px;
  letter-spacing: 1px;
  color: #808080;
  cursor: pointer;
  text-align: left;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropDownArrow = styled.span`
  margin-left: 8px;
  font-size: 12px;
  color: #808080;
`;

const DropDownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 4px;
  padding: 0;
  list-style: none;
  z-index: 10;
`;

const DropDownItem = styled.li`
  padding: 10px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;
