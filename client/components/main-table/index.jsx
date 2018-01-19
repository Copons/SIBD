import React, { Component } from 'react';
import { connect } from 'react-redux';
import { find, isEqual, map, sortBy } from 'lodash-es';
import Button from 'react-md/lib/Buttons/Button';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TableRow from 'react-md/lib/DataTables/TableRow';

import EditDialog from 'components/dialogs/edit';
import MainTableCardHeader from 'components/main-table/main-table-card-header';
import MainTableHeader from 'components/main-table/main-table-header';
import Rating from 'components/rating';
import { dateToMySQL, displayDate } from 'lib/dates';
import { TYPES } from 'lib/types';
import { fetchAllElements, updateElement } from 'state/elements/actions';
import { getElements, getElementsByYear } from 'state/elements/selectors';
import { getViewFilter } from 'state/ui/selectors';

import './style.scss';

export class MainTable extends Component {
	state = {
		editDialogVisible: false,
		editElement: {},
		sortAscending: false,
		sortField: 'end',
	};

	componentWillMount() {
		this.props.fetchAllElements();
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
	}

	closeEditDialog = () => this.setState({ editDialogVisible: false });

	changeSort = field => () => {
		this.setState(({ sortAscending, sortField }) => ({
			sortAscending: sortField === field ? !sortAscending : true,
			sortField: field,
		}));
	};

	editElement = element => () =>
		this.setState({
			editElement: {
				elementEnd: element.end,
				elementId: element.id,
				elementRating: element.rating,
				elementStart: element.start,
				elementTitle: element.title,
				elementType: element.type,
			},
			editDialogVisible: true,
		});

	sortElements = () => {
		const { elements } = this.props;
		const { sortAscending, sortField } = this.state;
		const sortedElements = sortBy(elements, [sortField, 'start']);
		return sortAscending ? sortedElements : sortedElements.reverse();
	};

	updateElement = (element, field) => value => {
		const parsedValue =
			'start' === field || 'end' === field ? dateToMySQL(value) : value;
		this.props.updateElement({ ...element, [field]: parsedValue });
	};

	render() {
		const {
			editDialogVisible,
			editElement,
			sortAscending,
			sortField,
		} = this.state;
		const elements = this.sortElements();

		return (
			<div>
				<MainTableCardHeader />
				<DataTable className="main-table" plain>
					<MainTableHeader
						changeSort={this.changeSort}
						sortAscending={sortAscending}
						sortField={sortField}
					/>
					<TableBody>
						{map(elements, element => (
							<TableRow key={`element-${element.id}`}>
								<TableColumn className="table-column-fixed-min-width">
									<Rating rating={element.rating} />
								</TableColumn>
								<TableColumn className="table-column-title">
									{element.title}
								</TableColumn>
								<TableColumn className={`table-column-type-${element.type}`}>
									{find(TYPES, { value: element.type }).label}
								</TableColumn>
								<TableColumn>{displayDate(element.start)}</TableColumn>
								<TableColumn>{displayDate(element.end)}</TableColumn>
								<TableColumn className="table-column-button">
									<Button icon primary onClick={this.editElement(element)}>
										edit
									</Button>
								</TableColumn>
							</TableRow>
						))}
					</TableBody>
				</DataTable>
				<EditDialog
					{...editElement}
					onClose={this.closeEditDialog}
					visible={editDialogVisible}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const viewFilterYear = getViewFilter(state, 'year');
	const elements =
		'all' === viewFilterYear
			? getElements(state)
			: getElementsByYear(state, viewFilterYear);

	return { elements };
};

const mapDispatchToProps = { fetchAllElements, updateElement };

export default connect(mapStateToProps, mapDispatchToProps)(MainTable);
