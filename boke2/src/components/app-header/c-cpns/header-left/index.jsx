import IconLogo from "@/assets/svg/icon_logo";
import React, { memo } from "react";
import { LeftWrapper } from "./style";
import { Link, useNavigate } from "react-router-dom";
const HeaderLeft = memo(() => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/home");
  };
  return (
    <LeftWrapper>
      <div className="logo" onClick={goHome}>
        <IconLogo />
        <span>Techladies Hub</span>
      </div>
    </LeftWrapper>
  );
});

export default HeaderLeft;
