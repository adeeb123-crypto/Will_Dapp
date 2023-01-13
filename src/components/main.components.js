import NavBar from "./NavBar";
import "./particle.css";
import React,  {useState} from "react";
import { Link } from "react-router-dom";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//fs = require('fs');
const path = require('path') 
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
//import GetWeb3 from "./web3.components";
// var Eth = require('web3-eth');

const Web3 = require("web3")
const TX = require("ethereumjs-tx");
require('dotenv').config();
const  ethers = require('ethers');

//const account = process.env.REACT_APP_ACCOUNT;  
const myprivatekey = process.env.REACT_APP_PRIVATE_KEY;
var privateKey = new Buffer(myprivatekey, 'hex')  
const httpurl = process.env.REACT_APP_RPC_HTTP_URL;

const contAdd = "0x6C5B2c5F0a9aD39760a4f4baA1173BbaB85844CC"

const abi = ([
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_payeeAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_payeeShare",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_payeeAge",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_willNumber",
				"type": "uint256"
			}
		],
		"name": "addPayee",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "_executorAddress",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_isActive",
				"type": "bool"
			}
		],
		"name": "addWill",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_enterWillNum",
				"type": "uint256"
			}
		],
		"name": "hasDeceased",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_enterWillNum",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_PayeeAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_updatedPayeeShares",
				"type": "uint256"
			}
		],
		"name": "modifyPayeeShares",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_enterWillNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_payeeNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_updatedPayeeShares",
				"type": "uint256"
			}
		],
		"name": "modifyPayeeSharesByNum",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "by",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_payeeAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_payeeShare",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_payeeAge",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_willNumber",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_payeeCount",
				"type": "uint256"
			}
		],
		"name": "PayeeAdded",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_enterWillNum",
				"type": "uint256"
			}
		],
		"name": "payout",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_enterWillNum",
				"type": "uint256"
			}
		],
		"name": "payoutClaim",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "setApproval",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "by",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "forPayee",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_updatedPayeeShares",
				"type": "uint256"
			}
		],
		"name": "sharesModified",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "by",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "forPayeeNum",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_updatedPayeeShares",
				"type": "uint256"
			}
		],
		"name": "sharesModifiedbyNum",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokens",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_enterWillNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tempshare",
				"type": "uint256"
			}
		],
		"name": "updateShares",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "by",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "_isActive",
				"type": "bool"
			}
		],
		"name": "willAdded",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "_totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "remaining",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenOwner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_willNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_payeeNum",
				"type": "uint256"
			}
		],
		"name": "getPayee",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getTimeStamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_enterWillNum",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "i",
				"type": "uint256"
			}
		],
		"name": "getValidAge",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_enterWillNum",
				"type": "uint256"
			}
		],
		"name": "getValidAgeByAddress",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_enterWillNum",
				"type": "uint256"
			}
		],
		"name": "getWill",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getWillNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "mapPayee",
		"outputs": [
			{
				"internalType": "address",
				"name": "payeeAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "payeeShares",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "payeeAge",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "mapWill",
		"outputs": [
			{
				"internalType": "address",
				"name": "executorAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "fortune",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "safeAdd",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "c",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "safeDiv",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "c",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "safeMul",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "c",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "a",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "b",
				"type": "uint256"
			}
		],
		"name": "safeSub",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "c",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
])



//const web3 = new Web3(new Web3.providers.HttpProvider(httpurl))



