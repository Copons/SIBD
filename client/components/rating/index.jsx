import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import FontIcon from 'react-md/lib/FontIcons/FontIcon';
import SelectField from 'react-md/lib/SelectFields/SelectField';
import classNames from 'classnames';

import { getRatingItems } from 'lib/ratings';

import './style.scss';

export class Rating extends PureComponent {
	static defaultProps = {
		rating: 0,
	};

	state = {
		editMode: false,
		rating: 0,
	};

	componentWillMount() {
		this.setState({ rating: this.props.rating });
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.rating !== nextProps.rating) {
			this.setState({ rating: nextProps.rating });
		}
	}

	enterEditMode = () => this.setState({ editMode: true });

	leaveEditMode = () => this.setState({ editMode: false });

	updateRating = value => {
		this.props.onChange(value);
		this.setState({ editMode: false, rating: value });
	};

	renderEditVersion = () => (
		<span className="rating-edit-mode">
			<SelectField
				id="insert-element-dialog-rating"
				menuItems={getRatingItems()}
				name="rating"
				onChange={this.updateRating}
				value={this.state.rating}
			/>
			<Button icon onClick={this.leaveEditMode}>
				close
			</Button>
		</span>
	);

	renderViewVersion = () => {
		const { rating } = this.props;
		const fiveStarRating = rating / 2;
		const fullStars = Math.floor(fiveStarRating);
		const halfStar = 0 !== fiveStarRating % 1 ? 1 : 0;

		return (
			<span className="rating-view-mode" onClick={this.enterEditMode}>
				{[...new Array(fullStars)].map((star, index) => (
					<FontIcon key={`full-${index}`}>star</FontIcon>
				))}

				{!!halfStar && <FontIcon>star_half</FontIcon>}

				{[...new Array(5 - fullStars - halfStar)].map((star, index) => (
					<FontIcon key={`full-${index}`}>star_border</FontIcon>
				))}
			</span>
		);
	};

	render() {
		const { className } = this.props;
		const { editMode } = this.state;
		const classes = classNames('rating', className);
		return (
			<div className={classes} {...this.props}>
				{editMode ? this.renderEditVersion() : this.renderViewVersion()}
			</div>
		);
	}
}

export default Rating;
