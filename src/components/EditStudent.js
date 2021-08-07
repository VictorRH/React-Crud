import { Container, Grid, TextField, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { GetStudentId, UpdateStudents } from "../actions/CrudReactExample";
import SpinnerDatas from "../Spinner/SpinnerDatas";

const EditStudent = (props) => {

    const history = useHistory();
    const [updateUser, setUpdateUser] = useState({
        id: props.match.params.id,
        firstname: '',
        lastname: '',
        subjects: '',
        age: 0,
        phone: '',
        marks: ''
    });

    const valuesInMemory = (e) => {
        const { name, value } = e.target;
        setUpdateUser(before => ({
            ...before,
            [name]: value
        }));
    }
    useEffect(() => {
        GetStudentId(props.match.params.id).then(response => {
            if (response?.status === 200) {
                setUpdateUser(response.data);
            } if (response?.status === 400 || response?.status === 404) {
                swal("Error", "user not found", "error");
            }
        })
    }, [])


    const cancelBtn = () => {
        history.push('/');
    }

    const updateBtn = (e) => {
        e.preventDefault();
        updateUser.id = props.match.params.id;
        if (Object.keys(updateUser).length === 0 || updateUser.age === 0 || !updateUser.id) {
            swal("Error", "data incorrect", "error");
            return;
        }
        console.log('datas update', updateUser);

        UpdateStudents(updateUser).then(response => {
            if (response.status === 200) {
                swal("Success", "Data updated successfully", "success");
                history.push('/');
                return;
            } if (response?.status === 400 || response?.status === 404 || response?.status === 500) {
                swal("Error", "user data was not updated", "error");
                return;
            }
        })
    }


    // console.log('updateUser', updateUser);

    return (
        <form style={{ width: '100%', marginTop: '48px', justifyContent: "center" }}>
            <Container component="main" maxWidth="md">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '18px' }}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={6}>
                            <TextField name="firstname" value={updateUser.firstname} onChange={valuesInMemory} variant="outlined" fullWidth placeholder="First Name">
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="lastname" onChange={valuesInMemory} value={updateUser.lastname} variant="outlined" fullWidth placeholder="Last Name">
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="subjects" onChange={valuesInMemory} value={updateUser.subjects} variant="outlined" fullWidth placeholder="Subjects">
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="age" onChange={valuesInMemory} value={updateUser.age} variant="outlined" fullWidth placeholder="Age">
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="phone" onChange={valuesInMemory} value={updateUser.phone} variant="outlined" fullWidth placeholder="Phone">
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="marks" onChange={valuesInMemory} value={updateUser.marks} variant="outlined" fullWidth placeholder="Marks">
                            </TextField>
                        </Grid>
                        <Grid container spacing={4} style={{ margin: 'auto' }}>
                            <Grid item xs={6} sm={6}>
                                <Button type="submit" onClick={updateBtn} variant="contained" color="primary" fullWidth>Update Student</Button>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <Button type="submit" onClick={cancelBtn} variant="contained" fullWidth>Cancel</Button>
                            </Grid>
                        </Grid>
                    </Grid>



                </div>
            </Container>
        </form>

    );
}

export default EditStudent;