// let web3;
function Main(Props){

// const[etherBalance, setEtherBalance] = useState("")
// const[account, setAccount] = useState("")
 const[payeeAddress, setPayeeAddress] = useState("");
 const[payeeShare, setPayeeShare] = useState("");
 const[payeeAge, setPayeeAge] = useState("");
 const[willNumber, setWillNumber] = useState("")
 const[willNumber1, setWillNumber1] = useState("")
 const[willNumber2, setWillNumber2] = useState("")

 const[tempwillno, setTempWillNo] = useState("")

 const[ownerAddress, setOwnerAddress] = useState("");


 const[executionerAddress, setExecutionerAddress] = useState("");
 const[fortune, setFortune] = useState("");
 const[isActive, setIsActive] = useState("");

 const[balanceOf, setBalanceOf] = useState("");

 const[dispadd, setDispAdd] = useState("");
 



//  const onChange = () => {
//     setRecieverAddress( arr => [...arr, `${arr.length}`]);
// };


async function connectWallet(){


	try{
    

		if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
			//const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
			// const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			// const account1 = accounts[0];
			const accounts = await window.ethereum.enable();
			console.log("accounts",accounts);
			//console.log(accounts);
			const provider = await new ethers.providers.Web3Provider(window.ethereum);
			//console.log("Provider",provider);
			const signer = await provider.getSigner();
			console.log("Signer",signer);
			//const signer = account1.getSigner();
			
			const address = await signer.getAddress();
			console.log(address);
	
	
	
	
			//const web3 = new Web3(window.ethereum)
			// setWeb3(web3_)
			//const accounts = await web3.eth.getAccounts()
		}
		else{
			console.log("Error");
		}
	
	
		const web3eth = new Web3(
			Web3.givenProvider 
			  // 'https://goerli.infura.io/v3/5af35e456ff4476cb001058c355c03c9'
		  );
	
		  const callContract = new web3eth.eth.Contract(abi,contAdd)
		  if(web3eth.givenProvider){
		  console.log("Hello Provider Here",web3eth.givenProvider)
		  let address = web3eth.givenProvider.selectedAddress;
		  console.log("address",address)
		  setDispAdd(address)
		//   let result = await callContract.methods.hasDeceased().send({from:address, gas: 1000000})
		//   console.log(result);
		
	
	 
	
	
	
			
	
			
	//    let someResult = await callContract.methods.balanceOf(ownerAddress).send({from:address, gas: 1000000}) 
	//    console.log(someResult)
	//    setBalanceOf(someResult)
	   
	   const willNo = await callContract.methods.getWillNumber().call({from:address, gas: 1000000})

			
		
	   console.log("Will Number: ",willNo);

	   setTempWillNo(willNo)
		  
		  //["0x4B16F549c827Acd04A82D740fC03d1E783D1E8A9","0x8a186d41a4066F85d518885ea85A97E5D45302f1"],[60,40],[1766136639,1766136639]
		  //let someResult = await callContract.methods.addPayee(recieveraddress,[60,40],[1766136639,1766136639]).send({from:address, gas: 1000000})  
	
	
		  }
		  
		}
		catch(error){
			console.log(error);
		}
	
	

	// try{
	// if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
	//  const accounts = await window.ethereum.enable()
	//  //const accounts = await window.ethereum.enable();
	//  const account = accounts[0];
	//  toast("Connected To Metamask")
	// if (window.ethereum) {
	// 	window.web3 = new Web3(window.ethereum);
	// 	await window.ethereum.enable();
	// 	toast("Fucked Metamask")
	//   }
	// }
	//  catch{
	//  	toast("Cannot Connect To Metamask")
	// 	console.log("HElooooooooo");
	// }

	

		//     if (console.everything === undefined)
		// {
		//     console.everything = [];
		
		//     console.defaultLog = console.log.bind(console);
		//     console.log = function(){
		//         console.everything.push({"type":"log", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
		//         console.defaultLog.apply(console, arguments);
		//     }
		//     console.defaultError = console.error.bind(console);
		//     console.error = function(){
		//         console.everything.push({"type":"error", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
		//         console.defaultError.apply(console, arguments);
		//     }
		//     console.defaultWarn = console.warn.bind(console);
		//     console.warn = function(){
		//         console.everything.push({"type":"warn", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
		//         console.defaultWarn.apply(console, arguments);
		//     }
		//     console.defaultDebug = console.debug.bind(console);
		//     console.debug = function(){
		//         console.everything.push({"type":"debug", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
		//         console.defaultDebug.apply(console, arguments);
		//     }
		// }
	
			  
		
		
		
		
}

