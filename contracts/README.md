# PowerVoting-Contract 

## Overview
The PowerVoting-Contract consists of two contracts:
1. **Vote Contract**: Responsible for creating proposals and conducting proposal voting.
2. **FipEditor Contract**: Handles permission management and supports adding and deleting FipEditors through proposals.
3. **Oracle Contract**: Supplies external data to support contract interactions, including updates like miner IDs and authorization information.


## Deployment and Upgrade Process

### Prerequisites
- Node.js version v18.13.0 or higher.

### Installation
Install the necessary libraries by running the following command:
```bash
npm install
```

### Environment Variable Configuration
1. Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
2. Configure the corresponding network keys in the `.env` file:
- `PRIVATE_KEY_TESTNET`: The private key of the account for testnet deployment.
- `PRIVATE_KEY_MAINNET`: The private key of the account for mainnet deployment.

### Contract Deployment
1. **Deploy the FipEditor Contract**
Run the following command to deploy the FipEditor contract:
```bash
npx hardhat run scripts/deploy_fip.ts --network [network_name]
```
2. **Deploy the Vote Contract**
Run the following command to deploy the Vote contract:
```bash
npx hardhat run scripts/deploy_vote.ts --network [network_name]
```
3. **Deploy the Oracle Contract**
   Run the following command to deploy the Oracle contract:
```bash
npx hardhat run scripts/deploy_oracle.ts --network [network_name]
```
4. **Contract Address Storage**
After the contracts are deployed, the contract addresses will be saved in the `[network_name]_config.json` file in the `scripts` directory. The content format is as follows:
```json
{
  "POWER_VOTING_FIP": "",
  "POWER_VOTING_VOTE": "",
  "POWER_VOTING_ORACLE": ""
}
```
**Note:** Ensure to update and securely manage these addresses for future interactions.

### Contract Upgrade
The contracts support upgrade via the UUPS (Universal Upgradeable Proxy Standard) pattern.
- **Upgrade the FipEditor Contract**
Run the following command to upgrade the FipEditor contract:
```bash
npx hardhat run scripts/upgrade_fip.ts --network [network_name]
```
- **Upgrade the Vote Contract**
Run the following command to upgrade the Vote contract:
```bash
npx hardhat run scripts/upgrade_vote.ts --network [network_name]
```
- **Upgrade the Oracle Contract**
Run the following command to upgrade the Oracle contract:
```bash
npx hardhat run scripts/upgrade_oracle.ts --network [network_name]
```

### Test Cases
You can run the contract's test cases using the following command:
```bash
npx hardhat test
```

### Script Descriptions

Here’s a brief overview of the available scripts in the `scripts` directory:

#### `check.ts`

- **Purpose**: Performs checks on various contract parameters or statuses.

#### `deploy_powers.ts`

- **Purpose**: Deploys the `Powers` contract, which handles the logic related to power management within the voting system.

#### `deploy_fip.ts`

- **Purpose**: Deploys the `FipEditor` contract. This contract handles permission management and supports the addition/removal of FipEditors.

#### `deploy_vote.ts`

- **Purpose**: Deploys the `Vote` contract. This contract manages the creation of proposals and the process of voting on those proposals.

#### `deploy_oracle.ts`

- **Purpose**: Deploys the `Oracle` contract. The Oracle contract provides external data, such as miner IDs and other relevant information.

#### `upgrade_fip.ts`

- **Purpose**: Upgrades the `FipEditor` contract to a new implementation using the UUPS pattern.

#### `upgrade_vote.ts`

- **Purpose**: Upgrades the `Vote` contract to a new implementation using the UUPS pattern.

#### `upgrade_oracle.ts`

- **Purpose**: Upgrades the `Oracle` contract to a new implementation using the UUPS pattern.

#### `update_fipetidor_address.ts`

- **Purpose**: Updates the address of the FipEditor contract. Typically used after contract upgrades or re-deployments.

#### `utils.ts`

- **Purpose**: Contains utility functions that can be used across different scripts, such as address validation or data formatting.

#### `constant.ts`

- **Purpose**: Stores constant values and configurations used throughout the scripts (e.g., contract addresses, network names).

### Notes

- Replace `[network_name]` with the actual network name (e.g., `filecoin_testnet`, `filecoin_mainnet`) when running the deployment and upgrade commands.
- Ensure that the private keys in the `.env` file are kept secure and not exposed.