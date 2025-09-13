import React from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const drawerWidth = 280;

const MainLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', direction: 'rtl' }}>
      <CssBaseline />
      
      {/* Sidebar - right side */}
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      
      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'hidden',
          direction: 'rtl',
          order: 1, // This ensures main content appears on the left
        }}
      >
        {/* AppBar */}
        <AppBar
          position="static"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            direction: 'rtl',
          }}
        >
          <Toolbar>
            {/* Mobile menu button */}
            <Box sx={{ 
              display: { xs: 'block', md: 'none' }, 
              mr: 2 
            }}>
              <Button
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                sx={{ minWidth: 'auto', p: 1 }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 0.3,
                  width: 20,
                  height: 16 
                }}>
                  <Box sx={{ width: '100%', height: 2, bgcolor: 'white' }} />
                  <Box sx={{ width: '100%', height: 2, bgcolor: 'white' }} />
                  <Box sx={{ width: '100%', height: 2, bgcolor: 'white' }} />
                </Box>
              </Button>
            </Box>
            
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              سیستم مدیریت هاب
            </Typography>
          </Toolbar>
        </AppBar>
        
        {/* Content area */}
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            p: { xs: 2, md: 3 }, // Less padding on mobile
            overflow: 'auto',
            height: `calc(100vh - 64px)`,
            direction: 'rtl',
          }}
        >
          <Outlet />
        </Box>
      </Box>

    </Box>
  );
};

export default MainLayout;
