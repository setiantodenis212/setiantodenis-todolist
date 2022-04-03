import React from "react";

const Rolling = ({ color, size }) => {
  const colors = color === "primary" ? "#16abf8" : "white";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: "auto",
        display: "block",
        shapeRendering: "auto",
        width: size || 36,
        height: size || 36,
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke={colors}
        strokeWidth="8"
        r="30"
        strokeDasharray="80.11061266653974 28.703537555513243"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="0.8928571428571428s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        />
      </circle>
    </svg>
  );
};

export default React.memo(Rolling);
