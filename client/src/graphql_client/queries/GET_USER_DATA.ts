import { gql } from '@apollo/client';

const GET_USER_DATA = gql`
  query Query($getUserUserId: String!) {
    getUser(user_id: $getUserUserId) {
      user_id
      user_name
      user_email
      # logged_in
      photo
      friends {
        user_id
        id
        friend_id
        friend_name
        friend_status
        friend_score
        number_of_songs
        number_of_likes
        # logged_in
        recommendedGenres {
          genre
          count
        }
      }
      recommendedTracks {
        id
        user_id
        friend_id
        friend_name
        track_title
        track_uri
        artists
        album_title
        in_queue
        album_art
        been_liked
      }
      notifications {
        id
        user_id
        friend_id
        action
        message
        timestampp
        photo
        viewed
      }
    }
  }
`;

export default GET_USER_DATA;
