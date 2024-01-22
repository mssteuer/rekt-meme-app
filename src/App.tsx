import { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useClickRef, ThemeModeType } from '@make-software/csprclick-ui';
import ClickTopBar from './components/ClickTopBar';
import { LandingBrief, SignedInBrief } from './components/GettingStarted';
import Container from './components/container';
import { AppTheme } from './theme';
import { Welcome } from './components/GettingStarted/components';

const GettingStartedContainer = styled.div(({ theme }) =>
	theme.withMedia({
		maxWidth: ['100%', '720px', '960px'],
		padding: '0 12px',
		margin: '0 auto',
	})
);

const App = () => {
	const clickRef = useClickRef();
	const [themeMode, setThemeMode] = useState<ThemeModeType>(ThemeModeType.light);
	const [activeAccount, setActiveAccount] = useState<any>(null);

	useEffect(() => {
		clickRef?.on('csprclick:signed_in', async (evt: any) => {
			await setActiveAccount(evt.account);
		});
		clickRef?.on('csprclick:switched_account', async (evt: any) => {
			await setActiveAccount(evt.account);
		});
		clickRef?.on('csprclick:signed_out', async (evt: any) => {
			setActiveAccount(null);
		});
		clickRef?.on('csprclick:disconnected', async (evt: any) => {
			setActiveAccount(null);
		});
	}, [clickRef?.on]);

	return (
		<ThemeProvider theme={AppTheme[themeMode]}>
			<ClickTopBar
				themeMode={themeMode}
				onThemeSwitch={() => setThemeMode(themeMode === ThemeModeType.light ? ThemeModeType.dark : ThemeModeType.light)}
			/>
			<Container>
				<Welcome/>
				<GettingStartedContainer id={'getting-started'}>
					{activeAccount ? <SignedInBrief /> : <LandingBrief />}
				</GettingStartedContainer>
			</Container>
		</ThemeProvider>
	);
};

export default App;
