import { ethers } from 'ethers';

import {contAbi} from "../config/contAbi"
import {contAdd} from "../config/contAdd"

// @returns Contract object
export const dappContract = async () => {

	const provider = new ethers.providers.Web3Provider(window.ethereum);

	if (!provider) {
		console.log('Provider is null');
		return null;
	}


	console.log(contAbi)
	console.log(contAdd)
	const signer = await provider.getSigner();
	const contract = new ethers.Contract(contAdd, contAbi, signer);

	return contract;
};