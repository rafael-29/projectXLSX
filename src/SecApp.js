import React, {useState, useEffect} from 'react'

import DownloadTable from 'react-html-table-to-excel'
import { exData } from './extraData';
import * as XLSX from 'xlsx';



const SecApp = () => {

const [allData, setAllData] = useState()

const [formData, setFormData] = useState({
FirstName: "", LastName: "", Department: "",
Age: "", ID: ""
})


const analyzeFile = e => {

const fileReader = new FileReader()

fileReader.readAsArrayBuffer(e.target.files[0])
fileReader.onload = e => {
const workbook = XLSX.read(e.target.result, {type: "buffer"});

const data = XLSX.utils.sheet_to_json(workbook.Sheets["SecondShet"])

setAllData(data);

}
}

const submitForm = e => {
    setAllData([...allData, formData])
}

const handleChange = e => {
const {name, value} = e.target
    setFormData({...formData, [name]: value})
}

useEffect( () => {
setAllData(exData)
}, [])

return(
<React.Fragment>
<input type="file" onChange={analyzeFile} />

<div className="emp-form">
  <h1>Employee Details</h1>

  <input type="text" placeholder="FirstName" name="FirstName"
  value={formData.FirstName} onChange={handleChange} />
<br /><br />
<input type="text" placeholder="LastName" name="LastName"
  value={formData.LastName} onChange={handleChange} />
<br /><br />
<input type="text" placeholder="Department" name="Department"
  value={formData.Department} onChange={handleChange} />
<br /><br />
<input type="text" placeholder="Age" name="Age"
  value={formData.Age} onChange={handleChange} />
<br /><br />
<input type="text" placeholder="ID" name="ID"
  value={formData.ID} onChange={handleChange} />
</div>
<br /><br />
<button onClick={submitForm}>Submit Data</button>

<br />
<br />
<br />

<h2> {allData === undefined ? "" : "All Items"}</h2>
<div>
    <table id="the-table">
        <thead>
        <tr> 
            <th>ID</th>
            <th>First Name </th>
            <th>Last Name </th>
            <th>Department</th>
        </tr>
        </thead>
        <tbody>
        {allData === undefined ? <tr></tr> : 
        allData.map( d => (
            <tr key={d.ID}>
                <td>{d.ID}</td>
                <td>{d.FirstName}</td>
                <td>{d.LastName}</td>
                <td>{d.Department}</td>
            </tr>
        ))}
        </tbody>
    </table>
</div>

{/* <ReactDown
style={{ width: "20px"}}
table="the-table"
filename="Examplez"
sheet="Shoot"
buttonText="Export Data"
/> */}
<DownloadTable
table="the-table"
filename="projectExe"
sheet="shetOne"
buttonText="Proceed"
/>

</React.Fragment>
)
}
export default SecApp