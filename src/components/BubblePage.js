import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from '../helpers/axiosWithAuth';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [updatedList, setList] = useState(true)
  useEffect(() => {
    axiosWithAuth()
      .get('/colors')
      .then(res => {
        setColorList(res.data)
      })
      .catch(err => {
        console.log(err)

      })

  }, [updatedList])

  return (
    <div className="container">
      <ColorList colors={colorList} updateColors={setColorList} updatedList={updatedList} setList={setList} />
      <Bubbles colors={colorList} />
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
