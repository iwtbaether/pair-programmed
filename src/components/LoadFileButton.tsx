import React from "react";
import { useAppDispatch } from "../app/hooks";

function LoadFileButton() {
  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      <button
        onClick={() => {
          (document.getElementById("file-input") as HTMLInputElement).click();
        }}
      >
        Import
      </button>
      <input
        id="file-input"
        type="file"
        name="name"
        style={{ display: "none" }}
        onChange={(e) => {
          let list = e.target.files;
          if (list) {
            let file = list[0];
            var reader = new FileReader();

            //reader.readAsArrayBuffer(file)
            reader.readAsText(file, "UTF-8");

            // here we tell the reader what to do when it's done reading...
            reader.onload = (readerEvent) => {
              let target = readerEvent.target;
              if (target) {
                let content = target.result;
                if (content) {
                  console.log(content);
                  dispatch({ type: "LOAD_FILE", payload: content.toString() });
                }
              }
            };
          }
        }}
      />
    </React.Fragment>
  );
}

export default LoadFileButton;
