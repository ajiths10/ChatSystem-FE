import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const NewGroupPopup = (props) => {
  const { isPopup, setPopup, allUsersState } = props;

  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleClose = () => {
    setPopup(false);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <Dialog open={isPopup} onClose={handleClose}>
        <DialogTitle>Create New Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select the users to create a new group.
          </DialogContentText>
          <form>
            <FormControl sx={{ m: 1, width: 500 }}>
              <TextField
                id="filled-basic"
                variant="outlined"
                margin="dense"
                placeholder="Group Name"
                xs={12}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }}>
              <InputLabel id="demo-multiple-chip-label">
                Select users
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                xs={12}
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {allUsersState.map((name) => (
                  <MenuItem
                    key={name.id}
                    value={name.name}
                    style={getStyles(name.name, personName, theme)}
                  >
                    <Checkbox checked={personName.indexOf(name.name) > -1} />
                    <ListItemText primary={name.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewGroupPopup;
