
export const extractBody = async (req: Request) => {
    return req.body?.getReader().read().then((data) => {
        return JSON.parse(new TextDecoder().decode(data.value));
    }).catch((err) => {
        return err;
    });
}
