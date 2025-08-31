const CloseIcon = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="47"
        height="47"
        fill="#F9F4EE"
        stroke="#F9F4EE"
      />
      {/* Diagonal line from top-left to bottom-right */}
      <line x1="13" y1="13" x2="35" y2="35" stroke="#221F20" strokeWidth="2" />
      {/* Diagonal line from top-right to bottom-left */}
      <line x1="35" y1="13" x2="13" y2="35" stroke="#221F20" strokeWidth="2" />
    </svg>
  );
};

export default CloseIcon;
