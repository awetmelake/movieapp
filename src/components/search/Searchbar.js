import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { fetchMovies } from "../../actions/searchActions";

// import "./Search.scss";
import searchIcon from "../../images/baseline-search-24px.svg";

class Searchbar extends Component {
  state = {
    search: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.title]: e.target.value
    });
  };

  handleSubmit = () => {
    if (this.state.search !== "") {
      this.props.fetchMovies(this.state.search);
    }
    //resetstate
    this.setState({
      search: ""
    });
  };

  render() {
    return (
      <form className="search-bar text-black">
        <input
          title="search"
          value={this.state.search}
          onChange={this.handleChange}
          placeholder="search..."
        />
        <Link to={`/search-results/${this.state.search}`}>
          <button style={{borderBottomRightRadius: '10px', borderTopRightRadius: '10px'}} onClick={e => this.handleSubmit()} type="submit" className="">
            <img src={searchIcon} alt="" />
          </button>
        </Link>
      </form>
    );
  }
}

export default connect(
  null,
  { fetchMovies }
)(Searchbar);
