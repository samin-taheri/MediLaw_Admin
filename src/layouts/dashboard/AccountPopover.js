import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import homeOutline from '@iconify/icons-eva/home-outline';
import personDoneOutline from '@iconify/icons-eva/person-done-outline';
import settingsOutline from '@iconify/icons-eva/settings-outline';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import archiveOutline from '@iconify/icons-eva/archive-outline';

// material
import { alpha } from '@mui/material/styles';
import {Button, Box, Divider, MenuItem, Typography, IconButton, Avatar} from '@mui/material';
// components
import personOutline from '@iconify/icons-eva/person-outline';
 import MenuPopover from '../../components/MenuPopover';
//
import account from '../../_mocks_/account';
import AuthService from '../../services/auth.service';
import LicencesService from "../../services/licences.service";
import LicenceUsersService from "../../services/licenceUsers.service";

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: homeOutline,
    linkTo: '/'
  },
  {
    label: 'Profile',
    icon: personDoneOutline,
    linkTo: '/profile'
  },
  {
    label: 'Settings',
    icon: settingsOutline,
    linkTo: '#'
  },
  {
    label: 'Connected Licences',
    icon: archiveOutline,
    linkTo: '/connectedLicences'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const authService = new AuthService()


  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const Logout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <Avatar src={account.photoURL} alt="photoURL"/>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />
            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button onClick={() => Logout()} fullWidth color="inherit" variant="outlined">
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
