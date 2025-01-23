import { useEffect, useState } from 'react';
import { getBinDetails } from '../service/bins.service';
import BinDetailsWithRequests from './BinDetailsWithRequests.jsx';
import EmptyBin from './EmptyBin.jsx';
import DeleteIcon from './DeleteIcon.jsx';

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
    });

    const intervalId = setInterval(() => {
      getBinDetails(binId.random_id).then((bin) => {
        setBin(bin);
      });
    }, 1500);

    return () => {
      clearInterval(intervalId);
    };
  }, [bins]);

  return (
    <div>
      {bin && <DeleteIcon />}
      {bin &&
        (bin.requests.length === 0 ? (
          <EmptyBin random_id={bin.random_id} />
        ) : (
          <BinDetailsWithRequests bin={bin} />
        ))}
      {!bin && <h1>Loading...</h1>}
    </div>
  );
}

export default BinDetails;
