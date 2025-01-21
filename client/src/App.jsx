import { useEffect, useState } from 'react';
import MainNav from './components/MainNav';
import MainCard from './components/MainCard';
import SideList from './components/SideList';
import { getAllBins, getNewRandomBinId } from './service/bins.service';
import BinDetails from './components/BinDetails';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [bins, setBins] = useState([]);
  const [newRandomBinId, setNewRandomBinId] = useState(null);

  useEffect(() => {
    // Fetching list of bins and newRandomBinId on loading the app
    // adding event-listener on popstate to change UI on popstate event
    const onPopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);

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
      setNewRandomBinId(newBinIdFromBackend);
    } catch (err) {
      console.log(err);
      alert('Could not fetch new Random Bin Id');
    }
  };

  const navigateToBin = (randomBinId) => {
    const path = '/view/' + randomBinId;
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const navigateToHome = () => {
    handleGetNewBin();
    const path = '/';
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  return (
    <>
      <MainNav
        handleGetNewBin={handleGetNewBin}
        navigateToHome={navigateToHome}
      />
      {currentPath === '/' ? (
        <div className="container">
          <MainCard
            newRandomBinID={newRandomBinId}
            setBins={setBins}
            navigateToBin={navigateToBin}
            navigateToHome={navigateToHome}
          />
          <SideList bins={bins} navigateToBin={navigateToBin} />
        </div>
      ) : (
        <BinDetails bins={bins} />
      )}
    </>
  );
}

export default App;
