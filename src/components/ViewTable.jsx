import React, {useState, useEffect} from 'react'
import {Typography} from '@material-ui/core'
import * as XLSX from 'xlsx'

const ViewTable = () => {

const [allData, setAllData] = useState()
const [shetName, setShetName] = useState()
const [choices, setChoices] = useState()
const [headerNames, setHeaderNames] = useState()

const [wb, setWb] = useState()

const [isChoiceOpen, setIsChoiceOpen] = useState(false)

const readFile = async e => {

const theFile = e.target.files[0]
if(!theFile.name.includes("xlsx")) return alert("Invalid Format")

try {
    await new Promise( (resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsArrayBuffer(theFile)
        fileReader.onload = e => {
        const workbook = XLSX.read(e.target.result, {type: "buffer"})
        setWb(workbook)
        const choiceBx = [];
        workbook.SheetNames.forEach( wName => {
            choiceBx.push(wName)
        })
        
        setChoices(choiceBx)
        setIsChoiceOpen(true)

        }
    })
} catch (error) {
    console.log(error)
}

}

const processData = () => {


const wSheet = wb.Sheets[shetName];
const data = XLSX.utils.sheet_to_json(wSheet)

setAllData(data)

}

const insertData = () => (

<div className={shetName ? "nothing" : "to-center"}>
    <label htmlFor="inpFile">
    <Typography style={{cursor: "pointer"}}
    variant="h6" gutterBottom>Insert Your Excel Data</Typography>
    </label>
    <input id="inpFile" type="file" onChange={readFile} />
    
</div>
)

useEffect( () => {
    if(!shetName){
        console.log("wala pang choice")
    }else{
        processData()
    }
   
}, [shetName])

useEffect( () => {
    let hNames;
    if(!allData){
        console.log("no data for now")
    }else{
        allData.forEach( (ad, idx) => {
            hNames = Object.keys(ad)
        })
       setHeaderNames(hNames)
    }

}, [allData])

    return (
        <div className="view-table">
            {!allData ? insertData() : <React.Fragment></React.Fragment>}
            {!isChoiceOpen ? <React.Fragment></React.Fragment> : 
            <div className="choice-bx">
            
                    {choices.map( (chs, idx) => (

                    <h5 className="chs-h5" onClick={e => {
                    setShetName(e.target.innerText)

                    }} key={idx}>{chs}</h5>

                    ))}
            </div>
            }
            <table className="vt-table">
                <thead>
                    <tr>
                        {!headerNames ? <React.Fragment></React.Fragment> : 
                        headerNames.map( (hnam,idx) => <th className="vt-th" key={idx}>{hnam}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {!allData ? <React.Fragment></React.Fragment> :
                    allData.map( (adata,idx) => 
                    <tr key={idx}>
                       {headerNames ? headerNames.map( (hea, index) => <td>{adata[headerNames[index]]}</td>) : console.log("wala pa headers")}
                    </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ViewTable
