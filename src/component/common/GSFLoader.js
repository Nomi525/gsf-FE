import React from "react";
import { ClipLoader } from "react-spinners";
import SyncLoader from "react-spinners/SyncLoader";

const GSFLoader = ({ color, loading, ariaLabel, dataTestId }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <SyncLoader
        color={color}
        loading={loading}
        size={14}
        aria-label={ariaLabel}
        data-testid={dataTestId}
        style={{ transform: "none" }}
      />
    </div>
  );
};

export default GSFLoader;


export const UgoButtonLoader = () => {
  return (
    <ClipLoader size={20} color="#ffff"/> 
  );
}
