import './App.css';
import { getAuth,signInWithPopup,GoogleAuthProvider,signOut } from "firebase/auth";
import initializeAuthentication from './firebase/Firebase.init';
import {useState} from 'react';

initializeAuthentication();

const provider = new GoogleAuthProvider();
function App() {
 const [user,setUser]  = useState({})
  const handleGoogleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth,provider)
    .then(result => {
      const {displayName,email,photoURL}= result.user;
      const loggedInuser = {

      name:displayName,
      email:email,
      photo:photoURL

      }
      setUser(loggedInuser)
    
  })
}
const handleSignOut = () =>{
  const auth = getAuth();
  signOut(auth).then(() => {
  setUser({});
  }).catch((error) => {
   
  });

}
  return (
    <div className="App">
      {
        !user.name ?
        <div>
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
      </div>:
      
      <button onClick={handleSignOut}>Sign Out</button>
      
}
      <br></br>
      {
        user.name && <div>
<h2>Welcome Dear {user.name}</h2>
<img src={user.photo}></img>

          </div>
      }
    </div>
  );
}
export default App;
