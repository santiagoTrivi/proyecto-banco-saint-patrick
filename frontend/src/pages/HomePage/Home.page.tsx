import React from 'react';
import { Link } from 'react-router-dom';

import reactLogo from '@/src/assets/react.svg';
import { webRoutes } from '@/src/utils';
import { css } from '@/styled-system/css';
import viteLogo from '/vite.svg';

export function HomePage() {
	const [count, setCount] = React.useState(0);

	return (
		<div>
			<Link to={webRoutes.auth.register.absolute}>Register</Link>

			<h1 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>
				Welcome to Bank Saint Patrick
			</h1>

			<div
				className={css({
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					gap: '1rem'
				})}
			>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</div>
	);
}
