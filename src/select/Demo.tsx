import { useState } from "react";
import { Select } from "./Select";
import { fetchTop100Films } from "./fetchTop100Films";
import top100Films from "./top100Films.json";
import styled from "styled-components";

function DemoPage() {
  const [selectedValue, setSelectedValue] = useState<string>("");
  return (
    <DemoPageStyled>
      <Select
        value={selectedValue}
        options={top100Films}
        onChange={(value) => setSelectedValue(value)}
      />
      {/* <Select
        value={selectedValue}
        options={fetchTop100Films}
        onChange={(value) => setSelectedValue(value)}
      /> */}
    </DemoPageStyled>
  );
}

export { DemoPage };

const DemoPageStyled = styled.main`
  width: 100vw;
  height: 100vh;
  padding: 28px;
  background-color: skyblue;
`;
