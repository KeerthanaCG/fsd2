import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
const List = ({url}) => {

  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    console.log(response.data);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  //  whenever this component  will be loaded in that case this fetchlist will be executed atleast once
  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    // api call
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error("Error")
    }
  };
  return (
    <div className="list add flex-col">
      <p>List Of all Foods</p>
      <div className="list-table">
        <div className="list-table-format title">
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                🗑
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