async function approve(){

try{

//     if (console.everything === undefined)
// {
//     console.everything = [];

//     console.defaultLog = console.log.bind(console);
//     console.log = function(){
//         console.everything.push({"type":"log", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
//         console.defaultLog.apply(console, arguments);
//     }
//     console.defaultError = console.error.bind(console);
//     console.error = function(){
//         console.everything.push({"type":"error", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
//         console.defaultError.apply(console, arguments);
//     }
//     console.defaultWarn = console.warn.bind(console);
//     console.warn = function(){
//         console.everything.push({"type":"warn", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
//         console.defaultWarn.apply(console, arguments);
//     }
//     console.defaultDebug = console.debug.bind(console);
//     console.debug = function(){
//         console.everything.push({"type":"debug", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
//         console.defaultDebug.apply(console, arguments);
//     }
// }

    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        //const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // const account1 = accounts[0];
		const accounts = await window.ethereum.enable();
        console.log("accounts",accounts);
        //console.log(accounts);
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        //console.log("Provider",provider);
        const signer = await provider.getSigner();
        console.log("Signer",signer);
        //const signer = account1.getSigner();
        
        const address = await signer.getAddress();
        console.log(address);




        //const web3 = new Web3(window.ethereum)
        // setWeb3(web3_)
        //const accounts = await web3.eth.getAccounts()
    }
    else{
        console.log("Error");
    }


    const web3eth = new Web3(
        Web3.givenProvider 
          // 'https://goerli.infura.io/v3/5af35e456ff4476cb001058c355c03c9'
      );

      const callContract = new web3eth.eth.Contract(abi,contAdd)
      if(web3eth.givenProvider){
      console.log("Hello Provider Here",web3eth.givenProvider)
      let address = web3eth.givenProvider.selectedAddress;
      console.log("address",address)
    //   let result = await callContract.methods.hasDeceased().send({from:address, gas: 1000000})
    //   console.log(result);
    

 
    


    

    console.log("Owner Address ",executionerAddress);
    console.log("Fortune: ",fortune);



      let someResult = await callContract.methods.approve(ownerAddress,fortune).send({from:address, gas: 1000000})  
      
      //["0x4B16F549c827Acd04A82D740fC03d1E783D1E8A9","0x8a186d41a4066F85d518885ea85A97E5D45302f1"],[60,40],[1766136639,1766136639]
      //let someResult = await callContract.methods.addPayee(recieveraddress,[60,40],[1766136639,1766136639]).send({from:address, gas: 1000000})  
      console.log(someResult)

      }

    }
    catch(error){

		let soe = console.log(error);
        toast(soe)
        
    }
      





}

async function addWill(){


    try{
    

    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        //const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // const account1 = accounts[0];
        const accounts = await window.ethereum.enable();
        console.log("accounts",accounts);
        //console.log(accounts);
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        //console.log("Provider",provider);
        const signer = await provider.getSigner();
        console.log("Signer",signer);
        //const signer = account1.getSigner();
        
        const address = await signer.getAddress();
        console.log(address);




        //const web3 = new Web3(window.ethereum)
        // setWeb3(web3_)
        //const accounts = await web3.eth.getAccounts()
    }
    else{
        console.log("Error");
    }


    const web3eth = new Web3(
        Web3.givenProvider 
          // 'https://goerli.infura.io/v3/5af35e456ff4476cb001058c355c03c9'
      );

      const callContract = new web3eth.eth.Contract(abi,contAdd)
      if(web3eth.givenProvider){
      console.log("Hello Provider Here",web3eth.givenProvider)
      let address = web3eth.givenProvider.selectedAddress;
      console.log("address",address)
    //   let result = await callContract.methods.hasDeceased().send({from:address, gas: 1000000})
    //   console.log(result);
    

 
    
	if(!ownerAddress){
		toast("Please Specify The Owner Address")
	}
	    
	// if(!fortune){
	// 	toast("Please Specify The Fortune")
	// }
	    
	if(!executionerAddress){
		toast("Please Specify The Executioner Address")
	}

	    
	if(isActive){
		toast("Will Is Not Active")
	}


    console.log("Owner Address ",ownerAddress);
    console.log("Fortune: ",fortune);

 
   //fortune = fortune*100000000;
//    setFortune(fortune*100000000)
//    console.log(fortune);

   console.log("Executioner Add ",executionerAddress);
   console.log("IsActive: ",isActive);

   	  //115792089237316195423570985008687907853269984665640564039457584007913129639935

      let someResult0 = await callContract.methods.approve(address	,1000000000000).send({from:address, gas: 1000000})    

	//   let someResult1 = await callContract.methods.balanceOf(ownerAddress).send({from:address, gas: 1000000}) 
	//   console.log(someResult1)
	//   setBalanceOf(someResult1)

      let someResult = await callContract.methods.addWill(executionerAddress,true).send({from:address, gas: 1000000})  
      
      //["0x4B16F549c827Acd04A82D740fC03d1E783D1E8A9","0x8a186d41a4066F85d518885ea85A97E5D45302f1"],[60,40],[1766136639,1766136639]
      //let someResult = await callContract.methods.addPayee(recieveraddress,[60,40],[1766136639,1766136639]).send({from:address, gas: 1000000})  
      console.log(someResult0)
      console.log(someResult)

	  //setTempWillNo(someResult)

      }
      
    }
    catch(error){
        console.log(error);
    }




}

