//have a function to enter the lottery
import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import styles from "../styles/Home.module.css";
import { useNotification } from "web3uikit";
export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis(); //gives us the hex of chainId
    const chainId = parseInt(chainIdHex); //hex to int
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;
    const [entranceFee, setEnranceFee] = useState("0");
    const [numPlayers, setNumPlayers] = useState("0");
    const [recentWinner, setRecentWinner] = useState("0");
    const dispatch = useNotification();
    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle", //
        params: {},
        msgValue: entranceFee, //
    });
    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee", //
        params: {},
    });
    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers", //
        params: {},
    });
    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner", //
        params: {},
    });
    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString();
        setEnranceFee(entranceFeeFromCall);
        const numPlayersFromCall = (await getNumberOfPlayers()).toString();
        setNumPlayers(numPlayersFromCall);
        const recentWinnerFromCall = await getRecentWinner();
        setRecentWinner(recentWinnerFromCall);
    }
    useEffect(() => {
        if (isWeb3Enabled) {
            //try to read the raffle entrance fee
            updateUI();
        }
    }, [isWeb3Enabled]);
    const handleSuccess = async function (tx) {
        await tx.wait(1);
        handleNewNotification(tx);
        updateUI();
    };
    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        });
    };
    return (
        <div>
            {raffleAddress ? (
                <div className="py-4 px-4">
                    <div className="">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
                            onClick={async () => {
                                await enterRaffle({
                                    onSuccess: handleSuccess, //checks to see that the transaction is successfully sent to metamask,it doesn't tell about block confirmation
                                    onError: (error) => console.error(error),
                                });
                            }}
                        >
                            Enter Raffle
                        </button>
                    </div>
                    <p>
                        Entrance Fee:
                        <div className="inline font-semibold mx-px">
                            {ethers.utils.formatUnits(entranceFee, "ether")}
                        </div>
                        ETH
                    </p>
                    <p>
                        Number Of Players:{" "}
                        <div className="inline font-semibold mx-px ">{numPlayers}</div>{" "}
                    </p>
                    <p>
                        Recent Winner:{" "}
                        <div className="inline font-semibold mx-px">{recentWinner}</div>
                    </p>
                </div>
            ) : (
                <div className="font-semibold">No Raffle Address Detected!</div>
            )}
        </div>
    );
}
