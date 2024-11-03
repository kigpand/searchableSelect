import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { DemoPage } from "./select/Demo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <DemoPage />
    </>
  );
}

export default App;
