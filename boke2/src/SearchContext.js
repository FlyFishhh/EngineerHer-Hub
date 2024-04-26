// SearchContext.js  
import { createContext, useState, useEffect } from 'react';
import { notice } from "@/services/modules/home";
const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [profile, setProfile] = useState('');
  const handleSearchTermChange = (newTerm) => {
    console.log('点了');
    setSearchTerm(newTerm);
  };
  const handleProfile = (newTerm) => {
    console.log('点了handleProfile');
    setProfile(newTerm);
  };

  const getInfo = async () => {
    try {
      let id = JSON.parse(localStorage.getItem("userInfo")).id;
      const res = await notice({ id: id });
      if (res.code === 200) {

      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   setInterval(() => {
  //     getInfo()
  //   }, 10000);
  // }, []);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        handleSearchTermChange,
        profile,
        handleProfile
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchProvider };