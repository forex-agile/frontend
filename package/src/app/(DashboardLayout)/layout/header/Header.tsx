import React, { use, useEffect, useState } from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button, Select, MenuItem, Typography, Autocomplete, PaperProps, Paper, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import Link from 'next/link';
// components
import Profile from './Profile';
import { IconBellRinging, IconMenu } from '@tabler/icons-react';
import { useCurrencyContext } from '../../components/currency/CurrencyProvider';
import { SelectChangeEvent } from '@mui/material';

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  const { currency, setCurrency } = useCurrencyContext();
  const [baseCurrency, setBaseCurrency] = useState(currency);
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);

  const user = localStorage.getItem('user');
  const parsedUser = user ? JSON.parse(user) : null;
  const portfolioId = parsedUser && parsedUser.portfolioId ? parsedUser.portfolioId : null;
  const userId = parsedUser && parsedUser.id ? parsedUser.id : null;
  const userName = parsedUser && parsedUser.username ? parsedUser.username : null;

  const CurrencyDropDownMenu: React.FC<PaperProps> = (props) => (
    <Paper {...props} sx={{ maxHeight: 150, scrollbarWidth: 'none' }} />
  );

  const handleCurrencyChange = (event: React.SyntheticEvent<Element, Event>, value: string | null) => {
    if (value) {
      setBaseCurrency(value);
      setCurrency(value);
    }
  };

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    fetch(`${baseURL}/api/v1/currency`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` //
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);

        // format the data to match the fxRate state
        const formattedData = data.map((currency: { currencyCode: string; currencyName: string; }) => {
          return {
            currencyCode: currency.currencyCode,
          }
        });

        console.log('formattedData:', formattedData);
        const currencyCodes = formattedData.map((currency: { currencyCode: String; }) => currency.currencyCode);
        setCurrencyOptions(currencyCodes);
        // setCurrencyOptions(formattedData);

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [currency]);


  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('currency');
    window.location.href = '/authentication/login';
  };


  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  //  Check if the user is logged in, if localStorage is empty, the user is not logged in
  const isLoggedIn = localStorage.getItem('user') ? true : false;



  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'inline',
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <IconButton
          size="large"
          aria-label="show 11 new notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
        >
          <Badge variant="dot" color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>
        </IconButton>

        <Box flexGrow={1} />

        <Stack spacing={1} direction="row" alignItems="center">
          <Autocomplete
            disablePortal
            options={currencyOptions}
            sx={{ width: 150 }}
            value={baseCurrency}
            onChange={handleCurrencyChange}
            isOptionEqualToValue={(option, value) => option === value}
            renderInput={(params) => <TextField {...params} />}
            PaperComponent={CurrencyDropDownMenu}
          />

          {isLoggedIn ? (
            <Button variant="outlined" component={Link} href="" onClick={handleLogout} disableElevation color="primary">
              Logout
            </Button>
          ) : (
            <Button variant="contained" component={Link} href="/authentication/login" disableElevation color="primary">
              Login
            </Button>
          )}
          <Typography variant='h6'>
            Welcome, {userName}
          </Typography>

          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
