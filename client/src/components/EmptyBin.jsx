import CopyRequestUrl from './CopyRequestUrl';

const EmptyBin = ({ random_id }) => {
  return (
    <div className="header-container">
      <div className="main-card">
        <h1 className="center">SporkBin: {random_id}</h1>
        <h1>No Requests Yet !</h1>
        <p>
          This bin is empty. Send requests to{' '}
          <CopyRequestUrl random_id={random_id} />
        </p>
        <p>And they will appear here</p>
      </div>
    </div>
  );
};

export default EmptyBin;
