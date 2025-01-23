const Empty = ({name}) => {

    const copyToClipboard = () => {
    console.log('link copied');
    navigator.clipboard.writeText(`https://sporkspork.xyz/${name}`)
  }

  return (
    <div className="header-container">
      <h1 className="center">SporkBin: {name}</h1>
      <div className="main-card">
        <h1>No Requests Yet !</h1>
        <p>This basket is empty, send requests to <strong>https://sporkspork.xyz/{name}</strong><button onClick={copyToClipboard} className="card-button">Copy</button></p>
        <p>And they will appear here.</p>
      </div>
    </div>    
  )

}

export default Empty



