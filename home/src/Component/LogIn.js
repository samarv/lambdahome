import React, { Component } from 'react';
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




export default class LogIn extends Component {
  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };


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

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        {this.props.isSignedIn = this.state.isSignedIn}
        <h1>My App</h1>
        {console.log(firebase.auth().currentUser.displayName)}
        {console.log(firebase.auth().currentUser.email)}
        {console.log(this.props)}
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
      </div>
    );
  }
};

