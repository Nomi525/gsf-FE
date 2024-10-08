import React, { useEffect, useState } from "react";
import Index from "../Index";
import PagesIndex from "../PagesIndex";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const [edit, setEdit] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    handlePolicyData();
  }, []);

  const handlePolicyData = async () => {
    try {
      setLoading(true);
      const res = await PagesIndex.DataService.get(
        PagesIndex.Api.Common.Get_PrivacyPolicy
      );
      if (res?.data.status === 200) {
        const { title, description } = res?.data?.data;
        setEdit({ title, description });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEditorLoaded(true);
  }, [edit]);

  const handleTitleChange = (e) => {
    const inputValue = e.target.value.slice(0, 64).replace(/[^a-zA-Z ]/g, ''); 

    setEdit((prevEdit) => ({ ...prevEdit, title: inputValue }));
  
    if (!inputValue.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "Title is required",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "",
      }));
    }
  };

  
  const handleDescriptionChange = (e, editor) => {
    const data = editor.getData();
    setEdit((prevEdit) => ({ ...prevEdit, description: data }));
    if (!data) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "Description is required",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        description: "",
      }));
    }
  };

  const handleUpdatePolicy = async () => {
    try {
      const { title, description } = edit;
      const errors = {};

      if (!title) {
        errors.title = "Title is required";
      }

      if (!description) {
        errors.description = "Description is required";
      }

      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }

      const data = { title, description };
      const res = await PagesIndex.DataService.post(
        PagesIndex.Api.Admin.Update_PrivacyPolicy,
        data
      );
      if (res?.data?.status === 200) {
        PagesIndex.toast.success(res.data.message);
        handlePolicyData();
      }
    } catch (error) {
      PagesIndex.toast.error(error?.response?.data.message);
    }
  };

  return (
    <Index.Box className="container">
      {loading ? (
        <PagesIndex.UgoLoader color="#233862" loading={loading} />
      ) : (
        <Index.Box>
          <Index.Box className="input-box modal-input-box">
            <Index.Typography
              className="admin-page-title user-list-page-title"
              component="h2"
              variant="h4"
            >
              Privacy & Policy
            </Index.Typography>
            <br></br>
            <Index.FormHelperText className="form-label">
              Title*
            </Index.FormHelperText>
            <Index.Box className="form-group">
              <Index.TextField
                fullWidth
                id="title"
                size="small"
                placeholder="Enter title"
                name="title"
                onChange={handleTitleChange}
                value={edit.title}
              />
              {errors.title && (
                <span className="error-msg">{errors.title}</span>
              )}
            </Index.Box>
          </Index.Box>
          <Index.Box className="input-box modal-input-box">
            <Index.FormHelperText className="form-label">
              Description*
            </Index.FormHelperText>
            <Index.Box className="form-group">
              {editorLoaded ? (
                <PagesIndex.CKEditor
                  editor={PagesIndex.ClassicEditor}
                  data={edit.description}
                  onChange={handleDescriptionChange}
                />
              ) : (
                <div>Loading editor...</div>
              )}
              {errors.description && (
                <span className="error-msg ">{errors.description}</span>
              )}
            </Index.Box>
          </Index.Box>
          <Index.Box className="save-btn-main border-btn-main">
            <Index.Button
              className="save-user-btn border-btn"
              onClick={handleUpdatePolicy}
            >
              <img
                alt="save"
                src={PagesIndex.Svg.save}
                className="user-save-icon"
              ></img>
              Update
            </Index.Button>
          </Index.Box>
        </Index.Box>
      )}
    </Index.Box>
  );
};

export default PrivacyPolicy;
