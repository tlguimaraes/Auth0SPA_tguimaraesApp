window.addEventListener('load', function() {
  var content = document.querySelector('.content');
  var loadingSpinner = document.getElementById('loading');
  content.style.display = 'block';
  loadingSpinner.style.display = 'none';

  var webAuth = new auth0.WebAuth({
    domain: '[DOMAIN]',
    clientID: '[CLIENT-ID]'
    redirectUri: 'http://localhost:3000',
    audience: 'https://' + AUTH0_DOMAIN + '/userinfo',
    responseType: 'token id_token',
    scope: 'openid',
    leeway: 60
  });
   
  var loginStatus = document.querySelector('.container h4');
  var loginView = document.getElementById('login-view');
  var homeView = document.getElementById('home-view');

  // buttons and event listeners
  var homeViewBtn = document.getElementById('btn-home-view');
  var loginBtn = document.getElementById('qsLoginBtn');
  var logoutBtn = document.getElementById('qsLogoutBtn');

  homeViewBtn.addEventListener('click', function() {
    homeView.style.display = 'inline-block';
    loginView.style.display = 'none';
  });

  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    webAuth.authorize();
  });

  logoutBtn.addEventListener('click', logout);

  function setSession(authResult) {
    // Set the time that the access token will expire at
    var expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    //(1)LocalStorage
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    //(2)Adding in a cookie
    document.cookie = "ID TOKEN:  "+localStorage.getItem('id_token');
    //(3)Session Local Storage
    sessionStorage.setItem('access_token', localStorage.getItem('access_token'));

  }

  function logout() {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    displayButtons();
  }

  function isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  function handleAuthentication() {
    webAuth.parseHash(function(err, authResult) {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        setSession(authResult);
        loginBtn.style.display = 'none';
        homeView.style.display = 'inline-block';
      } else if (err) {
        homeView.style.display = 'inline-block';
        console.log(err);
        alert(
          'Error: ' + err.error + '. Check the console for further details.'
        );
      }
      displayButtons();
    });
  }

  function displayButtons() {
    if (isAuthenticated()) {
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'inline-block';
      //(1)LocalStorage
      loginStatus.innerHTML = 'You are logged in! Access Token: <p><br></p> '+localStorage.getItem('access_token')+'ID Token: '+localStorage.getItem('id_token');
      //(2)Retrieving cookies
      var x = document.cookie;
      loginStatus.innerHTML +='<p><br></p> <p>Cookie value</p>'+ x;
      //(3)Session Local Storage
      // Retrieving Data
      loginStatus.innerHTML +='<p><br></p> <p>Session value</p>'+ sessionStorage.getItem('access_token');
      //Retrieving User Profile
      getProfile();
      AddCacheStorage();

    } else {
      loginBtn.style.display = 'inline-block';
      logoutBtn.style.display = 'none';
      loginStatus.innerHTML =
        'You are not logged in! Please log in to continue.';
      profileview.style.display = 'none';
    }
  }

  handleAuthentication();
});

//That will clean the key before the browser window/tab is open
window.onbeforeload = function() {
  localStorage.setItem('access_token', '');
  localStorage.setItem('id_token', '');
  localStorage.setItem('expires_at', '');
  //prompts you to confirm the close window/tab action.
  //return '';
};

//That will delete the key before the browser window/tab is closed.
window.onbeforeunload = function() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
  //prompts you to confirm the close window/tab action.
  //return '';
};



//Caching access_token:
function AddCacheStorage() {
    window.fetch('#/home', {mode: 'no-cors'}).then(function(response) {
    caches.open('Auth0').then(function(cache) {
      cache.put('Auth0-tguimaraes', response);
    });
    }).catch(function(error) {
    ChromeSamples.setStatus(error);
    });
}

// USER PROFILE

var userProfile;
var webAuth = new auth0.WebAuth({
  domain: '[DOMAIN]',
  clientID: '[CLIENT-ID]'
  });

function getProfile() {
  if (!userProfile) {
    var accessToken = sessionStorage.getItem('access_token');

    if (!accessToken) {
      console.log('Access Token must exist to fetch profile');
    }

    webAuth.client.userInfo(accessToken, function(err, profile) {

      if (profile) {
        userProfile = profile;
        document.cookie = "User Profile: "+userProfile;
        displayProfile();
      }
    });
  } else {
    document.cookie = "User Profile: NULL";
    displayProfile();
  }
}

function displayProfile() {
  // display the profile
  document.querySelector('#profileview .email').innerHTML =
    userProfile.email;

  document.querySelector(
    '#profileview .full-profile'
  ).innerHTML = JSON.stringify(userProfile, null, 2);
  alert("1");

  //document.querySelector('#profileview img').src = userProfile.picture;
}
