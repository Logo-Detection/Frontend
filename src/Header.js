import * as React from "react";
  
// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./Header.css";
  
export default function Header() {
    return (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" 
              component="div" sx={{ flexGrow: 1 }}>
              <div id="bold">LOGOS: A Brand Independent logo detection model</div>
            </Typography>
            <a href="https://www.analyticsvidhya.com/blog/2022/08/logos-a-brand-independent-logo-detection-model/"><Button className="nav-btn" >Blog</Button></a>
            <a><Button color="inherit">Github</Button></a>
          </Toolbar>
        </AppBar>
    );
  }