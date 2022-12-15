import { ethers } from 'ethers';

export const connect = async () => {
	const { ethereum } = window;
	if (!ethereum) {
		console.log('Error, wallet absent');
		return null;
	}


	const provider = new ethers.providers.Web3Provider(ethereum);

    const accounts = await provider.send("eth_requestAccounts", [])

    const balance = await provider.getBalance(accounts[0]);

    balance = ethers.utils.formatEther(balance)

    const details = {
        address: accounts[0],
        balance
    }

	return details;
};
