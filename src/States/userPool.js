import {CognitoUserPool} from "amazon-cognito-identity-js";

const poolData ={
    UserPoolId: "us-east-1_yDkQAXirQ",
    ClientId:"6eictbsdgj3cqjfvpbunjtuq1r"
}
export default new CognitoUserPool(poolData);