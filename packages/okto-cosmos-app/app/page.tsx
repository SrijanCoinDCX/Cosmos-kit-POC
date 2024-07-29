'use client';

import Image from "next/image";
import osmosisLogo from "../assets/osmo.svg";
import avatarImage from "../assets/osmosis-home-bg-low.png";

import { useChain } from "@cosmos-kit/react";
import { WalletStatus } from "@cosmos-kit/core";

export default function Home() {
  const chainContext = useChain('osmosis');
  const {
    status,
    username,
    address,
    message,
    connect,
    disconnect,
    openView,
    signAmino,
    signDirect,
  } = chainContext;

  const signer = 'cosmos1c6ap9c0dm6jhtkhl9gsum4hmvzugrqr643j7mu'; // Example signer address

  const signDoc = {
    accountNumber: '0', // Account number of the signer
    authInfo: {
      fee: {
        amount: [{ denom: 'uosmo', amount: '500' }], // Example fee amount
        gasLimit: '200000', // Gas limit for the transaction
      },
      signerInfos: [
        {
          publicKey: {
            // The public key of the signer, can be fetched from the chain or key management service
            typeUrl: '/cosmos.crypto.secp256k1.PubKey',
            value: 'A7vB5H...examplePublicKey...fdv=', // Replace with actual base64 encoded public key
          },
          modeInfo: {
            single: { mode: 'SIGN_MODE_DIRECT' }, // Signing mode
          },
          sequence: '0', // Sequence number of the signer
        },
      ],
    },
    bodyBytes: 'CqEBCiEvY29zbW9zLnN0YWtpbmcudjFiZXRhMS5Nc2dTZW5kEmUKLWNvc21vczFjNmFwOWMwZG02amh0a2hsOWdzdW00aG12enVncnFyNjQzajdtdS8yMDAwMDAwMAo0NzIzZmYyNDktYWY5NC00NWE3LWE5YzgtZTc5N2I0MzI2YWEyEgoKAmlvMRD///////////8AAhMKEQoDcmFiEAYKBm1vbmV5' // Base64 encoded transaction body bytes
  };

  const aminoSignDoc = {
    account_number: '0',
    chain_id: 'osmosis-1',
    fee: {
      amount: [{ denom: 'uosmo', amount: '500' }], // Example fee
      gas: '200000',
    },
    memo: 'Example transaction',
    msgs: [
      {
        type: 'cosmos-sdk/MsgSend',
        value: {
          from_address: 'cosmos1c6ap9c0dm6jhtkhl9gsum4hmvzugrqr643j7mu',
          to_address: 'cosmos1xyz...address',
          amount: [{ denom: 'uosmo', amount: '1000' }],
        },
      },
    ],
    sequence: '0',
  }

  // Optional sign options
  const signOptions = {
    preferNoSetFee: false,
    preferNoSetMemo: true,
    disableBalanceCheck: true,
  };



  return (
    <div className="App">
      <header className="App-header">
        {/* <Image src={avatarImage} id="avatarImage" alt="avatarImage" /> */}
        <div className="bg">
          <div className='container'>
            <div>
              <Image src={osmosisLogo} className='logo' alt="logo" />
              <h1>OSMOSIS</h1>
            </div>
            <p>
              <b>OKTO</b> Extension Integration <br /><strong>ChainProvider Test</strong>
            </p>
            {chainContext.status === WalletStatus.Connected
              ? <div className="btn-list">
                <button className='btn' onClick={() => disconnect()}>Disconnect Wallet</button>
              </div>
              : <button className='btn' onClick={() => connect()}>Connect Wallet</button>}

          </div>
        </div>
        {chainContext.status === WalletStatus.Connected
          ? <div>
            <p>
              <b>Status:</b> {chainContext.status} <br />
              <b>Username:</b> {chainContext.username} <br />
              <b>Address:</b> {chainContext.address} <br />
            </p>
            <div className="btn-list">
              <button className='btn' onClick={() => signAmino(signer, aminoSignDoc)}>Sign Amino</button>
              {/* <button className='btn' onClick={() => signDirect(signer, aminoSignDoc)}>Sign Amino</button> */}

            </div>
          </div>
          : <p><b>Status:</b> {chainContext.status} <br /></p>}
      </header>
    </div>
  );
}
