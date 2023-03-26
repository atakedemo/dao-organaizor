import type { NextPage } from "next";
import { useState } from 'react';
import { ConnectWallet, ChainId, useNetwork, useAddress, useSigner } from "@thirdweb-dev/react";
import { Grid, Box, Typography, Button } from '@material-ui/core';
import styles from "../styles/Home.module.css";
import { useProjectListStyles } from '../styles/list';
import { join } from "node:path/win32";

import ComuneStakeFormPopup from '../components/ComuneStakePopup'
import PjStakeFormPopup from '../components/PjStakePopup'

type Project = {
  id: String;
  name: String;
  category: String;
  description: String;
  image: String;
  contract: String;
}

const Stake: NextPage = () => {
  const stylesList = useProjectListStyles();
  const address = useAddress();
  const [network, switchNetwork] = useNetwork();
  const [open, setOpen] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [projects, setProjects] = useState([
    {
      id: "001",
      name: "Project A",
      category: "イベント",
      description: "イベントを行うプロジェクトです",
      image: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
      contract: "0x54d3B05E28cB78204e1171DeC088698eb829523d"
    },
    {
      id: "002",
      name: "Project B",
      category: "設備",
      description: "設備保全を行うプロジェクトです",
      image: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
      contract: "0x54d3B05E28cB78204e1171DeC088698eb829523d"
    }
  ])

  const stakeComune = async () => {
    try{

    } catch (error) {

    }
  };

  const handleBuyButtonClick = () => {
    setOpen(true);
  };

  const handleBuyDialogClose = () => {
    setOpen(false);
  };

  const filteredProducts = projects.filter(
    (project) => project.name.toLowerCase().includes(filterText.toLowerCase()) || project.description.toLowerCase().includes(filterText.toLowerCase())
  );

  if (address && network && network?.data?.chain?.id !== ChainId.Mumbai) {
    console.log(network?.data?.chain?.id)
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Polygon Testnet(Mumbai)に切り替えてください⚠️</h1>
          <p>この dApp は Polygon Testnet(Mumbai)のみで動作します。</p>
          <p>ウォレットから接続中のネットワークを切り替えてください。</p>
        </main>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.connect}>
              <ConnectWallet />
          </div>
          <h1 className={styles.title}>
            投資受付
          </h1>
          
          <div>
            <h2>村全体へ投資する</h2>
            <ComuneStakeFormPopup
                buttonText={!address ? "Prease Connect Wallet" : "投資(Mathic)"} 
            />
          </div>
          <h2>プロジェクトへ投資する</h2>
          <div className={stylesList.root}>
            <Grid container spacing={2}>
              {filteredProducts.map((project) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                  <Box className={stylesList.project}>
                    <img src={project.image} alt={project.name} className={stylesList.projectImage} />
                    <Typography variant="h6">{project.name}</Typography>
                    <Typography variant="body1">{project.description}</Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <PjStakeFormPopup 
                          buttonText={!address ? "Prease Connect Wallet" : "投資(Mathic)"} project={project}
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </div>
        </main>
      </div>
    );
  }
};

export default Stake;
