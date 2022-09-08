import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function Search(props) {
  const [searchString, setSearchString] = useState("");
  const handleChange = (e) => {
    setSearchString(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSearch(searchString);
  };
  return (
    <Box sx={{ ml: 1, flex: 1 }} component="form" onSubmit={handleSubmit}>
      <InputBase
        value={searchString}
        onChange={handleChange}
        placeholder="Search Github Topic"
        inputProps={{ "aria-label": "search github topic" }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Box>
  );
}
