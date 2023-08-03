interface Globals {
    path: string[];
    client: string[];
    client_id: string[];
    redirect_url: string[];
    client_secret: string[];
  }
  
let globals: Globals = {
  path: [],
  client: [],
  client_id: [],
  redirect_url: [],
  client_secret: []
};

export = globals;
