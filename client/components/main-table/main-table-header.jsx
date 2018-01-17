import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
	Button,
	DatePicker,
	DialogContainer,
	SelectField,
	TableCardHeader,
	TextField,
	Toolbar,
} from 'react-md';

import { dateToMySQL, newDate } from 'lib/dates';
import { getRatingItems } from 'lib/ratings';
import { fetchAllElements, insertElement } from 'state/elements/actions';
import { getViewFilter } from 'state/ui/selectors';
import { TYPES } from 'components/main-table/constants';

export class MainTableHeader extends PureComponent {
	state = {
		insertElementEnd: newDate(),
		insertElementRating: 0,
		insertElementStart: newDate(),
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
		const element = {
			end: dateToMySQL(this.state.insertElementEnd),
			rating: this.state.insertElementRating,
			start: dateToMySQL(this.state.insertElementStart),
			title: this.state.insertElementTitle,
			type: this.state.insertElementType,
		};
		this.props.insertElement(element);
		this.resetState();
	};

	openInsertDialog = () => this.setState({ showInsertDialog: true });

	resetState = () =>
		this.setState({
			insertElementEnd: newDate(),
			insertElementRating: '',
			insertElementStart: newDate(),
			insertElementTitle: '',
			insertElementType: '',
			showInsertDialog: false,
		});

	updateForm = field => value => this.setState({ [field]: value });

	renderCloseButton = () => (
		<Button icon onClick={this.closeInsertDialog}>
			close
		</Button>
	);

	renderSaveButton = () => (
		<Button icon onClick={this.handleSubmit}>
			save
		</Button>
	);

	render() {
		const { viewFilterYear } = this.props;
		const {
			insertElementEnd,
			insertElementRating,
			insertElementStart,
			insertElementTitle,
			insertElementType,
			showInsertDialog,
		} = this.state;

		const title = 'all' === viewFilterYear ? 'All' : viewFilterYear;

		return (
			<TableCardHeader title={title} visible={false}>
				<Button icon onClick={this.openInsertDialog} primary>
					add
				</Button>
				<Button icon onClick={this.props.fetchAllElements} secondary>
					refresh
				</Button>
				<DialogContainer
					actions={this.getActions()}
					fullPage
					id="insert-element-dialog"
					initialFocus="insert-element-dialog-title"
					onHide={this.closeInsertDialog}
					aria-label="Add new element"
					visible={showInsertDialog}
				>
					<Toolbar
						actions={this.renderSaveButton()}
						colored
						fixed
						nav={this.renderCloseButton()}
						title="New Element"
					/>
					<section className="md-toolbar-relative">
						<TextField
							id="insert-element-dialog-title"
							label="Title"
							name="title"
							onChange={this.updateForm('insertElementTitle')}
							value={insertElementTitle}
						/>
						<SelectField
							fullWidth
							id="insert-element-dialog-type"
							label="Type"
							menuItems={TYPES}
							name="type"
							onChange={this.updateForm('insertElementType')}
							value={insertElementType}
						/>
						<DatePicker
							defaultValue={insertElementStart}
							id="insert-element-dialog-start"
							label="Start Date"
							locales="en-GB"
							onChange={this.updateForm('insertElementStart')}
						/>
						<DatePicker
							defaultValue={insertElementEnd}
							id="insert-element-dialog-end"
							label="End Date"
							locales="en-GB"
							onChange={this.updateForm('insertElementEnd')}
						/>
						<SelectField
							fullWidth
							id="insert-element-dialog-rating"
							label="Rating"
							menuItems={getRatingItems()}
							name="rating"
							onChange={this.updateForm('insertElementRating')}
							value={insertElementRating}
						/>
					</section>
				</DialogContainer>
			</TableCardHeader>
		);
	}
}

const mapStateToProps = state => ({
	viewFilterYear: getViewFilter(state, 'year'),
});

const mapDispatchToProps = { fetchAllElements, insertElement };

export default connect(mapStateToProps, mapDispatchToProps)(MainTableHeader);
