import { Address } from "ton-core";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { useTonClient } from "./useTonClient";

export function useTonClientBalance() {
  const { connected, wallet } = useTonConnect();
  const { client } = useTonClient();

  return {
    balance: useAsyncInitialize(async () => {
      if (!connected) return;
      const balanceNano = await client?.getBalance(Address.parse(wallet!));
      const balanceTON = Number(balanceNano) / 1e9; // 1 TON = 10^9 nanoTON
      return balanceTON;
    }, [client]),
  };
}
