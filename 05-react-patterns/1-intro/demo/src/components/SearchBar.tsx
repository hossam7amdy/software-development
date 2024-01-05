interface Props {
  setFilterText: (text: string) => void;
  setInThisLocation: (onlyShowLocalTweets: boolean) => void;
}

export const SearchBar = (props: Props) => {
  return (
    <form>
      <div>
        <input
          style={{ width: "100%" }}
          type="text"
          placeholder="Search..."
          onChange={(e) => props.setFilterText(e.target.value)}
        />
      </div>
      <p>
        <label>
          <input
            type="checkbox"
            onChange={(e) => props.setInThisLocation(e.target.checked)}
          />
          Only show tweets in your current location
        </label>
      </p>
    </form>
  );
};
