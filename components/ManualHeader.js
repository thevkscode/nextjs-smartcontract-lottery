import { useMoralis } from "react-moralis";
import { useEffect } from "react";
import { Accordion } from "web3uikit";
import styles from "../styles/Home.module.css";
export default function ManualHeader() {
    //similar to window.ethereum manual enable in html
    const { enableWeb3, account, isWeb3Enabled, Moralis, isWeb3EnableLoading, deactivateWeb3 } =
        useMoralis(); //hook
    useEffect(() => {
        if (isWeb3Enabled) return;
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3(); //set isWeb3Enabled true
            }
        }
        console.log("Hi");
        console.log(isWeb3Enabled);
    }, [isWeb3Enabled]);
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`);
            if (account == null) {
                window.localStorage.removeItem("connected");
                deactivateWeb3(); //this will set isWeb3Enabled false
                console.log("No Account Found");
            }
        });
    }, []);
    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}....{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    className={styles.button}
                    onClick={async () => {
                        await enableWeb3();
                        if (typeof window !== "undefined") {
                            //this helps in not asking for connect on reload
                            window.localStorage.setItem("connected", "injected");
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    Connect
                </button>
            )}
        </div>
    );
}
