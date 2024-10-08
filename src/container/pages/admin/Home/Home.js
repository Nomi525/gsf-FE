import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Index from "../Index";
import PagesIndex from "../PagesIndex";
import "./Home.css";
const Home = () => {
  const [dashboardData, setDashboardData] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("year");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const getData = async (event) => {
    try {
      setLoading(true);
      const res = await PagesIndex.DataService.post(
        PagesIndex.Api.Admin.Get_DashboardData,
        { data: selectedValue }
      );
      if (res?.data.status === 200) {
        setDashboardData(res?.data?.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedValue]);

  return (
    <>
      <Index.Box className="dashboard-content ">
        <Index.Box className="user-list-flex">
          <Index.Box>
            <Index.Box className="user-search-box">
              <Index.Box className="form-group">
                <Index.Typography
                  className="admin-page-title user-list-page-title"
                  component="h2"
                  variant="h2"
                >
                  Dashboard
                </Index.Typography>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          <Index.Box className="adduser-btn-main btn-main-primary">
            {/* <Index.Button className="adduser-btn btn-primary"> */}
            {/* <Index.FormControl className="select-form">
              <Index.Select
             value={selectedValue} 
                onChange={handleChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                className="adduser-btn btn-primary"
              >
        
        <Index.MenuItem value={"year"}>Yearly</Index.MenuItem>
        <Index.MenuItem value={"month"}>Monthly</Index.MenuItem>
        <Index.MenuItem value={"week"}>Weekly</Index.MenuItem>
        <Index.MenuItem value={"day"}>Daily</Index.MenuItem>
              </Index.Select>
            </Index.FormControl> */}

            {/* </Index.Button> */}
          </Index.Box>
        </Index.Box>
        <Index.Box>
          <Index.Box sx={{ paddingTop: "15px" }} className="mini-card-main ">
            <Grid container spacing={0}>
              <Grid item lg={4} md={6} sm={12} xs={12}>
                <Index.Box className="">
                  <Index.Box className="card-right-content box-colors">
                    <Index.Box className="card-right-content-box">
                      <Index.Typography className="card-price">
                        {!loading ? dashboardData?.totalUsers : 0}
                      </Index.Typography>

                      <Index.Typography className="card-total">
                        Total Users
                      </Index.Typography>
                      <PagesIndex.Link
                        to="/admin/user-list"
                        className="card-link"
                      >
                        <Index.Typography className="card-view">
                          View All
                        </Index.Typography>
                      </PagesIndex.Link>
                    </Index.Box>
                    <Index.Box className="mini-card-img">
                      <Index.EventAvailableIcon className="icon" />
                      {/* <img src={PagesIndex.Png.card1}></img> */}
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Grid>

              <Grid item lg={4} md={6} sm={12} xs={12}>
                <Index.Box className="">
                  <Index.Box className="card-right-content box-color">
                    <Index.Box className="card-right-content-box">
                      <Index.Typography className="card-price">
                        {!loading ? dashboardData?.totalControlForm : 0}
                      </Index.Typography>

                      <Index.Typography className="card-total">
                        Total Control Form
                      </Index.Typography>
                      <PagesIndex.Link
                        to="/admin/control-from-details"
                        className="card-link"
                      >
                        <Index.Typography className="card-view">
                          View All
                        </Index.Typography>
                      </PagesIndex.Link>
                    </Index.Box>
                    <Index.Box className="mini-card-img">
                      <Index.EventAvailableIcon className="icon" />
                      {/* <img src={PagesIndex.Png.card1}></img> */}
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Grid>

              {/* <Grid item lg={4} md={6} sm={12} xs={12}>
                <Index.Box className="">
                  <Index.Box className="card-right-content box-colors">
                    <Index.Box className="card-right-content-box">
                      <Index.Typography className="card-price">
                        {!loading ? dashboardData?.totalTransactions : 0}
                      </Index.Typography>

                      <Index.Typography className="card-total">
                        Total Transactions
                      </Index.Typography>
                      <PagesIndex.Link
                        to="/admin/view-transaction"
                        className="card-link"
                      >
                        <Index.Typography className="card-view">
                          View All
                        </Index.Typography>
                      </PagesIndex.Link>
                    </Index.Box>
                    <Index.Box className="mini-card-img">
                      <Index.AccountBalanceWalletIcon className="icon" />
                      {/* <img src={PagesIndex.Png.card1}></img> */}
              {/* </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Grid> */}

              {/* <Grid item lg={4} md={6} sm={12} xs={12}>
                <Index.Box className="">
                  <Index.Box className="card-right-contents box-color">
                    <Index.Box className="card-right-content-box">
                      <Index.Typography className="card-price">
                        {!loading ? dashboardData?.totalAmount : 0}
                      </Index.Typography>

                      <Index.Typography className="card-total">
                        Total Funds made
                      </Index.Typography>
                      {/* <PagesIndex.Link to="/admin/user-list">
                      <Index.Typography className="card-view">
                         View All
                      </Index.Typography>
                      </PagesIndex.Link> */}
              {/* </Index.Box>
                    <Index.Box className="mini-card-img">
                      <Index.AccountBalanceIcon className="icon" />
                      {/* <img src={PagesIndex.Png.card1}></img> */}
              {/* </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Grid> */}

              {/* <Grid item lg={4} md={6} sm={6} xs={12}>
                <Index.Box className="">
                  <Index.Box className="card-right-contents box-colors">
                    <Index.Box className="card-right-content-box">
                
                      <Index.Typography className="card-price">
                        500
                      </Index.Typography>

                      <Index.Typography className="card-total">
                        Total credits issued
                      </Index.Typography>
                 
                    </Index.Box>
                    <Index.Box className="mini-card-img">
                    <Index.CreditScoreIcon  className="icon" />
                 
                  </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Grid> */}
            </Grid>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
};

export default Home;
