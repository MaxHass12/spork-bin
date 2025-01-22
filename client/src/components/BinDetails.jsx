import { useEffect, useState } from 'react';
import Request from './Requests.jsx'

const binTest = {random_id: "abcd1234", requests: [{id: 1, method: "GET", path: "/1234abcd", headers: {request_type: "JSON"}, body:{content: "body content"}, date: "07/10/2024", time: "12:51"}, 
                                               {id: 2, method:"POST", path: "/1234abcd", headers:{request_type: "JSON"}, body:{content: "b content"}, date: "12/12/2024", time: "02:01"},
                                               {id:3, method: "GET", path: "/1234abcd", headers:{request_type:"JSON"}, body:{content: "b content"}, date: "01/08/2024", time: "13:38"},
                                              ]
}

function BinDetails({ bins }) {
  const [bin, setBin] = useState(null);
  const[requests, setRequests] = useState(binTest.requests)

  console.log(requests);

  useEffect(() => {
    const path = window.location.pathname.split('/');
    const randomId = path[path.length - 1];
    const bin = bins.find(
      (bin) => bin.random_id === randomId || bin.newBinId === randomId
    );
    setBin(bin);
  }, [bins]);

  const copyToClipboard = () => {
    console.log('link copied');
    navigator.clipboard.writeText(`https://localhost:5173/${binTest.random_id}`)
  }

  return (
    <div>
      <h1>Bin: {binTest.random_id}        
      </h1>
      <h2>Requests are collected at: https:{binTest.random_id}<button onClick={copyToClipboard}>Copy</button></h2>
      <h2>Requests: ({requests.length})</h2>
      
      <ul>        
        {requests.map(request =>        
        <Request key={request.id} props={request} name={binTest.random_id}/>       
        )}
      </ul>
    </div>
  );
}

export default BinDetails;


// {random_id: 'abcd123', requests: [
//   {method: 'POST', date: '2025-01-20', time: '17:06:48', headers: {}, body: {}}, 
//   {method: 'POST', date: '2025-01-21', time: '18:10:48', headers: {}, body: {}},
//   {method: 'POST', date: '2025-01-22', time: '19:06:48', headers: {}, body: {}}
// ]}


// add the bin title
// add the bin link
// add a requests counter
// add the bin request history
// within each request need some headers to be available have a modal that shows headers kinda like a drop down menu
//


// 200, {random_id: string, requests: Array<{method: string, path: string, 
//   headers: Object, body: Object, date: string, time: string}>



// 200, {random_id: 1234abcd, requests: [{id:3, method: "GET", path: "/1234abcd", 
//   headers: {body: {}, date: "01/12/2024", time: "12:51"}]>