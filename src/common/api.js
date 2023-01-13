import axios from "axios";

export const api = async (formData, endPoint) => {
  let returnData;
  try {
    const response = await axios.post(global.domainURL + endPoint, formData, {
      headers: { Authorization: `Bearer ${global.UserToken}` },
    });
    returnData = response;
  } catch (err) {
    console.log(`Something went wrong!!`);
    returnData = err;
  }
  return returnData;
};
