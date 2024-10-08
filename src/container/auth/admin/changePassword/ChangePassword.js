import React, { useState } from "react";
import Index from "../../../../component/Index";
import "./ChangePassword.css";
import "./ChangePassword.responsive.css";
import PagesIndex from "../../../pages/admin/PagesIndex";

const ChangePassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);

  const submitForm = async (values) => {
    let resetData = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    try {
      setLoading(true)
      const res = await PagesIndex.DataService.post(
        PagesIndex.Api.Admin.Admin_ChangePassword,
        resetData
      );
      if (res.data.status === 200) {
        PagesIndex.toast.success(res.data.message);
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      PagesIndex.toast.error(error.response.data.message);
    }
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Index.Box className="tabpanel-main-password  ">
        <Index.Box className="h-100">
          <Index.Box className="card-center">
            <PagesIndex.Formik
              validationSchema={PagesIndex.PasswordChangeSchema}
              initialValues={{
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
              }}
              onSubmit={submitForm}
            >
              {({ values, errors, handleChange, touched, handleBlur }) => (
                <PagesIndex.Form>
                  <Index.Box className="card-main change-password-main">
   
                    <Index.Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Index.Grid item xs={12} sm={6} md={6} lg={6}>
                        <Index.Box className="change-space">
                          <Index.Typography
                            variant="label"
                            component="label"
                            className="change-input-label "
                          >
                            Old Password*
                          </Index.Typography>
                          <Index.Box className="input-design-div with-border">
                            <Index.FilledInput
                              hiddenLabel
                              id="filled-hidden-label-normal"
                              variant="filled"
                              className="admin-input-design input-placeholder"
                              name="oldPassword"
                              onBlur={handleBlur}
                              placeholder="Old Password"
                              onChange={handleChange}
                              value={values.oldPassword}
                              type={showOldPassword ? "text" : "password"}
                              endAdornment={
                                <Index.InputAdornment position="end">
                                  <Index.IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowOldPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showOldPassword ? (
                                      <Index.VisibilityOff />
                                    ) : (
                                      <Index.Visibility />
                                    )}
                                  </Index.IconButton>
                                </Index.InputAdornment>
                              }
                            />
                            {errors.oldPassword && touched.oldPassword ? (
                              <Index.Typography className="error-msg">
                                {errors.oldPassword}
                              </Index.Typography>
                            ) : null}
                          </Index.Box>
                        </Index.Box>
                      </Index.Grid>
                    </Index.Grid>
                    <Index.Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Index.Grid item xs={12} sm={6} md={6} lg={6}>
                        <Index.Box className="change-space">
                          <Index.Typography
                            variant="label"
                            component="label"
                            className="change-input-label"
                          >
                            New Password*
                          </Index.Typography>
                          <Index.Box className="input-design-div with-border">
                            <Index.FilledInput
                              hiddenLabel
                              id="filled-hidden-label-normal"
                              variant="filled"
                              className="admin-input-design input-placeholder"
                              name="newPassword"
                              onBlur={handleBlur}
                              placeholder="New Password"
                              onChange={handleChange}
                              value={values.newPassword}
                              type={showNewPassword ? "text" : "password"}
                              endAdornment={
                                <Index.InputAdornment position="end">
                                  <Index.IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowNewPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showNewPassword ? (
                                      <Index.VisibilityOff />
                                    ) : (
                                      <Index.Visibility />
                                    )}
                                  </Index.IconButton>
                                </Index.InputAdornment>
                              }
                            />
                            {errors.newPassword && touched.newPassword ? (
                              <Index.Typography className="error-msg">
                                {errors.newPassword}
                              </Index.Typography>
                            ) : null}
                          </Index.Box>
                        </Index.Box>
                      </Index.Grid>
                    </Index.Grid>
                    <Index.Grid
                      container
                      rowSpacing={1}
                      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                    >
                      <Index.Grid item xs={12} sm={6} md={6} lg={6}>
                        <Index.Box className="change-space">
                          <Index.Typography
                            variant="label"
                            component="label"
                            className="change-input-label"
                          >
                            Confirm Password*
                          </Index.Typography>
                          <Index.Box className="input-design-div with-border">
                            <Index.FilledInput
                              hiddenLabel
                              id="filled-hidden-label-normal"
                              variant="filled"
                              className="admin-input-design input-placeholder"
                              name="confirmPassword"
                              onBlur={handleBlur}
                              placeholder="Confirm Password"
                              onChange={handleChange}
                              value={values.confirmPassword}
                              type={showConfirmPassword ? "text" : "password"}
                              endAdornment={
                                <Index.InputAdornment position="end">
                                  <Index.IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showConfirmPassword ? (
                                      <Index.VisibilityOff />
                                    ) : (
                                      <Index.Visibility />
                                    )}
                                  </Index.IconButton>
                                </Index.InputAdornment>
                              }
                            />
                            {errors.confirmPassword &&
                            touched.confirmPassword ? (
                              <Index.Typography className="error-msg">
                                {errors.confirmPassword}
                              </Index.Typography>
                            ) : null}
                          </Index.Box>
                        </Index.Box>
                      </Index.Grid>
                    </Index.Grid>

                    <Index.Box className="common-btn small-btn-modal position">
                      <Index.Button variant="contained" type="submit"
                         disabled={loading}
                         style={{ color: "white" }}
                         startIcon={loading ? <PagesIndex.UgoButtonLoader /> : null}>
                        Save
                      </Index.Button>
                    </Index.Box>
                  </Index.Box>
                </PagesIndex.Form>
              )}
            </PagesIndex.Formik>
          </Index.Box>
        </Index.Box>
      </Index.Box>
    </div>
  );
};

export default ChangePassword;
