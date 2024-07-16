import { Authenticator } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import React, { useEffect, useState } from "react";
import abi from "./src/utils/VN.json";
import { ethers } from "ethers";

const PremiumPage = () => {
    
    const [companyNamme, setcompanyNamme] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");

  const contractAddress = "0xb4693a1CF36c35De9AEd728FE69ec4F99e214Ff1";

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
  // Add company input
  const handleInputChange = (event) => {
    setcompanyNamme(event.target.value);
  };
  // Add company function
  const addCompany = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.BrowserProvider(ethereum)
        const signer = await provider.getSigner();
        const towsonContract = new ethers.Contract(contractAddress, contractABI, signer);
        
        //let count = await towsonContract.getTotalStudents();
        //console.log("Total number of students: ", Number(count));

        if (companyNamme.trim() !== '') {
       
          const addCompanytxn = await towsonContract.add(companyNamme);
          
        console.log("Waiting to be validated...", addCompanytxn.hash);

        await addCompanytxn.wait();
        console.log("Validated: ", addCompanytxn.hash);

        //count = await towsonContract.getTotalStudents();
        //console.log("Total student count: ", Number(count));
      } else {
        console.log("Company name cannot be empty.");
      }
      } else {
        console.log("ETH window obj doesn't exist...");
      }
    } catch (error) {
      console.log(error);
    }
}
// Enroll function
const enroll = async () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.BrowserProvider(ethereum)
      const signer = await provider.getSigner();
      const towsonContract = new ethers.Contract(contractAddress, contractABI, signer);

      //let count = await towsonContract.getTotalStudents();
      //console.log("Total number of students: ", Number(count));

      const enrollTxn = await towsonContract.enroll();
      console.log("Waiting to be validated...", enrollTxn.hash);

      await enrollTxn.wait();
      console.log("Validated: ", enrollTxn.hash);

    } else {
      console.log("ETH window obj doesn't exist...");
    }
  } catch (error) {
    console.log(error);
  }
}
// Unenroll function
const unenroll = async () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.BrowserProvider(ethereum)
      const signer = await provider.getSigner();
      const towsonContract = new ethers.Contract(contractAddress, contractABI, signer);

      //let count = await towsonContract.getTotalStudents();
      //console.log("Total number of students: ", Number(count));

      const unenrollTxn = await towsonContract.unenroll();
      console.log("Waiting to be validated...", unenrollTxn.hash);

      await unenrollTxn.wait();
      console.log("Validated: ", unenrollTxn.hash);


    // let count = await towsonContract.getAttendees();
     // console.log("Total student count: ", count);

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

      let seeAttendeesTxn = await towsonContract.getAttendees();
      if (seeAttendeesTxn.length === 1){
        console.log("No one is enrolled")
      }
      else
      console.log("Student Addresses: ", seeAttendeesTxn);


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
            
            {!currentAccount && (
          <button onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
            
            
            {({ signOut }) => (
                <div>
                    <h1>Welcome to your CVN Validator</h1>
                    <h3>Thank you for signing up!</h3>
                    <button onClick={signOut}>Sign Out</button>
                </div>

            )}
        </Authenticator>


    );
};

export default PremiumPage;