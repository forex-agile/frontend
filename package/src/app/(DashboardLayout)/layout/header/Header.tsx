import React, { useState } from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button, Select, MenuItem } from '@mui/material';
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

  const handleCurrencyChange = (event: SelectChangeEvent<string>) => {
    const newCurrency = event.target.value;
    setBaseCurrency(newCurrency);
    setCurrency(newCurrency);

    // Call post method to pass the updated baseCurrency to the mock API
    // replace 'YOUR_API_ENDPOINT' with the actual API endpoint
    fetch('api/change/base-currency', {
      method: 'POST',
      body: JSON.stringify({ currency: newCurrency }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data.message);
      })
      .catch((error) => {
        // Handle any errors
      });
  };

  // TODO: Call api to get the possible currency options
  const currencyOptions = ['USD', 'EUR', 'GBP', 'JPY', 'HKD', 'CAD', 'AUD', 'NZD']; // Add more currencies as needed

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
          <Select value={baseCurrency} onChange={handleCurrencyChange}>
            {currencyOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>

          <Button variant="contained" component={Link} href="/authentication/login" disableElevation color="primary">
            Login
          </Button>

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
