import { MdLogout } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';

import { AuthRepository } from '@/auth/domain';
import { AuthNestRepository } from '@/auth/services';
import { useAuthStore } from '@/auth/state';
import { envVariables, webRoutes } from '@/shared/utils';
import { Button, Heading } from '@/ui/components';
import clsx from 'clsx';
import React from 'react';

type AppbarProps = {
	authRepository?: AuthRepository;
};

export const Appbar = ({
	authRepository = AuthNestRepository()
}: AppbarProps) => {
	const accessToken = useAuthStore((s) => s.accessToken);
	const logout = useAuthStore((s) => s.logout);
	const [isActive, setIsActive] = React.useState(false);

	async function handleLogout() {
		await authRepository.logout(accessToken);
		logout();
	}

	return (
		<header className="bg-primary-400 py-3">
			<div className="m-auto flex h-auto max-w-7xl flex-wrap items-center max-[1280px]:px-4">
				<Heading className="text-black">{envVariables.APP_NAME}</Heading>

				<button
					className="ml-auto sm:hidden"
					onClick={() => setIsActive((s) => !s)}
				>
					<i>
						<RxHamburgerMenu />
					</i>
				</button>

				<div
					className={clsx(
						{ 'h-auto scale-100': isActive },
						'h-0 w-full scale-0 sm:contents'
					)}
				>
					<hr className="my-2 border-gray-500 sm:hidden" />
					<nav className="contents">
						<ol className="flex flex-col items-center sm:ml-auto sm:flex-row">
							<li className="contents">
								<Button
									component="a"
									variant="link"
									className="text-black"
									to="/"
								>
									Home
								</Button>
							</li>
							<li className="contents">
								<Button
									component="a"
									variant="link"
									className="text-black"
									to={webRoutes.movements.root}
								>
									Movements
								</Button>
							</li>

							<li className="contents">
								<Button
									variant="link"
									className="flex text-black"
									onClick={handleLogout}
								>
									Logout
									<i>
										<MdLogout />
									</i>
								</Button>
							</li>
						</ol>
					</nav>
				</div>
			</div>
		</header>
	);
};