async function getWill(){


    try{
    

    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        //const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        // const account1 = accounts[0];
        const accounts = await window.ethereum.enable();
        console.log("accounts",accounts);
        //console.log(accounts);
        const provider = await new ethers.providers.Web3Provider(window.ethereum);
        //console.log("Provider",provider);
        const signer = await provider.getSigner();
        console.log("Signer",signer);
        //const signer = account1.getSigner();
        
        const address = await signer.getAddress();
        console.log(address);




        //const web3 = new Web3(window.ethereum)
        // setWeb3(web3_)
        //const accounts = await web3.eth.getAccounts()
    }
    else{
        console.log("Error");
    }


    const web3eth = new Web3(
        Web3.givenProvider 
          // 'https://goerli.infura.io/v3/5af35e456ff4476cb001058c355c03c9'
      );

      const callContract = new web3eth.eth.Contract(abi,contAdd)
      if(web3eth.givenProvider){
      console.log("Hello Provider Here",web3eth.givenProvider)
      let address = web3eth.givenProvider.selectedAddress;
      console.log("address",address)
    //   let result = await callContract.methods.hasDeceased().send({from:address, gas: 1000000})
    //   console.log(result);
    

 
    
	if(!ownerAddress){
		toast("Please Specify The Owner Address")
	}
	    


	    



   const willNo = await callContract.methods.getWillNumber().call({from:address, gas: 1000000})
        
    
   console.log("Will Number: ",willNo);
      
      //["0x4B16F549c827Acd04A82D740fC03d1E783D1E8A9","0x8a186d41a4066F85d518885ea85A97E5D45302f1"],[60,40],[1766136639,1766136639]
      //let someResult = await callContract.methods.addPayee(recieveraddress,[60,40],[1766136639,1766136639]).send({from:address, gas: 1000000})  


      }
      
    }
    catch(error){
        console.log(error);
    }




}

async function balanceOff(){

	try{
	
	//     if (console.everything === undefined)
	// {
	//     console.everything = [];
	
	//     console.defaultLog = console.log.bind(console);
	//     console.log = function(){
	//         console.everything.push({"type":"log", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
	//         console.defaultLog.apply(console, arguments);
	//     }
	//     console.defaultError = console.error.bind(console);
	//     console.error = function(){
	//         console.everything.push({"type":"error", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
	//         console.defaultError.apply(console, arguments);
	//     }
	//     console.defaultWarn = console.warn.bind(console);
	//     console.warn = function(){
	//         console.everything.push({"type":"warn", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
	//         console.defaultWarn.apply(console, arguments);
	//     }
	//     console.defaultDebug = console.debug.bind(console);
	//     console.debug = function(){
	//         console.everything.push({"type":"debug", "datetime":Date().toLocaleString(), "value":Array.from(arguments)});
	//         console.defaultDebug.apply(console, arguments);
	//     }
	// }
	
		if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
			//const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
			// const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			// const account1 = accounts[0];
			const accounts = await window.ethereum.enable();
			console.log("accounts",accounts);
			//console.log(accounts);
			const provider = await new ethers.providers.Web3Provider(window.ethereum);
			//console.log("Provider",provider);
			const signer = await provider.getSigner();
			console.log("Signer",signer);
			//const signer = account1.getSigner();
			
			const address = await signer.getAddress();
			console.log(address);
	
	
	
	
			//const web3 = new Web3(window.ethereum)
			// setWeb3(web3_)
			//const accounts = await web3.eth.getAccounts()
		}
		else{
			console.log("Error");
		}
	
	
		const web3eth = new Web3(
			Web3.givenProvider 
			  // 'https://goerli.infura.io/v3/5af35e456ff4476cb001058c355c03c9'
		  );
	
		  const callContract = new web3eth.eth.Contract(abi,contAdd)
		  if(web3eth.givenProvider){
		  console.log("Hello Provider Here",web3eth.givenProvider)
		  let address = web3eth.givenProvider.selectedAddress;
		  console.log("address",address)
		//   let result = await callContract.methods.hasDeceased().send({from:address, gas: 1000000})
		//   console.log(result);
		
	
	 
		
	
	
		
	
		console.log("Owner Address ",ownerAddress);
	
	
	
	
		  let someResult = await callContract.methods.balanceOf(address).call();
		  
		  //["0x4B16F549c827Acd04A82D740fC03d1E783D1E8A9","0x8a186d41a4066F85d518885ea85A97E5D45302f1"],[60,40],[1766136639,1766136639]
		  //let someResult = await callContract.methods.addPayee(recieveraddress,[60,40],[1766136639,1766136639]).send({from:address, gas: 1000000})  
		  setBalanceOf(someResult/100000000)
		  console.log(someResult)
	
		  }
	
		}
		catch(error){
	
			let soe = console.log(error);
			toast(soe)
			
		}
		  
	
	
	
	
	
}

