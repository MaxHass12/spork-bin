function MainNav({ handleGetNewBin, navigateToHome }) {
  const API_DOCS_URL = 'https://github.com/MaxHass12/spork-bin/wiki/API-Docs';
  const SOURCE_CODE_URL = 'https://github.com/MaxHass12/spork-bin';

  const handleClickOnNewRequestBins = (event) => {
    event.preventDefault();
    event.stopPropagation();

    handleGetNewBin();
    navigateToHome();
  };

  const handleClickOnLogo = (event) => {
    event.preventDefault();
    event.stopPropagation();

    navigateToHome();
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <a href="#" onClick={handleClickOnLogo}>
          SporkBin
        </a>
      </div>
      <ul className="nav-links">
        <li>
          <a href={API_DOCS_URL} target="_blank">
            API docs
          </a>
        </li>
        <li>
          <a href={SOURCE_CODE_URL} target="_blank">
            Source code
          </a>
        </li>
      </ul>
      <button className="button" onClick={handleClickOnNewRequestBins}>
        New Request Bin
      </button>
    </nav>
  );
}

export default MainNav;
