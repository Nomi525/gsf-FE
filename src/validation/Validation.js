import * as Yup from "yup";


export const adminLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email(" Please enter a valid email")
    .matches(
      // /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-]+$/,
      /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/i,
      " Please enter a valid email"
    )
    .required(" Please enter email"),

  password: Yup.string().required(" Please enter password"),
});

export const AdminResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email(" Please enter a valid email")
    .matches(
      /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/i,
      " Please enter a valid email"
    )
    .required(" Please enter email"),
});

export const AdminSendOtpSchema = Yup.object().shape({
  otp: Yup.string()
    .required(" Please enter otp")
    .matches(/^\d{4}$/, " OTP must be a 4-digit number"),
});

export const ChangePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
  .required(" Please enter new password")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/,
    " Password must be 6 characters, one capital letter, one special character and one number "
  )
  .max(32, " New password cannot exceed 32 characters"),

  confirmPassword: Yup.string()
    .required(" Please enter confirm password")
    .oneOf(
      [Yup.ref("newPassword")],
      " New password and confirm password should be the same"
    ),
});

export const PasswordChangeSchema = Yup.object().shape({
  newPassword: Yup.string()
  .required(" Please enter new password")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/,
    " Password must be 6 characters, one capital letter, one special character and one number "
  )
  .max(32, " New password cannot exceed 32 characters"),
  confirmPassword: Yup.string()
    .required(" Please enter confirm password")
    .oneOf(
      [Yup.ref("newPassword")],
      " New password and confirm password should be the same"
    ),

  oldPassword: Yup.string().required(" Please enter old password"),
});

export const adminProfileSchema = (values) => {
  const errors = {};

  if (!values.image) {
    errors.image = "Image is required (only JPG, JPEG, and PNG files are allowed)";
  } 
  

  if (!values.name) {
    errors.name = " Please enter name";
  } else if (!/^\s*[a-zA-Z][a-zA-Z\s]*$/.test(values.name)) {
    errors.name = " Invalid name";
  } else if (values.name.length > 30) {
    errors.name = " Name cannot exceed 30 characters";
  }

  if (!values.email) {
    errors.email = " Please enter email";
  }  
  else if (!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/i.test(values.email)) {
    errors.email = " Please enter a valid email";
  }

  if (!values.number) {
    errors.number = "Please enter number";
  } else if (/\s/.test(values.number)) {
    errors.number = "Space not allowed";
  } else if (!/^(\+\d{1,3}[- .]?)?\d{10}$/.test(values.number)) {
    errors.number = "Invalid number";
  }
  
  

  return errors;
};



export const SubscriptionCostSchema = Yup.object().shape({
  currentVoucherRate: Yup.string()
  .required(" Please enter coupan cost"),

  vatAmount: Yup.string()
    .required(" Please enter vat percentage")

});

export const categoryValidation = (values) => {
  const errors = {};
  if (!values.image) {
    errors.image = "Category image is required (only JPG, JPEG, and PNG files are allowed) ";
  } 
  //  else {
  //   // Check if the selected file is a valid image (jpeg, jpg, or png)
  //   const file = values?.image;
  //   if (!file?.type?.includes('image/') || !/\.(jpe?g|png)$/i.test(file.name)) {
  //     errors.image = "Only JPG, JPEG, and PNG files are allowed";
  //   }
  // }
  // else {
  //   const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
  //   const fileFormat = values.image.type;
  //   if (!allowedFormats.includes(fileFormat)) {
  //     errors.image = "Only JPG, JPEG, and PNG files are allowed";
  //   }
  // }

  if (!values.name) {
    errors.name = " Please enter category name";
  }
  else if (!/^[a-zA-Z][a-zA-Z\s']*$/.test(values.name)) {
    errors.name = " Invalid category name";
  }  
  else if (values.name.length > 30) {
    errors.name = "Category name cannot exceed 30 characters";
  }

  return errors;
};

// if (!values.name) {
//   errors.name = "Please enter category name";
// } else if (!/^[a-zA-Z]+(?:['\s][a-zA-Z]+)*$/.test(values.name)) 
// {
//   errors.name = "Invalid category name";
// } else if (values.name.length > 30) {
//   errors.name = "Category name cannot exceed 30 characters";
// } 
//else if (/  +/.test(values.name)) {
//   errors.name = "Multiple spaces between words are not allowed";
// } else if (values.name.trim().slice(-1) === " ") {
//   errors.name = "Last word cannot have a space after it";
// }

// return errors;
// }

export const subCategoryValidation = (values) => {
  const errors = {};

  if (!values.subCategoryImage) {
    errors.subCategoryImage = "SubCategory image is required (only JPG, JPEG, and PNG files are allowed)";
  }
  
  // else {
  //   const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
  //   const fileFormat = values.subCategoryImage.type;
  //   if (!allowedFormats.includes(fileFormat)) {
  //     errors.subCategoryImage =
  //       "Only JPG, JPEG, and PNG files are allowed";
  //   }
  // }

  if (!values.name) {
    errors.name = " Please enter subCategory name";
  }
  else if (!/^[a-zA-Z][a-zA-Z\s']*$/.test(values.name)) {
    errors.name = " Invalid subCategory name";
  }  
  else if (values.name.length > 30) {
    errors.name = "SubCategory name cannot exceed 30 characters";
  }

  return errors;
};

export const termsSchema = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = "Title is required";
  }else if(values.description){
    errors.description = "Description is required";
  }

  return errors;
}

export const DistanceCostSchema = Yup.object().shape({
  distanceCost: Yup.array()
  .of(
    Yup.object().shape({
      distance: Yup.string().required('Distance is required'), 
      price: Yup.string().required('Price is required'), 
    })
  )
  .required('Distance cost is required') 
});