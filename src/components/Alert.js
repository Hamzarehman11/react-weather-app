import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Alert({error, open, closeAlert}) {
    const handleClose = () => {
        closeAlert();
    };
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Please enter correct City name"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <h5 className={'error-message'}>{error}</h5>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAlert} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}