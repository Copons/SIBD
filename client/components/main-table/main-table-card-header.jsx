import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import TableCardHeader from 'react-md/lib/DataTables/TableCardHeader';

import AuthorsDialog from 'components/dialogs/authors';
import InsertDialog from 'components/dialogs/insert';
import { fetchAllElements } from 'state/elements/actions';
import { getViewFilter } from 'state/ui/selectors';

export class MainTableCardHeader extends PureComponent {
	state = {
		authorsDialogVisible: false,
		insertDialogVisible: false,
	};

	closeAuthorsDialog = () => this.setState({ authorsDialogVisible: false });

	closeInsertDialog = () => this.setState({ insertDialogVisible: false });

	openAuthorsDialog = () => this.setState({ authorsDialogVisible: true });

	openInsertDialog = () => this.setState({ insertDialogVisible: true });

	render() {
		const { viewFilterYear } = this.props;
		const { authorsDialogVisible, insertDialogVisible } = this.state;

		const title = 'all' === viewFilterYear ? 'All' : viewFilterYear;

		return (
			<TableCardHeader title={title} visible={false}>
				<Button icon onClick={this.openInsertDialog} primary>
					add
				</Button>
				<Button icon onClick={this.openAuthorsDialog} primary>
					person
				</Button>
				<Button icon onClick={this.props.fetchAllElements} secondary>
					refresh
				</Button>
				<AuthorsDialog
					onClose={this.closeAuthorsDialog}
					visible={authorsDialogVisible}
				/>
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
