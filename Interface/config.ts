interface OAuthConfig {
    client?: String;
    client_id?: String;
    client_secret?: String;
    redirect_url?: String;
    scope?: Array<String>;
    successRedirect?: String;
    failureRedirect?: String;
    auth_type?: String; 
}

export {OAuthConfig}