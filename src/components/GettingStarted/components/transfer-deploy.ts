import {CLPublicKey, CLValueBuilder, DeployUtil, RuntimeArgs} from 'casper-js-sdk';
import {Buffer} from "buffer/";

const makeTransferDeploy = async (
	recipientPublicKeyHex: string,
	amountMotes: string,
	chainName: string,
	paymentsContractHash: string,
) => {
	const recipientPublicKey = CLPublicKey.fromHex(recipientPublicKeyHex);

	const deployParams = new DeployUtil.DeployParams(recipientPublicKey, chainName);

	const runtimeArgs = RuntimeArgs.fromMap({
		payment_processor_contract_hash: CLValueBuilder.byteArray(Uint8Array.from(Buffer.from(paymentsContractHash, "hex"))),
		amount: CLValueBuilder.u512(amountMotes),
		recipient: CLPublicKey.fromHex(recipientPublicKeyHex)
	});

	const wasm = await getWasmBinary();

	const session = DeployUtil.ExecutableDeployItem.newModuleBytes(
		wasm,
		runtimeArgs
	);

	const payment = DeployUtil.standardPayment('3000000000');

	const deploy = DeployUtil.makeDeploy(deployParams, session, payment);
	return JSON.stringify(DeployUtil.deployToJson(deploy).deploy);
}

const getWasmBinary = async () => {
	return fetch(`/execute_payment.wasm`, {
		headers: {
			'Content-Type': 'application/wasm',
		},
	})
		.then((response) => response.arrayBuffer())
		.then((bytes) => new Uint8Array(bytes));
};

export default makeTransferDeploy;