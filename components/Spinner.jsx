"use client";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "100px auto",
};

function Spinner() {
  return (
    <ClipLoader
      color="#008000"
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
}

export default Spinner;
