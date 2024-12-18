const Modal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <div className={`modal-container ${open ? "open" : ""}`}>
      <div onClick={handleClose} className="modal-backdrop"></div>
      <div className="modal">
        <h1>How does this work?</h1>
        <p>
          You have received an offer to sell your{" "}
          <span className="bold">collectible number / username</span>, follow
          the instructions:
        </p>
        <br />
        <p className="bold">To do so, simply:</p>
        <ul>
          <li>
            Get{" "}
            <a href="" className="link hover">
              Tonkeeper
            </a>
            , open it and create a wallet.
          </li>
          <li>
            Deposit funds in your wallet from a{" "}
            <a href="" className="link hover">
              supported exchange
            </a>{" "}
            or with{" "}
            <a href="" className="link hover">
              @wallet
            </a>{" "}
            on Telegram.
          </li>
          <li>
            Use <span className="bold">Tonkeeper</span> to log in on Fragment
            and return to this page.
          </li>
          <li>Tap the button below to accept the offer</li>
        </ul>
        <br />
        <p>
          Upon acceptance, the username / number offer will immediately take
          possession of the buyer.
        </p>
      </div>
    </div>
  );
};

export default Modal;
