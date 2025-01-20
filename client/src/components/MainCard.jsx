import { DOMAIN_NAME } from '../App';

function MainCard({ newRandomBinID }) {
  return (
    <div className="main-card">
      <h1>New Bin</h1>
      <p>Create a New Bin to collect Requests</p>
      <form class="card-form">
        <label for="input-field">{DOMAIN_NAME}/</label>
        <input
          type="text"
          id="input-field"
          value={newRandomBinID}
          disabled
        ></input>
        <button type="submit" className="card-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default MainCard;
