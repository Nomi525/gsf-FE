import { adminLogin, profileData } from "./APIService";
import { ADMIN_LOGIN, PROFILE_DETAIL } from "./Type";
import PagesIndex from "../../container/pages/admin/PagesIndex";

export const AdminLogged = (data, navigate,setLoading) => async (dispatch) => {
  setLoading(true)
  try {
    const res = await adminLogin(data);
    setLoading(false);
    if (res?.status === 200) {
      PagesIndex.toast.success(res.message);
      localStorage.setItem("accessToken", res.data.token);
        navigate("/admin/dashboard");
    }
    dispatch({
      type: ADMIN_LOGIN,
      payload: res,
    });
  } catch (res) {
    setLoading(false);
    PagesIndex.toast.error(res?.response?.data?.message);
  }
};

export const ProfileDetails=async(dispatch)=>{
  try {
    const res=await profileData()
    dispatch({
      type: PROFILE_DETAIL,
      payload: res.data,
    });
  } catch (error) {
    
  }
}
