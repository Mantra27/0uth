interface OAuthConfig {
    client?: String;
    client_id?: String;
    client_secret?: String;
    redirect_url?: String;
    scope?: Array<String>;
    success_redirect?: String;
    failure_redirect?: String;
    auth_type?: String; 
    cb?: Function;
}

export {OAuthConfig}