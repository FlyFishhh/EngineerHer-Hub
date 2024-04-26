import IconSearchBar from "@/assets/svg/icon-search-bar";
import React, { memo, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CenterWrapper } from "./style";
import { Input } from "antd";
import { SearchContext } from "@/SearchContext";
const HeaderCenter = memo(() => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { searchTerm,handleSearchTermChange } = useContext(SearchContext);

  const onSearchchange = (e) => {
    handleSearchTermChange(searchValue)
    setSearchValue(e.target.value);
  };
  const handleSearch = () => {
    handleSearchTermChange(searchValue);
    navigate("/home", { state: { value: searchValue } });
  };
  return (
    <CenterWrapper>
      <div className="search-bar">
        <div className="text">
          <Input
            placeholder="Search"
            value={searchValue}
            onChange={onSearchchange}
          />
        </div>
        <div className="icon" onClick={handleSearch}>
          <IconSearchBar />
        </div>
      </div>
    </CenterWrapper>
  );
});

export default HeaderCenter;
