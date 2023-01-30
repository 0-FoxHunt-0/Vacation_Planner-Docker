class AppConfig {

    public dataUrl = "http://localhost:4000/api/data/"
    public registerUrl = "http://localhost:4000/api/auth/register"
    public loginUrl = "http://localhost:4000/api/auth/login"

}

const appConfig  = new AppConfig();

export default appConfig;