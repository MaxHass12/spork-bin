import { useEffect, useState } from 'react';
import MainNav from './components/MainNav';
import MainCard from './components/MainCard';
import SideList from './components/SideList';
import { getAllBins, getNewRandomBinId } from './service/bins.service';
import BinDetails from './components/BinDetails';

export const DOMAIN_NAME = 'https://oursite.com';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [bins, setBins] = useState([]);
  const [newRandomBinId, setNewRandomBinId] = useState(null);

  // Fetching list of bins and newRandomBinId on loading the app
  useEffect(() => {
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
    const randomNumber = Math.floor(Math.random() * 1000);
    setNewRandomBinId('hjkl' + randomNumber);
    // try {
    //   const newBinIdFromBackend = await getNewRandomBinId();
    //   console.log('fetched newRandomBinId from the backend');
    //   setNewRandomBinId(newBinIdFromBackend.new_bin_id);
    // } catch (err) {
    //   console.log(err);
    //   alert('Could not fetch new Random Bin Id');
    // }
  };

  // const navigateTo = (path) => {
  //   window.history.pushState({}, '', path);
  //   setCurrentPath(path);
  // };

  const navigateToBin = (randomBinId) => {
    const path = '/view/' + randomBinId;
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const navigateToHome = () => {
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
