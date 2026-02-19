import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md ">
      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <CircularProgress />
      </div>
    </div>
  );
};

export default Loader;
