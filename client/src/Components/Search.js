import React from "react";
import AutoSuggest from "react-autosuggest";
import FuzzySearch from "fuzzy-search";
import { Link } from "react-router-dom"
import DefaultProfilePic from "../Images/default-profile-image.jpg";

const theme = {
    input: {
        width: "100%",
        height: "50px",
        padding: "10px",
        border: "1px solid #0084FF",
        borderTopLeftRadius: "18px",
        borderTopRightRadius: "18px",
        borderBottomLeftRadius: "18px",
        borderBottomRightRadius: "18px",
        outline: "none"
    },
    inputOpen: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    container: {
        margin: "20px 0"
    },
    suggestionsContainerOpen: {
        backgroundColor: "#fff",
        borderLeft: "1px solid #0084FF",
        borderRight: "1px solid #0084FF",
        borderBottom: "1px solid #0084FF",
        borderBottomLeftRadius: "18px",
        borderBottomRightRadius: "18px",
        color: "black"
    },
    suggestionsList: {
        listStyleType: "none",
        padding: 0
    },
    suggestion: {
        cursor: "pointer",
        padding: "10px 20px",
    },
    suggestionHighlighted: {
        backgroundColor: '#ddd'
    }
}


class Search extends React.Component{
    constructor(props){
        super(props);


        this.state = {
            value: "",
            suggestions: []
        }

       
    }


    redirect(username){
        this.props.history.push(`/users/${username}`);
    }

    getSuggestions = value => {
        return this.searcher.search(value.trim());
    }
    
    getSuggestionValue = suggestion => suggestion.username;
    
    
    renderSuggestion = suggestion => (
        <div onClick={() => this.redirect(suggestion.username)}>
            <img 
                style={{
                    borderRadius: "18px",
                    marginRight: "5px"
                }}
                width="25" 
                height="25" 
                src={suggestion.profileImageUrl || DefaultProfilePic} 
                alt="user"
            />
            <Link to={`/users/${suggestion.username}`}>{suggestion.username}</Link>
        </div>
    );

    // componentDidMount(){
       

       
    // }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render(){
        const { value, suggestions } = this.state;

        this.searcher = new FuzzySearch(this.props.users, ["username"], {caseSensitive: false});

        const inputProps = {
            placeholder: 'Search for a user...',
            value,
            onChange: this.onChange
        };

        return (
            <div>
                <AutoSuggest 
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                    theme={theme}
                 />
            </div>
        )
    }
}



export default Search;