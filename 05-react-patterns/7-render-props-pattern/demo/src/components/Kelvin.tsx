export const Kelvin = ({ value = 0 }: { value?: number }) => {
  const kelvin = value + 273.15;

  return <div>{kelvin.toFixed(2)}°K</div>;
};
