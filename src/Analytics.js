import React from 'react';
import Loader from 'react-loader-spinner';

const fetchIcons = async () => {
  const response = await fetch('/.netlify/functions/icons')
  const data = await response.json();
  return data;
};

const fetchLinks = async () => {
  const response = await fetch('/.netlify/functions/links')
  const data = await response.json();
  return data;
};

export default class Analytics extends React.Component {
  state = {
    loading: true,
    icons: [],
    downloads: [],
    links: [],
  };

  async componentDidMount() {
    const iconData = await fetchIcons();
    const linksData = await fetchLinks();

    for (let key in iconData) {
      if (iconData[key]['product']['icon'] !== 'Unknown') {
        this.setState((prevState) => ({
          icons: [...prevState.icons, iconData[key]['product']['icon']],
          downloads: [...prevState.downloads, iconData[key]['downloads']],
        }));
      }
    }

    for (let link in linksData) {
      if (linksData[link]['icon'] !== 'Unknown') {
        this.setState((prevLink) => ({
          links: [...prevLink.links, linksData[link]['view_url']],
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
      <div className='container'>
        {this.state.loading ? (
          <Loader
            className='loader'
            type='Oval'
            color='#be72fa'
            height={80}
            width={80}
          />
        ) : (
          <div className='box'>
            <div className='title'>
              <h1>App Analytics</h1>
            </div>
            <div className='analytics'>
              <div className='app-icons'>
                <h2>App</h2>
                {this.state.links.map((link, i) => (
                  <a
                    className='link'
                    key={i}
                    href={link}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img
                      className='img'
                      key={i}
                      src={this.state.icons[i]}
                      alt='Icon'
                    />
                  </a>
                ))}
              </div>
              <div className='downloads'>
                <h2>Downloads</h2>
                {this.state.downloads.map((count, i) => (
                  <h3 className='h3' key={i}>
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