async function myFunction(){
    connectWallet();
    balanceOff();
}



// async function addPayee(){

//     /*const abi = ([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"age","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"uint256"}],"name":"hasDeceased","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"checkAge","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addrs","type":"address[]"},{"name":"_share","type":"uint256[]"},{"name":"_age","type":"uint256[]"}],"name":"addPayee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"checkShares","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"_shares","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"n","type":"uint256"}],"name":"getPayee","outputs":[{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"payeeList","outputs":[{"name":"Address","type":"address"},{"name":"Shares","type":"uint256"},{"name":"Age","type":"uint256"},{"name":"deceased","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTimeStamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"uint256"}],"name":"payout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]) */
    
   

    
//     if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
//         //const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
//         // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//         // const account1 = accounts[0];
//         const accounts = await window.ethereum.enable();
//         console.log("accounts",accounts);
//         //console.log(accounts);
//         const provider = await new ethers.providers.Web3Provider(window.ethereum);
//         //console.log("Provider",provider);
//         const signer = await provider.getSigner();
//         console.log("Signer",signer);
//         //const signer = account1.getSigner();
        
//         const address = await signer.getAddress();
//         console.log(address);




//         //const web3 = new Web3(window.ethereum)
//         // setWeb3(web3_)
//         //const accounts = await web3.eth.getAccounts()
//     }
//     else{
//         console.log("Error");
//     }

    

//     const web3eth = new Web3(
//         Web3.givenProvider 
//           // 'https://goerli.infura.io/v3/5af35e456ff4476cb001058c355c03c9'
//       );

//       const callContract = new web3eth.eth.Contract(abi,contAdd)
//       if(web3eth.givenProvider){
//       console.log("Hello Provider Here",web3eth.givenProvider)
//       let address = web3eth.givenProvider.selectedAddress;
//       console.log("address",address)
//     //   let result = await callContract.methods.hasDeceased().send({from:address, gas: 1000000})
//     //   console.log(result);
    

//     console.log("Reciever Add: ",payeeAddress);
//     console.log("Amount: ",payeeShare);
//     console.log("Age: ",payeeAge);
//     console.log("Will Number: ",willNumber);


//       let someResult = await callContract.methods.addPayee(payeeAddress,payeeShare,payeeAge,willNumber).send({from:address, gas: 1000000})  
      
//       //["0x4B16F549c827Acd04A82D740fC03d1E783D1E8A9","0x8a186d41a4066F85d518885ea85A97E5D45302f1"],[60,40],[1766136639,1766136639]
//       //let someResult = await callContract.methods.addPayee(recieveraddress,[60,40],[1766136639,1766136639]).send({from:address, gas: 1000000})  
//       console.log(someResult)

//       }
      




// }



// async function hasDeceased(){

//     /*const abi = ([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"age","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"uint256"}],"name":"hasDeceased","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"checkAge","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addrs","type":"address[]"},{"name":"_share","type":"uint256[]"},{"name":"_age","type":"uint256[]"}],"name":"addPayee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"checkShares","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"_shares","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"n","type":"uint256"}],"name":"getPayee","outputs":[{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"payeeList","outputs":[{"name":"Address","type":"address"},{"name":"Shares","type":"uint256"},{"name":"Age","type":"uint256"},{"name":"deceased","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTimeStamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"uint256"}],"name":"payout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]) */
    
    
//     try{
//     if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
//         //const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
//         // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//         // const account1 = accounts[0];
//         const accounts = await window.ethereum.enable();
//         console.log("accounts",accounts);
//         //console.log(accounts);
//         const provider = await new ethers.providers.Web3Provider(window.ethereum);
//         //console.log("Provider",provider);
//         const signer = await provider.getSigner();
//         console.log("Signer",signer);
//         //const signer = account1.getSigner();
        
//         const address = await signer.getAddress();
//         console.log(address);




