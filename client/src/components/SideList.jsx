function SideList({ bins }) {
  console.log(bins);
  return (
    <div className="side-list">
      <h2>My Bins</h2>
      <ul>
        {bins.map((bin) => (
          <li key={bin.id}>{bin.random_id}</li>
        ))}
      </ul>
    </div>
  );
}

export default SideList;
