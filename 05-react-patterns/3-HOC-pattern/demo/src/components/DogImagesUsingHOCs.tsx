import { withHover } from "../HOCs/withHover";
import { withLoader } from "../HOCs/withLoader";

function DogImages(props: any) {
  return (
    <div {...props}>
      {props.hovering && <div>Hovering!</div>}

      <ul>
        {props.data.message.map((dog: string, i: number) => (
          <li key={i}>
            <img src={dog} alt="Dog" width={300} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withHover(
  withLoader(DogImages, "https://dog.ceo/api/breed/labrador/images/random/3")
);
