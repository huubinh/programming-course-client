import axios from "axios";

const apiUrl = "https://programming-course-server.herokuapp.com/v1";

export const getData = async (url, token) => {
  const res = await axios.get(`${apiUrl}/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res.data);
  const data = res.data;
  return data;
};

export const postData = async (url, post, token) => {
  const res = await axios.post(`${apiUrl}/${url}`, post, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = res.data;
  return data;
};

export const putData = async (url, post, token) => {
  const res = await axios.put(`${apiUrl}/${url}`, post, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = res.data;
  return data;
};

export const patchData = async (url, post, token) => {
  const res = await fetch(`${apiUrl}/${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });

  const data = await res.json();
  return data;
};

export const deleteData = async (url, token) => {
  const res = await fetch(`${apiUrl}/${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  const data = await res.json();
  return data;
};
