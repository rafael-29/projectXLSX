import React, {useState, useEffect} from 'react'
import * as XLSX from 'xlsx';
import theEmps from './Emps.xlsx'





const App = () => {

const [items, setItems] = useState();

const [formData, setFormData] = useState({
  FirstName: "", LastName: "", Department: "",
  Age: "", ID: ""
})

const [workBok, setWorkBok] = useState()

const [AllSheets, setAllSheets] = useState()

const [shetName, setShetName] = useState("")





const converFile = (file) => {

 if(!file.name.includes("xlsx")) return alert("Not A Valid Format")

  return new Promise( (resolve, reject) => {

    const fileReader = new FileReader();

    fileReader.readAsArrayBuffer(file)

    fileReader.onload = (e) => {

      const wb = XLSX.read(e.target.result, {type: "buffer"});

      const wbName = wb.SheetNames[0];

      const ws = wb.Sheets[wbName];

      const data = XLSX.utils.sheet_to_json(ws);

      resolve(data);

    }

    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

const readFile = async (e) => {
 
  try {
  const theFile = await converFile(e.target.files[0])

  setItems(theFile);

  } catch (error) {
    console.log(error)
  }

  
}

// const renderItems = () => {
//   return items.map( item => (
//     <div key={item.ID}>
//       <h2>{item.FullName}</h2>
//     </div>
//   ))
// }

const handleChange = e => {
  const {name, value} = e.target

  setFormData({...formData, [name]: value})
}

const submitForm = () => {
// const theX = JSON.parse(localStorage.getItem("theExcel"))
// theX[shetName].push(formData);

// const toJSon = JSON.stringify(theX[shetName])

// XLSX.utils.sheet_add_json(workBok.Sheets[shetName], toJSon)
// XLSX.writeFile(workBok, "Emps.xlsx")
// console.log(workBok)

const wb = XLSX.read(theEmps);

console.log(wb)

}

const analyzeFile = e => {
//   console.log(e)
// let wb;
// const workSheet = {};
//   const fileReader = new FileReader()

//   fileReader.readAsArrayBuffer(e.target.files[0])

//   fileReader.onload = e => {
//    wb = XLSX.read(e.target.result, {type: "buffer"});
//    setWorkBok(wb);
//     for(const sheetnam of wb.SheetNames){

//       workSheet[sheetnam] = XLSX.utils.sheet_to_json(wb.Sheets[sheetnam])
     
//     }
    
//   localStorage.setItem("theExcel", JSON.stringify(workSheet))
//   console.log(workSheet)
    
//   }


}

useEffect( () => {
// const other = XLSX.read(theEmps);
// console.log(other)
}, [])

return(
<React.Fragment>

<h3>Enter Which File To Add</h3>
<input type="text" className="sheetName" value={shetName}
 onChange={e => setShetName(e.target.value)} />

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
</React.Fragment>
)
}

export default App;



// import React from 'react'
// import * as XLSX from 'xlsx'

// const App = () => {



// // const readFile = file => {

// //   if(!file.name.includes("xlsx")) return alert("Not A Valid Format");

// //   const theResult = new Promise((resolve, reject) => {

// //     const fileReader = new FileReader();

// //     fileReader.readAsArrayBuffer(file)

// //     fileReader.onload = (e) => {
    
// //       const bufferArray = e.target.result;

// //        const wb = XLSX.read(bufferArray, {type: "buffer"} );

// //       const wsname=wb.SheetNames[0];

// //       // const ws=wb.Sheets[wsname];

// //       // const data = XLSX.utils.sheet_to_json(ws);

// //       // resolve(data);

     
// //       // console.log("Starts Here");
// //       console.log(bufferArray);
// //        console.log(wb)
// //       console.log(wsname)
// //       // console.log(ws)

// //     }

// //     fileReader.onerror = (error) => {
// //       reject(error);
// //     }

// //   })

// //   theResult.then((da) =>{
// //     console.log(da)
// //   })
// //   .catch(error => alert(error));
// // }

// const convertFile = (file) => {
//   return new Promise((resolve, reject) => {

//     const fileReader = new FileReader();

//     fileReader.readAsArrayBuffer(file);

//     fileReader.onload = e => {
     
//      const wb = XLSX.read(e.target.result, {type: "buffer"})

//      const wbName = wb.SheetNames[0]

//      const ws = wb.Sheets['employees']

//      const data = XLSX.utils.sheet_to_json(ws);

//      console.log(ws);
//      console.log(data);
     

//     }

//     fileReader.onerror = error => {
//       reject(error)
//     }
//   })
// }

// const readFile = async file =>{
  
 
 

//   try {
//     const theFile = await convertFile(file)

//     console.log(theFile);
//   } catch (error) {
//     console.log(error)
//   }

// }

// return(
// <React.Fragment>

// <input type="file" onChange={e => {
//   readFile(e.target.files[0]);
// }} />


// </React.Fragment>
// )
// }

// export default App;