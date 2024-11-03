import { HTMLAttributes, useEffect, useState } from "react";
import styled from "styled-components";

type Props = {
  // selectbox view state controll
  handleSelectView: (state: boolean) => void;
  // search value controll
  handleSearchChange: (search: string) => void;
} & HTMLAttributes<HTMLInputElement>;

export default function SearchAble({
  handleSearchChange,
  handleSelectView,
  ...props
}: Props) {
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    handleSearchChange(search);
  }, [search]);

  return (
    <SearchWrapper
      value={search}
      onFocus={() => handleSelectView(true)}
      onBlur={() => handleSelectView(false)}
      onChange={(e) => setSearch(e.target.value)}
      {...props}
    />
  );
}

const SearchWrapper = styled.input`
  width: 100%;
  padding: 16px 8px;
  border: 1px solid lightgray;
  background-color: white;

  &:hover {
    border: 1px solid black;
  }
`;
