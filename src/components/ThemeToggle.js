import React from "react";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
      {darkMode ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}
