import { useEffect, useState } from 'react';
import MainNav from './components/MainNav';
import MainCard from './components/MainCard';
import SideList from './components/SideList';
import { getAllBins, getNewRandomBinId } from './service/bins.service';

export const DOMAIN_NAME = 'https://oursite.com';

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
    setNewRandomBinId(String(Math.random()).slice(0, 7));
    // try {
    //   const newBinIdFromBackend = await getNewRandomBinId();
    //   console.log('fetched newRandomBinId from the backend');
    //   setNewRandomBinId(newBinIdFromBackend.new_bin_id);
    // } catch (err) {
    //   console.log(err);
    //   alert('Could not fetch new Random Bin Id');
    // }
  };

  return (
    <>
      <MainNav handleGetNewBin={handleGetNewBin} />

      <div className="container">
        <MainCard newRandomBinID={newRandomBinId} />
        <SideList />
      </div>
    </>
  );
}

export default App;
