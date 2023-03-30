import type { NextPage } from "next";
import Router from 'next/router';
import React, { useState } from "react";
import axios from 'axios';
import { Button,TextField,Grid,Paper,Typography } from '@material-ui/core';

import { ConnectWallet, ChainId, useNetwork, useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { useFormStyles } from '../styles/form';
import FileUpload from '../components/FileUpload'
import RoundedButtonComponent from "../components//RoundButton";

interface FormValues {
  name: string;
  category: string;
  description: string;
  image: string;
  contract: string;
}

const ProjectCreate: NextPage = () => {
  const address = useAddress();
  const [network, switchNetwork] = useNetwork();
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    category: '',
    description: '',
    image: '',
    contract: ''
  });

  const classes = useFormStyles();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const routeMurabito = async () => {
    Router.push("murabito");
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  //Todo: APIに対してPostする
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await axios.post(
        'https://1vlevj4eak.execute-api.ap-northeast-1.amazonaws.com/demo/projects', 
        formValues
      );
      if (response.status === 200) {
        
        setSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  if (address && network && network?.data?.chain?.id !== ChainId.Mumbai) {
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Polygon Testnet(Mumbai)に切り替えてください⚠️</h1>
          <p>この dApp は Polygon Testnet(Mumbai)のみで動作します。</p>
          <p>ウォレットから接続中のネットワークを切り替えてください。</p>
        </main>
      </div>
    );
  } else if (submitted) {
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="h5">PJが登録されました</Typography>
        </Paper>
        <RoundedButtonComponent onClick={routeMurabito}>
          Go To Project List
        </RoundedButtonComponent>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="h5">PJ登録フォーム</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <FileUpload></FileUpload>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="Name"
                  value={formValues.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="description"
                  name="description"
                  label="Description"
                  multiline
                  maxRows={4}
                  variant="standard"
                  value={formValues.description}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitting}
                  className={classes.button}
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </form>
          
        </Paper>
        
      </div>
    );    
  }
};

export default ProjectCreate;
