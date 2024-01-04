import "./App.css";

import tweets from "./API_DATA.json";
import { TweetSearchResult } from "./components/TweetSearchResult";

function App() {
  return <TweetSearchResult tweets={tweets} />;
}

export default App;
