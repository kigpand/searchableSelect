import { useState } from "react";
import { Select } from "./Select";
import { fetchTop100Films } from "./fetchTop100Films";
import styled from "styled-components";

function DemoPage() {
  const [selectedValue, setSelectedValue] = useState<string>("");
  return (
    <DemoPageStyled>
      <Select
        value={selectedValue}
        options={fetchTop100Films}
        onChange={(value) => setSelectedValue(value)}
      />
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
