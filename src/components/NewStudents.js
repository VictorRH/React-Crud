import { Container, Grid, TextField, Typography, Card, Button } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { NewStudent } from "../actions/CrudReactExample";

const NewStudents = () => {
    const history = useHistory();
    const [newUser, setNewUser] = useState({
        firstname: '',
        lastname: '',
        subjects: '',
        age: 0,
        phone: '',
        marks: ''
    });


    const valuesInMemory = (e) => {
        const { name, value } = e.target;
        setNewUser(before => ({
            ...before,
            [name]: value
        }));
    }


    //console.log('newUser', newUser);

    const newStudentBtn = (e) => {
        e.preventDefault();

        if (Object.keys(newUser).length === 0 || newUser.age === 0) {
            swal("Error", "Please complete form", "error");
            return;
        }
        NewStudent(newUser).then(response => {
            console.log('response', response);
            if (response?.status === 200) {
                swal("Success", "Successfully registered student", "success");
                history.push('/');
                return;
            } if (response?.status === 400 || response?.status === 404 || response?.status === 500) {
                swal("Error", "Unregistered student", "error");
                return;
            }
        })
    }

    const cancelBtn = () => {
        history.push('/');
    }


    return (
        <form style={{ width: '100%', marginTop: '48px', justifyContent: "center" }}>
            <Container component="main" maxWidth="md">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '18px' }}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={6}>
                            <TextField name="firstname" onChange={valuesInMemory} value={newUser.firstname} variant="outlined" fullWidth placeholder="First Name"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="lastname" onChange={valuesInMemory} value={newUser.lastname} variant="outlined" fullWidth placeholder="Last Name"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="subjects" onChange={valuesInMemory} value={newUser.subjects} variant="outlined" fullWidth placeholder="Subjects"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="age" onChange={valuesInMemory} value={newUser.age} variant="outlined" fullWidth placeholder="Age"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="phone" onChange={valuesInMemory} value={newUser.phone} variant="outlined" fullWidth placeholder="Phone"></TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField name="marks" onChange={valuesInMemory} value={newUser.marks} variant="outlined" fullWidth placeholder="Marks"></TextField>
                        </Grid>
                        <Grid container spacing={4} style={{ margin: 'auto' }}>
                            <Grid item xs={6} sm={6}>
                                <Button type="submit" onClick={newStudentBtn} variant="contained" color="primary" fullWidth>New Student</Button>
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

export default NewStudents;