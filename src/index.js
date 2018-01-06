import _ from 'lodash'; //a library and it's customary to use "_" as the name.
import React, { Component } from 'react'; //Go find the library called react installed in my application as a dependency, and assigin to the variable React; Import the component module.
import ReactDOM from 'react-dom'; // a library
import YTSearch from 'youtube-api-search'; // a library

//Self made Components
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyBB3iJICB4TTN3wMln3CpfQyPOVbuV4psw'; //const because value will never change, and the api key we got from Youtube.



//Create a new component. This component should produce HTML
class App extends Component{ 
    constructor(props) {
        super(props); 

        this.state = { 
            videos: [],
            selectedVideo: null
         };

         this.videoSearch('surfboards');
    }

videoSearch(term) {
         YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]

             });
});  
}

    render(){
        const videoSearch = _.debounce((term) => {this.videoSearch(term) }, 300);

    return ( //parentheses if we have multiple lines
    <div>
        <SearchBar onSearchTermChange ={videoSearch} /> 
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
            onVideoSelect={selectedVideo => this.setState({selectedVideo})}
            videos={this.state.videos} />
    </div>
    );
}
}




// Take this component's generated HTML and put it on the page(In the DOM)
ReactDOM.render(<App />, document.querySelector('.container')); //React please render this component"App"