import axios, { AxiosInstance } from 'axios';

abstract class HttpClient {
    protected readonly instance: AxiosInstance;

    public constructor (baseURL: string) {
        this.instance = axios.create({
            baseURL,
        });
    }
}

class MainApi extends HttpClient {
    readonly _userRoute: string = "/users";
    readonly _categoryRoute: string = "/categories";
    readonly _activityRoute: string = "/activity";
    readonly _appTimeRoute: string = "/apptime";
    readonly _favoriteRoute: string = "/favorites";
    readonly _goalRoute: string = "/goals";
    readonly _interestRoute: string = "/interests";
    readonly _userActivityRoute: string = "/useractivity";
    readonly _userGoalRoute: string = "/usergoal";

    public constructor() {
        super('https://desconecta.herokuapp.com');
    }

    /***** User Requests *****/
    public GetAllUsers = () => this.instance.get(`${this._userRoute}`);

    public GetUser = (email: string, password: string) => this.instance.get(`${this._userRoute}/login/${email}/${password}`);
    
    public InsertUser = (name: string, email: string, password: string) => this.instance.put(`${this._userRoute}/${name}/${email}/${password}`);
    
    public CheckIfEmailExists = (email: string) => this.instance.get(`${this._userRoute}/email/${email}`);

    public GetUserDataByID = (id: number) => this.instance.get(`${this._userRoute}/id/${id}`);
    /*************************/

    /***** Category Requests *****/
    public GetAllCategories = () => this.instance.get(`${this._categoryRoute}`);

    public GetCategory = (id: string) => this.instance.get(`${this._categoryRoute}/${id}`);
    /*****************************/

    /***** Activity Requests *****/
    public GetAllActivities = () => this.instance.get(`${this._activityRoute}`);

    public GetActivity = (id: string) => this.instance.get(`${this._activityRoute}/${id}`);

    public GetActivityByCategory = (categoryId: string) => this.instance.get(`${this._activityRoute}/category/${categoryId}`);
    /*****************************/

    /***** App Time Requests *****/
    public GetAppTimeByUser = (userId: string) => this.instance.get(`${this._appTimeRoute}/${userId}`);
    
    public InsertAppTimeForUser = (userId: string, whatsapp: number, facebook: number, instagram: number, twitter: number, tiktok: number) =>
        this.instance.put(`${this._appTimeRoute}/${userId}/${whatsapp}/${facebook}/${instagram}/${twitter}/${tiktok}`);

    public UpdateAppTimeForUser = (userId: string, whatsapp: number, facebook: number, instagram: number, twitter: number, tiktok: number) =>
        this.instance.put(`${this._appTimeRoute}/update/${userId}/${whatsapp}/${facebook}/${instagram}/${twitter}/${tiktok}`);
    /*****************************/

    /***** Goal Requests *****/
    public GetAllGoals = () => this.instance.get(`${this._goalRoute}`);
    /*************************/
    
    /***** Interest Requests *****/
    public GetInterestForUser = (userId: string) =>
        this.instance.get(`${this._interestRoute}/${userId}`);

    public InsertInterestForUser = (userId: string, categoryId: string) =>
        this.instance.put(`${this._interestRoute}/${userId}/${categoryId}`);
    
    public DeleteInterestForUser = (userId: string, categoryId: string) =>
        this.instance.delete(`${this._interestRoute}/${userId}/${categoryId}`);   
    /****************************/

    /***** Favorite Requests *****/
    public GetAllFavoritesForUser = (userId: string) =>
        this.instance.get(`${this._favoriteRoute}/${userId}`);
    
    public InsertFavoriteForUser = (userId: string, activityId: string) =>
        this.instance.put(`${this._favoriteRoute}/${userId}/${activityId}`);
    
    public DeleteFavoriteForUser = (userId: string, activityId: string) =>
        this.instance.delete(`${this._favoriteRoute}/${userId}/${activityId}`);
    /*****************************/


    /***** User Activity Requests *****/
    public GetUserActivity = (userId: string) =>
        this.instance.get(`${this._userActivityRoute}/${userId}/`);
    
    public InsertUserActivity = (userId: string, activityId: string) =>
        this.instance.put(`${this._userActivityRoute}/${userId}/${activityId}`);

    public DeleteUserActivity = (userId: string, activityId: string) =>
        this.instance.delete(`${this._userActivityRoute}/${userId}/${activityId}`);
    /*********************************/

    /***** User Goal Requests *****/
    public GetUserGoal = (userId: string) =>
        this.instance.get(`${this._userGoalRoute}/${userId}/`);
    
    public InsertUserGoal = (userId: string, goalId: string) =>
        this.instance.put(`${this._userGoalRoute}/${userId}/${goalId}`);
    
    public DeleteUserGoal = (userId: string, goalId: string) =>
        this.instance.delete(`${this._userGoalRoute}/${userId}/${goalId}`);
    /*****************************/
}

const API = new MainApi();

export default API;
