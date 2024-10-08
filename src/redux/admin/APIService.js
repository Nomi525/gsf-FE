import { Api } from "../../config/Api";
import { DataService } from "../../config/DataService";

export const adminLogin = async (data) => {
  const res = await DataService.post(Api.Admin.Admin_Login, data);
  return res?.data;
};

export const profileData = async () => {
  const res = await DataService.get(Api.Admin.Admin_ProfileData);
  return res?.data;
};