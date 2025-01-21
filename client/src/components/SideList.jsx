function SideList({ bins, navigateToBin }) {
  const handleSideListClick = (event, binId) => {
    event.preventDefault();
    event.stopPropagation();

    navigateToBin(binId);
  };

  return (
    <div className="side-list">
      <h2>My Bins</h2>
      <ul>
        {bins.map((bin) => (
          <li key={bin.id}>
            <a
              href="#"
              onClick={(event) =>
                handleSideListClick(event, bin.random_id || bin.newBinId)
              }
            >
              {bin.random_id || bin.newBinId}
            </a>
          </li>
          // The above || bin.newBinId needs to be removed in prod
          // Inserted here because of json-server
        ))}
      </ul>
    </div>
  );
}

export default SideList;
