import { useState, useContext } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import api from "../services/api";
import { SnackbarContext } from "../context/SnackbarContext";
import Loader from "../components/Loader";

const AddLogModal = ({ open, handleClose, refreshLogs }) => {
  const { showSnackbar } = useContext(SnackbarContext);

  const [form, setForm] = useState({
    date: "",
    duration: "",
    language: "",
    activityType: "Practice",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.post("/logs", form);
      showSnackbar("Log added successfully ✅", "success");
      refreshLogs();
      handleClose();
      setLoading(false);
    } catch (error) {
      showSnackbar(
        error.response?.data?.message || "Error adding log",
        "error",
      );
      handleClose();
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 4,
            paddingX: 3,
            paddingY: 2,
          },
        }}>
        <motion.div
          initial={{ opacity: 0, y: -60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}>
          {loading && <Loader />}
          <DialogTitle
            sx={{
              fontSize: "1.6rem",
              fontWeight: 700,
              paddingBottom: 0.5,
            }}>
            Add Coding Log
          </DialogTitle>

          <Box
            sx={{
              height: 3,
              width: 40,
              backgroundColor: "primary.main",
              borderRadius: 10,
              marginBottom: 3,
            }}
          />

          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3.5,
              paddingTop: 1,
              paddingBottom: 2,
            }}>
            <TextField
              type="date"
              fullWidth
              size="medium"
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            <TextField
              label="Duration (minutes)"
              type="number"
              fullWidth
              size="medium"
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
            />

            <TextField
              label="Language"
              fullWidth
              size="medium"
              onChange={(e) => setForm({ ...form, language: e.target.value })}
            />

            <TextField
              select
              label="Activity Type"
              fullWidth
              size="medium"
              value={form.activityType}
              onChange={(e) =>
                setForm({ ...form, activityType: e.target.value })
              }>
              <MenuItem value="Practice">Practice</MenuItem>
              <MenuItem value="Project">Project</MenuItem>
              <MenuItem value="Debugging">Debugging</MenuItem>
            </TextField>

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleSubmit}
              sx={{
                marginTop: 1,
                height: 50,
                borderRadius: 3,
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              }}>
              Add Log
            </Button>
          </DialogContent>
        </motion.div>
      </Dialog>
    </>
  );
};

export default AddLogModal;
