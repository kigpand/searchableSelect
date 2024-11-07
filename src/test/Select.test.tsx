import { describe, it, vitest } from "vitest";
import { render } from "@testing-library/react";
import { Select } from "../select/Select";
import { fetchTop100Films } from "../select/fetchTop100Films";
import top100Films from "../select/top100Films.json";

describe("Select box test", () => {
  it("Select box rendering test", () => {
    const value = "normal";
    const changeEvent = vitest.fn();

    render(
      <Select value={value} options={top100Films} onChange={changeEvent} />
    );
  });

  it("Select box promise rendering test", () => {
    const value = "promie";
    const changeEvent = vitest.fn();

    render(
      <Select value={value} options={fetchTop100Films} onChange={changeEvent} />
    );
  });
});
