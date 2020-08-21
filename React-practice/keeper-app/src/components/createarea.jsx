import React, {useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

function CreateArea(props) {

    const [isExpanded, setExpanded] = useState(false);

    const [inputTxt, setinputTxt] = useState({
        title: "",
        content: ""
    });

    function setTitle(event){
        const {name, value} = event.target
        setinputTxt(prevItem => {
            return {
                ...prevItem,
                [name]: value
            }
        });
    }

    function addNote(event) {
        event.preventDefault();
        props.onAdd(inputTxt);
        setinputTxt({
            title: "",
        content: ""
        });
     }

     function expand() {
        setExpanded(true);
      }

  return (
    <div>
      <form className="create-note">
     {isExpanded && ( <input name="title" placeholder="Title" value= {inputTxt.title} onChange= {setTitle}/> )}
        <textarea name="content" onClick={expand} placeholder="Take a note..." rows={isExpanded ? 3 : 1} value= {inputTxt.content} onChange= {setTitle} />
        <Zoom in={isExpanded}>
          <Fab onClick={addNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;