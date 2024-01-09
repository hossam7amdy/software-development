const MyParagraph = (props) => {
  console.log("MyParagraph Evaluating");
  return <p>{props.children}</p>;
};

export default MyParagraph;
