import { abi } from '@/config/abi.js';
// import { useAppKitAccount } from "@reown/appkit/vue";
// import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/vue";

import { ethers } from "ethers";
import { showToast } from 'vant';


let PledgeContract;
const contractAddress = '0x5c91681073F23Fd1a3EF0896E7Db45b4E686cd2B'


const getPledgeContract = async () => {
    if (PledgeContract) return PledgeContract;
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.on("network", (newNetwork, oldNetwork) => {
        console.log(`Network changed from ${JSON.stringify(oldNetwork)} to ${JSON.stringify(newNetwork)}`);
    });
    const signer =  provider.getSigner();
    console.log(signer,'signer');
    PledgeContract = new ethers.Contract(contractAddress, abi, signer)
    console.log(PledgeContract,'PledgeContract');

    return PledgeContract;
};

export const update = async () => {
    try {
        const api = await getPledgeContract()
        console.log(api,'api');
        showToast('update')
        return await api.update();
    } catch (err) {
        console.log("err:", err);
    }
};

