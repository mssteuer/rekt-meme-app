import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {Section} from "./Section";

export const StyledTD = styled.td(({theme}) =>
	theme.withMedia({
		fontWeight: '600',
		margin: '4px 15px 4px 0',
		display: 'block',
	})
);

const lastTR = {
	borderBottom: '2px solid black'
};

const linkStyle = {
	color: 'blue'
}

export interface Action {
	timestamp: string,
	amount: number,
	to_public_key: string,
}

export const GotRekt = () => {
	const [actions, setActions] = useState<Action[]>([]);
	useEffect(() => {
		fetch( 'http://localhost:3001/token-activity')
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				setActions(data.data);
			}).catch(error => {
				console.log(error);
			})
	}, []);
	return (
		<>
			<Section withBackground>
				<table>
					<tbody>

				{actions.map((action) => (
					<>
						<tr>
							<StyledTD>When:</StyledTD>
							<td>{new Date(action.timestamp).toLocaleString()}</td>
						</tr>
						<tr>

							<StyledTD>Who:</StyledTD>
							<td><a style={linkStyle} target={'_blank'} rel={'noreferrer'}
								href={'https://testnet.cspr.live/account/'+action.to_public_key}>{action.to_public_key}</a></td>
						</tr>
						<tr>
							<StyledTD>How Much:</StyledTD>
							<td style={lastTR}>{action.amount} REKT</td>
						</tr>
					</>

					))}
					</tbody>
				</table>
			</Section>
		</>
	);
};

