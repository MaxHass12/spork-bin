import { useEffect, useState } from 'react';
import { getBinDetails } from '../service/bins.service';
import { JsonView } from 'react-json-view-lite';

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
  }, [bins]);

  return (
    <div>
      <h1>Bin Details Should Be Displayed</h1>
      <JsonView data={bin} />
    </div>
  );
}

export default BinDetails;
