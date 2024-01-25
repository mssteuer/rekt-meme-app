import { useEffect } from 'react';
import { Section } from './Section';
import { useClickRef } from '@make-software/csprclick-ui';
import Prism from 'prismjs';
import { SpanTruncated, StyledTD } from "./BuyMeACoffee";

const UserAccount = () => {
	const clickRef = useClickRef();
	const activeAccount = clickRef?.getActiveAccount();
	return (
		<table>
			<tbody>
			<tr>
				<StyledTD>Public key:</StyledTD>
				<td>
					<SpanTruncated>{activeAccount?.public_key}</SpanTruncated>
				</td>
			</tr>
			<tr>
				<StyledTD>Wallet Type:</StyledTD>
				<td>{activeAccount?.provider}</td>
			</tr>
			</tbody>
		</table>
	);
};

export const Account = () => {
	useEffect(() => {
		Prism.highlightAll();
	}, []);

	return (
		<>
			<Section withBackground>
				<UserAccount />
			</Section>
		</>
	);
};
