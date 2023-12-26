import { useState } from "react";

export function PhoneNumberInput() {
  const [phone, setPhone] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as string;
    let digits = value.replace(/\D+/g, "").slice(0, 10);

    if (digits.length >= 7) {
      digits = digits.slice(0, 6) + "-" + digits.slice(6);
    }
    if (digits.length >= 4) {
      digits = "(" + digits.slice(0, 3) + ")" + digits.slice(3);
    }

    setPhone(digits);
  };

  return (
    <input
      value={phone}
      data-testid="phone-number-input"
      onChange={handleChange}
    />
  );
}
