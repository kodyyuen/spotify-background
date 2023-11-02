import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";

import axios from "axios";

const Callback = () => {
  //   const { apiKey } = useSelector((state) => state.spotify);
  //   const dispatch = useDispatch();

  const getApiKey = async (code) => {
    console.log('balls')
    try {
      await axios.post(
        "https://accounts.spotify.com/api/token",
        {
          grant_type: "authorization_code",
          code: code,
          redirect_uri: `${process.env.REACT_APP_SITE_BASE_URL}/callback`,
        },
        {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`,
              "utf-8"
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
    // console.log(response);
    return <Navigate to={"/currently-playing"} />;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    getApiKey(code);

    // dispatch(getApiKeyThunk(code));
    // eslint-disable-next-line
  });

  //   if (apiKey) {
  //     return <Navigate to={"/spotify"} />;
  //   }
};

export default Callback;
