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
  const { isPopup, setPopup, allUsersState, isUser } = props;

  const {
    addNewGroup,
    newGroupeResponse,
    single_group,
    updategroup,
    getSingleGroup,
  } = useContext(MessageContext);

  const theme = useTheme();
  const [personName, setPersonName] = useState([]);
  const [adminsName, setAdminsName] = useState([]);
  const [adminsList, setAdminsList] = useState([]);

  const validationSchema = yup.object({
    name: yup.string().required("required"),
    userids: yup.array().min(1, "required").required("required"),
  });

  const formik = useFormik({
    initialValues: { name: "", userids: [], id: 0, admins: [] },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("hiiii", values);
      if (isPopup.status === "edit") {
        updategroup(values);
      } else {
        addNewGroup(values);
      }
    },
  });

  const RestFormik = () => {
    setPersonName([]);
    setAdminsName([]);
    formik.setFieldValue("userids", []);
    formik.setFieldValue("name", "");
    formik.setFieldValue("id", 0);
    formik.setFieldValue("admins", []);
  };

  const handleClose = () => {
    setPopup({
      popup: false,
      status: "new",
      id: 0,
    });
    RestFormik();
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeAdmin = (event) => {
    setAdminsName(
      typeof event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value
    );
  };

  useEffect(() => {
    if (personName) {
      formik.setFieldValue("userids", personName);
      formik.values.userids = personName;
      let arr = [];

      personName.map((id) => {
        let index = allUsersState.findIndex((element) => element.id == id);
        arr.push(allUsersState[index]);
      });
      setAdminsList(arr);

      if (adminsName) {
        let newArr = adminsName.filter((ele) => personName.includes(ele));
        setAdminsName(newArr);
      }
    }
  }, [personName]);

  useEffect(() => {
    if (adminsName) {
      formik.setFieldValue("admins", adminsName);
      formik.values.admins = adminsName;
    }
  }, [adminsName]);

  const fetchName = (id) => {
    let index = allUsersState.findIndex((element) => element.id == id);
    return allUsersState[index] ? allUsersState[index].name : "";
  };

  useEffect(() => {
    if (newGroupeResponse) {
      if (newGroupeResponse.status) {
        handleClose();
      }
    }
  }, [newGroupeResponse]);

  useEffect(() => {
    if (isPopup.status === "edit" && isPopup.id) {
      getSingleGroup({ id: isPopup.id });
    }
  }, [isPopup]);

  useEffect(() => {
    if (single_group) {
      formik.handleReset();
      setPersonName(
        single_group.users
          ? single_group.users
              .split(",")
              .map((ele) => Number(ele))
              .filter((ele) => isUser.id !== ele)
          : []
      );
      formik.setFieldValue("name", single_group.name);
      formik.setFieldValue("id", single_group.id);
      setAdminsName(
        single_group.admins
          ? single_group.admins.split(",").map((ele) => Number(ele))
          : []
      );
    }
  }, [single_group]);

  return (
    <div>
      <Dialog open={isPopup.popup} onClose={handleClose}>
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

            <FormControl sx={{ m: 1, width: 500 }}>
              <InputLabel id="demo-multiple-chip-label">Add Admin</InputLabel>
              <Select
                name="admins"
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                xs={12}
                margin="dense"
                multiple
                onChange={handleChangeAdmin}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={fetchName(value)} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
                value={formik.values.admins}
                error={formik.touched.admins && Boolean(formik.errors.admins)}
                helperText={formik.touched.admins && formik.errors.admins}
              >
                {adminsList.map((name) => (
                  <MenuItem
                    key={name.id}
                    value={name.id}
                    style={getStyles(name.name, adminsName, theme)}
                  >
                    <Checkbox checked={adminsName.indexOf(name.id) > -1} />
                    <ListItemText primary={name.name} />
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.admins && Boolean(formik.errors.admins)
                ? formik.touched.admins && formik.errors.admins
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
