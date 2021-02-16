import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
export const BottomBtn = ({ text, colorClass, icon, onBtnClick }) => {
  return (
    <div>
      <button
        onClick={onBtnClick}
        type="button"
        className={`btn btn-block no-border ${colorClass}`}
      >
        <FontAwesomeIcon className="mr-2" title="" size="lg" icon={icon} />
        {text}
      </button>
    </div>
  );
};
BottomBtn.propTypes = {
  text: PropTypes.string,
  colorClass: PropTypes.string,
  icon: PropTypes.element.isRequired,
  onBtnClick: PropTypes.func,
};

BottomBtn.defaultProps = {
  text: "杰哥新建",
};
