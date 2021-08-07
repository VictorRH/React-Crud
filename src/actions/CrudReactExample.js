import HttpClient from '../services/HttpClient';


export const AllDatas = (objectPagination) => {
    return new Promise((resolve, eject) => {
        HttpClient.post('/ExampleIdentity/pagination', objectPagination).then(response => {
            //console.log('response all students', response)
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        });
    });
}

export const DeleteStudent = (id) => {
    return new Promise((resolve, eject) => {
        HttpClient.delete(`/ExampleIdentity/${id}`).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        });
    });
}

export const NewStudent = (object) => {
    return new Promise((resolve, eject) => {
        HttpClient.post('/ExampleIdentity', object).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        })
    })
}

export const GetStudentId = (id) => {
    return new Promise((resolve, eject) => {
        HttpClient.get(`ExampleIdentity/${id}`).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        })
    })
}

export const UpdateStudents = (object) => {
    return new Promise((resolve, eject) => {
        HttpClient.put('/ExampleIdentity/', object).then(response => {
            resolve(response);
        }).catch(error => {
            resolve(error.response);
        });
    });
}

