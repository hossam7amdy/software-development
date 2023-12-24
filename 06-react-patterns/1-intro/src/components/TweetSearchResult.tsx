import { useState } from "react";
import { Tweet } from "../types";
import { SearchBar } from "./SearchBar";
import { TweetList } from "./TweetList";

interface Props {
  tweets: Tweet[];
}
export const TweetSearchResult = ({ tweets }: Props) => {
  const [filterText, setFilterText] = useState("");
  const [inThisLocation, setInThisLocation] = useState(false);

  return (
    <div>
      <SearchBar
        setFilterText={setFilterText}
        setInThisLocation={setInThisLocation}
      />
      <TweetList
        tweets={tweets}
        filterText={filterText}
        inThisLocation={inThisLocation}
      />
    </div>
  );
};
