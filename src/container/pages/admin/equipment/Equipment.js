import { GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx"; // Import XLSX for handling Excel files
import Index from "../Index";
import PagesIndex from "../PagesIndex";
import "./Equipment.css";

const EquipmentList = () => {
  const [pageValue, setPageValue] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const [equipmentListData, setequipmentListData] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDelete = () => setOpenDelete(false);

    // Date range states
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
  

  const handleequipmentList = async (event) => {
    try {
      setLoading(true);
      const res = await PagesIndex.DataService.get(
        PagesIndex.Api.Admin.Get_equipment_Detils
      );
      if (res?.data.status === 200) {
        console.log(res?.data, "aaaa res?.data");
        
        setequipmentListData(res?.data?.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleequipmentList();
  }, []);

  useEffect(() => {
    setSearchTerm(equipmentListData);
  }, [equipmentListData]);


    // Date range filtering
    const handleFilterChange = () => {
      const filteredData = equipmentListData.filter((user) => {
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
    const result = equipmentListData?.filter((item) => {
      const createdAt = new Date(item.createdAt).toLocaleDateString("en-GB");
      const type = item?.type;
      return (
        createdAt.includes(searchQuery) ||
        (type && type.toLowerCase().includes(searchQuery.toLowerCase()))
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

  const deleteEquipment = async (deleteId) => {
    try {
      const res = await PagesIndex.DataService.delete(
        `${PagesIndex.Api.Admin.Delete_Equipment}/${deleteId}`
      );
      if (res.data.status === 200) {
        PagesIndex.toast.success(res.data.message);
        handleequipmentList();
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
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(searchTerm);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "UserList");
    XLSX.writeFile(wb, "Equipment_details.xlsx");
  };

  return (
    <>
      <Index.Box className="dashboard-content ">
        <Index.Box className="user-list-flex">
          <Index.Box>
            <Index.Box className="user-search-box">
              <Index.Box className="form-group">
                <Index.Typography
                  className="admin-page-title user-list-page-title"
                  component="h2"
                  variant="h2"
                >
                  Equipment List
                </Index.Typography>
              </Index.Box>
            </Index.Box>
          </Index.Box>
       <Index.Box className="form-group" sx={{ marginTop: "16px", marginBottom: "16px", display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
  <Index.TextField
    type="date"
    onChange={(e) => setFromDate(e.target.value)}
    label="From Date"
    className="form-control"
    sx={{ flex: '1 1 150px' }} // Adjusts flex for responsiveness
  />
  <Index.TextField
    type="date"
    onChange={(e) => setToDate(e.target.value)}
    label="To Date"
    className="form-control"
    sx={{ flex: '1 1 150px' }} // Adjusts flex for responsiveness
  />
  
  <Index.Box className="form-group">
    <Index.Button 
      onClick={handleFilterChange} 
      variant="contained" 
      sx={{ flexShrink: 1 }} // Prevents the button from shrinking
    >
      Filter
    </Index.Button>
  </Index.Box>

  <Index.Box className="form-group">
    <Index.Button 
      onClick={exportToExcel} 
      variant="contained" 
      sx={{ flexShrink: 1 }} // Prevents the button from shrinking
    >
      Export
    </Index.Button>
  </Index.Box>

  {/* <Index.Box className="form-group">
    <Index.Input
      type="file"
      onChange={handleFileImport}
      hidden
      id="import-file-input" // Add an ID for reference
    />
    <Index.Button
      variant="contained"
      component="label"
      htmlFor="import-file-input" // Link button to the hidden input
      sx={{ cursor: 'pointer', flexShrink: 0 }} // Prevents the button from shrinking
    >
      Import
    </Index.Button>
  </Index.Box> */}
</Index.Box>


<Index.Box className="userlist-btn-flex">
  <Index.Box sx={{ marginBottom: "16px" }} className="user-search-box">
    <Index.Box className="form-group" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Index.TextField
        fullWidth
        onChange={handleSearchChange}
        id="fullWidth"
        autoComplete="off"
        className="form-control"
        placeholder="Search User"
        sx={{ flex: 1, marginRight: '8px' }} // Adjust spacing between input and icon
      />
      <img
        src={PagesIndex.Svg.search}
        className="search-grey-img"
        alt="search grey img"
        style={{ cursor: 'pointer' }} // Optional: to indicate that the icon is clickable
      />
    </Index.Box>
  </Index.Box>
</Index.Box>


        </Index.Box>
        <Index.Box className="admin-dashboard-list-row">
          {/* {loading ? (
              <PagesIndex.UgoLoader color="#233862" loading={loading} />
            ) : ( */}
          <Index.Box sx={{ width: 1 }} className="grid-main">
            <Index.Box
              display="grid"
              className="display-row"
              gridTemplateColumns="repeat(12, 1fr)"
              gap={{ xs: 2, sm: 2, md: 0, lg: 0 }}
              loading={loading} slots={{ toolbar: GridToolbar }} 
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
                      sx={{ maxHeight: "550px" }}
                      component={Index.Paper}
                      className="table-container"
                    >
                      <Index.Table
                        stickyHeader
                        aria-label="sticky table"
                        className="table"
                      >
                        <Index.TableHead className="table-head" sx={{backgroundColor: "gainsboro"}}>
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
                              Type
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

                        <Index.TableBody sx={{margin: 500}} className="table-body">
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
                                      className="table-td"
                                    >
                                      {row?.type}
                                    </Index.TableCell>
                                  
                                    <Index.TableCell
                                      component="td"
                                      variant="td"
                                      className="table-td"
                                    >
                                      {row?.createdAt.split("T")[0]}
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
                                    No equipment found....
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
            Do you really want to delete these equipment?
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
                deleteEquipment(deleteId);
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

export default EquipmentList;
