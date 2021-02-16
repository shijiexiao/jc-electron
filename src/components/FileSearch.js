import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { useKeyPress } from "../hooks/uesKeyPress";

const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false);
  const [value, setValue] = useState("");
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);
  let node = useRef(null);
  const closeSearch = (e) => {
    setInputActive(false);
    setValue("");
  };
  useEffect(() => {
    // const hanleInputEvent = (e) => {
    //   const { keyCode } = e;
    //   if (keyCode === 13 && inputActive) {
    //     onFileSearch(value);
    //   } else if (keyCode === 27 && inputActive) {
    //     closeSearch(e);
    //   }
    // };
    // document.addEventListener("keyup", hanleInputEvent);
    // return () => {
    //   document.removeEventListener("keyup", hanleInputEvent);
    // };
    if (enterPressed && inputActive) {
      onFileSearch(value);
    }
    if (escPressed && inputActive) {
      closeSearch();
    }
  });
  useEffect(() => {
    if (inputActive) {
      node.current.focus();
    }
    return () => {};
  }, [inputActive]);
  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center">
      {!inputActive && (
        <>
          <span className="col-8"> {title} </span>
          <button
            type="button"
            className="icon-button"
            onClick={() => {
              setInputActive(true);
            }}
          >
            <FontAwesomeIcon size="lg" title="搜索" icon={faSearch} />
          </button>
        </>
      )}
      {inputActive && (
        <>
          <input
            className="form-control"
            value={value}
            ref={node}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <button type="button" className="icon-button" onClick={closeSearch}>
            <FontAwesomeIcon size="lg" title="关闭" icon={faTimes} />
          </button>
        </>
      )}
    </div>
  );
};
FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired,
};
FileSearch.defaultProps = {
  title: "杰哥云Doc",
};
export default FileSearch;
