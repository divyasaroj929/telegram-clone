import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMessages } from "../api";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/system";

const MessageContainer = styled(ListItem)(({ theme, isSender }) => ({
  display: "flex",
  flexDirection: isSender ? "row-reverse" : "row",
  alignItems: "flex-end",
  marginBottom: theme.spacing(2),
}));

const MessageBubble = styled("div")(({ theme, isSender }) => ({
  backgroundColor: isSender
    ? theme.palette.primary.main
    : theme.palette.background.default,
  color: isSender
    ? theme.palette.primary.contrastText
    : theme.palette.text.primary,
  borderRadius: "10px",
  padding: "8px 12px",
  maxWidth: "70%",
  alignSelf: isSender ? "flex-end" : "flex-start",
}));

const ChatMessages = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessagesData = async () => {
      try {
        const data = await fetchMessages(chatId);
        setMessages(data?.data || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessagesData();
  }, [chatId]);

  return (
    <Box sx={{ height: "100%", overflowY: "auto", padding: "16px" }}>
      {messages.length > 0 ? (
        <List>
          {messages.map((message) => (
            <MessageContainer
              key={message.id}
              isSender={message.sender_id === 3853}
            >
              {message.sender_id !== 3853 && (
                <Avatar
                  alt={message.sender.name}
                  src={message.sender.avatar_url}
                  sx={{ marginRight: "10px" }}
                />
              )}
              <MessageBubble isSender={message.sender_id === 3853}>
                <Typography variant="body1" color="text.primary">
                  {message.sender.name}
                </Typography>

                <Typography variant="body1">{message.message}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(message.created_at).toLocaleString()}
                </Typography>
              </MessageBubble>
              {message.sender_id === 3853 && (
                <Avatar
                  alt={message.sender.name}
                  src={message.sender.avatar_url}
                  sx={{ marginLeft: "10px" }}
                />
              )}
            </MessageContainer>
          ))}
        </List>
      ) : (
        <Typography variant="h6" color="textSecondary" align="center">
          No messages in this chat
        </Typography>
      )}
    </Box>
  );
};

export default ChatMessages;
