
import app from '../database/fireBase'
import { getDatabase, ref, set, get, child } from "firebase/database";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favoritecolor: "red", rawChart: [] };
    this.loadGroupChart = this.loadGroupChart.bind(this);
  }

  componentDidMount() {
    console.log("[1] componentDidMount......................");
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate......................");
  }
  componentDidUpdate() {
    console.log("componentDidUpdate......................");
  }

  writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(ref(db, 'data/users/' + userId), {
      username: name,
      email: email,
      profile_picture: imageUrl
    });
  }

  readUserData(userId) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `data/user/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  readHisData() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `data/history/-N8cGv2geojehY71rcyj`)).then((snapshot) => {
      if (snapshot.exists()) {

        const homes = snapshot.val();
        var sector = homes.filter(x => x.SYS.includes("."));
        var sectorLabel = sector.map(function (item) {
          return item['SYS'];
        });

        const totalVal = sector.reduce((accumulator, object) => {
          return accumulator + object.VALUE;
        }, 0);

        console.log(totalVal);
        console.log(sector);
        console.log(sectorLabel);

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  async loadGroupChart() {
    await axios.get("http://localhost:5000/chartGroup").then((result) => {
      const chartData = result.data;
      return (<LineChart
        width={800}
        height={500}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="ICT" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ETRON" stroke="#789536" />
        <Line type="monotone" dataKey="ICT" stroke="#82ca9d" />
      </LineChart>);
    }).catch((e) => {
      console.log("error loadGroupChart")
    })
  }

  async setGroupChar() {
    let cData = await this.loadGroupChart();
    console.log("papare data for chart ", cData)

  }


  render() {


    return (
      <div>
        {this.loadGroupChart()}
      </div>
    )
  }
}

export default Home;