# ZeroWallet aka ZeroW: A disposable wallet for Ethereum
ZeroWallet uses go-ethereum underneath. It can create keypairs with or without password. Sign transactions for you. Deploy transactions to various etehreum network.

[![Gitter](https://badges.gitter.im/Ethential/wallet.svg)](https://gitter.im/Ethential/wallet?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Discord chat](https://img.shields.io/discord/722971683388129290?color=7389D8&logo=discord&logoColor=ffffff)](https://discord.gg/87sE7Bm)

#### Build
```
cd android
./gradlew assembleRelease
```
## Downloads
* Download apk from IPFS — https://gateway.ipfs.io/ipfs/QmSziuA9wfxfA1thfdswgb3KfjE3sF7QRmeaXBax4zuDGb
* Download apk from google drive — https://drive.google.com/file/d/1WnLUHSCTsaLCx_ZVsClb1BpWjP4vVzID/view?usp=sharing

## Usage

**Step 1: Load an unsigned transaction**
<p align="center">
  <img src="https://user-images.githubusercontent.com/13261372/91479242-ca149c00-e8be-11ea-83af-a7a9131ba5b5.png" height="400">
</p>

**Step 2: Select network, change parameters, sign transaction**

<p align="center">
  <img src="https://user-images.githubusercontent.com/13261372/91479256-cc76f600-e8be-11ea-8a59-7c64e4e9c714.png" height="400">
  <img src="https://user-images.githubusercontent.com/13261372/91479259-cc76f600-e8be-11ea-9832-605bfe90b844.png" height="400">
</p>

**Spep 3: Deploy transaction**

## QR code usage
<p align="center">
  <img src="https://user-images.githubusercontent.com/13261372/91479261-cd0f8c80-e8be-11ea-8860-4a102b421470.png" height="400">
  <img src="https://user-images.githubusercontent.com/13261372/91479263-cd0f8c80-e8be-11ea-8cfa-0ef4b08ba573.png" height="400">
</p>

## Demo tx
```
"{\"gasPrice\":1000000000,\"chainId\":5,\"from\":\"0x6fdB9CB082c7eCB72a59A3e5D82A5bA8E187dd39\",\"gas\":0,\"nonce\":5,\"value\":2,\"to\":\"0x1ae1AED6eBa7Ebee6039b383f1Be3C5C141D3bC5\",\"data\":\"0xa9059cbb000000000000000000000000af6d1826fdc87a6f12b015f12629f35b5b46024c0000000000000000000000000000000000000000000000000000000000000002\"}"
```