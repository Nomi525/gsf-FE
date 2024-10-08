import React, { useState } from "react";
import Index from "../../Index";
import PagesIndex from "../../../container/pages/admin/PagesIndex";

const Header = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = Index.useNavigate();
  const handleSidebarToogle = () => {
    document.body.classList["add"]("sidebar-active");
    setOpenSidebar(!openSidebar);
  };

  const profileEdit = () => {
    navigate("/admin/profile");
    handleClose();
  };

  const adminLogout = () => {
    localStorage.clear();
    navigate("/");
    // Index.toast.success("Logout successfully");
  };
  return (
    <div>
      <Index.Box className="header-main header-flex-main">
        <Index.Box className="header">
          <Index.Box className="header-flex">
            <Index.Box className="ugoout-text">
              <Index.Typography variant="body1" component="p" className="">
            
              </Index.Typography>
            </Index.Box>
            <Index.Box className="header-right-content res-header-right-content">
              {/* <Index.Box className="upload-btn-set">
         
                      <Index.Button variant="contained" onClick={adminLogout}>
                      <Index.Box classname="logo">
              <img src={Index.Svg.upload} alt="logo" className="logo-img" />
            </Index.Box>
                      </Index.Button>
                
                      </Index.Box> */}
              <Index.Box className="admin-header-right">
                <Index.Box className="admin-header-drop-main">
                  <Index.Button
                    className="drop-header-btn"
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <Index.Box className="flex-drop-main">
                      <img
                        src={Index.Svg.uplogo}
                        className="admin-header-profile-icon"
                        alt="dashboard bell icon"
                      ></img>
                      <Index.Box className="title-admin-drop">
                        <Index.Typography
                          variant="h5"
                          component="h5"
                          className="admin-header-drop"
                        ></Index.Typography>
                      </Index.Box>
                    </Index.Box>
                  </Index.Button>
                </Index.Box>
                <Index.Menu
                  className="drop-header-menu"
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <Index.MenuItem
                    onClick={profileEdit}
                    className="drop-header-menuitem"
                  >
                    {" "}
                    <img
                      src={Index.Svg.profilegrey}
                      className="drop-header"
                    />{" "}
                    Profile
                  </Index.MenuItem>
                  <Index.MenuItem
                    onClick={adminLogout}
                    className="drop-header-menuitem"
                  >
                    {" "}
                    <img
                      src={Index.Svg.edit}
                      className="drop-header"
                    />{" "}
                    Sign Out
                  </Index.MenuItem>
                </Index.Menu>
              </Index.Box>

              <Index.Box className="res-menu-icon res-icon-set">
                <Index.MenuIcon
                  className="res-menu"
                  onClick={() => handleSidebarToogle()}
                />
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </div>
  );
};

export default Header;
