import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return(
        <div>
        <p className="f3"> 
            {'Diese Webapplikation erkennt Gesichter in Bildern!'}
        </p>
        <p className="f4">
            {'Probieren Sie es aus.'}
        </p>
        <div className="center">
            <div className="form center pa4 br3 shadow-5">
                <input placeholder="Bildlink einfügen." className='f4 pa2 w-70 center' type="text" onChange={onInputChange}/>
                <button className="w-30 grow f4 link ph3 pv2 dib white bg-purple" onClick={onButtonSubmit}>Scannen</button>
            </div>

            
        </div>
        </div>
    );
}


export default ImageLinkForm;