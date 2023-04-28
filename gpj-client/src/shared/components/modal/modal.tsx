import React, { ReactElement } from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  Dialog, DialogContent, DialogTitle, IconButton, Typography,
} from '@mui/material';

interface Props {
  title?: string | ReactElement;
  hideCloseButton?: boolean;
  isOpen: boolean;
  onClose?: () => void;
  children: ReactElement;
  width?: number;
}

export default function Modal({
  title, isOpen, onClose, children, width = 700, hideCloseButton = false,
}: Props) {
  return (
    <Dialog
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            width: '100%',
            maxWidth: width,
          },
        },
      }}
      classes={{ paper: 'pl-5 pr-5 pt-7 pb-10' }}
      open={isOpen}
      onClose={onClose}
      fullWidth
    >
      {(title || !hideCloseButton) && (
        <DialogTitle component="div" classes={{ root: 'flex flex-row justify-between relative' }}>
          {title && (
            <div className="h-full flex items-end">
              {typeof title === 'string' && <Typography color="textPrimary" variant="h2">{title}</Typography>}
              {typeof title !== 'string' && title}
            </div>
          )}

          {!hideCloseButton && (
            <div className="absolute top-0 right-3">
              <IconButton
                disableRipple
                onClick={onClose}
                size="small"
              >
                <CloseRoundedIcon />
              </IconButton>
            </div>
          )}
        </DialogTitle>
      )}

      <DialogContent classes={{ root: 'pt-5' }}>
        {children}
      </DialogContent>
    </Dialog>
  );
}
