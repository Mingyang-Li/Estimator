import React from "react";
import theme from "../theme";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "@material-ui/core";

export default function OwnAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" theme={theme}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          />
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={handleClose}
              containerElement={<Link to="https://www.cyberosprey.co.nz/" />}
            >
              Back to Home
            </MenuItem>
          </Menu>
        </IconButton>
        <Typography
          variant="h6"
          href="https://www.cyberosprey.co.nz/"
          target="_blank"
        >
          Cyber Osprey
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
