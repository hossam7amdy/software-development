import { Flyout } from "./Flyout/Flyout";

export default function FlyoutMenu() {
  return (
    <Flyout>
      <Flyout.Toggle />
      <Flyout.List>
        <Flyout.Item>Edit</Flyout.Item>
        <Flyout.Item>Delete</Flyout.Item>
      </Flyout.List>
    </Flyout>
  );
}
