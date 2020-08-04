import apis from "../apis";
import appActionTypes from "../types"

/********************************************************************
 *
 * Action Creators
 *
 ********************************************************************/
export const fetchJobs = (data) => {
    return (dispatch) => {
        dispatch(actionFetchingJobs())
        apis.appApis.fetchJobs(data)
            .then((result)=>{
                dispatch(actionFetchingJobsSuccess(result))})
            .catch((error)=>{dispatch(actionFetchingJobsFailure(error))})
    };
};

/********************************************************************
 *
 * Action Dispatcher
 *
 ********************************************************************/
const actionFetchingJobs = () =>
    createDispatchObject(appActionTypes.fetchJobs.onGoing, null, null);
const actionFetchingJobsSuccess = (data) =>
    createDispatchObject(appActionTypes.fetchJobs.success, data, null);
const actionFetchingJobsFailure = (error) =>
    createDispatchObject(appActionTypes.fetchJobs.failure, null, error);

function createDispatchObject(action, data, error) {
    return {type: action, data: data, error: error};
}