import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
import DialogContainer from 'react-md/lib/Dialogs/DialogContainer';
import SelectField from 'react-md/lib/SelectFields/SelectField';
import Slider from 'react-md/lib/Sliders/Slider';
import TextField from 'react-md/lib/TextFields/TextField';
import Toolbar from 'react-md/lib/Toolbars/Toolbar';

import { dateToMySQL } from 'lib/dates';
import { TYPES } from 'lib/types';
import { insertElement } from 'state/elements/actions';
import { getViewFilter } from 'state/ui/selectors';

import './style.scss';

export class InsertDialog extends PureComponent {
	state = {
		elementEnd: null,
		elementRating: 0,
		elementStart: null,
		elementTitle: '',
		elementType: '',
	};

	getActions = () => [
		{
			id: 'insert-element-dialog-cancel',
			secondary: true,
			children: 'Cancel',
			onClick: this.props.onClose,
		},
		{
			id: 'insert-element-dialog-save',
			primary: true,
			children: 'Save',
			onClick: this.onSubmit,
		},
	];

	onSubmit = () => {
		const element = {
			end: dateToMySQL(this.state.elementEnd),
			rating: this.state.elementRating,
			start: dateToMySQL(this.state.elementStart),
			title: this.state.elementTitle,
			type: this.state.elementType,
		};
		this.props.insertElement(element);
		this.setState({
			elementEnd: null,
			elementRating: 0,
			elementStart: null,
			elementTitle: '',
			elementType: '',
		});
		this.props.onClose();
	};

	resetEndDate = () => this.setState({ elementEnd: null });

	resetStartDate = () => this.setState({ elementStart: null });

	updateForm = field => value => {
		if ('elementEnd' === field || 'elementStart' === field) {
			return this.setState({ [field]: dateToMySQL(value) });
		}
		this.setState({ [field]: value });
	};

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
				aria-label="Add new element"
				id="insert-element-dialog"
				initialFocus="insert-element-dialog-title"
				onHide={onClose}
				visible={visible}
				width={600}
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
						onChange={this.updateForm('elementTitle')}
						value={elementTitle}
					/>
					<SelectField
						fullWidth
						id="insert-element-dialog-type"
						label="Type"
						menuItems={TYPES}
						name="type"
						onChange={this.updateForm('elementType')}
						value={elementType}
					/>
					<div className="md-grid">
						<DatePicker
							autoOk
							disableScrollLocking
							id="insert-element-dialog-start"
							label="Start Date"
							lastChild
							locales="en-GB"
							onChange={this.updateForm('elementStart')}
							portal
							renderNode={document.body}
							value={elementStart}
						/>
						<Button
							className="md-cell--bottom"
							icon
							type="reset"
							onClick={this.resetStartDate}
						>
							close
						</Button>
					</div>
					<div className="md-grid">
						<DatePicker
							autoOk
							disableScrollLocking
							id="insert-element-dialog-end"
							label="End Date"
							lastChild
							locales="en-GB"
							onChange={this.updateForm('elementEnd')}
							portal
							renderNode={document.body}
							value={elementEnd}
						/>
						<Button
							className="md-cell--bottom"
							icon
							type="reset"
							onClick={this.resetEndDate}
						>
							close
						</Button>
					</div>
					<Slider
						discrete
						discreteTicks={1}
						id="insert-element-dialog-rating-s"
						label="Rating"
						max={10}
						min={0}
						onChange={this.updateForm('elementRating')}
						value={elementRating}
						valuePrecision={1}
					/>
				</section>
			</DialogContainer>
		);
	}
}

const mapStateToProps = state => ({
	viewFilterYear: getViewFilter(state, 'year'),
});

const mapDispatchToProps = { insertElement };

export default connect(mapStateToProps, mapDispatchToProps)(InsertDialog);
