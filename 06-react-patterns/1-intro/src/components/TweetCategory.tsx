export const TweetCategory = ({ category }: { category: string }) => {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
};
