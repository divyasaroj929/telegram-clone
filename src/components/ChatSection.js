import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";

const ChatSection = ({ chats }) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {chats.map((chat) => (
        <React.Fragment key={chat.id}>
          <ListItem button component={Link} to={`/messages/${chat.id}`}>
            <ListItemAvatar>
              <Avatar alt={chat.created_by} src={chat.avatar_url} />
            </ListItemAvatar>
            <ListItemText
              primary={chat.creator.name}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "flex", justifyContent: "space-between" }}
                    component="div"
                    variant="body2"
                    color="text.primary"
                  >
                    <span>{chat.status}</span>
                    <Badge
                      badgeContent={chat.msg_count}
                      color="primary"
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      sx={{ marginLeft: "auto" }}
                    />
                  </Typography>
                  <span
                    style={{
                      display: "block",
                      textAlign: "right",
                      fontSize: "0.75rem",
                    }}
                  >
                    {new Date(chat.created_at).toLocaleDateString()}
                  </span>
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

export default ChatSection;
