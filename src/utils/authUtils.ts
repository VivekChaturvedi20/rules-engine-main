export async function getAccessToken() {
    return { accessToken: 'XXXXXXXX.XXXXXX.XXXXX' };
}

export async function getDefaultHeaders() {
    const tokenResponse = await getAccessToken();
    const headers = {
        Authorization: `Bearer ${tokenResponse?.accessToken || 'ASSESS_TOKEN_NOT_AVAILABLE'}`
    };

    return headers;
}
