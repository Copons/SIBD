import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
	Button,
	DialogContainer,
	FloatingLabel,
	SelectField,
	TableCardHeader,
	TextField,
} from 'react-md';

import { fetchAllElements, insertElement } from 'state/elements/actions';
import Rating from 'components/rating';
import { TYPES } from 'components/main-table/constants';

export class MainTableHeader extends PureComponent {
	state = {
		insertElementEnd: '',
		insertElementRating: '',
		insertElementStart: '',
		insertElementTitle: '',
		insertElementType: '',
		showInsertDialog: false,
	};

	closeInsertDialog = () => this.setState({ showInsertDialog: false });

	getActions = () => [
		{
			id: 'insert-element-dialog-cancel',
			secondary: true,
			children: 'Cancel',
			onClick: this.closeInsertDialog,
		},
		{
			id: 'insert-element-dialog-save',
			primary: true,
			children: 'Save',
			onClick: this.handleSubmit,
		},
	];

	handleSubmit = () => {
		this.props.insertElement({
			end: this.state.insertElementEnd,
			rating: this.state.insertElementRating,
			start: this.state.insertElementStart,
			title: this.state.insertElementTitle,
			type: this.state.insertElementType,
		});
		this.closeInsertDialog();
	};

	openInsertDialog = () => this.setState({ showInsertDialog: true });

	updateForm = field => value => this.setState({ [field]: value });

	render() {
		const { elementTitle, elementType, showInsertDialog } = this.state;

		return (
			<TableCardHeader title="All" visible={false}>
				<Button icon onClick={this.openInsertDialog} primary>
					add
				</Button>
				<Button icon onClick={this.props.fetchAllElements} secondary>
					refresh
				</Button>
				<DialogContainer
					actions={this.getActions()}
					id="insert-element-dialog"
					initialFocus="insert-element-dialog-title"
					onHide={this.closeInsertDialog}
					title="Add new element"
					visible={showInsertDialog}
				>
					<TextField
						id="insert-element-dialog-title"
						label="Title"
						name="title"
						onChange={this.updateForm('insertElementTitle')}
						value={elementTitle}
					/>
					<SelectField
						fullWidth
						id="insert-element-dialog-type"
						label="Type"
						menuItems={TYPES}
						name="type"
						onChange={this.updateForm('insertElementType')}
						value={elementType}
					/>
					<Rating />
				</DialogContainer>
			</TableCardHeader>
		);
	}
}

const mapDispatchToProps = { fetchAllElements, insertElement };

export default connect(null, mapDispatchToProps)(MainTableHeader);
