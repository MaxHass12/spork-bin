import { useState } from 'react';

const PostBodyViewer = ({ data, contentType }) => {
  const [isFormatted, setIsFormatted] = useState(true);

  const toggleView = () => setIsFormatted(!isFormatted);

  const formatData = (data, contentType) => {
    if (contentType === 'application/json') {
      return JSON.stringify(data, null, 2); // Pretty-print JSON
    } else {
      return JSON.stringify(data); // Return raw string or other formats
    }
  };

  console.log(data, contentType);
  return (
    <div
      style={{
        padding: '1rem',
        fontFamily: 'Arial, sans-serif',
        position: 'relative',
      }}
    >
      <button
        onClick={toggleView}
        style={{
          position: 'absolute',
          top: '1px',
          right: '1px',
          zIndex: 1,
          padding: '5px',
        }}
      >
        {isFormatted ? 'Show Raw' : 'Show Formatted'}
      </button>
      {/* {JSON.stringify(data, null, 2)} */}
      <pre>
        {isFormatted ? formatData(data, contentType) : JSON.stringify(data)}
      </pre>
    </div>
  );
};

export default PostBodyViewer;
