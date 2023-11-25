import './App.css';
import Navigation from './Components/Navigation/Navigation';
//import Logo from './Components/Logo/Logo.js'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm.js';
import Rank from './Components/Rank/Rank.js'
import Facerecognition from './Components/Facerecognition/Facerecognition.js';
//import Clarifai from 'clarifai';
//import Background from './Components/Particles/Particles.js';
import Partikel from './Components/Particles/Particles.js';
import React from 'react';
import Signin from './Components/Sign In/Signin.js';
import Register from './Components/Register/Register.js';



///////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input. Change these strings to run your own example.
//////////////////////////////////////////////////////////////////////////////////////////////////

// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '14640c21e8d64a11a3b8be543048a270';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'clarifai';       
const APP_ID = 'main';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
//const IMAGE_URL = 'https://t1.pixers.pics/img-1fb6f67c/poster-brad-pitt.jpg?H4sIAAAAAAAAA3WOS27EIBBEr4Ml7G6DbcA3mN3cwOI7ceIPAiYZ5fTBirKMetFdJVXXg-eRdfBg_VF8gn11bvMQ1q2qPCef129PkHI1NnN1N4KIzXx--mTTGQljtO05o5NkdGSymb90De46fZC3UmKeATLv4vqq3-qyGeyegWEvACWMSmrrjROq12yJbS76cDq5VmArXiN28XhQvKb5QxGIVFwIJa07qUxnbSvkPT4a-Kfx94aagvsNBAeOl1juN8E5LmGQnCk3KYXWMmNcGJQMAwtGc8GQLaMR2mg3OaEnv3Q_rDkDmzIBAAA=';

///////////////////////////////////////////////////////////////////////////////////
// YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
///////////////////////////////////////////////////////////////////////////////////



// NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
// https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
// this will default to the latest version_id






class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  componentDidMount(){
    fetch('http://localhost:4000')
    .then(response => response.json())
    .then(console.log)
  }

  onInputChange = (event) => { 
      this.setState({input: event.target.value});

  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
    
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  

  onButtonSubmit = () => {

    this.setState({imageUrl: this.state.input})


    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": this.state.input
                  }
              }
          }
      ]
  });
  
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };


    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    //.then(response => this.calculateFaceLocation(response))
    .then(response => response.json())
    .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
    .catch(error => console.log('error', error));




  
    

  

  }

  onRouteChange = (route) => {
    if( route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
      this.setState({route: route});
  }


  render (){
    return (
      <div className="App">
        <div className='particles'>
        <Partikel />
        </div>
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        
        { //Conditional Operator = return irgendwas ? true : false;
          this.state.route === 'home' 
        ? <div>
          <Rank />
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
          <Facerecognition imageUrl={this.state.imageUrl} box={this.state.box}/> 
          </div>
          : (
            this.state.route === 'signin' 
            ?  <Signin onRouteChange={this.onRouteChange} />
            :  <Register onRouteChange={this.onRouteChange} />
          )

        }
        
        
      </div>
    );
}
}

export default App;
