import React, { useState } from "react";
import Index from "../../../pages/admin/Index";
import PagesIndex from "../../../pages/admin/PagesIndex";
import "./ResetPassword.css";
import "./ResetPassword.responsive.css";

const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const token = PagesIndex.useLocation();
  const tokenData = token.state;
  const navigate = PagesIndex.useNavigate();
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const headers = {
    Authorization: `Bearer ${tokenData}`,
  };

  const submitForm = async (values) => {
    let resetData = {
      newPassword: values.newPassword,
    };

    try {
      setLoading(true)
      const res = await PagesIndex.DataService.post(
        PagesIndex.Api.Admin.Admin_ResetPassword,
        resetData,
        { headers }
      );
      if (res.data.status === 200) {
        PagesIndex.toast.success(res.data.message);
        navigate("/");
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      PagesIndex.toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <Index.Box>
        <Index.Box className="back-header res-back-header">
          <Index.Box className="backheader-inner">
            <PagesIndex.Link
              href="#"
              underline="none"
              className="back"
              to="/otpverification"
            >
              <img src={PagesIndex.Svg.backarrow} alt="" />
              Back
            </PagesIndex.Link>
          </Index.Box>
        </Index.Box>
        <Index.Box className="auto-innercontent res-auto-innercontent ">
          <Index.Box>
            <Index.Box className="ugo-logo-set">
              <Index.Box className="dark-logo-set">
                <img src={PagesIndex.Svg.blcklogo} alt="logo" className="" />
              </Index.Box>
              <Index.Box className="dark-ugo-logo-text">
                <Index.Typography variant="body1" component="p" className="">
                  UGO OUT
                </Index.Typography>
              </Index.Box>
              <Index.Box className="dark-ugo-logo-inner">
                <Index.Typography variant="body1" component="p" className="">
                  Your Key To Free Rides & Offers.
                </Index.Typography>
              </Index.Box>
            </Index.Box>
          </Index.Box>

          <PagesIndex.Formik
            validationSchema={PagesIndex.ChangePasswordSchema}
            initialValues={{
              newPassword: "",
              confirmPassword: "",
            }}
            onSubmit={submitForm}
          >
            {({
              values,
              errors,
              handleChange,
              touched,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Index.Box className="bottom-box">
                  <Index.Box className="main-box">
                    <Index.Box>
                      <Index.Box className="box-text reset-text ">
                        <Index.Typography
                          variant="body1"
                          component="p"
                          className=""
                        >
                          Reset your password
                        </Index.Typography>
                      </Index.Box>
                      <Index.Box className="reset-box-text ">
                        <Index.Typography
                          variant="body1"
                          component="p"
                          className=""
                        >
                          Please type your new password below
                        </Index.Typography>
                      </Index.Box>

                      <Index.Box className="input-design-div admin-design-div input-design-ugo">
                        <Index.Stack
                          component="form"
                          spacing={2}
                          noValidate
                          autoComplete="off"
                        >
                          <Index.Box className="main-email-set ">
                            <Index.FilledInput
                              className="set-password-box input-placeholder"
                              id="filled-adornment-password"
                              variant="filled"
                              name="newPassword"
                              onBlur={handleBlur}
                              placeholder="New Password*"
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
                            <Index.Box>
                              <Index.Box className="email-set">
                                <img
                                  src={PagesIndex.Svg.lock}
                                  alt="logo"
                                  className=""
                                />
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>

                          <Index.Box className="main-email-set">
                            <Index.FilledInput
                              className="set-password-box input-placeholder"
                              id="filled-adornment-password"
                              variant="filled"
                              name="confirmPassword"
                              onChange={handleChange}
                              value={values.confirmPassword}
                              onBlur={handleBlur}
                              placeholder="Confirm Password*"
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

                            <Index.Box>
                              <Index.Box className="email-set">
                                <img
                                  src={PagesIndex.Svg.lock}
                                  alt="logo"
                                  className=""
                                />
                              </Index.Box>
                            </Index.Box>
                          </Index.Box>
                        </Index.Stack>
                      </Index.Box>
                      <Index.Box className="common-btn login-btn  bottom-reset-btn-main">
                        <Index.Button variant="contained" type="submit"
                               disabled={loading}
                               style={{ color: "white" }}
                               startIcon={loading ? <PagesIndex.UgoButtonLoader /> : null}>
                          Done
                        </Index.Button>
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </form>
            )}
          </PagesIndex.Formik>
        </Index.Box>
      </Index.Box>
    </div>
  );
};

export default ResetPassword;