//         //const web3 = new Web3(window.ethereum)
//         // setWeb3(web3_)
//         //const accounts = await web3.eth.getAccounts()
//     }
//     else{
//         console.log("Error");
//     }

    

//     const web3eth = new Web3(
//         Web3.givenProvider 
//           // 'https://goerli.infura.io/v3/5af35e456ff4476cb001058c355c03c9'
//       );

//       const callContract = new web3eth.eth.Contract(abi,contAdd)
//       if(web3eth.givenProvider){
//       console.log("Hello Provider Here",web3eth.givenProvider)
//       let address = web3eth.givenProvider.selectedAddress;
//       console.log("address",address)
//     //   let result = await callContract.methods.hasDeceased().send({from:address, gas: 1000000})
//     //   console.log(result);
    
//     const willNo = await callContract.methods.getWillNumber().call({from:address, gas: 1000000})
    

//     console.log("Will Number: ",willNo);


//       let someResult = await callContract.methods.hasDeceased(willNumber1).send({from:address, gas: 1000000})  
      
//       console.log("Will Number: ",willNumber1);

//       //["0x4B16F549c827Acd04A82D740fC03d1E783D1E8A9","0x8a186d41a4066F85d518885ea85A97E5D45302f1"],[60,40],[1766136639,1766136639]
//       //let someResult = await callContract.methods.addPayee(recieveraddress,[60,40],[1766136639,1766136639]).send({from:address, gas: 1000000})  
//       console.log(someResult)

//       }

//     }
//     catch(error){
//         toast("⚠️Error")
//         console.error(error)
//     }
      




// }

// async function payout(){

//     /*const abi = ([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"age","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"uint256"}],"name":"hasDeceased","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"checkAge","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addrs","type":"address[]"},{"name":"_share","type":"uint256[]"},{"name":"_age","type":"uint256[]"}],"name":"addPayee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"checkShares","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"_shares","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"n","type":"uint256"}],"name":"getPayee","outputs":[{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"payeeList","outputs":[{"name":"Address","type":"address"},{"name":"Shares","type":"uint256"},{"name":"Age","type":"uint256"},{"name":"deceased","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTimeStamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"uint256"}],"name":"payout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]) */
    
   

    
//     if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
//         //const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
//         // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//         // const account1 = accounts[0];
//         const accounts = await window.ethereum.enable();
//         console.log("accounts",accounts);
//         //console.log(accounts);
//         const provider = await new ethers.providers.Web3Provider(window.ethereum);
//         //console.log("Provider",provider);
//         const signer = await provider.getSigner();
//         console.log("Signer",signer);
//         //const signer = account1.getSigner();
        
//         const address = await signer.getAddress();
//         console.log(address);




//         //const web3 = new Web3(window.ethereum)
//         // setWeb3(web3_)
//         //const accounts = await web3.eth.getAccounts()
//     }
//     else{
//         console.log("Error");
//     }

    

//     const web3eth = new Web3(
//         Web3.givenProvider 
//           // 'https://goerli.infura.io/v3/5af35e456ff4476cb001058c355c03c9'
//       );

//       const callContract = new web3eth.eth.Contract(abi,contAdd)
//       if(web3eth.givenProvider){
//       console.log("Hello Provider Here",web3eth.givenProvider)
//       let address = web3eth.givenProvider.selectedAddress;
//       console.log("address",address)
//     //   let result = await callContract.methods.hasDeceased().send({from:address, gas: 1000000})
//     //   console.log(result);
    
//     const willNo = await callContract.methods.getWillNumber().call({from:address, gas: 1000000})
    

//     console.log("Will Number: ",willNo);


//       let someResult = await callContract.methods.payout(willNumber2).send({from:address, gas: 1000000})  
       
//       console.log("Will Number: ",willNumber);

//       //["0x4B16F549c827Acd04A82D740fC03d1E783D1E8A9","0x8a186d41a4066F85d518885ea85A97E5D45302f1"],[60,40],[1766136639,1766136639]
//       //let someResult = await callContract.methods.addPayee(recieveraddress,[60,40],[1766136639,1766136639]).send({from:address, gas: 1000000})  
//       console.log(someResult)

//       }
      




// }




// async function transfer(){

    
//      //const nonce = await web3.eth.getTransactionCount(account,'pending')
//     // console.log(nonce);
//     // const value = web3.utils.toWei(transferAmount.toString(), 'Ether');

