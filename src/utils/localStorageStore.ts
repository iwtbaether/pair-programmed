import { RootState } from "../app/store";
import { APP_STORAGE_KEY } from "../data/constants";
var merge = require('lodash.merge');



// localStorage.js
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(APP_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    const parsed = JSON.parse(serializedState);
    //Redux can't handle decimals well :C
    //recursivelyCheckObject(parsed);
    return parsed;
  } catch (err) {
    return undefined;
  }
};

//localStorage.js
export const saveState = (state: RootState) => {
  try {
    let toSave = merge({}, state);
    const serializedState = JSON.stringify(toSave);
    localStorage.setItem(APP_STORAGE_KEY, serializedState);
  } catch {
    // ignore write errors
  }
};

export const loadFile = (basedstr: string) => {

  let plain = window.atob(basedstr);

  if (plain === null) return undefined;

  let oldobj = JSON.parse(plain);

  return oldobj;

}

export const saveFile = (state: RootState) => {
  let dataString = JSON.stringify(state);
  let based = window.btoa(dataString);
  download(`${APP_STORAGE_KEY}_export_${Date.now()}.txt`, based)

  function download(filename: string, text: string) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

}
