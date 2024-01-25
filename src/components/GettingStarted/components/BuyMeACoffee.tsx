import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Section } from './Section';
import { useClickRef } from '@make-software/csprclick-ui';
import { SendResult } from '@make-software/csprclick-core-client';
import makeTransferDeploy from './transfer-deploy';
import Prism from 'prismjs';

export const StyledTD = styled.td(({theme}) =>
	theme.withMedia({
		fontWeight: '600',
		margin: '4px 15px 4px 0',
		display: 'block',
	})
);

export const SpanTruncated = styled.span(({ theme }) =>
	theme.withMedia({
		display: 'inline-block',
		fontFamily: 'JetBrains Mono',
		width: ['150px', '350px', '100%'],
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	})
);

export const BuyMeACoffee = () => {
	const [deployHash, setDeployHash] = useState<string | undefined>(undefined);
	const paymentContractHash = "2b681cad1330242184aee163940ce073f169e06986f64a5e6709616fba955b28";
	const clickRef = useClickRef();
	const activeAccount = clickRef?.getActiveAccount();
	const publicKey = activeAccount?.public_key ? activeAccount.public_key : "0202f51799b825ee1121bf6a8b86b916944e0bbaf93f8fef837331fd4299ff1eb04c";
	const chainName = clickRef?.chainName ? clickRef.chainName : "casper-test";

	useEffect(() => {
		Prism.highlightAll();
	}, []);

	const handleSignTransaction = async () => {
		const sender = activeAccount?.public_key?.toLowerCase() || '';
		const deploy = await makeTransferDeploy(
			publicKey,
			'100000000000',
			chainName,
			paymentContractHash
		);
		clickRef
			?.send(deploy, sender)
			.then((res: SendResult | undefined) => {
				if (res?.deployHash) {
					setDeployHash(res.deployHash);
					alert('Transaction sent successfully: ' + res.deployHash);
				} else if (res?.cancelled) {
					alert('Sign cancelled');
				} else {
					alert('Error in send(): ' + res?.error + '\n' + res?.errorData);
				}
			})
			.catch((err) => {
				alert('Error: ' + err);
				throw err;
			});
	};

	return (
		<>

			<Section withBackground>
				<table>
					<tbody>
					<tr>
						<StyledTD>Cost:</StyledTD>
						<td>100 CSPR</td>
					</tr>
					<tr>
						<StyledTD>How much REKT:</StyledTD>
						<td>
							<i>500 REKT</i>
						</td>
					</tr>
					<tr>
						<StyledTD>Account that will be REKT:</StyledTD>
						<td>
							<SpanTruncated>{publicKey}</SpanTruncated>
						</td>
					</tr>
					<tr>
						<td colSpan={2}>
							{activeAccount?.public_key && <button onClick={() => handleSignTransaction()}>Sign transaction</button>}
						</td>
					</tr>
					</tbody>
				</table>

				{deployHash && (
					<a href={`${clickRef?.appSettings?.csprlive_url}deploy/${deployHash}`} target='_blank' rel='noreferrer'>
						Check transfer status on CSPR.live
					</a>
				)}
			</Section>
		</>
	);
};
