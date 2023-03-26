import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { ConnectWallet, ChainId, useNetwork, useAddress, useSigner } from "@thirdweb-dev/react";
import { useState } from 'react';
import RoundedButtonComponent from "./RoundButton"

interface NftFormProps {
  buttonText: string;
}

export default function NftFormPopup({ buttonText }: NftFormProps) {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({ name: '', email: '' });
  const signer = useSigner();
  const mintNFT = async () => {
    try {
      console.log("NFTミントのポップアップを表示する");
      //デジタル署名させてWalletの所有者を特定 -> 署名で認証させてnftをサーバーで発行(バックエンドで発行フラグは制御)
      const message = "村人としてのnft市民証を発行する";
      const signature = await signer?.signMessage(message);
      console.log(signature);
    } catch (error) {
      console.log(error)
    }
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <RoundedButtonComponent onClick={handleOpenDialog}>
        {buttonText}
      </RoundedButtonComponent>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Enter your information</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={formValues.name}
            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Email"
            value={formValues.email}
            onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={mintNFT} color="primary">
            NFTをミントする
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
