import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Cover from "../components/Cover";
import Footer from "../components/Footer";
import KindaNav from "../components/KindaNav";
import Search from "../components/Search";
import ShowPeople from "../components/ShowPeople";
import TrailerCover from "../components/TrailerCover";
import WatchlistContent from "../components/WatchlistContent";

function Watchlist() {
  const [invite, setInvite] = useState(true);
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("wtwtoken") != null) {
      setInvite(false);
    } else {
      history.push("/login");
    }
  }, [history]);
  return (
    <div>
      {invite ? null : (
        <React.Fragment>
          <TrailerCover />
          <ShowPeople />
          <KindaNav loggedIn={!invite} />
          <Cover />
          <Search />
          <WatchlistContent />
          <Footer />
        </React.Fragment>
      )}
    </div>
  );
}

export default Watchlist;
