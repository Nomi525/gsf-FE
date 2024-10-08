import React, { useState, useEffect, useRef } from "react";
import Index from "../../../pages/admin/Index";
import PagesIndex from "../../../pages/admin/PagesIndex";
import "./OtpVerification.css";
import "./OtpVerification.responsive.css";

const OtpVerification = () => {
  const navigate = PagesIndex.useNavigate();
  const [loading, setLoading] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [disabled, setDisabled] = useState(false);
  const intervalRef = useRef(null);

  const email = PagesIndex.useLocation();
  const otpEmail = email.state;
  const submitForm = async (otp) => {
    let otpData = {
      email: otpEmail.email,
      OTP: otp.otp,
    };
    try {
      setLoading(true)
      const res = await PagesIndex.DataService.post(PagesIndex.Api.Admin.Admin_VerifyOtp, otpData);
      if (res.data.status === 200) {
        PagesIndex.toast.success(res.data.message);
        navigate("/resetPassword", {
          state: res.data.data,
        });
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      PagesIndex.toast.error(error.response.data.message);
    }
  };

  const resendOtp = async () => {
    setMinutes(0);
    setSeconds(30);
    setDisabled(true);
    try {
      const res = await PagesIndex.DataService.post(
        PagesIndex.Api.Admin.Admin_ForgotPassword,
        otpEmail
      );
      if (res.data.status === 200) {
        PagesIndex.toast.success(res.data.message);
      }
    } catch (error) {
      PagesIndex.toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        if (minutes === 0) {
          clearInterval(intervalRef.current);
          setDisabled(false);
        } else {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [resendOtp]);

  return (
    <div>
      <Index.Box>
        <Index.Box className="back-header res-back-header">
          <Index.Box className="backheader-inner">
            <PagesIndex.Link
              href="#"
              underline="none"
              className="back"
              to="/forgotpassword"
            >
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
            validationSchema={PagesIndex.AdminSendOtpSchema}
            initialValues={{
              otp: "",
            }}
            onSubmit={submitForm}
          >
            {({
              values,
              errors,
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => (
              <PagesIndex.Form onSubmit={handleSubmit}>
                <Index.Box className="bottom-box">
                  <Index.Box>
                    <Index.Box className="main-box">
                      <Index.Box>
                        <Index.Box className="box-text reset-text">
                          <Index.Typography
                            variant="body1"
                            component="p"
                            className=""
                          >
                            Verification
                          </Index.Typography>
                        </Index.Box>
                        <Index.Box className="reset-box-text">
                          <Index.Typography
                            variant="body1"
                            component="p"
                            className=""
                          >
                            A code has been sent to your email if you haven't
                            please check your junk or press resend code below
                          </Index.Typography>
                        </Index.Box>

                        <Index.Box className="input-design-div verify-design-div input-design-div-ugo input-verification">
                          <Index.Stack
                            component="form"
                            spacing={1}
                            noValidate
                            autoComplete="off"
                            className="d-flex"
                          >
                            <Index.MuiOtpInput
                              name="otp"
                              length={4}
                              value={values.otp}
                              onChange={(file) => setFieldValue("otp", file)}
                              error={Boolean(errors.otp)}
                              className="input-design input-placeholder verify-design"
                            />
                          </Index.Stack>
                          {errors?.otp && (
                            <Index.FormHelperText error>
                              {errors?.otp}
                            </Index.FormHelperText>
                          )}
                        </Index.Box>

                        <Index.Box className="common-btn login-btn  verify-btn-main">
                          <Index.Button variant="contained" type="submit"
                               disabled={loading}
                               style={{ color: "white" }}
                               startIcon={loading ? <PagesIndex.UgoButtonLoader /> : null}>
                            Send
                          </Index.Button>
                        </Index.Box>

                        {/* <Index.Box className="box-login-text forgot verify-box"> */}
                          <Index.Box className="box-login-text forgot verify-box">
                            {minutes > 0 || seconds > 0 ? (
                              <Index.Typography
                                variant="body1"
                                component="p"
                                className="resend-otp-code"
                              >
                                RESEND CODE :{" "}
                                {minutes < 10 ? `0${minutes}` : minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}
                              </Index.Typography>
                            ) : (
                              <Index.Button
                                onClick={resendOtp}
                                disabled={disabled}
                              >
                                <Index.Typography
                                  variant="body1"
                                  component="p"
                                  className=""
                                >
                                  Resend code
                                </Index.Typography>
                              </Index.Button>
                            )}
                          </Index.Box>
                        {/* </Index.Box> */}
                      </Index.Box>
                    </Index.Box>
                  </Index.Box>
                </Index.Box>
              </PagesIndex.Form>
            )}
          </PagesIndex.Formik>
        </Index.Box>
      </Index.Box>
    </div>
  );
};

export default OtpVerification;
