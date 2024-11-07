import { HTMLAttributes } from "react";
import styled from "styled-components";

type Props = {
  // search value
  search: string;
  // selectbox view state controll
  handleSelectView: (state: boolean) => void;
  // search value controll
  handleSearchChange: (search: string) => void;
} & HTMLAttributes<HTMLInputElement>;

export default function SearchAble({
  search,
  handleSearchChange,
  handleSelectView,
  ...props
}: Props) {
  return (
    <SearchWrapper
      value={search}
      onFocus={() => handleSelectView(true)}
      onBlur={() => handleSelectView(false)}
      onChange={(e) => handleSearchChange(e.target.value)}
      {...props}
    />
  );
}

const SearchWrapper = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 16px 8px;
  border: 1px solid lightgray;
  background-color: white;

  &:hover {
    border: 1px solid black;
  }
`;
