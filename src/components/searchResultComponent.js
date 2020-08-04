import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import moment from "moment";
import CustomizedDialogs from "./jobDescriptionDialog";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy].toLowerCase() < a[orderBy].toLowerCase()) {
        return -1;
    }
    if (b[orderBy].toLowerCase() > a[orderBy].toLowerCase()) {
        return 1;
    }
    return 0;
}

function timeComparator(a, b, orderBy) {
    return Date.parse(b[orderBy]) - Date.parse(a[orderBy]);
}

function getComparator(order, orderBy) {
    if(!orderBy){
        return (a, b) => 0
    }
    if(orderBy === 'created_at'){
        return order === 'desc'
            ? (a, b) => timeComparator(a, b, orderBy)
            : (a, b) => -timeComparator(a, b, orderBy);
    }
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {id: 'company', numeric: false, label: 'Company'},
    {id: 'title', numeric: true, label: 'Title'},
    {id: 'created_at', numeric: true, label: 'Created At'},
    {id: 'type', numeric: true, label: 'Type'},
];

function EnhancedTableHead(props) {
    const {classes, order, orderBy, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            hideSortIcon={!orderBy}
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

SearchResultComponent.propTypes = {
    data: PropTypes.array.isRequired
};

export default function SearchResultComponent(props) {
    const {data} = props;
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('company');
    const [openJobDescriptionDialog, setOpenJobDescriptionDialog] = React.useState(false);
    const [selectedJob, setSelectedJob] = React.useState("");

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        const isDesc = orderBy === property && order === 'desc';
        if(isDesc){
            setOrder(undefined);
            setOrderBy(undefined);
            return
        }
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return !data || data.length === 0 ? <div/> : (
        <div className={classes.root}>
            <CustomizedDialogs
                open = {openJobDescriptionDialog}
                setOpen ={setOpenJobDescriptionDialog}
                message={selectedJob}
            />
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size='small'
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {stableSort(data, getComparator(order, orderBy)).map((row, index)=> getTableRow(row, index, (message)=>{
                                setOpenJobDescriptionDialog(true);
                                setSelectedJob(message);
                            }))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
}

/**
 * "id", "type", "url", "created_at", "company", "company_url", "location",
 * "title", "description", "how_to_apply", "company_logo"
 */
function getTableRow(row, index, onClick) {
    const labelId = `enhanced-table-checkbox-${index}`;
    return (
        <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={row.company + index}
            onClick={()=>onClick(row.description)}
        >
            <TableCell component="th" id={labelId} scope="row">
                {row.company}
            </TableCell>
            <TableCell>{row.title}</TableCell>
            <TableCell>{
                moment(row.created_at).format('DD MMM YYYY - hh:mm a')
            }</TableCell>
            <TableCell>{row.type}</TableCell>
        </TableRow>
    );
}