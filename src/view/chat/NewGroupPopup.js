import React, { useEffect, useState, useContext } from "react";
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
import { useFormik } from "formik";
import * as yup from "yup";
import MessageContext from "../../context/message/MessageContext";

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

  const { addNewGroup, newGroupeResponse } = useContext(MessageContext);

  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const validationSchema = yup.object({
    name: yup.string().required("required"),
    userids: yup.array().min(1, "required").required("required"),
  });

  const formik = useFormik({
    initialValues: { name: "", userids: [] },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("hiiiii", values);
      addNewGroup(values);
    },
  });

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

  useEffect(() => {
    if (personName) {
      formik.setFieldValue("userids", personName);
      //   formik.values.userids = personName;
    }
  }, [personName]);

  const fetchName = (id) => {
    let index = allUsersState.findIndex((element) => element.id == id);
    return allUsersState[index].name;
  };

  useEffect(() => {
    if (newGroupeResponse) {
      if (newGroupeResponse.status) {
        handleClose();
      }
    }
  }, [newGroupeResponse]);

  return (
    <div>
      <Dialog open={isPopup} onClose={handleClose}>
        <DialogTitle>Create New Group</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              Select the users to create a new group.
            </DialogContentText>

            <FormControl sx={{ m: 1, width: 500 }}>
              <TextField
                id="filled-basic"
                variant="outlined"
                margin="dense"
                placeholder="Group Name"
                xs={12}
                name="name"
                autoFocus
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 500 }}>
              <InputLabel id="demo-multiple-chip-label">
                Select users
              </InputLabel>
              <Select
                name="userids"
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                xs={12}
                margin="dense"
                multiple
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={fetchName(value)} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
                value={formik.values.userids}
                error={formik.touched.userids && Boolean(formik.errors.userids)}
                helperText={formik.touched.userids && formik.errors.userids}
              >
                {allUsersState.map((name) => (
                  <MenuItem
                    key={name.id}
                    value={name.id}
                    style={getStyles(name.name, personName, theme)}
                  >
                    <Checkbox checked={personName.indexOf(name.id) > -1} />
                    <ListItemText primary={name.name} />
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.userids && Boolean(formik.errors.userids)
                ? formik.touched.userids && formik.errors.userids
                : null}
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default NewGroupPopup;
