import { Tweet } from "../types";

interface Props {
  tweet: Tweet;
}
export const TweetRow = ({ tweet }: Props) => {
  const color = tweet.isLocal ? "inherit" : "red";

  return (
    <tr>
      <td style={{ color: color }}>
        <span>{tweet.text}</span>
      </td>
      <td>{tweet.retweets}</td>
    </tr>
  );
};
