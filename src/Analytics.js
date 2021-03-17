import React from "react";
import Loader from "react-loader-spinner";
import { iconURL, linkURL, authKey } from "./constants";

export default class Analytics extends React.Component {
  state = {
    loading: true,
    icons: [],
    downloads: [],
    links: [],
  };

  async componentDidMount() {
    const iconDownloadsURL = iconURL;
    const response = await fetch(iconDownloadsURL, {
      method: "post",
      headers: new Headers({
        Authorization: "Basic " + authKey,
      }),
    });
    const data = await response.json();
    for (let key in data) {
      if (data[key]["product"]["icon"] !== "Unknown") {
        this.setState((prevState) => ({
          icons: [...prevState.icons, data[key]["product"]["icon"]],
          downloads: [...prevState.downloads, data[key]["downloads"]],
        }));
      }
    }

    const linksURL = linkURL;
    const linksResponse = await fetch(linksURL, {
      method: "get",
      headers: new Headers({
        Authorization: "Basic " + authKey,
      }),
    });
    const linksData = await linksResponse.json();
    for (let link in linksData) {
      if (linksData[link]["icon"] !== "Unknown") {
        this.setState((prevLink) => ({
          links: [...prevLink.links, linksData[link]["view_url"]],
        }));
      }
    }

    this.setState({
      icons: this.state.icons.reverse(),
      downloads: this.state.downloads.reverse(),
      links: this.state.links.reverse(),
      loading: false,
    });
  }

  render() {
    return (
      <div className="container">
        {this.state.loading ? (
          <Loader
            className="loader"
            type="Oval"
            color="#be72fa"
            height={80}
            width={80}
            timeout={5000} //5 seconds
          />
        ) : (
          <div className="box">
            <div className="title">
              <h1>App Analytics</h1>
            </div>
            <div className="column-titles">
              <h2>App</h2>
              <h2>Downloads</h2>
            </div>
            <div className="analytics">
              <div className="app-icons">
                {this.state.links.map((link, i) => (
                  <a
                    className="link"
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="img"
                      key={i}
                      src={this.state.icons[i]}
                      alt="Icon"
                    />
                  </a>
                ))}
              </div>
              <div className="downloads">
                {this.state.downloads.map((count, i) => (
                  <h3 className="h3" key={i}>
                    {count}
                  </h3>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
