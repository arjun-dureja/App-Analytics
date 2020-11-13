import React from 'react'

export default class Analytics extends React.Component {

    state = {
        icons: [],
        downloads: [],
        ratings: [],
    }

    async componentDidMount() {
        const iconDownloadsURL = "https://api.appfigures.com/v2/reports/sales/?group_by=products&client_key=1be40558c1de4197b1629674dab0fe62";
        const response = await fetch(iconDownloadsURL, {
            method: 'post',
            headers: new Headers({
                'Authorization': 'Basic YXJqdW4uZHVyZWphMTAwMEBnbWFpbC5jb206YXJqdW44NzM=',
            }),
        });
        const data = await response.json();
        for (var key in data) {
            if (data[key]['product']['icon'] !== "Unknown") {
                this.setState(prevState => ({
                    icons: [...prevState.icons, data[key]['product']['icon']],
                    downloads: [...prevState.downloads, data[key]['downloads']]
                }))
            }
        }

        const ratingsURL = "https://api.appfigures.com/v2/reports/ratings/?group_by=product&client_key=1be40558c1de4197b1629674dab0fe62";
        const ratingsResponse = await fetch(ratingsURL, {
            method: 'post',
            headers: new Headers({
                'Authorization': 'Basic YXJqdW4uZHVyZWphMTAwMEBnbWFpbC5jb206YXJqdW44NzM=',
            }),
        });
        const ratingsData = await ratingsResponse.json();
        for (var app in ratingsData) {
            this.setState(prev => ({
                ratings: [...prev.ratings, ratingsData[app]['average']]
            }))
        }
    }

    render() {
        return (
            <div className="container">
                <div className="box">
                    <div className="title">
                        <h1>App Analytics</h1>
                    </div>
                    <div className="column-titles">
                        <h2>App</h2>
                        <h2>Downloads</h2>
                        <h2>Rating</h2>
                    </div>
                    <div className="analytics">
                        <div className="app-icons">
                            {this.state.icons.map( (icon) =>
                                <img className="img" src={icon} alt="Icon" />
                            )}
                        </div>
                        <div className="downloads">
                            {this.state.downloads.map( (count) =>
                                <h3>{count}</h3>
                            )}
                        </div>
                        <div className="ratings">
                            {this.state.ratings.map( (rating) =>
                                <h3>{rating} Stars</h3>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
