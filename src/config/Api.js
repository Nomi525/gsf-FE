const Api = {
  Admin: {
    Admin_Login: "admin/login",
    Admin_ForgotPassword: "admin/forgotPassword",
    Admin_VerifyOtp: "admin/verifyOtp",
    Admin_ResetPassword: "admin/resetPassword",
    Admin_ChangePassword: "/admin/changePassword",

    Admin_ProfileData: "admin/viewProfile",
    Admin_ProfileUpdate: "admin/updateProfile",
    Update_TermsCondition: "admin/editCms?type=terms",
    Update_PrivacyPolicy: "admin/editCms?type=privacy",

    Get_UserList: "admin/userList",
    Get_UserFromControl_Detils: "admin/control-grouped-details",
    Get_equipment_Detils: "admin/list-equipment",
    Get_Control_Form_Filter: "admin/control-form-filters",
    Get_Control_Form_Export: "admin/control-form-export",
    Get_Control_Form_Bulk_Import: "admin/bulk-import-control-form-data",

    Delete_User: "admin/user",
    Delete_Equipment: "admin/equipment",
    Get_DashboardData: "admin/dashboard",

    Import_ControlForm_Data: "admin/bulk_import_control_from_data",
  },
  Common: {
    Get_TermsCondition: "common/getCMS?type=terms",
    Get_PrivacyPolicy: "common/getCMS?type=privacy",
    Get_CoupanPrice: "common/coupan-price",
  },
};
export { Api };
