function MainNav({ handleGetNewBin }) {
  const API_DOCS_URL = 'https://github.com/MaxHass12/spork-bin/wiki/API-Docs';
  const SOURCE_CODE_URL = 'https://github.com/MaxHass12/spork-bin';

  const handleClickOnNewRequestBins = (event) => {
    event.preventDefault();
    event.stopPropagation();

    handleGetNewBin();
  };

  return (
    <nav className="navbar">
      <div className="logo">SporkBin</div>
      <ul className="nav-links">
        <li>
          <a href="#home">API docs</a>
        </li>
        <li>
          <a href="#about">Source code</a>
        </li>
      </ul>
      <button className="button" onClick={handleClickOnNewRequestBins}>
        New Request Bin
      </button>
    </nav>
  );
}

export default MainNav;
