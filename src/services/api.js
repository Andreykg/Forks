import axios from "axios";

export async function GetForks(
  path = "",
  method = ""
) {
  function config() {
    let urlApi = "https://api.github.com/repos/";
    let config = {
      url: urlApi + path,
      method: method
    };
    return config;
  }

  let response = await axios(config())
    .then(response => response)
    .catch(error => error.response);
  return response;
}