//     // const balue = web3.utils.fromWei(value, 'Ether')
    
//     //web3.utils.fromWei(count_to_convert, unit_to_convert_to)
    
//     //Need to add
    
//     const abi = ([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"age","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"uint256"}],"name":"hasDeceased","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"checkAge","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addrs","type":"address[]"},{"name":"_share","type":"uint256[]"},{"name":"_age","type":"uint256[]"}],"name":"addPayee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"checkShares","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"_shares","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"n","type":"uint256"}],"name":"getPayee","outputs":[{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"payeeList","outputs":[{"name":"Address","type":"address"},{"name":"Shares","type":"uint256"},{"name":"Age","type":"uint256"},{"name":"deceased","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTimeStamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"uint256"}],"name":"payout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}])    

//     //const abi1 = JSON.parse(abi);
//     //const abi = fs.readFileSync('erc20_abi.json', 'utf-8');
//     const web3eth = new Web3(
//         Web3.givenProvider 
//           // 'https://goerli.infura.io/v3/5af35e456ff4476cb001058c355c03c9'
//       );
//     //Creating the token contract
    
//     //Local copy of our contract
//     const tokenContract = new web3eth.eth.Contract(abi,"0xc5ec9E0c974dD321513dDaEfC4EccEBB3b25D7fD")
//     let res = await tokenContract.methods.totalSupply().call();
//     console.log("-----------------------",res)

//     //Creating the transaction data
//     //const data = tokenContract.methods.transfer(receiverAddress, value).encodeABI();
         
                  
//     //const Web3 = require('web3');

//     const callContract = new web3eth.eth.Contract(abi,"0xc5ec9E0c974dD321513dDaEfC4EccEBB3b25D7fD")
//     if(web3eth.givenProvider){
//     console.log("89989898",web3eth.givenProvider)
//     let address = web3eth.givenProvider.selectedAddress;
//     console.log("address",address)
//     let result = await callContract.methods.hasDeceased(0).send({from:address, gas: 1000000})
//     console.log(result);

//     // let someResult = await callContract.methods.getValue(recieveraddress,shareamount,age).send({from:address, gas: 1000000})

//       }
   
//         if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
//             //const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
//             // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//             // const account1 = accounts[0];
//             const accounts = await window.ethereum.enable();
//             console.log("accounts",accounts);
//             //console.log(accounts);
//             const provider = await new ethers.providers.Web3Provider(window.ethereum);
//             //console.log("Provider",provider);
//             const signer = await provider.getSigner();
//             console.log("Signer",signer);
//             //const signer = account1.getSigner();
            
//             const address = await signer.getAddress();
//             console.log(address);
    



//             //const web3 = new Web3(window.ethereum)
//             // setWeb3(web3_)
//             //const accounts = await web3.eth.getAccounts()
//         }
//         else{
//             console.log("Error");
//         }
    
    
    

//         // setAddress(accounts[0])
//    // const data = web3.eth.Contract(abi).at(account);
//    //contract.methods.transfer('0xffcf8fdee72ac11b5c542428b35eef5769c409f0', 1).send().then(console.log).catch(console.error);
// //    send().then(console.log).catch(console.error)
   

//     // const transaction = {
        
//     //     'nonce':'0X00',
//     //     'gasLimit': 530640, //changed after EIP-1559 upgrade
//     //     'gasPrice': 200000000, //changed after EIP-1559 upgrade reduced 00
        
        
//     // }
//     // var rawTx = { 'nonce': nonce, 'gasPrice': 200000000, 'gasLimit': 530640, 'from': account, 'data': data}
//     // var tx = new TX(rawTx) 
//     // tx.sign(privateKey) 
//     // const serializedTx = tx.serialize();
//     // var raw  = '0x'+serializedTx.toString('hex')
//     // await web3.eth.sendSignedTransaction(raw , function(err, txHash){ console.log(err, txHash) })   
//     // var rawTx = transaction.rawTransaction;
//     // console.log(transaction)
//     // const signTrx = await web3.eth.accounts.signTransaction(transaction, privatekey);


//     //  web3.eth.sendSignedTransaction(signTrx.rawTransaction, function(error, hash){
//     //      if(error){
//     //          console.log('Something went wrong', error);
//     //      } else{
//     //          console.log('transaction submitted ', hash);
//     //          window.alert('Transaction submitted. Hash : '+hash);
//     //      }
//     //  })
//     //   await window.ethereum.request({method:"eth_sendTransaction",params: transaction}).then((result) => {
//     //       console.log("Somthing Missing");
//     //   }).catch((error) => {
//     //       console.log("Eroor in eth Send");
//     //   } )

