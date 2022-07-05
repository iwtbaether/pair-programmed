import { useState } from "react";

const upArrow = String.fromCharCode(9660);
const downArrow = String.fromCharCode(9650);
function useHideArrow() {
  const [hide, setHide] = useState(false);

  const toggleHide = () => {
    setHide(!hide);
  };

  const arrow = hide ? upArrow : downArrow;

  return { arrow, hide, toggleHide };
}

export { useHideArrow };
