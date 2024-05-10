import React, { useState } from "react";
import UserForm from "./Form";
import "./App.css";

function TableData() {
  const [UserData, setUserData] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const deleteRow = (id) => {
    const updatedUserData = UserData.filter((user) => user.id !== id);
    setUserData(updatedUserData);
  };

  const UpdateRow = (id) => {
    const userToEdit = UserData.find((user) => user.id === id);
    setEditingUser(userToEdit);
    setShowUpdateForm(true);
  };

  const tableRows = UserData.map((info) => (
    <tr key={info.id}>
      <td>{info.Name}</td>
      <td>{info.Email}</td>
      <td>{info.Phone}</td>
      <td className="UpdateBox">
        <button id="btm1" className="btn" onClick={() => UpdateRow(info.id)}>
          Edit
        </button>
        <button id="btm2" className="btn" onClick={() => deleteRow(info.id)}>
          Delete
        </button>
      </td>
    </tr>
  ));

  const addRows = (data) => {
    const existingUser = UserData.find(
      (user) =>
        user.Name.toLowerCase() === data.Name.toLowerCase() ||
        user.Email === data.Email ||
        user.Phone === data.Phone
    );

    if (existingUser) {
      setEditingUser(existingUser);
      setShowUpdateForm(true);
    } else {
      const totalUser = UserData.length;
      data.id = totalUser + 1;
      const updatedUserData = [...UserData, data];
      setUserData(updatedUserData);
    }
  };

  const UpdateRows = (data) => {
    const updatedUserData = UserData.map((user) => {
      if (user.id === editingUser.id) {
        return { ...user, ...data };
      }
      return { ...user };
    });

    setUserData(updatedUserData);
    setEditingUser(null);
    setShowUpdateForm(false);
  };

  function renderForm() {
    if (showUpdateForm && editingUser) {
      return (
        <UserForm
          func={UpdateRows}
          userData={editingUser}
          allUsers={UserData}
          editTrigger={showUpdateForm}
        />
      );
    } else {
      return <UserForm func={addRows} allUsers={UserData} />;
    }
  }

  return (
    <>
      {renderForm()}
      {UserData.length > 0 && (
        <>
          <p>{Error}</p>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th className="UpdateBox">Edit/Delete</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>
        </>
      )}
    </>
  );
}

export default TableData;
