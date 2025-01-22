import { useEffect, useState } from 'react';
import Request from './Requests.jsx'
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
        console.log(bin)
      });
    }, [bins]);



  const copyToClipboard = () => {
    console.log('link copied');
    navigator.clipboard.writeText(`https://localhost:5173/${binTest.random_id}`)
  }

  return (
   
   
   <div>
   {bin && <div>
        <h1>Bin:{bin.random_id}</h1>
        <h2>Requests are collected at </h2>
        <ul>
          {bin.requests.map(request => 
            <Request props={request} name={bin.random_id}/>
          )}
        </ul>
    </div>
    }


      
    </div>
 
  )
}

export default BinDetails;

