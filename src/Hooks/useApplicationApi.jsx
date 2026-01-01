import React from 'react';
import useAxiosSecure from './useAxiosSecure';

const useApplicationApi = () => {
    const axiosSecure = useAxiosSecure();

    const myApplicationsPromise = email => {
        return axiosSecure.get(`/job-applications?email=${email}`)
        .then(res => res.data);
    }

    const myPostedJobsPromise = email => {
        return axiosSecure.get(`/jobs?email=${email}`).then(res => res.data);
    }


    return { 
        myApplicationsPromise,
        myPostedJobsPromise,

    };
};

export default useApplicationApi;