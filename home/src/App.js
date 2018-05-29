// React core.
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'; // This uses CSS modules.
//react router
import { Route } from 'react-router-dom'


//components
import Member from './Component/Member'

//firebase
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

var config = {
  apiKey: "AIzaSyC2CtFTamSm_frnxNAsG7PR_PXXcHSo_1g",
  authDomain: "lambdahome-ca96b.firebaseapp.com",
  databaseURL: "https://lambdahome-ca96b.firebaseio.com",
  projectId: "lambdahome-ca96b",
  storageBucket: "lambdahome-ca96b.appspot.com",
  messagingSenderId: "930250855005"
};
firebase.initializeApp(config);


const InitialState = {
  isSignedIn: false,
  name: '',
  email: '',
  github: '',
  linkedin: '',
  instagram: ''
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {...InitialState}
  }

  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  signout= () => {
    firebase.auth().signOut();
  }


  render() {
    if (!this.state.isSignedIn) {
      return (
        <div className="Mycontainer">
          <div className="logoContainer">
            <img className = "lambdaLogo" alt="" src={require('./logo.png')} />
            {/* <p>    Home </p> */}
          </div>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        <Member signout={this.signout} />
        {console.log(firebase.auth().currentUser.displayName)}
        {console.log(firebase.auth().currentUser.email)}
        {console.log(this.props)}
        
        {/* <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <a onClick={() => firebase.auth().signOut()}>Sign-out</a> */}
      </div>
    );
  }
}

export default App;
