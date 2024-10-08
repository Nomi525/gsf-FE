import React, { useState } from "react";
import Index from "../../../pages/admin/Index";
import PagesIndex from "../../../pages/admin/PagesIndex";
import "./ForgotPassword.css";
import "./ForgotPassword.responsive.css";

const ForgotPassword = () => {
  const navigate = PagesIndex.useNavigate();
  const [loading, setLoading] = useState(false);
  const submitForm = async (data) => {
    try {
      setLoading(true)
      const res = await PagesIndex.DataService.post(PagesIndex.Api.Admin.Admin_ForgotPassword, data);
      if (res.data.status === 200) {
        PagesIndex.toast.success(res.data.message);
        navigate("/otpverification", {
          state: data,
        });
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
            <PagesIndex.Link href="#" underline="none" className="back" to="/">
              <img src={PagesIndex.Svg.backarrow} alt="" />
              Back
            </PagesIndex.Link>
          </Index.Box>
        </Index.Box>
        <Index.Box className="auto-innercontent res-auto-innercontent">
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
            validationSchema={PagesIndex.AdminResetPasswordSchema}
            initialValues={{
              email: "",
            }}
            onSubmit={submitForm}
          >
            {({ values, errors, handleChange, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Index.Box className="bottom-box">
                  <Index.Box className="main-box">
                    <Index.Box>
                      <Index.Box className="box-text reset-text">
                        <Index.Typography
                          variant="body1"
                          component="p"
                          className=""
                        >
                          Reset Password
                        </Index.Typography>
                      </Index.Box>
                      <Index.Box className="reset-box-text">
                        <Index.Typography
                          variant="body1"
                          component="p"
                          className=""
                        >
                          Please enter your email address to request
                          <br /> an password reset
                        </Index.Typography>
                      </Index.Box>

                      <Index.Box className="input-design-div admin-design-div input-design-ugo">
                        <Index.Stack
                          component="form"
                          spacing={2}
                          noValidate
                          autoComplete="off"
                        >
                          <Index.Box className="main-email-set">
                            <Index.TextField
                              hiddenLabel
                              id="filled-hidden-label-normal"
                              placeholder="Email*"
                              variant="filled"
                              name="email"
                              type="email"
                              value={values.email}
                              helperText={errors.email}
                              onChange={handleChange}
                              error={Boolean(errors.email)}
                              className="admin-input-design input-placeholder"
                            />
                            <Index.Box>
                              <Index.Box className="email-set">
                                <img
                                  src={PagesIndex.Svg.email}
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
                          Continue
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

export default ForgotPassword;
