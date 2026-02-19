import { Card, CardContent, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const SuggestionsPanel = ({ suggestions }) => {
  return (
    <MotionCard
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      elevation={4}
      sx={{
        borderRadius: "20px",
        background: "linear-gradient(135deg, #ffffff, #f8fafc)",
      }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
          Suggestions 💡
        </Typography>

        {suggestions && suggestions.length > 0 ? (
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            {suggestions.map((s, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                style={{
                  marginBottom: "8px",
                  color: "#4B5563",
                  fontSize: "0.95rem",
                  listStyleType: "disc",
                }}>
                {s}
              </motion.li>
            ))}
          </Box>
        ) : (
          <Typography variant="body2" sx={{ color: "#6B7280" }}>
            No suggestions available right now.
          </Typography>
        )}
      </CardContent>
    </MotionCard>
  );
};

export default SuggestionsPanel;
