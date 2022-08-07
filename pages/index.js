
import app from '../database/fireBase'
import { getDatabase, ref, set, get, child } from "firebase/database";
import { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';


class Home extends Component {
  componentDidMount() {
    this.renderPosts();
  }

  renderPosts = async () => {
    try {
      const res = await axios.get('/posts');
      const posts = res.data;

      // this will re render the view with new data
      this.setState({
        Posts: posts
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const posts = this.state.Posts.map((post, i) => (
      <li key={i} className="list-group-item">{post.text}</li>
    ));

    return (
      <div>
        <ul className="list-group list-group-flush">
          {posts}
        </ul>
      </div>
    );
  }
}

export default Home;