import { ethers } from 'ethers';
import Web3 from 'web3' ;

import { marketplaceAddr } from './addr';
import marketplaceAbi from './abi/marketplace.json';

const marketplace_owner = process.env.REACT_APP_ADMIN_WALLET ;
const private_key = process.env.REACT_APP_WALLET_PRV_KEY ;

const web3 = new Web3(new Web3.providers.HttpProvider( 'https://api.avax-test.network/ext/C/rpc' ));

export const withdraw = async (_to, _tokenId) => {
    try {
        const nonce = await web3.eth.getTransactionCount(marketplace_owner, 'latest'); // nonce starts counting from 0

        const etherReceiver = new web3.eth.Contract( marketplaceAbi, marketplaceAddr);

        const tx = {
            to : marketplaceAddr,
            nonce: nonce,
            gasLimit: 3141592,
            gasUsed: 21662,
            data : etherReceiver.methods.withdraw(_to, Number(_tokenId)).encodeABI()
        }

        const signer = await web3.eth.accounts.signTransaction(tx, private_key) ;
        
        let receipt = await web3.eth.sendSignedTransaction(signer.rawTransaction) ;

        console.log(receipt);
        return true ;
    } catch(err) {
        console.log(err) ;
        return false ;
    }
}