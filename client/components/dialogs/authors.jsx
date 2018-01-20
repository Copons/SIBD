import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { find, map } from 'lodash-es';
import Button from 'react-md/lib/Buttons/Button';
import DataTable from 'react-md/lib/DataTables/DataTable';
import DialogContainer from 'react-md/lib/Dialogs/DialogContainer';
import EditDialogColumn from 'react-md/lib/DataTables/EditDialogColumn';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TextField from 'react-md/lib/TextFields/TextField';
import Toolbar from 'react-md/lib/Toolbars/Toolbar';

import {
	deleteAuthor,
	fetchAllAuthors,
	insertAuthor,
	updateAuthor,
} from 'state/authors/actions';
import { getAuthors } from 'state/authors/selectors';

export class AuthorsDialog extends PureComponent {
	state = {
		authorBusinessName: '',
		authorFamilyName: '',
		authorGivenName: '',
	};

	onDelete = authorId => () => {
		this.props.deleteAuthor(authorId);
		this.setState({
			authorBusinessName: '',
			authorFamilyName: '',
			authorGivenName: '',
		});
	};

	onSubmit = () => {
		const author = {
			businessName: this.state.authorBusinessName,
			familyName: this.state.authorFamilyName,
			givenName: this.state.authorGivenName,
		};
		this.props.insertAuthor(author);
		this.setState({
			authorBusinessName: '',
			authorFamilyName: '',
			authorGivenName: '',
		});
	};

	updateForm = (id, field) => value => {
		const author = find(this.props.authors, { id });
		this.props.updateAuthor({ ...author, [field]: value });
	};

	updateInsertForm = field => value => this.setState({ [field]: value });

	renderCloseButton = () => (
		<Button icon onClick={this.props.onClose}>
			close
		</Button>
	);

	render() {
		const { authors, onClose, visible } = this.props;
		const {
			authorBusinessName,
			authorFamilyName,
			authorGivenName,
		} = this.state;
		return (
			<DialogContainer
				aria-label="Authors"
				fullPage
				id="authors-dialog"
				onHide={onClose}
				onShow={this.props.fetchAllAuthors}
				visible={visible}
			>
				<Toolbar colored fixed nav={this.renderCloseButton()} title="Authors" />
				<section className="md-toolbar-relative">
					<div className="md-grid">
						<TextField
							id="author-dialog-given-name"
							className="md-cell md-cell--3"
							label="Given Name"
							onChange={this.updateInsertForm('authorGivenName')}
							value={authorGivenName}
						/>
						<TextField
							id="author-dialog-family-name"
							className="md-cell  md-cell--3"
							label="Family Name"
							onChange={this.updateInsertForm('authorFamilyName')}
							value={authorFamilyName}
						/>
						<TextField
							id="author-dialog-business-name"
							className="md-cell  md-cell--4"
							label="Business Name"
							onChange={this.updateInsertForm('authorBusinessName')}
							value={authorBusinessName}
						/>
						<Button
							className="md-cell--bottom"
							icon
							onClick={this.onSubmit}
							primary
						>
							add
						</Button>
					</div>
					<DataTable className="author-edit-table" plain>
						<TableHeader>
							<TableRow>
								<TableColumn>Given Name</TableColumn>
								<TableColumn>Family Name</TableColumn>
								<TableColumn>Business Name</TableColumn>
								<TableColumn>Delete</TableColumn>
							</TableRow>
						</TableHeader>
						<TableBody>
							{map(authors, ({ businessName, familyName, givenName, id }) => (
								<TableRow key={`author-${id}`}>
									<EditDialogColumn
										label="Given Name"
										onOkClick={this.updateForm(id, 'givenName')}
										defaultValue={givenName}
									/>
									<EditDialogColumn
										label="Family Name"
										onOkClick={this.updateForm(id, 'familyName')}
										defaultValue={familyName}
									/>
									<EditDialogColumn
										label="Business Name"
										onOkClick={this.updateForm(id, 'businessName')}
										defaultValue={businessName}
									/>
									<TableColumn>
										<Button icon primary onClick={this.onDelete(id)}>
											delete
										</Button>
									</TableColumn>
								</TableRow>
							))}
						</TableBody>
					</DataTable>
				</section>
			</DialogContainer>
		);
	}
}

const mapStateToProps = state => ({ authors: getAuthors(state) });

const mapDispatchToProps = {
	deleteAuthor,
	fetchAllAuthors,
	insertAuthor,
	updateAuthor,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsDialog);
