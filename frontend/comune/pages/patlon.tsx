import type { NextPage } from "next";
import { useState, useEffect } from "react";

// 接続中のネットワークを取得するため useNetwork を新たにインポートします。
import { ConnectWallet, ChainId, useNetwork, useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { join } from "node:path/win32";

const Home: NextPage = () => {
  const address = useAddress();
  const [network, switchNetwork] = useNetwork();

  const joinMurabito = async () => {
    try {
      console.log("Join 村人")
    } catch (error) {
      console.log(error)
    }
  };

  const joinPatlon = async () => {
    try {
      console.log("Join パトロン")
    } catch (error) {
      console.log(error)
    }
  };

  if (address && network && network?.data?.chain?.id !== ChainId.Goerli) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Goerli に切り替えてください⚠️</h1>
          <p>この dApp は Goerli テストネットのみで動作します。</p>
          <p>ウォレットから接続中のネットワークを切り替えてください。</p>
        </main>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to Comune
          </h1>
          <div className={styles.connect}>
            <ConnectWallet />
          </div>
          <div className={styles.connect}>
            <button disabled={!address} onClick={joinMurabito}>
              {!address ? "Prease Connect Wallet" : "Join as Murabito"}
            </button>
          </div>
          <div className={styles.connect}>
            <button disabled={!address} onClick={joinPatlon}>
              {!address ? "Prease Connect Wallet" : "Stake as Patlon"}
            </button>
          </div>
        </main>
      </div>
    );
  }
};

export default Home;
