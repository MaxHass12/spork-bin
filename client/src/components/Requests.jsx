const Request = ({props, name}) => {

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

}

export default Request



// conditional for showiung the headers content