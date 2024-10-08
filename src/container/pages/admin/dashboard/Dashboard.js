import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Index from "../Index";
import PagesIndex from "../PagesIndex";
import "./Dashboard.css";
import "./Dashboard.responsive.css";

const Dashboard = () => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <Index.Box className="dashboard-main">
        <Index.Box className="dashboard-right-main">
          <PagesIndex.Header setOpen={setOpen} open={open} />
          <PagesIndex.Sidebar />
          <Index.Box className="dashboard-containt-main">
            <Outlet />
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </div>
  );
};

export default Dashboard;
