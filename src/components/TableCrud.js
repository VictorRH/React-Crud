import { CardContent, Container, CssBaseline, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { AllDatas, DeleteStudent } from '../actions/CrudReactExample';
import SpinnerDatas from '../Spinner/SpinnerDatas';
import ControlTyping from '../Tool/ControlTyping';
import FormCrud from './FormCrud';
import swal from 'sweetalert';

const TableCrud = () => {

    const [responseData, setResponseData] = useState([]);

    const [textSearchStorage, setTextSearchStorage] = useState("");
    const typingSearchText = ControlTyping(textSearchStorage, 900);

    const [paginationRequest, setPaginationRequest] = useState({
        StudentStorage: '', PageNumber: 0, PageSize: 5
    });

    const allStudents = React.useCallback(async () => {
        const abortUserStorage = new AbortController();

        let searchStudents = "";
        let pageVarianteSearch = paginationRequest.PageNumber + 1;
        if (typingSearchText) {
            searchStudents = typingSearchText;
            pageVarianteSearch = paginationRequest.PageNumber + 1;
        }

        const objectPaginationRequest = {
            StudentStorage: searchStudents,
            PageNumber: pageVarianteSearch,
            PageSize: paginationRequest.PageSize
        }

        const responseAllStudentsPagination = await AllDatas(objectPaginationRequest);
        setResponseData(responseAllStudentsPagination);
        return () => abortUserStorage.abort();

    }, [paginationRequest, typingSearchText]);




    useEffect(() => {
        allStudents();

    }, [paginationRequest, typingSearchText, allStudents])


    const btnDelete = (id, e) => {
        if (id === undefined) {
            swal("Error!", "The student not found!", "error");
            return;
        }
        DeleteStudent(id).then(response => {
            if (response?.status === 200) {
                allStudents();
                swal("Deleted!", "student is deleted!", "success");
                return;
            } if (response?.status === 400 || response?.status === 500 || response?.status === 404) {
                swal("Error!", "The student was not deleted!", "warning");
                return;
            }
        })
    }

    const changePage = (event, newPage) => {
        setPaginationRequest((before) => ({
            ...before,
            PageNumber: parseInt(newPage)
        }));
    }

    const changeTotalElements = (event) => {
        setPaginationRequest((before) => ({
            ...before,
            PageSize: parseInt(event.target.value),
            PageNumber: 0
        }))
    }

    return (
        <Container component="main" maxWidth="md">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <CssBaseline />
                <CardContent>
                    <Typography>Example Crud React With Asp net core</Typography>
                </CardContent>
            </div>

            {
                !responseData?.data ? <SpinnerDatas /> :
                    <FormCrud
                        responseData={responseData}
                        setTextSearchStorage={setTextSearchStorage}
                        btnDelete={btnDelete}
                        paginationRequest={paginationRequest}
                        changePage={changePage}
                        changeTotalElements={changeTotalElements}
                    />
            }

        </Container>

    );
}

export default TableCrud;