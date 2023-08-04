interface Globals {
    path: string[];
    client: string[];
    client_id: string[];
    redirect_url: string[];
    client_secret: string[];
    success_redirect?: string;
    failure_redirect?: string;
    scope?: string[];
  }
  
let globals: Globals = {
  path: [],
  client: [],
  client_id: [],
  redirect_url: [],
  client_secret: [],
  success_redirect: undefined,
  failure_redirect: undefined,
  scope: []
};

export = globals;
