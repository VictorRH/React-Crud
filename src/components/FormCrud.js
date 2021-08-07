import { Button, Grid, Hidden, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from "@material-ui/core";

const FormCrud = ({ responseData, setTextSearchStorage, btnDelete, changeTotalElements, changePage, paginationRequest }) => {


    const { data } = responseData;
    if (!data) return null;

    // console.log('Form Crud responseData', data[0]?.totalRecords);

    return (
        <div style={{ padding: "10px", width: "100%" }}>
            <Grid container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                <Grid item xs={12} sm={4} md={6}>
                    <TextField fullWidth
                        name="textSearchStorage"
                        variant="outlined"
                        label="search student in table"
                        // inputProps={{ style={ backgroundColor: "black", color: "white" } }}
                        // InputLabelProps={{ style={ backgroundColor: "black", color: "white" } }}
                        onChange={e => setTextSearchStorage(e.target.value)}
                    >
                    </TextField>
                </Grid>
            </Grid>
            <TableContainer >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell aling="left" style={{ fontWeight: "bold" }}>Firstname</TableCell>
                            <TableCell aling="left" style={{ fontWeight: "bold" }}>Lastname</TableCell>
                            <TableCell aling="left" style={{ fontWeight: "bold" }}>Subjects</TableCell>
                            <TableCell aling="left" style={{ fontWeight: "bold" }}>Age</TableCell>
                            <Hidden mdDown>
                                <TableCell aling="left" style={{ fontWeight: "bold" }}>Phone</TableCell>
                                <TableCell aling="left" style={{ fontWeight: "bold" }}>Marks</TableCell>
                                <TableCell aling="left" style={{ fontWeight: "bold" }}>Date Created</TableCell>
                            </Hidden>
                            <TableCell aling="center" colSpan={2} style={{ fontWeight: "bold" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {responseData.status == 200 ?
                            Object.keys(data[0]?.studentList).map((students, index) => (
                                // console.log('data table', data[0]?.studentList[students])

                                <TableRow key={index}>
                                    <TableCell align="left" >{data[0]?.studentList[students]?.firstname}</TableCell>
                                    <TableCell align="left" >{data[0]?.studentList[students]?.lastname}</TableCell>
                                    <TableCell align="left" >{data[0]?.studentList[students]?.subjects}</TableCell>
                                    <TableCell align="left" >{data[0]?.studentList[students]?.age}</TableCell>
                                    <Hidden mdDown>
                                        <TableCell align="left" >{data[0]?.studentList[students]?.phone}</TableCell>
                                        <TableCell align="left" >{data[0]?.studentList[students]?.marks}</TableCell>
                                        <TableCell align="left" >{new Date(data[0]?.studentList[students]?.datecreated).toLocaleString()}</TableCell>

                                    </Hidden>
                                    <TableCell align="left">
                                        <Button variant="contained" size="small" color="primary">
                                            Edit
                                        </Button>
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button variant="contained" onClick={() => btnDelete(data[0]?.studentList[students]?.id)} size="small" color="secondary" >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))

                            :
                            <TableRow>
                                <TableCell align="justify" colSpan={8} >
                                    {responseData?.data?.error?.message ?? "database students is emtpy"}
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
                {responseData?.status == 200 ?

                    <TablePagination style={{ border: '1px solid white' }} rowsPerPageOptions={[1, 5, 15]}
                        component="div"
                        labelRowsPerPage="students table"
                        count={data[0]?.totalRecords}
                        rowsPerPage={paginationRequest.PageSize}
                        page={paginationRequest.PageNumber}
                        onPageChange={changePage}
                        onRowsPerPageChange={changeTotalElements}
                    >


                    </TablePagination>
                    : null


                }


            </TableContainer>
        </div>
    );
}

export default FormCrud;
