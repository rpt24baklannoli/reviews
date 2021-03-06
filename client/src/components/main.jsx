import React from 'react';
import axios from 'axios';
import ListingPageReviews from './listingPageReviews.jsx';
import CustomerPhotos from './customerPhotos.jsx';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reviews: [],
			itemId: 1,
		};
		this.getReviews = this.getReviews.bind(this);
		this.getCurrentURL = this.getCurrentURL.bind(this);
	}

	componentDidMount() {
		this.getReviews(this.state.itemId);
		this.getCurrentURL();
	}

	getCurrentURL() {
		const parsedURL = new URL(window.location.href);
		let urlPath = parsedURL.pathname.split('/');
		this.setState(
			{
				itemId: Number(urlPath[2]),
			},
			() => this.getReviews(this.state.itemId)
		);
	}

	getReviews(itemId) {
		axios
			.get(`/api/items/${itemId}/reviews`)
			.then((response) => {
				this.setState({
					reviews: response.data,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		console.log(this.state.reviews);
		return (
			<div>
				<ListingPageReviews reviews={this.state.reviews} />
				<p id="photos-from-reviews" style={{ fontSize: '16px', paddingTop: '20px' }}>
					Photos from reviews
				</p>
				<CustomerPhotos reviews={this.state.reviews} />
			</div>
		);
	}
}

export default Main;
