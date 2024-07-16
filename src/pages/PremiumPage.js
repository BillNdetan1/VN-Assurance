import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import abi from "./utils/VN.json";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";




const PremiumPage = () => {

  const [currentAccount, setCurrentAccount] = useState("");

  const contractAddress = "0x1c6bd9C471CA4F318aD4AC803622AA2A799C436e";

  const contractABI = abi.abi;

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have an ETH wallet!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      // Pulls array of accounts
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  // Allows to connect an auth'd wallet
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("No ETH wallet deteected");
        return;
      }

      // Makes request to connect to ETH account (Metamask wallet)
      console.log("ETH detected.")
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected", accounts[0]);

      // Set the currAccount state within this component to know the address of the account
      setCurrentAccount(accounts[0]);
      
      //Connect wallet to student
      const provider = new ethers.BrowserProvider(ethereum)
      const signer = await provider.getSigner();
      const towsonContract = new ethers.Contract(contractAddress, contractABI, signer);
      const createStudentTxn = await towsonContract.accountAssign();
      console.log("Waiting to be validated...", createStudentTxn.hash);

      await createStudentTxn.wait();
      console.log("Validated: ", createStudentTxn.hash);



    } catch (error) {
     alert("Wallet could not be connected. Refresh Page.")
      console.log(error)
    }
  }
 
// Enroll function
const enrollsep = async () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.BrowserProvider(ethereum)
      const signer = await provider.getSigner();
      const towsonContract = new ethers.Contract(contractAddress, contractABI, signer);

      //let count = await towsonContract.getTotalStudents();
      //console.log("Total number of students: ", Number(count));

      const enrollTxn = await towsonContract.register(1);
      console.log("Waiting to be validated...", enrollTxn.hash);

      await enrollTxn.wait();
      console.log("Validated: ", enrollTxn.hash);
      window.alert("You have registered for Sepolia!");

    } else {
      console.log("ETH window obj doesn't exist...");
    }
  } catch (error) {
    console.log(error);
  }
}


//See enrolled addresses function
const seeAttendees = async () => { 
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.BrowserProvider(ethereum)
      const signer = await provider.getSigner();
      const towsonContract = new ethers.Contract(contractAddress, contractABI, signer);

      //let count = await towsonContract.getTotalStudents();
      //console.log("Total number of students: ", Number(count));

      let seeAttendeesTxn = await towsonContract.getRoster(1).length;
      if (seeAttendeesTxn === 0){
        console.log("No Validators");
        window.alert("No Current Validators");
      }
      else
      window.alert("Networks Live Nodes: ", seeAttendeesTxn);


    // let count = await towsonContract.getAttendees();
     // console.log("Total student count: ", count);

    } else {
      console.log("ETH window obj doesn't exist...");
    }
  } catch (error) {
    console.log(error);
  }
}

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])
    
    
    
    
    
    return(
        <Authenticator>
            
           
          
    

            {({ signOut }) => (
                <div>
                   
                    
                    
                    <h1>Welcome to your VN Validator</h1>
                 
                    {!currentAccount && (
          <button onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

          <button onClick={enrollsep}>
            Register for Sepolia
          </button> 
          <button onClick={seeAttendees}>
            See Live Sepolia Nodes
          </button>
            
                    <h3>Thank you for signing up!</h3>
                    <button onClick={signOut}>Sign Out</button>
                </div>

            )}
        </Authenticator>


    );
};

export default PremiumPage;