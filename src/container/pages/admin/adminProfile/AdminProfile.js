import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Index from "../Index";
import PagesIndex from "../PagesIndex";
import ChangePassword from "../../../auth/admin/changePassword/ChangePassword";
import "./AdminProfile.css";
import { ProfileDetails } from "../../../../redux/admin/Action";
import blankImage from "../../../../assets/images/png/blank-imge.2.png"
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Index.Box sx={{ p: 3 }}>
          <Index.Typography>{children}</Index.Typography>
        </Index.Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AdminProfile = () => {
  const [adminData, setAdminData] = useState([]);
  const [edit, setEdit] = useState({});
  const [image, setImage] = useState();
  const [error, setError] = useState({});
  const [adminDataId, setAdminDataId] = useState();
  const [adminSubmitted, setAdminSubmitted] = useState(false);
  const navigate = PagesIndex.useNavigate();
  const dispatch = PagesIndex.useDispatch();
  const getAdmin = async () => {
    await PagesIndex.DataService.get(PagesIndex.Api.Admin.Admin_ProfileData)
      .then((res) => {
        setAdminData(res?.data?.data);
      })
      .catch((error) => {
        PagesIndex.toast.error(error?.response?.data.message);
      });
  };
  useEffect(() => {
    getAdmin();
  }, []);

  useEffect(() => {
    const initialValues = {
      name: adminData ? adminData.name : "",
      email: adminData ? adminData.email : "",
      number: adminData ? adminData.number : "",
      image: adminData ? adminData.image : "",
    };

    setAdminDataId(adminData ? adminData._id : "");
    setEdit(initialValues);
  }, [adminData]);

  const handleImageChange = (e) => {
    const selectedFile = e?.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png")
    ) {
      setImage(e?.target.files[0]);
      setEdit({
        ...edit,
        [e.target.name]: e?.target.files[0],
      });

      // if (adminSubmitted) {
      const valid = PagesIndex.adminProfileSchema({
        ...edit,
        [e?.target.name]: e?.target.files[0],
      });
      setError(valid);
    }
  };

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });

    if (adminSubmitted) {
      const valid = PagesIndex.adminProfileSchema({ ...edit, [name]: value });
      setError(valid);
    }
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleUpdateAdmin = async () => {
    setAdminSubmitted(true);
    const formData = new FormData();
    formData.append("image", edit.image);
    formData.append("name", edit.name);
    formData.append("number", edit.number);
    formData.append("email", edit.email);
    const valid = PagesIndex.adminProfileSchema(edit);
    setError(valid);
    const errorValid = Object.keys(valid).length;
    if (!errorValid) {
      if (!adminDataId) {
        await PagesIndex.DataService.post(
          PagesIndex.Api.Admin.Admin_ProfileUpdate,
          formData
        )
          .then((res) => {
            if (res.data.status === 200) {
              PagesIndex.toast.success(res.data.message);
              dispatch(ProfileDetails);
            }
          })
          .catch((error) => {
            PagesIndex.toast.error(error.response.data.message);
          });
      } else {
        await PagesIndex.DataService.post(
          PagesIndex.Api.Admin.Admin_ProfileUpdate,
          formData
        )
          .then((res) => {
            if (res.data.status === 200) {
              PagesIndex.toast.success(res.data?.message);
              dispatch(ProfileDetails);
            }
            if (res.data.data.isDeleted === true) {
              localStorage.clear();
              navigate("/");
              PagesIndex.toast.success("Account deactivate");
            }
          })
          .catch((error) => {
            PagesIndex.toast.error(error.response.data?.message);
          });
      }
    }
  };

  const IOSSwitch = Index.styled((props) => (
    <Index.Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 34,
    height: 20,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 3,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#114A65",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 14,
      height: 14,
      boxShadow: "none",
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  return (
    <Index.Box className="dashboard-content edit-profile-containt">
      <Index.Typography
        className="admin-page-title"
        component="h2"
        variant="h2"
      >
        Account Settings
      </Index.Typography>

      <Index.Box className="tabs-main-box">
        <Index.Box sx={{ width: "100%" }}>
          <Index.Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Index.Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              className="admin-tabs-main"
            >
              <Index.Tab
                label="Profile"
                {...a11yProps(0)}
                className="admin-tab"
              />
              <Index.Tab
                label="Change Password"
                {...a11yProps(1)}
                className="admin-tab"
              />
            </Index.Tabs>
          </Index.Box>
          <TabPanel value={value} index={0} className="admin-tabpanel">
            <Index.Box className="tabpanel-main">
              <Index.Box className="page-border">
                <Index.Typography
                  className=" edit-highlight-text"
                  component="h6"
                  variant="h6"
                >
                  General
                </Index.Typography>
                <Index.Typography
                  className="common-para edit-para-text"
                  component="p"
                  variant="p"
                >
                  Basic info, like your name and address that will displayed in
                  public
                </Index.Typography>
                <Index.Box className="edit-profile-flex">
                  <Index.Box className="file-upload-btn-main">
                    {adminDataId ? (
                      image ? (
                        <>
                          {" "}
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            style={{ width: "80px", height: "50px" }}
                          />
                        </>
                      ) : (
                        <>
                          {" "}
                          {edit.image ? (
                            <>
                              {" "}
                              <img
                                // src={`${PagesIndex.imageURL}${edit.image}`}
                                src={edit.image ? `${PagesIndex.imageURL}${edit.image}` : `${blankImage}`}
                                alt="Preview"
                                style={{ width: "80px", height: "50px" }}
                              />
                            </>
                          ) : (
                            <>
                              {" "}
                              <img
                                src=""
                                alt=""
                                style={{ width: "80px", height: "50px" }}
                              />
                            </>
                          )}{" "}
                        </>
                      )
                    ) : (
                      image && (
                        <>
                          {" "}
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            style={{ width: "80px", height: "50px" }}
                          />
                        </>
                      )
                    )}

                    <Index.Button
                      variant="contained"
                      component="label"
                      className="file-upload-btn"
                    >
                      <img
                        src={PagesIndex.Svg.edit}
                        className="upload-icon-img"
                        alt="upload img"
                      ></img>
                      <input
                        hidden
                        accept="image/*"
                        multiple
                        type="file"
                        placeholder=""
                        name="image"
                        onChange={handleImageChange}
                        inputProps={{ accept: "image/jpeg, image/png" }}
                      />
                    </Index.Button>
                  </Index.Box>
                </Index.Box>
                <span className="error-msg ">
                  {handleImageChange && error.image}
                </span>

                <Index.Box className="add-user-data-main">
                  <Index.Box sx={{ width: 1 }} className="grid-main">
                    <Index.Box
                      display="grid"
                      className="display-row"
                      gridTemplateColumns="repeat(12, 1fr)"
                      gap={{ xs: 0, sm: 0, md: 0, lg: 0 }}
                    >
                      <Index.Box
                        gridColumn={{
                          xs: "span 12",
                          sm: "span 6",
                          md: "span 6",
                          lg: "span 6",
                        }}
                        className="grid-column"
                      >
                        <Index.Box className="input-box add-user-input">
                          <Index.FormHelperText className="form-lable">
                            Name
                          </Index.FormHelperText>
                          <Index.Box className="input-design-div with-border">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              className="form-control "
                              placeholder="Name"
                              name="name"
                              value={edit.name}
                              onChange={handleAdminChange}
                            />
                            <span className="error-msg">
                              {adminSubmitted && error.name}
                            </span>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>

                      <Index.Box
                        gridColumn={{
                          xs: "span 12",
                          sm: "span 6",
                          md: "span 6",
                          lg: "span 6",
                        }}
                        className="grid-column"
                      >
                        <Index.Box className="input-box add-user-input">
                          <Index.FormHelperText className="form-lable">
                            Number
                          </Index.FormHelperText>
                          <Index.Box className="input-design-div with-border">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              type="tel"
                              className="form-control"
                              placeholder="Number"
                              name="number"
                              value={edit.number}
                              onChange={(e) => {
                                const cleanedValue = e.target.value.replace(
                                  /\s/g,
                                  ""
                                ); // Remove spaces
                                handleAdminChange({
                                  target: {
                                    name: "number",
                                    value: cleanedValue,
                                  },
                                });
                              }}
                              inputProps={{
                                maxLength: 10,
                                inputMode: "numeric",
                              }}
                              sx={{
                                "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                                  {
                                    display: "none",
                                  },
                                "& input[type=number]": {
                                  MozAppearance: "textfield",
                                },
                              }}
                            />

                            <span className="error-msg">
                              {adminSubmitted && error.number}
                            </span>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
     
                      <Index.Box
                        gridColumn={{
                          xs: "span 12",
                          sm: "span 6",
                          md: "span 6",
                          lg: "span 6",
                        }}
                        className="grid-column"
                      >
                        <Index.Box className="input-box add-user-input">
                          <Index.FormHelperText className="form-lable">
                            Email
                          </Index.FormHelperText>
                          <Index.Box className="input-design-div with-border">
                            <Index.TextField
                              fullWidth
                              id="fullWidth"
                              className="form-control "
                              placeholder="Email"
                              name="email"
                              value={edit.email}
                              onChange={handleAdminChange}
                            />
                            <span className="error-msg">
                              {adminSubmitted && error.email}
                            </span>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>
                

                      

                      <Index.Box
                        gridColumn={{
                          xs: "span 12",
                          sm: "span 12",
                          md: "span 12",
                          lg: "span 12",
                        }}
                        className="grid-column"
                      >
                        <Index.Box className="user-btn-flex">
                          <Index.Box className="save-btn-main border-btn-main">
                            <Index.Button
                              className="save-user-btn border-btn"
                              onClick={handleUpdateAdmin}
                            >
                              <img
                                src={PagesIndex.Svg.save}
                                className="user-save-icon"
                              ></img>
                              Save
                            </Index.Button>
                          </Index.Box>
                        </Index.Box>
                      </Index.Box>

                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </TabPanel>
          <TabPanel value={value} index={1} className="admin-tabpanel">
            <Index.Box className="tabpanel-main-password">
              <ChangePassword />
            </Index.Box>
          </TabPanel>
        </Index.Box>
      </Index.Box>
    </Index.Box>
  );
};

export default AdminProfile;
