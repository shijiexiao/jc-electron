import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import PropTypes from "prop-types";
import { useKeyPress } from "../hooks/uesKeyPress";
const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  const [editStatus, setEditStatus] = useState(false);
  console.log(editStatus);
  const [value, setValue] = useState(" ");
  const closeSearch = (editItem) => {
    setEditStatus(false);
    setValue("");
    // if we aroe a new
    if (editItem.isNew) {
      onFileDelete(editItem.id);
    }
  };
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);
  let node = useRef(null);
  useEffect(() => {
    // const hanleInputEvent = (e) => {
    //   const { keyCode } = e;
    //   if (keyCode === 13 && editStatus) {
    //     const editItem = files.find((file) => {
    //       return file.id === editStatus;
    //     });
    //     console.log("editStatus", editStatus);
    //     onSaveEdit(editItem.id, value);
    //     setEditStatus(false);
    //     setValue("");
    //   } else if (keyCode === 27 && editStatus) {
    //     closeSearch(e);
    //   }
    // };
    // document.addEventListener("keyup", hanleInputEvent);
    // return () => {
    //   document.removeEventListener("keyup", hanleInputEvent);
    // };
    const editItem = files.find((file) => {
      return file.id === editStatus;
    });

    if (enterPressed && editStatus ) {
      // 告诉她不要重新去操作了

      onSaveEdit(editItem.id, value);
      setEditStatus(false);
      // 更新状态 有可能进入无限循环 所以一定要检查一遍
      setValue("");
    }
    if (escPressed && editStatus) {
      closeSearch(editItem);
    }
  });
  useEffect(() => {
    const newFile = files.find((file) => file.isNew);
    if (newFile) {
      setEditStatus(newFile.id);
      setValue(newFile.title);
    }
  }, [files]);

  useEffect(() => {
    if (editStatus) {
      node.current.focus();
    }
  }, [editStatus]);
  return (
    <ul className="list-group list-group-flush file-list">
      {files.map((file) => {
        return (
          <li
            className="list-group-item row bg-light d-flex align-items-center file-item mx-0"
            key={file.id}
          >
            {file.id !== editStatus && !file.isNew && (
              <>
                <span className="col-2">
                  <FontAwesomeIcon size="lg" icon={faMarkdown} />
                </span>
                <span
                  className="col-6 c-link"
                  onClick={() => {
                    onFileClick(file.id);
                  }}
                >
                  {file.title}
                </span>
                <button
                  type="button col-2"
                  className="icon-button"
                  onClick={() => {
                    setEditStatus(file.id);
                    setValue(file.title);
                  }}
                >
                  <FontAwesomeIcon size="lg" title="编辑" icon={faEdit} />
                </button>
                <button
                  type="button col-2"
                  className="icon-button"
                  onClick={() => {
                    onFileDelete(file.id);
                  }}
                >
                  <FontAwesomeIcon size="lg" title="删除" icon={faTrash} />
                </button>
              </>
            )}
            {(file.id === editStatus || file.isNew) && (
              <>
                <input
                  className="form-control col-10"
                  value={value}
                  placeholder="请输入文件名称"
                  ref={node}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="icon-button col-2"
                  onClick={() => {
                    closeSearch(file);
                  }}
                >
                  <FontAwesomeIcon size="lg" title="关闭" icon={faTimes} />
                </button>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};
FileList.propTypes = {
  files: PropTypes.array,
  onFileClick: PropTypes.func,
  onFileDelete: PropTypes.func,
  onSaveEdit: PropTypes.func,
};
export default FileList;
// rafc kjj
