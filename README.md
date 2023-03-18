# Next.js Smart Contract Lottery

This repository contains the frontend code for a smart contract-based lottery system built using Next.js and Ethereum. It is intended to be used in conjunction with the backend smart contracts, which can be found in the [hardhat-lottery-system](https://github.com/thevkscode/hardhat-lottery-system) repository.

## Overview

The Next.js Smart Contract Lottery provides a user-friendly interface for participating in the lottery and viewing the current status of the lottery. Users can connect their Ethereum wallet (such as MetaMask) to the application and purchase tickets for the current lottery round. The application displays information about the current lottery round, including the number of tickets sold and the current prize pool.

## Installation

To install and run the application locally, follow these steps:

1. Clone this repository to your local machine.
2. Install dependencies by running `npm install` or `yarn install` in the root directory of the project.
3. Start the development server by running `npm run dev` or `yarn dev`.

## Usage

Once the development server is running, you can access the application by navigating to `http://localhost:3000` in your web browser. Note that you will need to have a local Ethereum blockchain running (such as Ganache) and have deployed the smart contracts to that blockchain in order for the application to function properly.

## Contributing

We welcome contributions to this project! If you notice any bugs or have suggestions for new features, please open an issue or submit a pull request. Before making any contributions, please review our [contributing guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
