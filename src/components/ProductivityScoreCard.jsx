import { Card, CardContent, Typography, Box } from "@mui/material";

const ProductivityScoreCard = ({ score }) => {
  return (
    <Box
      sx={{
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}>
      <Card
        elevation={5}
        sx={{
          borderRadius: "20px",
          background: "linear-gradient(135deg, #ffffff, #f8fafc)",
          textAlign: "center",
          py: 2,
        }}>
        <CardContent>
          <Typography
            variant="subtitle1"
            sx={{
              color: "text.secondary",
              fontWeight: 600,
            }}>
            Productivity Score
          </Typography>

          <Typography
            variant="h3"
            sx={{
              mt: 3,
              fontWeight: 700,
              color: "#4f46e5",
            }}>
            {score}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductivityScoreCard;
