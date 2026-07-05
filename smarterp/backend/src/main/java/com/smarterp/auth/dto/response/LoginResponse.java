package com.smarterp.auth.dto.response;

public class LoginResponse {

    private String message;

    private String token;

    private String tokenType;

    private long expiresIn;

    private UserInfoResponse user;

    public LoginResponse() {
    }

    public LoginResponse(
            String message,
            String token,
            String tokenType,
            long expiresIn,
            UserInfoResponse user) {

        this.message = message;
        this.token = token;
        this.tokenType = tokenType;
        this.expiresIn = expiresIn;
        this.user = user;

    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
    }

    public UserInfoResponse getUser() {
        return user;
    }

    public void setUser(UserInfoResponse user) {
        this.user = user;
    }

}