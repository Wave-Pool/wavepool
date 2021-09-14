import axios, { AxiosError } from "axios";
import SpotifyWebApi from "spotify-web-api-node";
import { archiveHistory } from "./archiveHelpers";


const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri:
    `${process.env.HOST}/auth/spotify/callback`,
});

const getRecentlyPlayed = async (access_token: string, user_id: string, refresh_token: string) => {
  spotifyApi.setAccessToken(access_token);
  spotifyApi.setRefreshToken(refresh_token);
  return await spotifyApi
    .getMyRecentlyPlayedTracks({
      limit: 50,
    })
    .then((data) => {
      archiveHistory(data, user_id, access_token);
      // Output items
      return data;
    })
    .catch((error) => {
      console.log("Error from getRecentlyPlayed", error);
    });
};

const getUsersCurrentPlayback = async (access_token: string, refresh_token: string) => {
  const getCurrentPlayback: any = {
    method: "get",
    url: "https://api.spotify.com/v1/me/player",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };

  return await axios(getCurrentPlayback)
    .then((response) => {
      return response;
    })
    .catch((error: AxiosError) => {
      console.log("Error from getUsersCurrentPlayback", error.response?.data);
    });
};

const getUserPlaylists = async (access_token: string, refresh_token: string) => {
  spotifyApi.setAccessToken(access_token);
  spotifyApi.setRefreshToken(refresh_token);
  return await spotifyApi
    .getUserPlaylists()
    .then((response) => {
      return response.body.items;
    })
    .catch((error: AxiosError) => {
      console.log("Error from getUserPlaylists", error.response?.data);
    });
};

const addToQueue = async (access_token: String, uri: String) => {
  const toQueue: any = {
    method: "POST",
    url: `https://api.spotify.com/v1/me/player/queue?uri=${uri}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };
  await axios(toQueue)
    .then((response) => response)
    .catch((error: AxiosError) => {
      console.log("Error from addToQueue", error.response?.data);
    });
};

const playNow = async (access_token: string, refresh_token: string, uri: string) => {
  const toQueue: any = {
    method: "POST",
    url: `https://api.spotify.com/v1/me/player/queue?uri=${uri}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };
  await axios(toQueue)
    .then((response) => {
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);
      spotifyApi.skipToNext();
    })
    .catch((error: AxiosError) => {
      console.log("Error from playNow", error.response?.data);
    });
};

const querySpotify = (query: string, refresh_token: string, access_token: string) => {
  return axios({
    url: `https://api.spotify.com/v1/search?q=${query}&type=track`,
    method: "get",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then(({data}) => {
    return data.tracks.items;
  }).catch((error: AxiosError) => console.log('Error from querySpotify', error.response?.data));
};

const addToPlaylist = async (
  access_token: string,
  refresh_token: string,
  playlist_id: string,
  track_uri: string
) => {
  spotifyApi.setAccessToken(access_token);
  spotifyApi.setRefreshToken(refresh_token);
  return await spotifyApi
    .addTracksToPlaylist(playlist_id, [track_uri])
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
};

const createPlaylist = async (
  access_token: string,
  refresh_token: string,
  playlist_name: string,
  playlist_desc: string
) => {
  spotifyApi.setAccessToken(access_token);
  spotifyApi.setRefreshToken(refresh_token);
  return await spotifyApi
    .createPlaylist(playlist_name, { description: playlist_desc, public: true })
    .then(
      (data) => data,
      (err) => console.warn('Error from createPlaylist', err)
    );
};

// const refreshToken = async (refreshToken: string) =>{
//   return await spotifyApi.refreshAccessToken().then(
//     function(data) {
//       console.log('The access token has been refreshed!');

//       // Save the access token so that it's used in future calls
//       spotifyApi.setAccessToken(data.body['access_token']);
//     },
//     function(err) {
//       console.log('Could not refresh access token', err);
//     }
//   );
// };

// const getTrackInfo = (track_uri: string, access_token: string) => {
//   const track_id = track_uri.split(':')[2];
//   return axios({
//     url: `https://api.spotify.com/v1/tracks/${track_id}`,
//     method: "get",
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//     },
//   }).then((data) => {
//     const  { artists } = data;
//     artist_id = artists[0].id;
//     return axios({
//       url: `https://api.spotify.com/v1/artist/${artist_id}`,
//       method: "get",
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     }).then((data) => {
//       const { genres, images } = data;
//       track_data.generes = genres;
//       track_data.image = images[1];
//       return track_data;
//     });
//   });
// };

export {
  spotifyApi,
  getRecentlyPlayed,
  getUsersCurrentPlayback,
  addToQueue,
  playNow,
  getUserPlaylists,
  querySpotify,
  addToPlaylist,
  createPlaylist,
};
