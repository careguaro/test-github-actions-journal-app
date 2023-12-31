import PropTypes from 'prop-types';
import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal";

export const SideBarItem = ({ title, body, id, date, imageUrls = [] }) => {
  const dispatch = useDispatch();

  const setActive = () => {
    dispatch(
      setActiveNote({
        title,
        body,
        id,
        date,
        imageUrls,
      })
    );
  };

  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={setActive}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

SideBarItem.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  date: PropTypes.any,
  imageUrls: PropTypes.any,
};
