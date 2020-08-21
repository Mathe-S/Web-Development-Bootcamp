import React from "react";



function footer(){

let year = new Date().getFullYear(); 

 return <footer>
     <p>Copyright © {year} </p>
 </footer>
}

export default footer;