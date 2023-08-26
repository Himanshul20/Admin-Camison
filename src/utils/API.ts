import axios from "axios";
import { Console } from "console";

export const getProduct = async (encryptedKey) => {
  // https://upaygoa.com/JiraAPILIVE/API/FetchProjectAllocation/GetAllocationList?key=ENCRYPT(GETALLOCATIONDATA|U0823|NA|NA)
  return await axios
    .get(`https://localhost:7179/GetMasterList?${encryptedKey}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then(function (response) {
      //console.log(' getissuetypes response::: ', response.data);
      return response.data;
    });
};

export const getCategory = async (encryptedKey) => {
  return await axios
    .get(`https://localhost:7179/GetMasterList?${encryptedKey}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then(function (response) {
      //console.log(' getissuetypes response::: ', response.data);
      return response.data;
    });
};
export const getData = async (encryptedKey) => {
  return await axios
    .get(`/GetMasterList?${encryptedKey}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then(function (response) {
      //console.log(' getissuetypes response::: ', response.data);
      return response.data;
    });
};

export const getCategorydrp = async (encryptedKey) => {
  return await axios
    .get(`https://localhost:7179/GetMasterList?${encryptedKey}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then(function (response) {
      //console.log(' getissuetypes response::: ', response.data);
      return response.data;
    });
};
export const getdrp = async (encryptedKey) => {
  return await axios
    .get(`https://localhost:7179/GetMasterList?${encryptedKey}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then(function (response) {
      //console.log(' getissuetypes response::: ', response.data);
      return response.data;
    });
};

export const uploadProductImage = async (encryptedKey) => {
  const response = await axios.get(
    `https://localhost:7179/uploadProductImages?${encryptedKey}`
  );
  return response?.data;
};

export const addProduct = async (encryptedKey) => {
  console.log(encryptedKey);
  const response = await axios.post(`https://localhost:7179/AddNewProduct`, {
    Datastring: encryptedKey,
  });
  return response?.data;
};

export const addCategory = async (encryptedKey) => {
  console.log(encryptedKey);
  const response = await axios.post(`https://localhost:7179/AddNewCategory`, {
    Datastring: encryptedKey,
  });
  return response?.data;
};
export const addProductVariation = async (encryptedKey) => {
  console.log(encryptedKey);
  const response = await axios.post(
    `https://localhost:7179/AddProductVariation`,
    { Datastring: encryptedKey }
  );
  return response?.data;
};

export const deleteProduct = async (encryptedKey) => {
  const response = await axios.get(
    `https://upaygoa.com/JiraAPILIVE/API/PostProjectAllocation/DeleteAllocateProject?key=${encryptedKey}`
  );
  return response?.data;
};

export const editProduct = async (encryptedKey) => {
  const response = await axios.get(
    `https://upaygoa.com/JiraAPILIVE/API/PostProjectAllocation/DeleteAllocateProject?key=${encryptedKey}`
  );
  return response?.data;
};
