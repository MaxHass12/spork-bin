import CopyRequestUrl from './CopyRequestUrl';
import RequestDetails from './RequestDetails';
import BinHeader from './BinHeader';

function BinDetailsWithRequests({ bin }) {
  return (
    <div>
      <div className="card-container">
        <div className="centered-bin-details">
          <BinHeader random_id={bin.random_id} />
          <p>
            Requests are collected at{' '}
            <CopyRequestUrl random_id={bin.random_id} />
          </p>
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
