class AppConfig {
    public port = 4000;
    public mysqlHost = "localhost";
    public mysqlUser = "root";
    public mysqlPassword = "";
    public mysqlDatabase = "vacation_planner"; // Fill this in when running program
    public imageAddress = "http://localhost:4000/api/admin/vacations/images/"
}

const appConfig = new AppConfig();

export default appConfig;