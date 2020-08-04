import React from 'react';
import './App.css';
import {bindActionCreators} from "redux";
import {connect, useSelector} from "react-redux";
import actions from "./services/actions";
import JobQueryComponent from "./components/jobQueryComponent";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/styles";
import SearchResultComponent from "./components/searchResultComponent";

const useStyles = makeStyles((theme) => ({
  loading:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
}));

function App(props) {
  const selector = useSelector(state => state);
  const classes = useStyles();
  function isLoading() {
    return selector?.appState?.isFetchingJobs
  }
  return (
      <div>
        <JobQueryComponent onQuery={props.appActions.fetchJobs}/>
        {
          isLoading()?
              <div className={classes.loading}><CircularProgress /></div>
              :
              <SearchResultComponent data={selector?.appState?.data ?? []}/>
        }
      </div>
  );
}

const mapStateToProps = (state) => {
  return {appState: state.appState};
};

const mapDispatchToProps = (dispatch) => {
  return {
    appActions: bindActionCreators(actions.appActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);