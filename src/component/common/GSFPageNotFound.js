import React from "react";
import Index from "../Index";

const GSFPageNotFound = () => {
  return (
    <Index.Box >
      <Index.Box>
        <Index.Typography className="pagenotfound-text-heading" >Page Not Found </Index.Typography>
        <Index.Typography className="pagenotfound-text">We couldn't find page you are looking for</Index.Typography>
      </Index.Box>
      <Index.Box >
        <img className="pagenotfound-img" src={Index.Png.pagenotfound} />
      </Index.Box>
    </Index.Box>
  );
};

export default GSFPageNotFound;
