import { useState } from 'react';
import '../App.css';
import {VscEdit , VscTrash } from "react-icons/vsc";

function UpdateDelete({task, onDelete, onEdit}){
    return (
        <td id="update-delete">
            <VscEdit onClick={e => {e.preventDefault(); onEdit(task)}}/>
            <VscTrash onClick={e => {e.preventDefault(); onDelete(task._id)}}/>
        </td>
    )
}

export default UpdateDelete;