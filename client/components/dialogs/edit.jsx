import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { isEqual, omit } from 'lodash-es';
import Button from 'react-md/lib/Buttons/Button';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
import DialogContainer from 'react-md/lib/Dialogs/DialogContainer';
import SelectField from 'react-md/lib/SelectFields/SelectField';
import TextField from 'react-md/lib/TextFields/TextField';
import Toolbar from 'react-md/lib/Toolbars/Toolbar';

import { dateFromMySQL, dateToMySQL } from 'lib/dates';
import { getRatingItems } from 'lib/ratings';
import { TYPES } from 'lib/types';
import { updateElement } from 'state/elements/actions';
import { getViewFilter } from 'state/ui/selectors';

import './style.scss';

export class EditDialog extends PureComponent {
	state = {
		elementEnd: undefined,
		elementId: undefined,
		elementRating: 0,
		elementStart: undefined,
		elementTitle: '',
		elementType: '',
	};

	componentWillReceiveProps(nextProps) {
		if (!isEqual(this.props, nextProps)) {
			this.setState({
				elementEnd: dateFromMySQL(nextProps.elementEnd),
				elementId: nextProps.elementId,
				elementRating: nextProps.elementRating,
				elementStart: dateFromMySQL(nextProps.elementStart),
				elementTitle: nextProps.elementTitle,
				elementType: nextProps.elementType,
			});
		}
	}

	getActions = () => [
		{
			id: 'edit-element-dialog-cancel',
			secondary: true,
			children: 'Cancel',
			onClick: this.props.onClose,
		},
		{
			id: 'edit-element-dialog-save',
			primary: true,
			children: 'Save',
			onClick: this.onSubmit,
		},
	];

	onSubmit = () => {
		const element = {
			end: dateToMySQL(this.state.elementEnd),
			id: this.state.elementId,
			rating: this.state.elementRating,
			start: dateToMySQL(this.state.elementStart),
			title: this.state.elementTitle,
			type: this.state.elementType,
		};
		console.log(element);
		this.props.updateElement(element);
		this.setState({
			elementEnd: undefined,
			elementId: undefined,
			elementRating: 0,
			elementStart: undefined,
			elementTitle: '',
			elementType: '',
		});
		this.props.onClose();
	};

	updateForm = field => value => this.setState({ [field]: value });

	renderCloseButton = () => (
		<Button icon onClick={this.props.onClose}>
			close
		</Button>
	);

	renderSaveButton = () => (
		<Button icon onClick={this.onSubmit}>
			save
		</Button>
	);

	render() {
		const { onClose, visible } = this.props;
		const {
			elementEnd,
			elementRating,
			elementStart,
			elementTitle,
			elementType,
		} = this.state;

		return (
			<DialogContainer
				actions={this.getActions()}
				fullPage
				id="edit-element-dialog"
				initialFocus="edit-element-dialog-title"
				onHide={onClose}
				aria-label="Edit element"
				visible={visible}
			>
				<Toolbar
					actions={this.renderSaveButton()}
					colored
					fixed
					nav={this.renderCloseButton()}
					title="Edit Element"
				/>
				<section className="md-toolbar-relative">
					<TextField
						id="edit-element-dialog-title"
						label="Title"
						name="title"
						onChange={this.updateForm('elementTitle')}
						value={elementTitle}
					/>
					<SelectField
						fullWidth
						id="edit-element-dialog-type"
						label="Type"
						menuItems={TYPES}
						name="type"
						onChange={this.updateForm('elementType')}
						value={elementType}
					/>
					<DatePicker
						defaultValue={elementStart}
						id="edit-element-dialog-start"
						label="Start Date"
						locales="en-GB"
						onChange={this.updateForm('elementStart')}
					/>
					<DatePicker
						defaultValue={elementEnd}
						id="edit-element-dialog-end"
						label="End Date"
						locales="en-GB"
						onChange={this.updateForm('elementEnd')}
					/>
					<SelectField
						fullWidth
						id="edit-element-dialog-rating"
						label="Rating"
						menuItems={getRatingItems()}
						name="rating"
						onChange={this.updateForm('elementRating')}
						value={elementRating}
					/>
				</section>
			</DialogContainer>
		);
	}
}

const mapStateToProps = state => ({
	viewFilterYear: getViewFilter(state, 'year'),
});

const mapDispatchToProps = { updateElement };

export default connect(mapStateToProps, mapDispatchToProps)(EditDialog);
