import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography
} from '@mui/material';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@emotion/react';

function Modal({ action, title, children }, ref) {
    const [openModal, setOpenModal] = useState(false);
    const theme = useTheme();
    const handleClose = () => {
        setOpenModal(false);
    };

    useImperativeHandle(ref, () => ({
        showModal: () => {
            setOpenModal(true);
        },
        hideModal: () => {
            setOpenModal(false);
        }
    }));

    return (
        <Dialog
            open={openModal}
            keepMounted
            disableScrollLock={true}
            //onClose={handleClose}
            maxWidth="xl"
            aria-describedby="alert-dialog-slide-description">
            <div
                style={{
                    backgroundColor: theme.palette.background.alt,
                    boxShadow: theme.shadows[5],
                    outline: 'none',
                    width: '800px'
                }}>
                <DialogTitle>
                    <Typography variant="span" color={theme.palette.secondary[300]}>
                        {title}
                    </Typography>

                    <IconButton
                        onClick={handleClose}
                        aria-label="close"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            width: '40px',
                            left: '100%',
                            transform: 'translateX(-100%)'
                        }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>{children}</DialogContent>
                {action && <DialogActions>{action}</DialogActions>}
            </div>
        </Dialog>
    );
}

export default forwardRef(Modal);
