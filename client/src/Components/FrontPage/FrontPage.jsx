import React, { useState } from "react";
import Header from "../Header/Header";
import Editors from "../Editors/Editors";
import "./FrontPage.scss";
function FrontPage(props) {
  const [srcdoc, setsrcdoc] = useState(props.srcdoc || "");

  return (
    <div className="frontPage">
      <Header srcdoc={srcdoc} />
      <div className="frontPage__middle">
        <Editors setsrcdoc={setsrcdoc} />
      </div>

      <div className="frontPage__iframe">
        <iframe
          title="output"
          srcDoc={srcdoc}
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
          className="iframe resizable"
        ></iframe>
      </div>
    </div>
  );
}
export default FrontPage;
