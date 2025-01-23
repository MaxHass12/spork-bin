import { useState } from 'react';
import PostBodyViewer from './PostBodyViewer';

function CopyIcon({ copyData }) {
  const copyToClipboard = (event) => {
    event.target.classList.add('copied');
    setTimeout(() => {
      event.target.classList.remove('copied');
    }, 1000);

    const copyData2 = { ...copyData };
    delete copyData2.id;

    navigator.clipboard.writeText(JSON.stringify(copyData2));
  };

  return (
    <span className="copyicon-span">
      <i
        id="copyIcon"
        className="fas fa-copy copy-icon"
        onClick={copyToClipboard}
      ></i>
    </span>
  );
}

const RequestDetails = ({ requestData }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [isBodyVisible, setIsBodyVisible] = useState(false);
  const headerContent = `${requestData.method} - ${
    requestData.path || '/foo/bar/baz'
  }`;
  const date = requestData.date.split('T')[0];
  const dateContent = `${date} - ${requestData.time}`;

  const toggleHeaderVisibility = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsHeaderVisible(!isHeaderVisible);
  };

  const toggleBodyVisibility = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setIsBodyVisible(!isBodyVisible);
  };

  return (
    <div className="card">
      <div className="card-header">
        {headerContent} <CopyIcon copyData={requestData} />
      </div>
      <div className="non-collapsible">
        <p>{dateContent}</p>
      </div>
      <div className="collapsible">
        <button
          className={`toggle-btn ${isHeaderVisible ? 'toggled' : ''}`}
          onClick={toggleHeaderVisibility}
        >
          Headers
        </button>
        {isHeaderVisible && (
          <div className="content">
            <ul>
              {Object.entries(requestData.headers).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {requestData.body && (
        <div className="collapsible">
          <button
            className={`toggle-btn ${isBodyVisible ? 'toggled' : ''}`}
            onClick={toggleBodyVisibility}
          >
            Body
          </button>
          {isBodyVisible && (
            <div className="content">
              <PostBodyViewer
                data={requestData.body}
                contentType={requestData.headers['content-type']}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RequestDetails;
