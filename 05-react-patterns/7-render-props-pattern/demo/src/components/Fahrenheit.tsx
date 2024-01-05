export const Fahrenheit = ({ value = 0 }: { value?: number }) => {
  const fahrenheit = (value * 9) / 5 + 32;

  return <div>{fahrenheit.toFixed(2)}°F</div>;
};
