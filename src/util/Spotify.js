

let accessToken;
const clientID = "bb95ed314a4242129da13b81597fe1df";
const redirectUri = "musicdataa.netlify.app";

const Spotify = {
    getAccessToken(){
        //First  check for the access token
        if(accessToken) return accessToken;

        const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        //Second check for the access token
        if(tokenInURL && expiryTime) {
            // setting access token expiry time variables
            accessToken = tokenInURL[1];
            const expiresIn = Number(expiryTime[1]);

            // setting the function which wil reset the access token when it expires
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000)
            //clearing the url after the access token expires
            window.history.pushState(" Access token", null, "/");
            return accessToken;
        }
// Third check for the access token if the first and  second check are both false
        const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        window.location = redirect;
    },
    
    search(term){
        accessToken = Spotify.getAccessToken()
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            method: 'GET',
            headers: { 
                Authorization: `Bearer ${accessToken}`
            },
        })
        .then((response) => response.json())
        .then((jsonResponse) => {
            if(!jsonResponse){
                console.error("Response error")
            }
            console.log(jsonResponse)
            return jsonResponse.tracks.items.map((t) => ({
                id: t.id,
                name: t.name,
                artist: t.artists[0].name,
                album: t.album.name,
                uri: t.uri
            }));
        })
    },

    savePlaylist(name, trackUris){
        if(!name || !trackUris) return;
        const aToken = Spotify.getAccessToken();
        const header = { Authorization: `Bearer ${aToken}` };
        let userId;
        return fetch(`https://api.spotify.com/v1/me`, { headers: header})
        .then((response) => response.json())
        .then((jsonResponse) => {
           userId = jsonResponse.id;
           let playlistId;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                headers: header,
                method: "POST",
                body: JSON.stringify({name:name}),
            })
            .then((response) => response.json())
            .then((jsonResponse) => {
                playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, 
                {
                    headers: header,
                    method: "POST",
                    body: JSON.stringify({uris: trackUris})
                })
            });
        });
    }
}





export { Spotify }

