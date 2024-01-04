import { Tweet } from "../types";
import { TweetCategory } from "./TweetCategory";
import { TweetRow } from "./TweetRow";

interface Props {
  tweets: Tweet[];
  filterText: string;
  inThisLocation: boolean;
}
export const TweetList = ({ tweets, filterText, inThisLocation }: Props) => {
  const rows: any = [];
  let lastCategory: string | null = null;

  tweets.forEach((tweet) => {
    if (tweet.text.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inThisLocation && !tweet.isLocal) {
      return;
    }
    if (tweet.category !== lastCategory) {
      rows.push(
        <TweetCategory category={tweet.category} key={tweet.category} />
      );
    }
    rows.push(<TweetRow tweet={tweet} key={tweet.text} />);
    lastCategory = tweet.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th style={{ textAlign: "start" }}>Tweet Text</th>
          <th>Retweets</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};
