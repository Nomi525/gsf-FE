import React, { useEffect, useState } from "react";
import Index from "../../Index";
import { ProfileDetails } from "../../../redux/admin/Action";
import { useDispatch, useSelector } from "react-redux";
import PagesIndex from "../../../container/pages/admin/PagesIndex";
import blankImage from "../../../assets/images/png/blank-imge.2.png"
import './defaultLayout.css';
function Sidebar() {
  const location = Index.useLocation();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    document.body.classList["remove"]("sidebar-active");
  };

  const profileData = useSelector(
    (state) => state.ProfileDetails.ProfileDetails
  );
  const handleClickAccount = () => {
    setOpen(!open);
  };

  useEffect(() => {
    dispatch(ProfileDetails);
  }, []);

  return (
    <>
      <Index.Box className="sidebar-inner-main">
        <Index.Box className="sidebar-body">
          <Index.Box className="sidebar-top res-sidebat-top">
            <Index.Box>
              <Index.Button className="res-close-btn">
                {" "}
                <img
                  src={Index.Svg.close}
                  onClick={handleClose}
                  className="res-close-img"
                />
              </Index.Button>
            </Index.Box>
            <Index.Box className="d-flex align-items-center">
              <Index.Box className="profile-image-main">
                <img
                  src={profileData?.image?`${PagesIndex.imageURL}${profileData?.image}`:`${blankImage}`}
                  // src={profileData?.businessImage?`${PagesIndex.imageURL}${profileData?.businessImage}`: `${blankImage}`}
                  alt="profile image"
                  className="profile"
                />
              </Index.Box>
              <Index.Box className="welcome-main">
                <Index.Typography
                  variant="p"
                  component="p"
                  className="welcome-text"
                >
                  Welcome
                </Index.Typography>
                <Index.Typography
                  variant="p"
                  component="p"
                  className="bussiness-name-text"
                >
                  {profileData?.name ? profileData.name : "Admin" }
                </Index.Typography>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          <Index.Box className="sidebar-bottom-main">
            <Index.Box className="sidebar-main">
              <Index.List className="sidebar-ul">

              <Index.ListItem>
                  <Index.Link
                    to="/admin/dashboard"
                    className={`admin-sidebar-link ${
                      location.pathname === "/admin/dashboard" ? "active" : ""
                    }`}
                  >
                    <Index.Box className="sidebar-li-inner">
                      <Index.DashboardIcon className="sidebar-category-icon" />
                      <Index.Typography
                        variant="p"
                        component="p"
                        className="sidebar-text"
                      >
                        Dashboard
                      </Index.Typography>
                    </Index.Box>
                  </Index.Link>
                </Index.ListItem>

                <Index.ListItem>
                  <Index.Link
                    to="/admin/user-list"
                    className={`admin-sidebar-link ${
                      location.pathname === "/admin/user-list" ? "active" : ""
                    }`}
                  >
                    <Index.Box className="sidebar-li-inner">
                      <Index.PersonIcon className="sidebar-category-icon" />
                      <Index.Typography
                        variant="p"
                        component="p"
                        className="sidebar-text"
                      >
                        User
                      </Index.Typography>
                    </Index.Box>
                  </Index.Link>
                </Index.ListItem>


                <Index.ListItem>
                  <Index.Link
                    to="/admin/control-from-details"
                    className={`admin-sidebar-link ${
                      location.pathname === "/admin/control-from-details" ? "active" : ""
                    }`}
                  >
                    <Index.Box className="sidebar-li-inner">
                      <Index.CategoryIcon className="sidebar-category-icon" />
                      <Index.Typography
                        variant="p"
                        component="p"
                        className="sidebar-text"
                      >
                        Control Form
                      </Index.Typography>
                    </Index.Box>
                  </Index.Link>
                </Index.ListItem>

                {/* <Index.ListItem>
                  <Index.Link
                    to="/admin/equipment-details"
                    className={`admin-sidebar-link ${
                      location.pathname === "/admin/equipment-details" ? "active" : ""
                    }`}
                  >
                    <Index.Box className="sidebar-li-inner">
                      <Index.CategoryIcon className="sidebar-category-icon" />
                      <Index.Typography
                        variant="p"
                        component="p"
                        className="sidebar-text"
                      >
                        Equipment
                      </Index.Typography>
                    </Index.Box>
                  </Index.Link>
                </Index.ListItem> */}
             
                {/* <Index.ListItem>
                  <Index.Link
                    to="/admin/business-list"
                    className={`admin-sidebar-link ${
                      location.pathname === "/admin/business-list"
                        ? "active"
                        : ""
                    }`}
                  >
                    <Index.Box className="sidebar-li-inner">
                      <Index.CorporateFareIcon className="sidebar-category-icon" />
                      <Index.Typography
                        variant="p"
                        component="p"
                        className="sidebar-text"
                      >
                        Business
                      </Index.Typography>
                    </Index.Box>
                  </Index.Link>
                </Index.ListItem> */}

                {/* <Index.ListItem>
                  <Index.Link
                    to="/admin/subscription"
                    className={`admin-sidebar-link ${
                      location.pathname === "/admin/subscription" ? "active" : ""
                    }`}
                  >
                    <Index.Box className="sidebar-li-inner">
                      <Index.PaymentIcon className="sidebar-category-icon" />
                      <Index.Typography
                        variant="p"
                        component="p"
                        className="sidebar-text"
                      >
                       Voucher Cost
                      </Index.Typography>
                    </Index.Box>
                  </Index.Link>
                </Index.ListItem> */}
                {/* <Index.ListItem>
                  <Index.Link
                    to="/admin/distance-cost"
                    className={`admin-sidebar-link ${
                      location.pathname === "/admin/distance-cost" ? "active" : ""
                    }`}
                  >
                    <Index.Box className="sidebar-li-inner">
                      <Index.PaymentIcon className="sidebar-category-icon" />
                      <Index.Typography
                        variant="p"
                        component="p"
                        className="sidebar-text"
                      >
                       Distance Cost
                      </Index.Typography>
                    </Index.Box>
                  </Index.Link>
                </Index.ListItem> */}

                {/* <Index.ListItem
                  className="admin-sidebar-listitem admin-submenu-listitem-main"
                  onClick={handleClickAccount}
                >
                  <Index.Link className="admin-sidebar-link">
                    <Index.Box className="sidebar-setting-box">
                      <Index.SettingsIcon className="sidebar-setting-icon" />
                      <Index.Typography className="cms-text">
                        CMS
                      </Index.Typography>

                      {open ? (
                        <Index.ExpandLess className="expandless-icon" />
                      ) : (
                        <Index.ExpandMore className="expandmore-icon" />
                      )}
                    </Index.Box>
                    <Index.Box className="submenu-main">
                      <Index.Collapse
                        in={open}
                        timeout="auto"
                        unmountOnExit
                        className="submenu-collapse"
                      >
                        <Index.List
                          component="div"
                          disablePadding
                          // className="admin-sidebar-submenulist"
                        >
                          <Index.ListItem className="admin-sidebar-listitem">
                            <Index.Link
                              to="/admin/terms-condition"
                              className={`admin-sidebar-link cms-text  ${
                                location.pathname === "/admin/terms-condition"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              Terms & Conditions
                            </Index.Link>
                          </Index.ListItem>
                          <Index.ListItem className="admin-sidebar-listitem">
                            <Index.Link
                              to="/admin/privacy-policy"
                              className={`admin-sidebar-link cms-text ${
                                location.pathname === "/admin/privacy-policy"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              Privacy Policy
                            </Index.Link>
                          </Index.ListItem>
                        </Index.List>
                      </Index.Collapse>
                    </Index.Box>
                  </Index.Link>
                </Index.ListItem> */}
              </Index.List>
            </Index.Box>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </>
  );
}

export default Sidebar;
