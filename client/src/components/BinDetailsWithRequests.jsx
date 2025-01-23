import RequestDetails from './RequestDetails';

function BinDetailsWithRequests({ bin }) {
  return (
    <div>
      <div className="card-container">
        <div className="centered-bin-details">
          <h1>SporkBin : {bin.random_id}</h1>
          <h2>Requests are collected at </h2>
        </div>
        <ul>
          {bin.requests.map((request) => (
            <RequestDetails requestData={request} key={request.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BinDetailsWithRequests;
