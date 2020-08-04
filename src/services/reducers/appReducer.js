import appActionTypes from "../types";

export const initialState = {
    data: null,
    isFetchingJobs:false,
    isFetchingJobSuccess: false,
    isFetchingJobFailed:false,
    fetchJobError: null

};

export default (state = initialState, action) => {
    switch (action.type) {
        case appActionTypes.fetchJobs.onGoing:
            return {
                ...state,
                data: null,
                isFetchingJobs:true,
                isFetchingJobSuccess: false,
                isFetchingJobFailed:false,
                fetchJobError: null
            }
        case appActionTypes.fetchJobs.success:
            return {
                ...state,
                data: action.data,
                isFetchingJobs:false,
                isFetchingJobSuccess: true,
                isFetchingJobFailed:false,
                fetchJobError: null
            }
        case appActionTypes.fetchJobs.failure:
            return {
                ...state,
                data: null,
                isFetchingJobs:false,
                isFetchingJobSuccess: false,
                isFetchingJobFailed:true,
                fetchJobError: action.error
            }
        default:
            return state;
    }
};