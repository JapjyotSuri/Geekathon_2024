import {
  GithubAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate=useNavigate()
  const provider = new GithubAuthProvider();
  provider.addScope('repo');
  const [Token, setToken] = useState("");
  const [Logged, setLogged] = useState(false);
  async function login() {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        console.log(result.user.accessToken);
        const username= result.user.displayName.replace(/\s+/g, '').trim();
        console.log(username)
       // GitHub username or organization name
        const token = result.user.accessToken; // Your GitHub personal access token
        async function fetchRepos() {
          const url = `https://api.github.com/users/${username}/repos`; // For a user
          // const url = `https://api.github.com/orgs/${username}/repos`;  // For an organization
          const response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
          });
          if (response.ok) {
            const repos = await response.json();
            console.log("Repositories:", repos);
            navigate('/',{state: {repos: repos}})

          } else {
            console.error(
              "Error fetching repositories:",
              response.status,
              response.statusText
            );
          }
        }
        fetchRepos();
 
        
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // useEffect(() => {
  //     const fetchRedirectResult = async () => {
  //         try {
  //             const result = await getRedirectResult(auth);
  //             if (result) {
  //                 const credential = GithubAuthProvider.credentialFromResult(result);
  //                 if (credential) {
  //                     // Access Token
  //                     const token = credential.accessToken;
  //                     setToken(token)
  //                     console.log('Access token:', token);
  //                 }

  //                 // The signed-in user info
  //                 const user = result.user;
  //                 console.log('User:', user);
  //             }
  //         } catch (error) {
  //             console.log('Error getting redirect result:', error);
  //         }
  //     };

  //     fetchRedirectResult();
  // }, []);

  return (
    <div>
      {Logged ? (
        <h1>Logged in</h1>
      ) : (
        <button onClick={login}>Github Login</button>
      )}
    </div>
  );
};

export default Login;
