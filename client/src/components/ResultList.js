import React from "react";
import SearchItem from "./SearchItem";

function ResultList(props) {
  const { datas } = props;

  return (
    <div>
      {datas.length > 0 ? (
        <div className="search-list center mr">
          {datas.map((data, index) => {
            return <SearchItem data={data} tab={props.tab} key={index} />;
          })}
        </div>
      ) : (
        <div className="center">
          <h1 className="errmsg">No Search Result !</h1>
        </div>
      )}
    </div>
  );
}

export default ResultList;
