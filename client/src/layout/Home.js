import React, { useEffect, useState } from "react";
import AskJoin from "../components/AskJoin";
import CarasoulCover from "../components/CarasoulCover";
import Cover from "../components/Cover";
import Footer from "../components/Footer";
import KindaNav from "../components/KindaNav";
import Search from "../components/Search";
import ShowPeople from "../components/ShowPeople";
import TrailerCover from "../components/TrailerCover";

function Home() {
  const [invite, setInvite] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("wtwtoken") != null) {
      setInvite(false);
    }
  }, []);

  return (
    <div>
      <TrailerCover />
      <ShowPeople />
      <Cover />
      <KindaNav loggedIn={!invite} />
      <Search />
      <CarasoulCover mediaType="movie" />
      {invite ? <AskJoin /> : null}
      <CarasoulCover mediaType="tv" />
      <Footer />
    </div>
  );
}

export default Home;
