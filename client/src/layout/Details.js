import React, { useEffect, useState } from "react";
import AskJoin from "../components/AskJoin";
import DetailCover from "../components/DetailCover";
import Footer from "../components/Footer";
import KindaNav from "../components/KindaNav";
import ShowPeople from "../components/ShowPeople";
import TrailerCover from "../components/TrailerCover";

function Details() {
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
      <KindaNav loggedIn={!invite} />
      <DetailCover />
      {invite ? <AskJoin /> : null}
      <Footer />
    </div>
  );
}

export default Details;
