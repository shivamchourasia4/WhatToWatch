import React, { useEffect, useState } from "react";
import AskJoin from "../components/AskJoin";
import Footer from "../components/Footer";
import KindaNav from "../components/KindaNav";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import Cover from "../components/Cover";

function SearchLayout() {
  const [invite, setInvite] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("wtwtoken") != null) {
      setInvite(false);
    }
  }, []);
  return (
    <div>
      <KindaNav loggedIn={!invite} />
      <Cover />
      <SearchBar />
      <SearchResults />
      {invite ? <AskJoin /> : null}
      <Footer />
    </div>
  );
}

export default SearchLayout;
