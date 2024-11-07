import React, { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SearchAble from "./components/SearchAble";
import { useOptions } from "./hook/useOptions";

export type Options = Array<{ value: string; label: string }>;

type SelectProps = {
  value?: string | null;
  options: Options | (() => Promise<Options>);
  onChange?: (value: string) => void;
};

/**
 * @description https://mui.com/material-ui/react-autocomplete/#combo-box 에서 Autocomplete > Combo를 참고해 아래의 기능을 구현하세요.
 * - `Select`의 폭은 선택 가능한 option들 중 가장 폭이 넓은 것에 맞춰져 있어야 합니다. 즉 어떤 option이라도 그것이 선택되었을 때, 잘린 채로 표시되어서는 안 됩니다.
 * - option을 검색할 수 있어야 합니다. option을 선택하지 않고, focus가 `Select`를 벗어난 경우에는, 검색어가 삭제되어야 합니다.
 * - 마우스 뿐 아니라 키보드를 사용해도 option을 선택할 수 있어야 합니다.
 * - `Select`를 클릭하거나 `Select`에서 위 방향 또는 아래 방향 키보드를 누르면 선택 가능한 option들이 나타나야 합니다.
 * - 클릭하거나 엔터키를 누르는 것으로 option을 선택할 수 있어야 합니다.
 * - 선택 가능한 option들이 나타날 때, 선택된 option이 있다면, 선택된 그 option이 보여야 하고, 강조되어야 하며, 키보드를 이용해 option을 순회할 때 선택된 option이 시작 지점이 되어야 합니다.
 * - 선택 가능한 option들이 나타날 때, option들이 스크린을 벗어나지 않아야 합니다. 예를 들어, `Select` 아래쪽에 선택 가능한 option들이 나타나기에 공간이 부족하다면, 선택 가능한 option들은 위쪽에 나타나야 합니다.
 * - `Select`가 hover 되는 경우와 focus 되는 경우, 그리고 두 경우가 아닌 경우에 대해 `Select`의 스타일이 달라야 합니다.
 */
function Select(props: SelectProps): ReactNode {
  // selectbox search state
  const [search, setSearch] = useState<string>("");
  // selectbox open state
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // option control hook
  const { filterdOptions, handleOptionDown, handleOptionUp } = useOptions(
    props.options,
    search
  );
  // current option index
  const [focus, setFocus] = useState<number>(0);

  // list wrapper ref
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (props.value) {
      setSearch(props.value);
    }
  }, [props.value]);

  const handleListClick = (item: string) => {
    if (props.onChange) props.onChange(item);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" && !isOpen) setIsOpen(true);
    switch (e.key) {
      case "ArrowDown":
        setFocus((focus) => handleOptionDown(focus));
        return;
      case "ArrowUp":
        setFocus((focus) => handleOptionUp(focus));
        return;
      case "Enter":
        if (focus >= filterdOptions.length) return;
        setIsOpen(false);
        setSearch(filterdOptions[focus].label);
        return;
    }
  };

  const handleChangeSearch = (search: string) => {
    setFocus(0);
    setSearch(search);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.children[focus].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [ref, focus]);

  return (
    <SelectWrapper onKeyDown={(e) => handleKeyPress(e)}>
      <SearchAble
        search={search}
        handleSelectView={(state) => setIsOpen(state)}
        handleSearchChange={handleChangeSearch}
      />
      {isOpen && (
        <ListWrapper ref={ref}>
          {filterdOptions?.map((item, i) => {
            return (
              <List
                $isFocus={focus === i}
                key={item.value}
                tabIndex={i}
                onMouseDown={() => handleListClick(item.label)}
                onMouseOver={() => setFocus(i)}
              >
                {item.label}
              </List>
            );
          })}
        </ListWrapper>
      )}
    </SelectWrapper>
  );
}

export { Select };

const SelectWrapper = styled.div`
  width: 300px;
  position: relative;
`;
const ListWrapper = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 0px;
  max-height: 300px;
  position: absolute;
  border: 1px solid lightgray;
  border-radius: 4px;
  overflow: auto;
  background-color: white;
  z-index: 1;
  width: 100%;
`;

const List = styled.li<{ $isFocus: boolean }>`
  padding: 8px 4px;
  cursor: pointer;
  background-color: ${(props) => (props.$isFocus ? "#ededed" : "transparent")};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
