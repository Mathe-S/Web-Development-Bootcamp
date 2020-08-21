import React, { useState } from "react";
import Header from "./header";
import Footer from "./footer"
import Note from "./Note";
import CreateArea from "./createarea";

function App(){

    const [notes, setNotes] = useState([]);

    function addNote(note) {
         
        setNotes(prevState => {
            return  [...prevState, note]
        });
        
     }

     function deleteNote(id){
        console.log(id);
        setNotes(prevState => {
            return  prevState.filter((item, index) => index!==id);
        });
        
     }


 return <div>
 <Header />
      <CreateArea onAdd={addNote}/>
      {notes.map((item, index) => (<Note key={index} id={index}  title={item.title} content={item.content} deleteNote={deleteNote} />
      ))}
      
      <Footer />
 </div>
}

export default App;