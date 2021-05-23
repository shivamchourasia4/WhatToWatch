import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Connections from "../components/Connections";
import ConnectRequest from "../components/ConnectRequest";
import Footer from "../components/Footer";
import KindaNav from "../components/KindaNav";
import SearchPeople from "../components/SearchPeople";

function People() {
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
          <KindaNav loggedIn={!invite} />
          {/* <Cover /> */}
          <SearchPeople />
          <ConnectRequest />
          <Connections />
          <Footer />
        </React.Fragment>
      )}
    </div>
  );
}

export default People;
