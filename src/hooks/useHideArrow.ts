import { useState } from "react";

const upArrow = String.fromCharCode(9660);
const downArrow = String.fromCharCode(9650);
type UseHideArrowReturnType = {
  arrow: string;
  hide: boolean;
  toggleHide: () => void;
};
function useHideArrow(): UseHideArrowReturnType {
  const [hide, setHide] = useState(false);
  const arrow = hide ? upArrow : downArrow;
  const toggleHide = () => setHide(!hide);
  return { arrow, hide, toggleHide };
}

export { useHideArrow };
