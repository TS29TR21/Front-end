import React from "react";
import { Grid, Link, Box, Typography } from "@mui/material";

const subjects = [
  { name: "Mathematics", image: require("./images/math.jpeg") },
  { name: "Physical Science", image: require("./images/physics.jpeg") },
  { name: "Biology", image: require("./images/biology.png") },
  { name: "Chemistry", image: require("./images/chemistry.jpeg") },
  { name: "English", image: require("./images/english.jpeg") },
  { name: "Geography", image: require("./images/geography.jpeg") },
  { name: "History", image: require("./images/history.jpeg") },
  { name: "Art", image: require("./images/art.png") },
];

// Make sure each subject is unique (if needed)
const uniqueSubjects = Array.from(
  new Set(subjects.map((subject) => subject.name))
).map((name) => subjects.find((subject) => subject.name === name));

const SubjectGallery = () => (
  <Box sx={{ marginY: 4 }}>
    <Typography variant="h5" align="center" gutterBottom>
      Explore Subjects
    </Typography>
    <Grid container spacing={2}>
      {uniqueSubjects.map((subject) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={subject.name}>
          <Link href={subject.link} underline="none">
            <Box
              sx={{
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 3,
                "&:hover img": {
                  transform: "scale(1.05)",
                  transition: "transform 0.3s ease-in-out",
                },
              }}
            >
              <img
                src={subject.image}
                alt={subject.name}
                style={{
                  width: "100%",
                  height: "200px", // Fixed height
                  objectFit: "cover", // Maintain aspect ratio and cover the box
                  display: "block",
                  borderRadius: "8px",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  bgcolor: "rgba(0, 0, 0, 0.6)",
                  color: "white",
                  textAlign: "center",
                  padding: "8px 0",
                }}
              >
                <Typography variant="subtitle1">{subject.name}</Typography>
              </Box>
            </Box>
          </Link>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default SubjectGallery;
