import { useHover } from "../hooks/useHover";
import { useFetch } from "../hooks/useFetch";

export default function DogImages(props: any) {
  const { ref, hovering } = useHover();
  const { loading, data, error } = useFetch(
    "https://dog.ceo/api/breeds/image/random/3"
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <span style={{ color: "red" }}>
        something went wrong! {JSON.stringify(error)}
      </span>
    );
  }

  return (
    <div {...props}>
      {hovering && <div>Hovering!</div>}

      <ul ref={ref}>
        {data?.message?.map((dog: string, i: number) => (
          <li key={i}>
            <img src={dog} alt="Dog" width={300} />
          </li>
        ))}
      </ul>
    </div>
  );
}
