import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './Header'

import CreateTable from './components/CreateTable'
import ViewTable from './components/ViewTable'

import "./Main.css"



const Main = () => {



return(
<Router>

<Header />

<Route path="/" exact component={CreateTable} />
<Route path="/view" component={ViewTable} />

</Router>
)
}

export default Main;