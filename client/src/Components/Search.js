import React from "react";
import AutoSuggest from "react-autosuggest";
import FuzzySearch from "fuzzy-search";
import { Link, NavLink } from "react-router-dom"

// const users = [
//     {
//         _id: "5ef1cfd0a5f7f53d787b8208",
//         username: "test"
//     },
//     {
//         _id: "5ef4e52b0fffab3480df182d",
//         username: "new"
//     },
//     {
//         _id: "5ef50538fd13ae24c46a78cb",
//         username: "admin"
//     },
//     {
//         _id: "5ef7b6a9c5b8a2432cd4c724",
//         username: "test123"
//     },
//     {
//         _id: "5ef7b6ed98ddcf46440ffec7",
//         username: "a"
//     },
//     {
//         _id: "5ef88433750b0540d0a33001",
//         username: "admin1"
//     },
//     {
//         _id: "5efcae796b623246d0abcc6f",
//         username: "newUser"
//     },
//     {
//         _id: "5f1b0969736c471e489b6f7f",
//         username: "chat1"
//     },
//     {
//         _id: "5f1b099f736c471e489b6f80",
//         username: "chat2"
//     },
//     {
//         _id: "5f1b30e86592f417fc2df5ee",
//         username: "emko203"
//     },
//     {
//         _id: "5f1b321c2116b3364056d024",
//         username: "testUser"
//     }, 
//     {
//         _id: "5f1c99b39b31da2484bf46cc",
//         username: "mira"
//     }
// ]

const theme = {
    input: {
        width: "100%",
        height: "50px",
        padding: "10px",
        border: "1px solid #0084FF",
        // borderRadius: "18px",
        borderTopLeftRadius: "18px",
        borderTopRightRadius: "18px",
        borderBottomLeftRadius: "18px",
        borderBottomRightRadius: "18px",
        outline: "none"
    },
    inputOpen: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        // borderTop: "1px solid #0084FF",
        // borderLeft: "1px solid #0084FF",
        // borderRight: "1px solid #0084FF",
        // borderBottom: "none"
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
        // border: "1px solid black"
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

    componentDidMount(){
        
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