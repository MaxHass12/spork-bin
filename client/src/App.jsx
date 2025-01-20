import { useEffect, useState } from 'react';
import HomePage from './components/HomePage';
import { getAllBins, getNewRandomBinId } from './service/bins.service';

function App() {
  const [bins, setBins] = useState([]);
  const [newRandomBinId, setNewRandomBinId] = useState(null);

  // Fetching list of bins and newRandomBinId on loading the app
  useEffect(() => {
    async function fetchBins() {
      try {
        const bins = await getAllBins();
        setBins(bins);
      } catch (err) {
        console.log(err);
        alert('Could not fetch bins');
      }
    }
    fetchBins();
    handleGetNewBin();
  }, []);

  const handleGetNewBin = async () => {
    try {
      const newBinIdFromBackend = await getNewRandomBinId();
      console.log('fetched newRandomBinId from the backend');
      setNewRandomBinId(newBinIdFromBackend.new_bin_id);
    } catch (err) {
      console.log(err);
      alert('Could not fetch new Random Bin Id');
    }
  };

  console.log(bins);
  console.log(newRandomBinId);
  return (
    <>
      <HomePage />
    </>
  );
}

export default App;
