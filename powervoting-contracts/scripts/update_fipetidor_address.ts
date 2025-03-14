import { getConstantJson } from "./utils";

const { ethers } = require("hardhat");
async function main() {
  const PowerVoting = await ethers.getContractFactory("PowerVoting");
  const constantJSON = getConstantJson();
  const POWER_VOTING_VOTE = constantJSON["POWER_VOTING_VOTE"];
  const POWER_VOTING_FIP = constantJSON["POWER_VOTING_FIP"];

  const powerVotingContract = await PowerVoting.attach(POWER_VOTING_VOTE);
  const updateTx = await powerVotingContract.updateFipEditorContract(POWER_VOTING_FIP);
  updateTx.await();

  const fipEditorAddress = await powerVotingContract.fipEditorContract();
  console.log("remote  fipEditor=" + fipEditorAddress);
  console.log(" local  fipEditor=" + POWER_VOTING_FIP);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
