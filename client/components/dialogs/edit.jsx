import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { find, isEqual, map, reject } from 'lodash-es';
import Autocomplete from 'react-md/lib/Autocompletes/Autocomplete';
import Button from 'react-md/lib/Buttons/Button';
import Chip from 'react-md/lib/Chips/Chip';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
import DialogContainer from 'react-md/lib/Dialogs/DialogContainer';
import SelectField from 'react-md/lib/SelectFields/SelectField';
import Slider from 'react-md/lib/Sliders/Slider';
import TextField from 'react-md/lib/TextFields/TextField';
import Toolbar from 'react-md/lib/Toolbars/Toolbar';

import { dateFromMySQL, dateToMySQL } from 'lib/dates';
import { TYPES } from 'lib/types';
import { getAuthors } from 'state/authors/selectors';
import { deleteElement, updateElement } from 'state/elements/actions';
import { getViewFilter } from 'state/ui/selectors';

import './style.scss';

export class EditDialog extends PureComponent {
	state = {
		deleteDialogVisible: false,
		elementAuthors: [],
		elementEnd: null,
		elementId: undefined,
		elementRating: 0,
		elementStart: null,
		elementTitle: '',
		elementType: '',
	};

	componentWillReceiveProps(nextProps) {
		if (!isEqual(this.props, nextProps)) {
			this.setState({
				elementAuthors: nextProps.elementAuthors || [],
				elementEnd: dateFromMySQL(nextProps.elementEnd),
				elementId: nextProps.elementId,
				elementRating: parseInt(nextProps.elementRating, 10),
				elementStart: dateFromMySQL(nextProps.elementStart),
				elementTitle: nextProps.elementTitle,
				elementType: nextProps.elementType,
			});
		}
	}

	closeDeleteDialog = () => this.setState({ deleteDialogVisible: false });

	formatAuthors = () =>
		map(this.props.authors, author => ({
			label:
				author.givenName + ' ' + author.familyName + ' ' + author.businessName,
			value: author.id,
		}));

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

	getDeleteActions = () => [
		{
			id: 'delete-element-dialog-cancel',
			secondary: true,
			children: 'Cancel',
			onClick: this.closeDeleteDialog,
		},
		{
			id: 'delete-element-dialog-confirm',
			primary: true,
			children: 'Delete',
			onClick: this.onDelete,
		},
	];

	onAddAuthor = value => {
		const author = find(this.props.authors, { id: value });
		this.setState(({ elementAuthors }) => ({
			elementAuthors: [...elementAuthors, author],
		}));
	};

	onDelete = () => {
		const { elementId } = this.state;
		this.props.deleteElement(elementId);
		this.setState({
			deleteDialogVisible: false,
			elementAuthors: [],
			elementEnd: null,
			elementId: undefined,
			elementRating: 0,
			elementStart: null,
			elementTitle: '',
			elementType: '',
		});
		this.props.onClose();
	};

	onRemoveAuthor = authorId => () => {
		this.setState(({ elementAuthors }) => ({
			elementAuthors: reject(elementAuthors, { id: authorId }),
		}));
	};

	onSubmit = () => {
		const element = {
			authors: this.state.elementAuthors,
			end: dateToMySQL(this.state.elementEnd),
			id: this.state.elementId,
			rating: this.state.elementRating,
			start: dateToMySQL(this.state.elementStart),
			title: this.state.elementTitle,
			type: this.state.elementType,
		};
		this.props.updateElement(element);
		this.setState({
			deleteDialogVisible: false,
			elementAuthors: [],
			elementEnd: null,
			elementId: undefined,
			elementRating: 0,
			elementStart: null,
			elementTitle: '',
			elementType: '',
		});
		this.props.onClose();
	};

	openDeleteDialog = () => this.setState({ deleteDialogVisible: true });

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

	renderDeleteButton = () => (
		<Button icon onClick={this.openDeleteDialog}>
			delete
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
			deleteDialogVisible,
			elementAuthors,
			elementEnd,
			elementRating,
			elementStart,
			elementTitle,
			elementType,
		} = this.state;

		return (
			<DialogContainer
				actions={this.getActions()}
				aria-label="Edit element"
				id="edit-element-dialog"
				initialFocus="edit-element-dialog-title"
				onHide={onClose}
				visible={visible}
				width={600}
			>
				<Toolbar
					actions={[this.renderDeleteButton(), this.renderSaveButton()]}
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
					<div>
						<Autocomplete
							clearOnAutocomplete
							data={this.formatAuthors()}
							dataLabel="label"
							dataValue="value"
							id="edit-element-dialog-authors"
							label="Authors"
							onAutocomplete={this.onAddAuthor}
						/>
						{map(
							elementAuthors,
							({ businessName, familyName, givenName, id }) => (
								<Chip
									key={`author-${id}`}
									label={givenName + ' ' + familyName + ' ' + businessName}
									onClick={this.onRemoveAuthor(id)}
									removable
								/>
							)
						)}
					</div>
					<div className="md-grid">
						<DatePicker
							autoOk
							disableScrollLocking
							id="edit-element-dialog-start"
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
							id="edit-element-dialog-end"
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
						id="edit-element-dialog-rating"
						label="Rating"
						max={10}
						min={0}
						onChange={this.updateForm('elementRating')}
						value={elementRating || 0}
						valuePrecision={1}
					/>
				</section>
				<DialogContainer
					actions={this.getDeleteActions()}
					aria-label="Edit element"
					disableScrollLocking
					id="delete-element-dialog"
					lastChild
					modal
					onHide={this.closeDeleteDialog}
					portal
					renderNode={document.body}
					title={`Delete ${elementTitle}?`}
					visible={deleteDialogVisible}
				/>
			</DialogContainer>
		);
	}
}

const mapStateToProps = state => ({
	authors: getAuthors(state),
	viewFilterYear: getViewFilter(state, 'year'),
});

const mapDispatchToProps = { deleteElement, updateElement };

export default connect(mapStateToProps, mapDispatchToProps)(EditDialog);
