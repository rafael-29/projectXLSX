import React, {useState, useEffect} from 'react'
import {TextField, Typography, Button, Grid} from '@material-ui/core'
import * as XLSX from 'xlsx'
import ReactToExcel from 'react-html-table-to-excel'

const CreateTable = () => {

const [tableName, setTableName] = useState() //useStateTableName
const [headers, setHeaders] = useState([]) //useState headers
const [curData, setCurData] = useState([])

const [exactTd, setExactTd] = useState([])

const [localTd, setlocalTd] = useState(JSON.parse(localStorage.getItem("alltd")))
const [localHeaders, setLocalHeaders] = useState(JSON.parse(localStorage.getItem("localheader")))

let theBox = {}

const createHeader = () => {
    setHeaders([...headers, tableName])
    setTableName("")
}

const saveData = () => {
    if(!localHeaders){
        localStorage.setItem("localheader", JSON.stringify(headers))
        setLocalHeaders(JSON.parse(localStorage.getItem("localheader")))
    }
}

const renderNoLocalMenu = () => (
<div className="text-container">
    <Typography variant="h6">Enter Table Header Names</Typography>
    <TextField onChange={e => setTableName(e.target.value)}
    style={{marginBottom: "10px"}} value={tableName}
    variant="outlined" label="Header Name"
    size="small" fullWidth />
   
    <Grid style={{
    display: "flex",
    justifyContent: 'space-around',
    alignItems: "center",   
    }}>
        <Grid item>
            <Button size="small"
            variant="contained" color="secondary">Clear</Button>
        </Grid>
        <Grid item>
        <Button size="small" onClick={createHeader}
            variant="outlined" color="primary">Create</Button>
        </Grid>
        {!headers.length? <React.Fragment></React.Fragment> : 
        <Grid item>
        <Button onClick={saveData} style={{background: "limegreen", color: "#f5f5f5"}} 
        variant="contained" size="small">DONE</Button>
        </Grid>
        }
    </Grid>
    
</div>
)

const renderHaveLocalMenu = () => (
<div className="text-container">
    <Grid style={{
    display: "flex",
    justifyContent: 'space-around',
    alignItems: "center",   
    }}>
        <Grid item>
            <Button size="medium" onClick={() =>{
                 localStorage.removeItem("localheader")
                 localStorage.removeItem("alltd")
                 setLocalHeaders(JSON.parse(localStorage.getItem("localheader")))
                 setlocalTd(JSON.parse(localStorage.getItem("alltd")))
                 setHeaders([])
                 setCurData([])
                 setExactTd([])
            }}
            variant="contained" color="secondary">DELETE TABLE</Button>
        </Grid>
        <Grid item>
        <Button size="medium" onClick={createHeader}
            variant="outlined" color="primary">UPDATE TABLE</Button>
        </Grid>
    </Grid>
    
</div>
)


const renderTd = () => {
   return localHeaders.map( (localhead, idx) => (
    <div className="local-tdbx" key={idx}>
        <input className="ordry-inp" type="text" placeholder={localhead} />
        <button className="ordry-btn" onClick={e => {

        if(!e.target.parentElement.children[0].value.length) return alert("Fill Up")
        
        if(!curData.length){
        const theText = e.target.parentElement.children[0].value;

        setCurData([...curData, theText])
        }else{
            const theText = e.target.parentElement.children[0].value;

            setCurData([...curData, theText])
        }
        }}>+</button>
    </div>
    ))
}




const processTheTable = () => {

    const littleBox = []
    

    localHeaders.map( (lhead, idx) => {
     
    littleBox.push(curData[idx])
       
    })
    
    if(!exactTd.length){
        if(localTd === null){
            setExactTd([...exactTd, littleBox])
            setCurData([])
        }else{
            setExactTd([...JSON.parse(localStorage.getItem("alltd")), littleBox])
            setCurData([])
        }
        
    }else{
        setExactTd([...exactTd, littleBox])
        setCurData([])
    }
    
   
   
}
useEffect( () => {
    if(!exactTd.length){
        console.log("no table data saved")
    }else{
        localStorage.setItem("alltd", JSON.stringify(exactTd))
        setlocalTd(JSON.parse(localStorage.getItem("alltd")))
    }
    
  
}, [exactTd])
    return (
        <div className="create-table">
      
            <div className="top-table">
               
            {!localHeaders ? renderNoLocalMenu() : renderHaveLocalMenu()}
            
            </div>
            
            <table className="ct-table" id="theTable">
                <thead>
                    <tr>
                    {localHeaders ? localHeaders.map((localhead, idx) => (
                        <th style={{
                            paddingBottom: "7px",
                            borderBottom: "1px solid#0e153a",
                            paddingRight: "20px",
                            fontSize: "1.4rem",
                            color: "#0e153a"
                      }} key={idx}>{localhead}</th> 
                    )) :
                    !headers.length ? <th></th> : headers.map((head,idx) => (
                        <th style={{
                            paddingBottom: "7px",
                            borderBottom: "1px solid#0e153a",
                            paddingRight: "20px",
                            fontSize: "1.4rem",
                            color: "#0e153a"
                      }} key={idx}>{head}</th>      
                    ))}
                    </tr>
                </thead>
                <tbody>
                        {!curData.length ? <React.Fragment></React.Fragment> :
                        <tr>
                            {curData.map( (cur, idx) => <td key={idx} className="local-td">{cur}</td>)}
                        </tr>
                        }
                      {!localTd ? <React.Fragment></React.Fragment> : 
                      localTd.map( (exact, idx) => (
                        <tr key={idx}>
                            {exact.map( (theTd, index) => <td className="local-td" key={index}>{theTd}</td>)}
                        </tr>
                    ))
                      }
                </tbody>
                
            </table>
            
            <div className="bottom-table">
                
                {!localHeaders ? <React.Fragment></React.Fragment> : renderTd()}

                <div className="bot-table-two">
                {!localHeaders ? <React.Fragment></React.Fragment> :
                <React.Fragment>

                    
                   
                        <Button onClick={processTheTable}
                        variant="contained" size="small" 
                        style={{background: "limegreen", color: "white", marginRight: '5px'}}
                        >ADD</Button>
                        {!localTd ? <React.Fragment></React.Fragment> :
                        <ReactToExcel 
                        table="theTable"
                        filename="examnow"
                        sheet="Shetka"
                        buttonText="Download"
                        />
                        }


                </React.Fragment>
             }
             </div>
            

           
            
            </div>

           

        </div>
    )
}

export default CreateTable
