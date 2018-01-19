import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { concat, noop } from 'lodash-es';
import Button from 'react-md/lib/Buttons/Button';
import ListItem from 'react-md/lib/Lists/ListItem';
import NavigationDrawer from 'react-md/lib/NavigationDrawers/NavigationDrawer';

import MainTable from 'components/main-table';
import { getCurrentYear } from 'lib/dates';
import { fetchAllYears, setViewFilters } from 'state/ui/actions';
import { getViewFilter, getYears } from 'state/ui/selectors';

export class Layout extends PureComponent {
	state = {
		showDrawer: false,
	};

	componentWillMount() {
		this.props.setViewFilters({ year: getCurrentYear() });
	}

	closeDrawer = () => this.setState({ showDrawer: false });

	getNavItems = () => {
		const { viewFilterYear } = this.props;
		return concat(
			<ListItem
				active={'all' === viewFilterYear}
				key="all"
				primaryText="All"
				onClick={this.setViewFilterYear('all')}
			/>,
			this.props.years.map(year => (
				<ListItem
					active={year === viewFilterYear}
					key={year}
					primaryText={year}
					onClick={this.setViewFilterYear(year)}
				/>
			))
		);
	};

	openDrawer = () => {
		this.props.fetchAllYears();
		this.setState({ showDrawer: true });
	};

	setViewFilterYear = year => () => {
		this.props.setViewFilters({ year });
		this.closeDrawer();
	};

	toggleDrawer = visible => (visible ? this.openDrawer() : this.closeDrawer());

	render() {
		const { showDrawer } = this.state;
		return (
			<NavigationDrawer
				desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT}
				mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
				tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT}
				onVisibilityChange={this.toggleDrawer}
				navItems={this.getNavItems()}
				toolbarTitle="SIBD"
				toolbarActions={
					<Button icon onClick={noop}>
						search
					</Button>
				}
				visible={showDrawer}
			>
				<MainTable />
			</NavigationDrawer>
		);
	}
}

const mapStateToProps = state => ({
	viewFilterYear: getViewFilter(state, 'year'),
	years: getYears(state),
});

const mapDispatchToProps = { fetchAllYears, setViewFilters };

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
