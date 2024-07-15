import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { fetchChats } from "../api";
import { Chat } from "@mui/icons-material";

const CallSection = () => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const loadCalls = async () => {
      try {
        const data = await fetchChats();
        setCalls(data?.data?.data);
      } catch (error) {
        console.error("Error fetching calls:", error);
      }
    };
    loadCalls();
  }, []);

  console.log(calls, "calls");
  return (
    <List sx={{ width: "100%", maxWidth: 360 }}>
      {calls.map((call) => (
        <React.Fragment key={call.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={call.created_by} src={call.avatar_url} />
            </ListItemAvatar>
            <ListItemText
              primary={call.creator.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "block", fontWeight: "bold" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {call.creator.phone}
                  </Typography>
                  <Typography
                    sx={{ display: "inline", marginLeft: "0px" }}
                    component="span"
                    variant="body2"
                    color="text.secondary"
                  >
                    {new Date(call.created_at).toLocaleString()}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
};

export default CallSection;
