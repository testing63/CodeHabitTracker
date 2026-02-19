import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import AddLogModal from "../components/AddLogModal";
import LogsTable from "../components/LogsTable";
import api from "../services/api";
import Loader from "../components/Loader";

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    setLoading(true);
    const { data } = await api.get("/logs");
    setLogs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <DashboardLayout>
      {loading && <Loader />}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Coding Activity</h2>
        <button
          onClick={() => setOpen(true)}
          className="bg-indigo-600 cursor-pointer text-white px-5 py-2 rounded-lg hover:bg-indigo-700">
          + Add Log
        </button>
      </div>

      {/* <LogsTable logs={logs} /> */}
      <LogsTable logs={logs} setLogs={setLogs} />

      <AddLogModal
        open={open}
        handleClose={() => setOpen(false)}
        refreshLogs={fetchLogs}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
