import React from 'react';
import { Rating, Feed, Icon } from 'semantic-ui-react';

class SingleReview extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		let image = `https://source.unsplash.com/collection/4389261/${Math.random() * 36}`;
		let splitDate = this.props.review.date_of_review.split(" ");
    let dateOfReview = splitDate[0] + ' ' + splitDate[1] + ', ' + splitDate[2];
		return (
			<Feed.Event style={{ paddingTop: '30px' }}>
				<Feed.Label>
					<img src={image} style={{ borderRadius: '100%', height: '35px', width: '35px' }} />
				</Feed.Label>
				<Feed.Content>
					<Feed.Summary>
						<Feed.User style={{ paddingBottom: '15px' }}>
							<a style={{ color: 'gray', textDecoration: 'underline', transition: 'opacity 200ms ease-out' }}>{this.props.review.customer_name}</a>
						</Feed.User>
						<Feed.Date>{dateOfReview}</Feed.Date>
					</Feed.Summary>
					<Rating rating={this.props.review.rating} defaultRating={3} maxRating={5} size="huge" disabled />
					<Feed.Extra text>
						<b>Mask color: </b> {this.props.review.item_option}
					</Feed.Extra>
					<Feed.Extra text style={{ fontSize: '16px' }}>
						{this.props.review.review_content}
					</Feed.Extra>
				</Feed.Content>
			</Feed.Event>
		);
	}
}

export default SingleReview;
