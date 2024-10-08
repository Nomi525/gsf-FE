import React, { useEffect, useState } from "react";
import Index from "../Index";
import PagesIndex from "../PagesIndex";
import "./UserList.css";
import blankImage from "../../../../assets/images/png/blank-imge.png";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import * as XLSX from "xlsx"; // Import XLSX for handling Excel files

const UserList = () => {
  const [pageValue, setPageValue] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [userListData, setUserListData] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDelete = () => setOpenDelete(false);

  // Date range states
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleUserList = async (event) => {
    try {
      setLoading(true);
      const res = await PagesIndex.DataService.get(
        PagesIndex.Api.Admin.Get_UserList
      );
      if (res?.data.status === 200) {
        console.log(res?.data, "aaaa res?.data");

        setUserListData(res?.data?.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUserList();
  }, []);

  useEffect(() => {
    setSearchTerm(userListData);
  }, [userListData]);

  // Date range filtering
  const handleFilterChange = () => {
    const filteredData = userListData.filter((user) => {
      const userDate = new Date(user.createdAt);
      const from = new Date(fromDate);
      const to = new Date(toDate);
      return userDate >= from && userDate <= to;
    });
    setSearchTerm(filteredData);
  };

  // Handle search change
  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    const result = userListData?.filter((item) => {
      const createdAt = new Date(item.createdAt).toLocaleDateString("en-GB");
      const name = item?.name;
      const email = item?.email;
      const date = item?.createdAt;
      // const DOB = item?.DOB;

      return (
        createdAt.includes(searchQuery) ||
        (name && name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (email && email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (date && date.toString().includes(searchQuery))
        // (DOB && DOB.includes(searchQuery))
      );
    });

    setSearchTerm(result);
    setPageValue(1);
  };

  const onDelete = (e, id) => {
    console.log(id, "deleteId");
    console.log(e, "eee deleteId");

    setDeleteId(id);
    setOpenDelete(true);
  };

  const deleteUser = async (deleteId) => {
    try {
      const res = await PagesIndex.DataService.delete(
        `${PagesIndex.Api.Admin.Delete_User}/${deleteId}`
      );
      if (res.data.status === 200) {
        PagesIndex.toast.success(res.data.message);
        handleUserList();
      }
    } catch (error) {
      PagesIndex.toast.error(error.response.data.message);
    }
  };

  const pageChange = (e, value) => {
    setPageValue(value);
  };

  const rowsPerPage = 10;
  useEffect(() => {
    const countData = Math.ceil(searchTerm?.length / rowsPerPage);
    setPageCount(countData);
    const indexOfLastRow = pageValue * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const modifiedRows =
      searchTerm && searchTerm?.slice(indexOfFirstRow, indexOfLastRow);

    setPageData(modifiedRows);
    if (modifiedRows?.length === 0 && pageValue > 1) {
      setPageValue(pageValue - 1);
    }
  }, [pageValue, searchTerm]);

  // Export to Excel
  // const exportToExcel = () => {
  //   const ws = XLSX.utils.json_to_sheet(searchTerm);
  //   const wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, "UserList");
  //   XLSX.writeFile(wb, "UserList.xlsx");
  // };

  // Handle file import
  // const handleFileImport = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   // reader.onload = async (e) => {
  //   //   const data = new Uint8Array(e.target.result);
  //   //   const workbook = XLSX.read(data, { type: "array" });
  //   //   const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  //   //   const jsonData = XLSX.utils.sheet_to_json(worksheet);

  //   //   // Send jsonData to the backend for bulk insert
  //   //   try {
  //   //     const response = await PagesIndex.DataService.post(PagesIndex.Api.Admin.Import_UserList, jsonData);
  //   //     if (response.data.status === 200) {
  //   //       PagesIndex.toast.success(response.data.message);
  //   //       handleUserList(); // Refresh the user list after import
  //   //     }
  //   //   } catch (error) {
  //   //     PagesIndex.toast.error(error.response.data.message);
  //   //   }
  //   // };

  //   // reader.readAsArrayBuffer(file);
  // };

  return (
    <>
      <Index.Box className="dashboard-content ">
        <Index.Box className="user-list-flex">
          <Index.Typography
            sx={{ color: "white" }}
            className="admin-page-title user-list-page-title"
            component="h2"
            variant="h2"
          >
            User List
          </Index.Typography>
        </Index.Box>
        <Index.Box className="admin-dashboard-list-row">
          {/* {loading ? (
              <PagesIndex.UgoLoader color="#233862" loading={loading} />
            ) : ( */}
          <Index.Box sx={{ marginTop: "5px", width: 1 }} className="grid-main">
            <Index.Box
              display="grid"
              className="display-row"
              gridTemplateColumns="repeat(12, 1fr)"
              gap={{ xs: 2, sm: 2, md: 0, lg: 0 }}
              loading={loading}
              slots={{ toolbar: GridToolbar }}
            >
              <Index.Box
                gridColumn={{
                  xs: "span 12",
                  sm: "span 12",
                  md: "span 12",
                  lg: "span 12",
                }}
                className="grid-column"
              >
                <Index.Box className="admin-dash-box">
                  <Index.Box
                    sx={{ width: "100%", overflow: "hidden" }}
                    className="user-table-main page-table-main"
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
                            color: "#000", // White text for contrast
                            textAlign: "center",
                          }}
                        >
                          <Index.TableRow className="table-row">
                            <Index.TableCell
                              component="th"
                              variant="th"
                              className="table-th"
                            >
                              No.
                            </Index.TableCell>

                            <Index.TableCell
                              component="th"
                              variant="th"
                              className="table-th"
                            >
                              Image
                            </Index.TableCell>

                            <Index.TableCell
                              component="th"
                              variant="th"
                              className="table-th"
                            >
                              Name
                            </Index.TableCell>

                            <Index.TableCell
                              component="th"
                              variant="th"
                              className="table-th"
                            >
                              Email
                            </Index.TableCell>
                            <Index.TableCell
                              component="th"
                              variant="th"
                              className="table-th"
                            >
                              Created Date
                            </Index.TableCell>

                            <Index.TableCell
                              component="th"
                              variant="th"
                              className="table-th"
                            >
                              Action
                            </Index.TableCell>
                          </Index.TableRow>
                        </Index.TableHead>

                        <Index.TableBody
                          sx={{ margin: 500 }}
                          className="table-body"
                        >
                          {loading ? (
                            <>
                              {/* <Index.TableRow>
                                  <Index.TableCell
                                    colSpan={10}
                                    align="center"
                                    className="no-data-cell"
                                  >
                                    <PagesIndex.UgoLoader
                                      color="#233862"
                                      loading={loading}
                                    />
                                  </Index.TableCell>
                                </Index.TableRow> */}
                            </>
                          ) : (
                            <>
                              {searchTerm?.length > 0 ? (
                                pageData &&
                                pageData.map((row, ind) => (
                                  <Index.TableRow
                                    key={row?._id}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <Index.TableCell
                                      component="td"
                                      variant="td"
                                      scope="row"
                                      className="table-td"
                                    >
                                      {(pageValue - 1) * rowsPerPage + ind + 1}
                                    </Index.TableCell>

                                    <Index.TableCell
                                      component="td"
                                      variant="td"
                                      scope="row"
                                      className="table-td"
                                      align="center"
                                    >
                                      <Index.Box className="userlist-data">
                                        <img
                                          alt="img"
                                          src={
                                            row?.image
                                              ? `${PagesIndex.imageURL}${row.image}`
                                              : `${blankImage}`
                                          }
                                          className="categorylist-img"
                                        ></img>{" "}
                                      </Index.Box>
                                    </Index.TableCell>

                                    <Index.TableCell
                                      component="td"
                                      variant="td"
                                      className="table-td"
                                    >
                                      {row?.name}
                                    </Index.TableCell>
                                    <Index.TableCell
                                      component="td"
                                      variant="td"
                                      className="table-td"
                                    >
                                      {row?.email}
                                    </Index.TableCell>
                                    <Index.TableCell
                                      component="td"
                                      variant="td"
                                      className="table-td"
                                    >
                                      {row?.createdAt}
                                    </Index.TableCell>
                                    <Index.TableCell
                                      component="td"
                                      variant="td"
                                      className="table-td"
                                    >
                                      <Index.Box className="userdata-btn-flex">
                                        <Index.Button
                                          className="action-btn"
                                          onClick={(e) => onDelete(e, row?.id)}
                                        >
                                          <Index.DeleteIcon
                                            size="small"
                                            color="error"
                                          />
                                        </Index.Button>
                                      </Index.Box>
                                    </Index.TableCell>
                                  </Index.TableRow>
                                ))
                              ) : (
                                <Index.TableRow>
                                  <Index.TableCell
                                    colSpan={10}
                                    align="center"
                                    className="no-data-cell"
                                  >
                                    No user found....
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
                    <Index.Box className="pagination-main">
                      <Index.Pagination
                        count={pageCount}
                        page={pageValue}
                        onChange={pageChange}
                        variant="outlined"
                        shape="rounded"
                        className="pagination"
                      />
                    </Index.Box>
                  ) : null}
                </Index.Box>
              </Index.Box>
            </Index.Box>
          </Index.Box>
          {/* )} */}
        </Index.Box>
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
            Do you really want to delete these User?
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

export default UserList;
