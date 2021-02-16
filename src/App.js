import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FileSearch from "./components/FileSearch";
import FileList from "./components/FileList";
import defaultFiles from "./utils/defaultFiles";

function App() {
  return (
    <div className="App container-fluid">
      <span>👍肖是杰真帅</span>
      <div className="row">
        <div className="col-3 bg-danger left-panel">
          <FileSearch
            title="我的云Doc"
            onFileSearch={(value) => {
              console.log(value);
            }}
          />
          <FileList
            files={defaultFiles}
            onFileClick={(id) => {
              console.log(id);
            }}
            onFileDelete={(id) => {
              console.log(id);
            }}
            onSaveEdit={(id, value) => {
              console.log("save", id, value);
            }}
          />
        </div>
        <div className="col-9 bg-primary right-panel">
          <h1>right</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
