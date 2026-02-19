import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import api from "../services/api";

import DeleteIcon from "@mui/icons-material/Delete";
const LogsTable = ({ logs, setLogs }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLogId, setSelectedLogId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleDeleteClick = (id) => {
    setSelectedLogId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);

      await api.delete(`/logs/${selectedLogId}`);

      // Remove deleted log from UI
      setLogs((prev) => prev.filter((log) => log._id !== selectedLogId));

      setSnackbarOpen(true);
      setOpenDialog(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 tracking-tight">
          Recent Logs
        </h2>

        <div className="overflow-x-auto rounded-xl">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-500 text-sm uppercase tracking-wider">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Duration</th>
                <th className="px-4 py-2">Language</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log) => (
                <tr
                  key={log._id}
                  className="bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-lg">
                  <td className="px-4 py-3">
                    {new Date(log.date).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3">{log.duration} mins</td>

                  <td className="px-4 py-3">
                    <span className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                      {log.language}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                      {log.activityType}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(log._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Confirmation Dialog */}
      {/* <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete Log</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this log? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} disabled={loading}>
            Cancel
          </Button>

          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
            disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog> */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          component: motion.div,
          initial: { opacity: 0, scale: 0.8, y: 40 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.8, y: 40 },
          transition: { duration: 0.3, ease: "easeOut" },
          sx: {
            borderRadius: "20px",
            padding: 2,
            backdropFilter: "blur(10px)",
          },
        }}
        BackdropProps={{
          component: motion.div,
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.3 },
          sx: {
            backdropFilter: "blur(4px)",
            backgroundColor: "rgba(0,0,0,0.3)",
          },
        }}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: 600,
            color: "#d32f2f",
          }}>
          <WarningAmberRoundedIcon />
          Delete Log
        </DialogTitle>

        <DialogContent>
          {loading && <Loader />}
          <DialogContentText sx={{ color: "text.secondary" }}>
            Are you sure you want to delete this log? This action{" "}
            <strong>cannot be undone</strong>.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ padding: "16px 24px" }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setOpenDialog(false)}
              disabled={loading}
              variant="outlined">
              Cancel
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleConfirmDelete}
              color="error"
              variant="contained"
              disabled={loading}
              sx={{
                minWidth: "100px",
                boxShadow: "0 8px 20px rgba(211,47,47,0.3)",
              }}>
              Delete
            </Button>
          </motion.div>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}>
        <Alert severity="success" variant="filled">
          Log deleted successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default LogsTable;