// }


// async function getAccount(){
    
//     /*var eth = new Eth(Eth.givenProvider || 'http://127.0.0.1:7545');    */
//     web3 = await GetWeb3();
//     const accounts = await web3.eth.getAccounts();
//     setAccount(accounts[0])
// }




// async function getBalance(){
// const balance = await web3.eth.getBalance(account);
// const etherbalance = web3.utils.fromWei(balance.toString(), 'Ether');

// setEtherBalance(etherbalance)
// }
    
// getAccount();

// getBalance();
  



return(
        <>
        <NavBar/>

        
<div className="sidebyside">

    <div 
    className="align1">
    	
	

	
	
<div className="area" >
            <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
					<li></li>
                    <li></li>
                    <li></li>
					<li></li>
                    <li></li>
                    <li></li>
					<li></li>
                    <li></li>
                    <li></li>
					<li></li>
                    <li></li>
                    <li></li>
					<li></li>
                    <li></li>
                    <li></li>
            </ul>
   
			
        <div className="glassbg1">

    
         <div>
            
            <br/>
            <div style={{fontSize:"3.7rem"}}>
         	 AddWill
             </div>
			 <div>Will ID: {tempwillno}</div>
			 <div>Account: {dispadd}</div>
			
            {/* <br/> 
            <div style={{fontSize:"1.2rem"}}>
                Token Address:
            </div>
            <div>
                <input
                    type="text"
                    style={{height:"1.5vw", width:"30vw"}}
       
                    placeholder="0x0000....."
                />
            </div>
            <br/>
            <div style={{fontSize:"1.2rem"}}>
                Send to :
            </div>
            <div>
                <input
                    type="text"
                    style={{height:"1.5vw", width:"30vw"}}
   
                    placeholder="0x0000....."
                />
            </div>
            <br/>
            <div style={{fontSize:"1.2rem"}}>
                Amount :
            </div> 
            <div>
                <input
                    type="text"
                    style={{height:"1.5vw", width:"5vw"}}
   
                    placeholder="0.0" 
                /> TKN
            </div> 
             <br/> */}
                           {/* <div>
                <input className="inp_f"
                    type="text"
                    style={{height:"3.0vw", width:"32vw"}}
                    value={recieveraddress}
                    onChange={e => setRecieverAddress(e.target.value)}
       
                    // placeholder="0x0000....."
                />
            </div> */}
            <link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/><link href="https://fonts.googleapis.com/css2?family=Courgette&family=Kaushan+Script&family=Prata&display=swap" rel="stylesheet"/>
            

 
        <div>
            {/* <div>Fortune (TFZ Token)</div> */}
			<div>Balance: {balanceOf} TFZ </div>
               
            </div> 
			<div className="connectbtn">
		<button type="submit" onClick={()=>myFunction()} class="btn2">CONNECT</button>
		</div>
			
			
            {/* <div>
                <button className="btn1"
                    type="submit"
                     onClick={() => approve()}
                ><span>APPROVE</span></button>

                <button className="btn"
                    type="submit"
                     onClick={() => transfer()}
                ><span>send</span></button> 
            </div> */}


            <div>
                <div>Attorney Address</div>
                <input className="inp_ff"
                    type="text"
                    style={{height:"3.0vw", width:"32vw"}}
                    defaultValue={executionerAddress}
                    onChange={e => setExecutionerAddress(e.target.value)}
       
                    // placeholder="Share Amount"
                />
            </div>

            {/* <div onChange={e => setIsActive(e.target.value)}>
            <div>Activate Will</div>
                <input className="inp_ff"
                    type="radio"
                    id="1"
                    style={{height:"3.0vw", width:"32vw"}}
                    defaultValue={isActive}
                    
                    
                    />
                   
                <div>
                    <label className="label"  for="1">True</label>
                    </div>
            </div> */}
            <div>
                <button className="btn1"
                    type="submit"
                     onClick={() => addWill()}
                ><span>ADD</span></button>
{/* 
                <button className="btn"
                    type="submit"
                     onClick={() => transfer()}
                ><span>send</span></button> */}
            </div>
        </div> 
    </div>
</div>
</div>



</div>

   <ToastContainer />

        </>
    );
}

export default Main;