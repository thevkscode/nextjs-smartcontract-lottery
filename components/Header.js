import { ConnectButton } from "web3uikit";
export default function Header() {
    return (
        <div className="border-b-2">
            <div className="flex justify-center items-center text-2xl font-bold">
                {" "}
                Decentralized Lottery
            </div>
            <div className="py-2 px-4 m-1 ">
                <ConnectButton moralisAuth={false} />
            </div>

            {/* does eveything that ManualHeader does */}
        </div>
    );
}
