import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { data } from 'data/data';

export default function LongMenu({ currentId, onChoice }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = event => {
    if (event.target.nodeName === 'P') {
      onChoice(event.target.dataset.id);
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: '90%',
            width: '20ch',
          },
        }}
      >
        {data.map(option => (
          <MenuItem
            key={option.id}
            selected={option.id === String(currentId)}
            onClick={handleClose}
          >
            <p data-id={option.id}>Вопрос №{option.id}</p>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
