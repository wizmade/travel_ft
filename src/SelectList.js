import React from 'react';
import Axios from 'axios';
import * as co from "../common.js";

function SelectList() {
    const method = "/app_accompany/selectList";
    loadDatas = () => {
        Axios.get(co.SITE_URL+method)
    }

    return (
        <select>

        </select>
    )
}

export default SelectList;