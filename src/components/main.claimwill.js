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
	}
])

function Main3(Props){
    const[payeeAddress, setPayeeAddress] = useState("");
    const[payeeShare, setPayeeShare] = useState("");
    const[payeeAge, setPayeeAge] = useState("");
    const[willNumber, setWillNumber] = useState("")

    

    const[willNumber2, setWillNumber2] = useState("")

    async function payout(){

        /*const abi = ([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"age","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"uint256"}],"name":"hasDeceased","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"checkAge","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_addrs","type":"address[]"},{"name":"_share","type":"uint256[]"},{"name":"_age","type":"uint256[]"}],"name":"addPayee","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"checkShares","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeSub","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"_shares","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeDiv","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeMul","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[{"name":"n","type":"uint256"}],"name":"getPayee","outputs":[{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"payeeList","outputs":[{"name":"Address","type":"address"},{"name":"Shares","type":"uint256"},{"name":"Age","type":"uint256"},{"name":"deceased","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getTimeStamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"n","type":"uint256"}],"name":"payout","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"a","type":"uint256"},{"name":"b","type":"uint256"}],"name":"safeAdd","outputs":[{"name":"c","type":"uint256"}],"payable":false,"stateMutability":"pure","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}]) */
        
       
    
        
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
        
        const willNo = await callContract.methods.getWillNumber().call({from:address, gas: 1000000})
        
    
        console.log("Will Number: ",willNo);
    
    
          let someResult = await callContract.methods.payout(willNumber2).send({from:address, gas: 1000000})  
           
          console.log("Will Number: ",willNumber);
    
          //["0x4B16F549c827Acd04A82D740fC03d1E783D1E8A9","0x8a186d41a4066F85d518885ea85A97E5D45302f1"],[60,40],[1766136639,1766136639]
          //let someResult = await callContract.methods.addPayee(recieveraddress,[60,40],[1766136639,1766136639]).send({from:address, gas: 1000000})  
          console.log(someResult)
    
          }
          
    
    
    
    
    }
    


    return(
        <>
        <div className="align4">
        <div className="glassbg4">
        <div>
                
                <br/>

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
                    
                <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:display=swap" rel="stylesheet"></link>
               

                    <div style={{fontSize:"3.7rem"}}>
                Claim Will
                </div>
                    {/* <div>

                    <div>Will Number</div>
                    <input className="inp_f"
                        type="text"
                        style={{height:"3.0vw", width:"32vw"}}
                        value={willNumber1}
                        onChange={e => setWillNumber1(e.target.value)}
           
                        // placeholder="Share Amount"
                    />
                </div> */}
                <div>
                <div>Will ID</div>
                    <input className="inp_f"
                        type="text"
                        style={{height:"3.0vw", width:"32vw"}}
                        value={willNumber2}
                        onChange={e => setWillNumber2(e.target.value)}
           
                        // placeholder="Share Amount"
                    />
                </div>

 
                <div>
                    {/* <button className="btn"
                        type="submit"
                         onClick={() => hasDeceased()}
                    ><span>Deceased</span></button> */}
    
                    <button className="btn"
                        type="submit"
                         onClick={() => payout()}
                    ><span>PAYOUT</span></button>
                    </div>

      
            </div> 
                
        </div>
        </div>

        </>

    )
}

export default Main3;