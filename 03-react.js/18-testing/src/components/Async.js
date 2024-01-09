import { useEffect, useState } from "react";

const Async = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const content = posts.map((item) => (
    <li key={item.id}>{`${item.title} ${item.body}`}</li>
  ));

  return <ul>{content}</ul>;
};

export default Async;
