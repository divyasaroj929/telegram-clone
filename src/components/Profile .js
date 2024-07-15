import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const ProfileContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    avatarUrl: "https://via.placeholder.com/150",
  };

  return (
    <ProfileContainer>
      <Avatar alt={user.name} src={user.avatarUrl} sx={{ marginRight: 2 }} />
      <Box>
        <Typography variant="h6">{user.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {user.email}
        </Typography>
      </Box>
    </ProfileContainer>
  );
};

export default Profile;
