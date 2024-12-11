import { CHAIN } from "@tonconnect/protocol";
import { Sender, SenderArguments } from "ton-core";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";

export function useTonConnect(): {
  sender: Sender;
  connected: boolean;
  wallet: string | null;
  network: CHAIN | null;
  disconnect: () => Promise<void>;
  handleWalletConnect: () => void;
  handleWalletDisconnect: () => void;
} {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        setConnected(true);
      } else {
        setConnected(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleWalletConnect = () => {
    try {
      if (!tonConnectUI.wallet) {
        tonConnectUI.openModal();
      } else {
        handleWalletDisconnect();
        tonConnectUI.openModal();
      }
    } catch (error) {
      console.error("Error opening wallet modal:", error);
    }
  };

  const handleWalletDisconnect = async () => {
    try {
      await tonConnectUI.disconnect();
      console.log("Wallet disconnected");
    } catch (error) {
      console.error("Error during wallet disconnection:", error);
    }
  };

  return {
    sender: {
      send: async (args: SenderArguments) => {
        tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString("base64"),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000,
        });
      },
    },
    connected,
    disconnect: tonConnectUI.disconnect,
    handleWalletConnect,
    handleWalletDisconnect,
    wallet: wallet?.account.address ?? null,
    network: wallet?.account.chain ?? null,
  };
}
