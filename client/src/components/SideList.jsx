function SideList({ bins }) {
  console.log(bins);
  return (
    <div className="side-list">
      <h2>My Bins</h2>
      <ul>
        {bins.map((bin) => (
          <li key={bin.id}>{bin.random_id || bin.newBinId}</li>
          // The above || bin.newBinId needs to be removed in prod
          // Inserted here because of json-server
        ))}
      </ul>
    </div>
  );
}

export default SideList;
