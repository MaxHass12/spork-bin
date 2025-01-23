import { useState } from 'react';

const PostBodyViewer = ({ data }) => {
  const [isFormatted, setIsFormatted] = useState(true);

  const toggleView = () => setIsFormatted(!isFormatted);

  const formatData = (data) => {
    if (typeof data === 'object') {
      return JSON.stringify(data, null, 2); // Pretty-print JSON
    }
    return data; // Return raw string or other formats
  };

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

      <pre>{isFormatted ? formatData(data) : JSON.stringify(data)}</pre>
    </div>
  );
};

export default PostBodyViewer;
