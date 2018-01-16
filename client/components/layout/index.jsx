import React, { PureComponent } from 'react';
import { Button, NavigationDrawer } from 'react-md';
import { noop } from 'lodash-es';

export class Layout extends PureComponent {
	render() {
		return (
			<div>
				<NavigationDrawer
					desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
					mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
					tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
					navItems={[]}
					toolbarTitle="SIBD"
					toolbarActions={
						<Button icon onClick={noop}>
							search
						</Button>
					}
				/>
			</div>
		);
	}
}

export default Layout;
