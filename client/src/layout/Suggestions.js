import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Footer from "../components/Footer";
import KindaNav from "../components/KindaNav";
import ShowPeople from "../components/ShowPeople";
import UserSuggestions from "../components/UserSuggestions";

function Suggestions() {
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
          <ShowPeople />
          <KindaNav loggedIn={!invite} />
          <UserSuggestions />
          <Footer />
        </React.Fragment>
      )}
    </div>
  );
}

export default Suggestions;
