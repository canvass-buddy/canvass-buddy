import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

import styles from "../styles/index.module.css";

const SIGN_UP = gql`
  mutation SignUp($name:String!, $email:String!, $password:String!, $profileImage: ProfileImage!) {
    signUp(name:$name, email:$email, password:$password, profileImage:$profileImage) {
      token
    }
  }
`

export default function Web() {
  const [signUpMutation] = useMutation(SIGN_UP);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState<File>();

  const onSignUp = () => {
    signUpMutation({
      variables:{
        name:'joe',
        email,
        password,
        profileImage:image
      }
    })
  }

  return (
    <div className={styles.container} style={{
      display:'flex',
      flexDirection:'column',
      gap:'1rem'
    }}>
      <h1>Web</h1>
      <img src="http://localhost:9000/profile-images/bc357c9c-12ae-4c72-aac1-59aeaf1a53b1.png" />
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <input type="text" onChange={e => setEmail(e.target.value)} />
      <input type="text" onChange={e => setPassword(e.target.value)} />
      <button onClick={onSignUp}>Sign Up</button>
    </div>
  );
}
