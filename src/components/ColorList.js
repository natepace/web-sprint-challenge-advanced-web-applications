import React, { useState } from "react";

import Color from './Color';
import EditMenu from './EditMenu';
import { useHistory, useParams } from 'react-router-dom';
import { axiosWithAuth } from '../helpers/axiosWithAuth';
import PrivateRoute from "./PrivateRoute";
const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, updatedList, setList }) => {
  console.log(colors)
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const { id } = useParams()

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        setList(!updatedList)
        console.log(colors)
      })
      .catch(err => {
        console.log(err)
      })

  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        updateColors(colors.filter((c) => c.id !== color.id))
      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => <Color key={color.id} editing={editing} color={color} editColor={editColor} deleteColor={deleteColor} />)}

      </ul>

      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing} />}

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.