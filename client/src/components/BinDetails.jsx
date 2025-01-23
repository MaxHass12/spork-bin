import { useEffect, useState } from 'react';
import Request from './Requests.jsx'
import { getBinDetails } from '../service/bins.service';
import EmptyBin from './EmptyBin.jsx'



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
        // console.log(bin.requests)
      });
    }, [bins]);



  return (
   
   
   <div>
   {bin && <div>
    {bin.requests.length === 0 ? <div> <EmptyBin name={bin.random_id} /></div> :
      <div>
        <h1>Requests are collected at </h1>
        <h1>Bin:{bin.random_id}</h1>

        <ul>
          {bin.requests.map(request => 
            <Request key={request.id} props={request} name={bin.random_id}/>
          )}
        </ul>

      </div>}  
    </div>
    }      
    </div>
 
  )
}

export default BinDetails;

