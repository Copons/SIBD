import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import TableCardHeader from 'react-md/lib/DataTables/TableCardHeader';

import InsertDialog from 'components/dialogs/insert';
import { fetchAllElements } from 'state/elements/actions';
import { getViewFilter } from 'state/ui/selectors';

export class MainTableCardHeader extends PureComponent {
	state = {
		insertDialogVisible: false,
	};

	closeInsertDialog = () => this.setState({ insertDialogVisible: false });

	openInsertDialog = () => this.setState({ insertDialogVisible: true });

	render() {
		const { viewFilterYear } = this.props;
		const { insertDialogVisible } = this.state;

		const title = 'all' === viewFilterYear ? 'All' : viewFilterYear;

		return (
			<TableCardHeader title={title} visible={false}>
				<Button icon onClick={this.openInsertDialog} primary>
					add
				</Button>
				<Button icon onClick={this.props.fetchAllElements} secondary>
					refresh
				</Button>
				<InsertDialog
					onClose={this.closeInsertDialog}
					visible={insertDialogVisible}
				/>
			</TableCardHeader>
		);
	}
}

const mapStateToProps = state => ({
	viewFilterYear: getViewFilter(state, 'year'),
});

const mapDispatchToProps = { fetchAllElements };

export default connect(mapStateToProps, mapDispatchToProps)(
	MainTableCardHeader
);
