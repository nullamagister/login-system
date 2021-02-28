import IResponse from "../controller/IResponse";
import ApiView from "./ApiView";
import IWebView from "./IWebView";

export default class WebView extends ApiView implements IWebView {
    constructor(db: string) { super(db); }

    public getData(username: string): Promise<IResponse>{
        return new Promise(async (fulfill, reject) => {
            this.system.getUser(username)
            .then((userRes) => {
                userRes.data.date_of_birth = this.numeralizeDate(userRes.data.date_of_birth);
                this.system.getActiveUsers()
                .then((activeUsersRes) => {
                    this.system.getInactiveUsers()
                    .then((inActiveUsersRes) => {
                        fulfill({
                            code: 200,
                            message: "Data retrieved successfully",
                            data: {
                                user: userRes.data,
                                activeUsers: activeUsersRes.data,
                                inActiveUsers: inActiveUsersRes.data
                            }
                        });
                    });
                });
            })
            .catch((err) => reject(err));
        });    
    }
}
