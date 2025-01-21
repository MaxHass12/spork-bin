import { useEffect, useState } from 'react';

function BinDetails({ bins }) {
  const [bin, setBin] = useState(null);

  useEffect(() => {
    const path = window.location.pathname.split('/');

    // If path ends is '/' then ignore it
    const randomId =
      path[path.length - 1] === ''
        ? path[path.length - 2]
        : path[path.length - 1];

    const bin = bins.find(
      (bin) => bin.random_id === randomId || bin.newBinId === randomId
    );
    setBin(bin);
  }, [bins]);

  return (
    <div>
      <h1>Bin Details Should Be Displayed</h1>
      <pre>{JSON.stringify(bin, null, 2)}</pre>
    </div>
  );
}

export default BinDetails;
