import React, { useEffect, useState } from "react";
import blankImage from "../../../../assets/images/png/blank-imge.png";
import Index from "../Index";
import PagesIndex from "../PagesIndex";
import "./ControlForm.css";

const ControlForm = () => {
  const [pageValue, setPageValue] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [controlFormData, setControlFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRowClick = (row) => {
    console.log(row, "e=raws");

    setSelectedRow(row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  // Date range states
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [referenceText, setReferenceText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  // Delete state
  const [deleteId, setDeleteId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseDelete = () => setOpenDelete(false);

  const rowsPerPage = 10;

  // Fetch data from API
  const handleControlFormList = async () => {
    try {
      setLoading(true);
      const res = await PagesIndex.DataService.post(
        PagesIndex.Api.Admin.Get_Control_Form_Filter
      );
      console.log(res, "res123");

      if (res?.data.status === 200) {
        setControlFormData(res?.data?.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching control form data:", error);
    }
  };

  // Call API on component mount
  useEffect(() => {
    handleControlFormList();
  }, []);

  // Set initial search data when controlFormData changes
  useEffect(() => {
    setSearchTerm(controlFormData);
  }, [controlFormData]);

  // Handle Date Range Filtering
  // const handleFilterChange = () => {
  //   const filteredData = controlFormData.filter((item) => {
  //     const userDate = new Date(item.controlForms[0]?.date);
  //     const from = new Date(fromDate);
  //     const to = new Date(toDate);
  //     return userDate >= from && userDate <= to;
  //   });
  //   setSearchTerm(filteredData);
  // };

  const handleFilterChange = async () => {
    // Create the payload for the API
    const payload = {
      fromDate,
      toDate,
      referenceText,
      type: selectedOption || undefined, // Include type only if selected
    };

    try {
      const response = await PagesIndex.DataService.post(
        PagesIndex.Api.Admin.Get_Control_Form_Filter,
        payload
      );
      // Handle the response as needed
      console.log(response, "res786");

      if (response?.data.status === 200) {
        setControlFormData(response?.data?.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      PagesIndex.toast.error(error.response.data.message);
      console.error("Error fetching control form data filter:", error);
    }
  };

  // Handle Deletion
  const onDelete = (id) => {
    setDeleteId(id);
    setOpenDelete(true);
  };

  const deleteUser = async (id) => {
    try {
      const res = await PagesIndex.DataService.delete(
        `${PagesIndex.Api.Admin.Delete_User}/${id}`
      );
      if (res.data.status === 200) {
        PagesIndex.toast.success(res.data.message);
        handleControlFormList(); // Refresh the list after deletion
        handleCloseDelete(); // Close the delete confirmation modal
      }
    } catch (error) {
      PagesIndex.toast.error(error.response.data.message);
    }
  };

  const pageChange = (e, value) => {
    setPageValue(value);
  };

  // Handle Pagination
  useEffect(() => {
    console.log(searchTerm, "searchTerm123");

    const countData = Math.ceil(searchTerm?.length / rowsPerPage);
    setPageCount(countData);

    const indexOfLastRow = pageValue * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const modifiedRows = searchTerm?.slice(indexOfFirstRow, indexOfLastRow);

    console.log(modifiedRows, "modifiedRows");

    setPageData(modifiedRows);

    if (modifiedRows?.length === 0 && pageValue > 1) {
      setPageValue(pageValue - 1);
    }
  }, [pageValue, searchTerm]);

  // Export to Excel
  const exportToExcel = async () => {
    try {
      const response = await PagesIndex.DataService.post(
        PagesIndex.Api.Admin.Get_Control_Form_Export,
        // {},
        {
          responseType: "blob", // Important to specify this for file downloads
        }
      );
      console.log(response, "response blob");

      // const response = await axios.get('YOUR_API_ENDPOINT/export-control-forms', {
      //   responseType: 'blob', // Important to specify this for file downloads
      // });

      // Create a URL for the blob data
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "control_forms.xlsx"); // Set the file name for the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up the DOM
      if (response.data.status === 200) {
        PagesIndex.toast.success(response.data.message);
      }
    } catch (error) {
      PagesIndex.toast.error(error.response.data.message);
    }
  };

  // Handle file import
  const handleFileImport = async (event) => {
    const file = event.target.files[0]; // Get the selected file

    console.log(file, "file 1234");

    if (!file) {
      return; // No file selected, exit early
    }
    const formData = new FormData();
    formData.append("file", file); // Append the file to the form data
    try {
      const response = await PagesIndex.DataService.post(
        PagesIndex.Api.Admin.Get_Control_Form_Bulk_Import,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data
          },
        }
      );

      console.log(response.data, "(response.data 123"); // Handle the response as needed
      // Optionally, show a success message or update the UI
      if (response.data.status === 200) {
        PagesIndex.toast.success(response.data.message);
      }
    } catch (error) {
      PagesIndex.toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Index.Box className="dashboard-content ">
        <Index.Box className="user-list-flex">
          <Index.Box>
            <Index.Box className="user-search-box">
              <Index.Box className="form-group">
                <Index.Typography
                  sx={{ color: "white" }}
                  className="admin-page-title user-list-page-title"
                  component="h2"
                  variant="h2"
                >
                  Control Form
                </Index.Typography>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>

        {/* Filter */}

        <Index.Box className="userlist-btn-flex">
          <Index.Box
            className="form-group"
            sx={{
              // marginTop: "16px",
              // marginBottom: "16px",
              // display: "flex",
              // flexWrap: "wrap",
              // alignItems: "center",
              // gap: 2,
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap", // Keep all items in one row
              gap: 1.5,
              justifyContent: "flex-start", // Align items to the left
              alignItems: "center",
              marginTop: 2,
              marginBottom: 2,
              padding: 2,
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              overflowX: "auto", // Allow horizontal scrolling if necessary
            }}
          >
            <Index.TextField
              type="date"
              onChange={(e) => setFromDate(e.target.value)}
              label="From Date"
              className="form-control"
              sx={{ flex: "1 1 100px", minWidth: "100px" }} // Adjusts flex for responsiveness
            />
            <Index.TextField
              type="date"
              onChange={(e) => setToDate(e.target.value)}
              label="To Date"
              className="form-control"
              sx={{ flex: "1 1 100px", minWidth: "100px" }} // Adjusts flex for responsiveness
            />
            <Index.Box
              className="form-group"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Index.TextField
                onChange={(e) => setReferenceText(e.target.value)} // Set reference text
                className="form-control"
                placeholder="Enter Reference"
                sx={{ flex: "1", minWidth: "150px" }} // Adjusts flex for responsiveness
                variant="outlined" // Optional variant for styling
              />
            </Index.Box>

            <Index.Box className="form-group">
              <Index.TextField
                select
                label={"select Option"}
                value={selectedOption} // Ensure this is correctly set
                onChange={(e) => {
                  setSelectedOption(e.target.value); // Check that this sets the state correctly
                }}
                className="form-control"
                sx={{ flex: "1 1 150px", minWidth: "150px" }} // Adjusts flex for responsiveness
              >
                <Index.MenuItem value={selectedOption} disabled>
                  <em>{selectedOption}</em>
                </Index.MenuItem>
                <Index.MenuItem value="">All</Index.MenuItem>
                <Index.MenuItem value="Siphon de sol">
                  Siphon de sol
                </Index.MenuItem>
                <Index.MenuItem value="Avalor">Avalor</Index.MenuItem>
              </Index.TextField>
            </Index.Box>

            <Index.Box className="form-group">
              <Index.Button
                onClick={handleFilterChange}
                variant="contained"
                sx={{ flexShrink: 0, minWidth: "100px" }} // Prevents the button from shrinking
              >
                Filter
              </Index.Button>
            </Index.Box>

            <Index.Box className="form-group">
              <Index.Button
                onClick={exportToExcel}
                variant="contained"
                sx={{ flexShrink: 0, minWidth: "100px" }} // Prevents the button from shrinking
              >
                Export
              </Index.Button>
            </Index.Box>

            <Index.Box className="form-group">
              <Index.Input
                type="file"
                onChange={handleFileImport}
                id="import-file-input" // Add an ID for reference
                sx={{ display: "none" }} // Completely hide the input
              />
              <Index.Button
                variant="contained"
                component="label"
                htmlFor="import-file-input" // Link button to the hidden input
                sx={{
                  cursor: "pointer",
                  flexShrink: 0,
                  minWidth: "100px", // Adjust minWidth as necessary for better visibility
                  padding: "6px 12px", // Optional: add padding for aesthetics
                }} // Prevents the button from shrinking
              >
                Import
              </Index.Button>
            </Index.Box>
          </Index.Box>
        </Index.Box>

        {/* Filter */}

        {/* start */}

        <Index.Box className="admin-dashboard-list-row">
          <Index.Box sx={{ width: 1 }} className="grid-main">
            <Index.Box
              display="grid"
              className="display-row"
              gridTemplateColumns="repeat(12, 1fr)"
              gap={{ xs: 2, sm: 2, md: 0, lg: 0 }}
            >
              <Index.Box gridColumn="span 12" className="grid-column">
                <Index.Box className="admin-dash-box">
                  <Index.Box
                    sx={{
                      width: "100%",
                      overflow: "hidden",
                      borderRadius: "8px",
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "#ffffff",
                      overflowX: "auto", // Allow horizontal scrolling if necessary
                    }}
                    className="control-table-main page-table-main"
                  >
                    <Index.TableContainer
                      sx={{
                        minHeight: "650px",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                      component={Index.Paper}
                      className="table-container"
                    >
                      <Index.Table
                        stickyHeader
                        aria-label="sticky table"
                        className="table"
                      >
                        <Index.TableHead
                          className="table-head"
                          sx={{
                            backgroundColor: "#4A90E2", // Header color
                            color: "#000",
                            textAlign: "center",
                          }}
                        >
                          <Index.TableRow className="table-row">
                            <Index.TableCell
                              component="th"
                              className="table-th"
                            >
                              No.
                            </Index.TableCell>
                            <Index.TableCell
                              component="th"
                              className="table-th"
                            >
                              Image
                            </Index.TableCell>
                            <Index.TableCell
                              component="th"
                              className="table-th"
                            >
                              Type
                            </Index.TableCell>
                            <Index.TableCell
                              component="th"
                              className="table-th"
                            >
                              Reference
                            </Index.TableCell>
                            <Index.TableCell
                              component="th"
                              className="table-th"
                            >
                              Date
                            </Index.TableCell>
                            <Index.TableCell
                              component="th"
                              className="table-th"
                            >
                              Action
                            </Index.TableCell>
                          </Index.TableRow>
                        </Index.TableHead>

                        <Index.TableBody className="table-body">
                          {loading ? (
                            <Index.TableRow>
                              <Index.TableCell
                                colSpan={6}
                                align="center"
                                className="no-data-cell"
                              >
                                <PagesIndex.UgoLoader
                                  color="#233862"
                                  loading={loading}
                                />
                              </Index.TableCell>
                            </Index.TableRow>
                          ) : (
                            <>
                              {searchTerm?.length > 0 ? (
                                pageData.map((row, ind) => (
                                  <Index.TableRow
                                    key={row?._id}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                      "&:hover": {
                                        backgroundColor: "#f5f5f5",
                                        cursor: "pointer",
                                      },
                                    }}
                                    onClick={() => handleRowClick(row)} // Open modal on row click
                                  >
                                    <Index.TableCell
                                      align="center"
                                      className="table-td"
                                    >
                                      {(pageValue - 1) * rowsPerPage + ind + 1}
                                    </Index.TableCell>
                                    <Index.TableCell
                                      align="center"
                                      className="table-td"
                                    >
                                      <Index.Box className="controllist-data">
                                        <img
                                          alt="img"
                                          src={
                                            row?.FunctionalPhoto.imageUrl
                                              ? `${PagesIndex.imageURL}${row.FunctionalPhoto.imageUrl}`
                                              : `${blankImage}`
                                          }
                                          className="controllist-img"
                                        />
                                      </Index.Box>
                                    </Index.TableCell>
                                    <Index.TableCell
                                      align="center"
                                      className="table-td"
                                    >
                                      {row?.equipment}
                                    </Index.TableCell>
                                    <Index.TableCell
                                      align="center"
                                      className="table-td"
                                    >
                                      {row?.extractedText}
                                    </Index.TableCell>
                                    <Index.TableCell
                                      align="center"
                                      className="table-td"
                                    >
                                      {row?.createdAt.split("T")[0]}
                                    </Index.TableCell>
                                    <Index.TableCell
                                      align="center"
                                      className="table-td"
                                    >
                                      <Index.Box className="userdata-btn-flex">
                                        <Index.Button
                                          className="action-btn"
                                          onClick={(e) => {
                                            e.stopPropagation(); // Prevent opening modal on delete button click
                                            onDelete(e, row?.id);
                                          }}
                                          sx={{
                                            backgroundColor: "transparent",
                                            color: "error.main",
                                            "&:hover": {
                                              backgroundColor:
                                                "rgba(255, 0, 0, 0.1)",
                                            },
                                          }}
                                        >
                                          <Index.DeleteIcon size="small" />
                                        </Index.Button>
                                      </Index.Box>
                                    </Index.TableCell>
                                  </Index.TableRow>
                                ))
                              ) : (
                                <Index.TableRow>
                                  <Index.TableCell
                                    colSpan={6}
                                    align="center"
                                    className="no-data-cell"
                                  >
                                    No Equipment Control Form Data found....
                                  </Index.TableCell>
                                </Index.TableRow>
                              )}
                            </>
                          )}
                        </Index.TableBody>
                      </Index.Table>
                    </Index.TableContainer>
                  </Index.Box>

                  {searchTerm && searchTerm?.length > 0 ? (
                    <Index.Box
                      className="pagination-main"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 2,
                      }}
                    >
                      <Index.Pagination
                        count={pageCount}
                        page={pageValue}
                        onChange={pageChange}
                        variant="outlined"
                        shape="rounded"
                        className="pagination"
                        sx={{
                          "& .MuiPaginationItem-root": { borderRadius: "8px" }, // Rounded edges for pagination
                        }}
                      />
                    </Index.Box>
                  ) : null}

                  {/* Modal for Row Details */}

                  {/* start */}

                  <Index.Modal
                    open={modalOpen}
                    onClose={handleCloseModal}
                    aria-labelledby="row-details-modal"
                    aria-describedby="modal-for-row-details"
                  >
                    {/* Overlay for focus effect */}
                    <Index.Box
                      sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.6)", // Soft dark overlay
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 1300, // Ensures it stays on top
                      }}
                    >
                      <Index.Box
                        sx={{
                          backgroundColor: "#fff",
                          padding: 4,
                          borderRadius: "16px", // Increased for smooth corners
                          width: { xs: "90%", sm: "700px" }, // Dynamic width based on screen size
                          maxHeight: "90vh", // Ensures content does not exceed viewport height
                          overflowY: "auto", // Scroll if content exceeds height
                          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)", // Enhanced box-shadow
                          position: "fixed", // Ensures it's fixed in the center
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)", // Offset the box to center it
                          transition: "all 0.3s ease",
                          zIndex: 1500, // Above the overlay
                        }}
                      >
                        {/* Close Icon */}
                        <Index.IconButton
                          onClick={handleCloseModal}
                          sx={{
                            position: "absolute",
                            top: 15,
                            right: 15,
                            color: "#4A90E2",
                            "&:hover": {
                              backgroundColor: "rgba(74, 144, 226, 0.1)",
                              borderRadius: "50%",
                            },
                          }}
                        >
                          <Index.CloseIcon fontSize="small" />
                        </Index.IconButton>

                        {/* Modal Title */}
                        <Index.Typography
                          id="row-details-modal"
                          variant="h5"
                          component="h2"
                          sx={{
                            textAlign: "center",
                            fontWeight: "600",
                            color: "#4A90E2",
                            marginBottom: 3,
                            letterSpacing: "0.5px",
                          }}
                        >
                          Details
                        </Index.Typography>

                        {/* Inline Type, Reference, Date */}
                        <Index.Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%",
                            mb: 3,
                            p: 2,
                            backgroundColor: "#f9f9f9",
                            borderRadius: "4px", // Soft card-like look
                            boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
                          }}
                        >
                          <Index.Typography
                            sx={{ fontWeight: "500", color: "brown" }}
                          >
                            {/* <strong sx={{ fontWeight: "500" }}> Type:</strong>{" "} */}
                            {selectedRow?.equipment}
                          </Index.Typography>

                          <Index.Typography
                            sx={{ fontWeight: "500", color: "brown" }}
                          >
                            {" "}
                            {/* <strong>Reference:</strong>{" "} */}
                            {selectedRow?.extractedText}
                          </Index.Typography>

                          <Index.Typography
                            sx={{ fontWeight: "500", color: "brown" }}
                          >
                            {" "}
                            {/* <strong>Date:</strong>{" "} */}
                            {selectedRow?.createdAt.split("T")[0]}
                          </Index.Typography>
                        </Index.Box>

                        {/* Photos */}
                        <Index.Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap", // For responsiveness
                            width: "100%",
                            mt: 2,
                            mb: 2,
                          }}
                        >
                          {/* Functional Photo */}
                          <Index.Box
                            component="img"
                            alt="Functional Photo"
                            src={
                              selectedRow?.FunctionalPhoto.imageUrl
                                ? `${PagesIndex.imageURL}${selectedRow.FunctionalPhoto.imageUrl}`
                                : `${blankImage}`
                            }
                            sx={{
                              width: "48%",
                              height: "auto",
                              borderRadius: 4,
                              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                              maxHeight: "200px", // Limit max height for responsiveness
                            }}
                          />

                          {/* Material Photo */}
                          <Index.Box
                            component="img"
                            alt="Material Photo"
                            src={
                              selectedRow?.MaterialPhoto.imageUrl
                                ? `${PagesIndex.imageURL}${selectedRow.MaterialPhoto.imageUrl}`
                                : `${blankImage}`
                            }
                            sx={{
                              width: "48%",
                              height: "auto",
                              borderRadius: 4,
                              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                              maxHeight: "200px", // Limit max height for responsiveness
                            }}
                          />
                        </Index.Box>

                        {/* Control Forms Table */}

                        <Index.Box>
                          <label>Date:</label>
                          <p
                            style={{
                              color: selectedRow?.createdAt ? "green" : "red",
                            }}
                          >
                            {selectedRow?.createdAt}
                          </p>
                          {selectedRow?.equipment == "Siphon de sol" && (
                            <div>
                              <label>Grade en eau:</label>
                              <p
                                style={{
                                  color: selectedRow?.garde_en_eau
                                    ? "green"
                                    : "red",
                                }}
                              >
                                {selectedRow?.garde_en_eau
                                  ? "Conforme"
                                  : "Non Comforme"}
                              </p>
                              <label>Présence Grille:</label>
                              <p
                                style={{
                                  color: selectedRow?.presence_grille
                                    ? "green"
                                    : "red",
                                }}
                              >
                                {selectedRow?.presence_grille ? "Oui" : "Non"}
                              </p>
                              <label>Etat gille:</label>
                              <p
                                style={{
                                  color: selectedRow?.etat_gille
                                    ? "green"
                                    : "red",
                                }}
                              >
                                {selectedRow?.etat_gille
                                  ? "Conforme"
                                  : "Non conforme"}
                              </p>
                              <label>Présence Cloche:</label>
                              <p
                                style={{
                                  color: selectedRow?.presence_cloche
                                    ? "green"
                                    : "red",
                                }}
                              >
                                {selectedRow?.presence_cloche ? "Oui" : "Non"}
                              </p>
                              <label>Etat Cloche:</label>
                              <p
                                style={{
                                  color: selectedRow?.etat_cloche
                                    ? "green"
                                    : "red",
                                }}
                              >
                                {selectedRow?.etat_cloche
                                  ? "Conforme"
                                  : "Non conforme"}
                              </p>
                              <label>Profondeur cloche:</label>
                              <p
                                style={{
                                  color: selectedRow?.profondeur_cloche
                                    ? "green"
                                    : "red",
                                }}
                              >
                                {selectedRow?.profondeur_cloche
                                  ? "> 15 mm"
                                  : "< 15 mm"}
                              </p>
                              <label>Bon écoulement:</label>
                              <p
                                style={{
                                  color: selectedRow?.bon_ecoulement
                                    ? "green"
                                    : "red",
                                }}
                              >
                                {selectedRow?.bon_ecoulement
                                  ? "Conforme"
                                  : "Non conforme"}
                              </p>
                            </div>
                          )}
                          {selectedRow?.equipment == "Avalor" && (
                            <div>
                              <label>Présence Grille:</label>
                              <p
                                style={{
                                  color: selectedRow?.presence_grille
                                    ? "green"
                                    : "red",
                                }}
                              >
                                {selectedRow?.presence_grille ? "Oui" : "Non"}
                              </p>
                              <label>Etat gille:</label>
                              <p
                                style={{
                                  color: selectedRow?.etat_gille
                                    ? "green"
                                    : "red",
                                }}
                              >
                                {selectedRow?.etat_gille
                                  ? "Conforme"
                                  : "Non conforme"}
                              </p>
                              <label>Bon écoulement:</label>
                              <p
                                style={{
                                  color: selectedRow?.bon_ecoulement
                                    ? "green"
                                    : "red",
                                }}
                              >
                                {selectedRow?.bon_ecoulement
                                  ? "Conforme"
                                  : "Non conforme"}
                              </p>
                            </div>
                          )}
                        </Index.Box>
                      </Index.Box>
                    </Index.Box>
                  </Index.Modal>

                  {/* end */}

                  {/* End ROw details Model */}
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
        </Index.Box>

        {/* end */}

        {/* end */}
      </Index.Box>

      <Index.Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-delete modal"
      >
        <Index.Box className="delete-modal-inner-main modal-inner">
          <Index.Box className="modal-circle-main">
            <img
              alt="img"
              onClick={handleCloseDelete}
              src={PagesIndex.Svg.closecircle}
              className="user-circle-img"
            />
          </Index.Box>
          <Index.Typography
            className="delete-modal-title"
            component="h2"
            variant="h2"
          >
            Are you sure?
          </Index.Typography>
          <Index.Typography
            className="delete-modal-para common-para"
            component="p"
            variant="p"
          >
            Do you really want to delete these data?
          </Index.Typography>
          <Index.Box className="delete-modal-btn-flex">
            <Index.Button
              className="modal-cancel-btn modal-btn"
              onClick={handleCloseDelete}
            >
              Cancel
            </Index.Button>
            <Index.Button
              onClick={() => {
                deleteUser(deleteId);
                handleCloseDelete();
              }}
              className="modal-delete-btn modal-btn"
            >
              Delete
            </Index.Button>
          </Index.Box>
        </Index.Box>
      </Index.Modal>
    </>
  );
};

export default ControlForm;
