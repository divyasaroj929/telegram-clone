import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useTheme } from "../ThemeContext";
import ChatSection from "./ChatSection";
import CallSection from "./CallSection";
import ChatMessages from "./ChatMessages";
import { fetchChats } from "../api";

import Profile from "./Profile ";
const drawerWidth = 240;

const MainLayout = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { mode, toggleTheme } = useTheme();
  const [chats, setChats] = React.useState([]);

  React.useEffect(() => {
    const fetchChatsData = async () => {
      try {
        const data = await fetchChats();
        setChats(data?.data?.data || []);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChatsData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Profile />
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Chats" />
        </ListItem>
        <ListItem button component={Link} to="/calls">
          <ListItemText primary="Calls" />
        </ListItem>
        {/* Add more sidebar items as needed */}
      </List>
    </div>
  );

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Telegram
            </Typography>
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Toolbar>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab label="Chats" component={Link} to="/" />
            <Tab label="Calls" component={Link} to="/calls" />
            <Tab label="Groups" />
            <Tab label="Settings" />
          </Tabs>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                transition: "transform 0.3s ease-in-out",
                transform: mobileOpen ? "scale(1)" : "scale(0)",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Routes>
            <Route exact path="/" element={<ChatSection chats={chats} />} />
            <Route path="/messages/:chatId" element={<ChatMessages />} />
            <Route path="/calls" element={<CallSection />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default MainLayout;
