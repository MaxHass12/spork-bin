import { useState } from 'react';
import {
  JsonView,
  collapseAllNested,
  allExpanded,
  darkStyles,
  defaultStyles,
} from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

const PostBodyViewer = ({ data, contentType }) => {
  const [isFormatted, setIsFormatted] = useState(true);

  const toggleView = () => setIsFormatted(!isFormatted);

  const formatData = (data, contentType) => {
    if (contentType === 'application/json') {
      return (
        <JsonView
          data={JSON.parse(data)}
          collapseAllNested={true}
          clickToExpandNode={true}
        />
      );
    } else if (contentType === 'application/x-www-form-urlencoded') {
      return (
        <ul>
          {data.split('&').map((pair, idx) => (
            <li key={idx}>{pair}</li>
          ))}
        </ul>
      );
    } else {
      return JSON.stringify(data); // Return raw string or other formats
    }
  };

  // console.log(data, contentType);
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
      <pre>
        {isFormatted ? formatData(data, contentType) : JSON.stringify(data)}
      </pre>
    </div>
  );
};

export default PostBodyViewer;
