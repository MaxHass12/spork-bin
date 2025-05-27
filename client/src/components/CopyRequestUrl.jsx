function CopyRequestUrl({ random_id }) {
  const copyToClipboard = (event) => {
    event.target.classList.add('copied');
    setTimeout(() => {
      event.target.classList.remove('copied');
    }, 1000);
    navigator.clipboard.writeText(`https://sporkspork.xyz/${random_id}`);
  };

  return (
    <span>
      <strong>
        <i>https://sporkspork.xyz/{random_id}</i>
      </strong>
      <i
        id="copyIcon"
        className="fas fa-copy copy-icon"
        onClick={copyToClipboard}
      ></i>
    </span>
  );
}

export default CopyRequestUrl;
