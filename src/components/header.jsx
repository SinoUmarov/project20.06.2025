import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  useTheme,
  Tooltip,
  Box,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const navItems = [
  { label: "Home", path: "/Home" },
  { label: "Thunk Todo", path: "/cattodo" },
  { label: "Thunk Categories", path: "/catcategories" },
  { label: "Zustand Categories", path: "/Zustandcategories" },
  { label: "MOBXTODO", path: "/Mobx" },
  { label: "Jotai Categories", path: "/categories" },
  { label: "Jotai Todo", path: "/todo" },
];

export default function Header({ mode, setMode }) {
  const theme = useTheme();

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          bgcolor: theme.palette.background.paper,
          py: 1,
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={NavLink}
              to={item.path}
              sx={{
                color: theme.palette.text.primary,
                textTransform: "none",
                fontWeight: 500,
                fontSize: "16px",
                "&.active": {
                  color: theme.palette.primary.main,
                  borderBottom: `2px solid ${theme.palette.primary.main}`,
                  fontWeight: 600,
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        <Tooltip title="Сменить тему">
          <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 2 }}>
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}
