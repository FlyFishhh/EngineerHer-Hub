import React, {
  memo,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import SectionPosts from "@/components/section-post";
import SectionTabs from "@/components/section-tabs";
import { HomeWrapper } from "./style";
import { isEmptyO } from "@/utils";
import { listpost } from "@/services/modules/home";
import { SearchContext } from "@/SearchContext";
const Home = memo(() => {
  const { searchTerm ,handleSearchTermChange} = useContext(SearchContext);
  const [dataList, setDataList] = useState([]);


  const getList = async () => {
    try {
      let param = {
        content: searchTerm,
        type: "",
      };
      const res = await listpost(param);
      if (res.code === 200) {
        setDataList(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getListBySearch = async (param) => {
    try {
      const res = await listpost(param);
      if (res.code === 200) {
        setDataList(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tabNames = [
    "ALL",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Computer Engineering",
    "Aerospace Engineering",
    "Chemical Engineering",
    "Civil Engineering",
    "Environmental Engineering",
    "Biomedical Engineering",
    "Industrial Engineering",
    "Materials Engineering",
    "Nuclear Engineering",
    "Petroleum Engineering",
    "Ocean Engineering",
    "Systems Engineering",
    "Biotechnology Engineering",
  ];

  const tabClickHandle = useCallback((index, name) => {
    if (name === "ALL") {
      name = "";
    }
    let param = {
      type: name,
    };
    const res = getListBySearch(param);
    if (res.code === 200) {
      setDataList(res.data);
    }
  }, []);

  useEffect(() => {
    getList();
  }, [handleSearchTermChange]);

  return (
    <HomeWrapper>
      <div className="content">
        <SectionTabs tabNames={tabNames} tabClick={tabClickHandle} />
        <SectionPosts
          roomList={dataList}
          itemWidth="100%"
        />
      </div>
    </HomeWrapper>
  );
});

export default Home;
