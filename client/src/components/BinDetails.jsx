import { useEffect, useState } from 'react';
import RequestDetails from './RequestDetails.jsx';
import { getBinDetails } from '../service/bins.service';

function BinDetails({ bins }) {
  const [bin, setBin] = useState(null);

  useEffect(() => {
    const path = window.location.pathname.split('/');

    // If path ends is '/' then ignore it
    const randomId =
      path[path.length - 1] === ''
        ? path[path.length - 2]
        : path[path.length - 1];

    const binId = bins.find(
      (bin) => bin.random_id === randomId || bin.newBinId === randomId
    );

    if (!binId) {
      return;
    }

    getBinDetails(binId.random_id).then((bin) => {
      setBin(bin);
      console.log(bin);
    });
  }, [bins]);

  const copyToClipboard = () => {
    console.log('link copied');
    navigator.clipboard.writeText(
      `https://localhost:5173/${binTest.random_id}`
    );
  };

  return (
    <div>
      {bin &&
        (bin.requests.length === 0 ? <h1>Empty Bin</h1> : <h1>Bin Details</h1>)}
    </div>
  );
}

export default BinDetails;
