import { useState } from 'react';
import PostBodyViewer from './PostBodyViewer';

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
      <div className="card-header">{headerContent}</div>
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
                contentType={requestData['content-type']}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RequestDetails;
