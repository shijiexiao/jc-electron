import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FileSearch from "./components/FileSearch";
import FileList from "./components/FileList";
import { BottomBtn } from "./components/BottomBtn";
import defaultFiles from "./utils/defaultFiles";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { faPlus, faFileImport } from "@fortawesome/free-solid-svg-icons";
import { TabList } from "./components/TabList";
import React, { useState } from "react";
import uuidv4 from "uuid/dist/v4";
import { flattenArr, objToArr } from "./utils/helper";
// flattenArr
// objToArr
function App() {
  const [files, setFiles] = useState(flattenArr(defaultFiles));
  console.log(files);
  const [activeFileID, setActiveFileID] = useState("");
  const [openedFileIDs, setOpenedFileIDs] = useState([]);
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([]);
  const [searchFiles, setSearchFiles] = useState([]);

  const filesArr = objToArr(files);
  console.log(filesArr);

  const activeFile = files[activeFileID];
  const openedFiles = openedFileIDs.map((openID) => {
    return files[openID];
  });
  const fileClick = (fileID) => {
    //   set current active file
    setActiveFileID(fileID);
    // add new fileID to openfiles
    // if opened files don't have the current file we add it
    if (!openedFileIDs.includes(fileID)) {
      setOpenedFileIDs([...openedFileIDs, fileID]);
    }
  };
  const tabClick = (fileID) => {
    //   set current active file
    setActiveFileID(fileID);
  };
  const tabClose = (fileID) => {
    const tabsWithout = openedFileIDs.filter((ID) => ID !== fileID);
    // chuqu  这个id 剩下的tabs
    setOpenedFileIDs(tabsWithout);

    //  set the active to the first opened tab if  still tabs left
    if (tabsWithout.length > 0) {
      setActiveFileID(tabsWithout[0]);
    } else {
      setActiveFileID("");
    }
  };
  const fileChange = (id, value) => {
    //   unsavedSaveID
    // update
    // loop through file array to update to new value
    // const newFiles = files.map((file) => {
    //   if (file.id === id) {
    //     file.body = value;
    //   }
    //   return file;
    // });
    // files[id].body = value; you bug
    // immutable 修改方式
    const newFile = { ...files[id], body: value };

    setFiles({ ...files, [id]: newFile });
    //  update unsavedIDs
    if (!unsavedFileIDs.includes(id)) {
      setUnsavedFileIDs([...unsavedFileIDs, id]);
    }
  };
  const deleteFile = (id) => {
    //   filter out the current file id
    // const newFiles = files.filter((file) => file.id !== id);
    delete files[id];
    setFiles(files);
    // close the tab if opened
    tabClose(id);
  };
  const updateFileName = (id, title) => {
    // const newfiles = files.map((file) => {
    //   if (file.id === id) {
    //     file.title = title;
    //     file.isNew = false;
    //   }
    //   return file;
    // });
    const modifiedFile = { ...files[id], title, isNew: false };

    setFiles({ ...files, [id]: modifiedFile });
  };
  const fileSearch = (keyword) => {
    const newFiles = filesArr.filter((file) => file.title.includes(keyword));
    setSearchFiles(newFiles);
  };
  const createNewFile = () => {
    const newID = uuidv4();
    // const newFiles = [
    //   ...files,
    //   {
    //     id: newID,
    //     tilte: "",
    //     body: "## 请输入 杰华神",
    //     createdAt: new Date().getTime(),
    //     isNew: true,
    //   },
    // ];
    const newFile = {
      id: newID,
      tilte: "",
      body: "## 请输入 杰华神",
      createdAt: new Date().getTime(),
      isNew: true,
    };
    setFiles({ ...files, [newID]: newFile });
  };
  const fileListArr = searchFiles.length > 0 ? searchFiles : filesArr;
  return (
    <div className="App container-fluid px-0">
      {/* <span>👍肖是杰真帅</span> */}
      <div className="row no-gutters">
        <div className="col-3 left-panel">
          <FileSearch title="我的云Doc" onFileSearch={fileSearch} />
          <FileList
            files={fileListArr}
            onFileClick={(id) => {
              console.log(id);
              fileClick(id);
            }}
            onFileDelete={deleteFile}
            onSaveEdit={updateFileName}
          />
          <div className="row no-gutters button-group">
            <div className="col">
              <BottomBtn
                text="新建"
                colorClass="btn-primary"
                icon={faPlus}
                onBtnClick={createNewFile}
              />
            </div>
            <div className="col">
              <BottomBtn
                text="导入"
                colorClass="btn-success"
                icon={faFileImport}
              />
            </div>
          </div>
        </div>
        <div className="col-9  right-panel">
          {!activeFile && (
            <div className="start-page">选择或者创建超神markdown 文档</div>
          )}
          {activeFile && (
            <>
              <TabList
                files={openedFiles}
                activeId={activeFileID}
                unsaveIds={unsavedFileIDs}
                onTabClick={(id) => {
                  tabClick(id);
                }}
                onCloseTab={tabClose}
              ></TabList>
              <SimpleMDE
                key={activeFile && activeFile.id}
                options={{
                  minHeight: "515px",
                }}
                onChange={(value) => {
                  fileChange(activeFile.id, value);
                  console.log(value);
                }}
                value={activeFile && activeFile.body}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
