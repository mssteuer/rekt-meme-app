import React from 'react';
import { Account, BuyMeACoffee, Section } from './components';
import Container from '../container';
import {GotRekt} from "./components/GotRekt";

export const LandingBrief = () => {
	return (
		<Container>
			<h3>✨ Get totally REKT!</h3>
			<Section>
				<span>When you buy into this project, you will:</span>
				<ul>
					<li>Get totally REKT</li>
					<li>Get Laser Eyes</li>
					<li>Grow Facial Hair</li>
					<li>Wen, wen, WEN?!</li>
				</ul>
			</Section>
			<h3>🔝 Sign in</h3>
			<Section>
				<span>
					Get started now!
					<b
						onClick={event => {
							event.preventDefault();
							window.csprclick.signIn();
						}}
					>
						{' '}
						Connect
					</b>
					.
				</span>
			</Section>
		</Container>
	);
};

export const SignedInBrief = () => {
	return (
		<Container>
			<h2>🎉 Awesome! Let&#39;s get you REKT!</h2>
			<h3 id="account">🆔 We know who you are...</h3>
			<Account />

			<h3 id="buyCoffee">☕ Get REKT Now!</h3>
			<BuyMeACoffee />

			<h3 id="history">⏳ Who got REKT before you?</h3>
			<GotRekt />


		</Container>
	);
};
