import React from "react";
import MyParagraph from "./MyParahraph";

const DemoOutput = (props) => {
  console.log("DemoOutput Evaluating");

  return <MyParagraph>{props.show ? "This is a Paragraph" : ""}</MyParagraph>;
};

// React.memo(): cause React to skip rendering a component if its props have not changed.
// This improve performance, but use it wisely because it comes with some overhead sometimes (internal comparison)
export default React.memo(DemoOutput);
