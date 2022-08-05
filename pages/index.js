import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import app from '../database/fireBase'
import { getDatabase, ref, set, get, child } from "firebase/database";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import chartData from '../example/group'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: chartData
    }
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

  render() {

    const { data } = this.state;
    const x = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 },{ name: 'Page B', uv: 1400, pv: 400, amt: 2400 }];
    return (
      <LineChart
        width={500}
        height={300}
        data={x}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
      </LineChart>
    )
  }
}

export default Home;