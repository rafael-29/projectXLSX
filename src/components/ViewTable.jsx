import React, {useState} from 'react'
import {Typography} from '@material-ui/core'
import * as XLSX from 'xlsx'

const ViewTable = () => {

const [allData, setAllData] = useState()

const readFile = () => {

}

const insertData = () => (
<div className="to-center">
    <label for="inpFile">
    <Typography style={{cursor: "pointer"}}
    variant="h6" gutterBottom>Insert Your Excel Data</Typography>
    </label>
    <input id="inpFile" type="file" onChange="readFile" />
</div>
)

    return (
        <div className="view-table">
            {!allData ? insertData() : <React.Fragment></React.Fragment>}
        </div>
    )
}

export default ViewTable
