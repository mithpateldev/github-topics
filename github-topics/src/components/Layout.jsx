import React, { useState } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

import Search from "./Search";

export default function Layout() {
  const [searchValue, setSearchValue] = useState("react");
  const navigate = useNavigate();

  const handleSearch = (value) => {
    if (value.length > 3) {
      setSearchValue(value);
      navigate("/");
    } else setSearchValue("react");
  };
  return (
    <div>
      <Paper sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Search handleSearch={(value) => handleSearch(value)} />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: "10px" }} aria-label="account">
          <AccountCircle />
        </IconButton>
      </Paper>
      <Container maxWidth="lg">
        <Outlet context={{ searchValue: searchValue }} />
      </Container>
    </div>
  );
}
