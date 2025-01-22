import Bin from "./BinDetails";


const Request = ({props, name}) => {

  // let headersContent = false;

  // const showHeaders = () => {
  //   headersContent? headersContent = false : headersContent = true;
  //   console.log(headersContent)
  // }


  // if (!headersContent) {
    return (
      <div>
  
         <li className="side-list">
          <h3>[{props.method}]</h3>
          <h4>{props.date}</h4>       
          <h4>{props.time}</h4>
          <h4>{name}<button>Copy Body</button></h4>
          <h4>Headers</h4>
        </li> 
      </div>    
    )
  

  // return (
  //   <div>

  //     <li className="side-list">
  //       <h3>[{props.method}]</h3>
  //       <h4>{props.date}</h4>       
  //       <h4>{props.time}</h4>
  //       <h4>{name}<button>Copy Body</button></h4>
  //       <h4> headers<button onClick={showHeaders}>Headers</button></h4>
  //       <h4>HEADERS LIST NEEDS TO BE POPULATED HERE</h4>
  //     </li>
  //   </div>    
  // )
}

export default Request



// conditional for showiung the headers content