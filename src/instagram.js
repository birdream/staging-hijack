const { IgApiClient, LiveEntity } = require('instagram-private-api');
const ig = new IgApiClient();

// process.env.IG_USERNAME = 'normanInShopline';
// process.env.IG_PASSWORD = 'im920104';

const login = async function(req, res) {
    try {
        const deviceName = req.query.deviceName || process.env.IG_USERNAME
        console.log("deviceName", deviceName)
        ig.state.generateDevice(deviceName);
    //   ig.state.proxyUrl = process.env.IG_PROXY;
        const {
            userName, password
        } = req.body;

        const r = await ig.account.login(userName, password);
        res.send(r)
    } catch (error) {
        res.send(error.message)
    }
    
}

const prepareLive = async function(req, res) {
    try {
        // const deviceName = req.query.deviceName || process.env.IG_USERNAME
        // console.log("prepareLive.deviceName", deviceName)
        // ig.state.generateDevice(deviceName);
        const { broadcast_id, upload_url } = await ig.live.create({
            // create a stream in 720x1280 (9:16)
            previewWidth: 720,
            previewHeight: 1280,
            // this message is not necessary, because it doesn't show up in the notification
            message: 'My message',
        });

        const { stream_key, stream_url } = LiveEntity.getUrlAndKey({ broadcast_id, upload_url });
        res.send({
            stream_key, stream_url, broadcast_id
        })
    } catch (error) {
        res.send(error.message)
    }
    
}

const startLive = async function(req, res) {
    const {
        // deviceName,
        broadcast_id
    } = req.query

    // ig.state.generateDevice(deviceName);

    const startInfo = await ig.live.start(broadcast_id);
    // status should be 'ok'
    res.send(startInfo);
}

const endLive = async function(req, res) {
    const {
        // deviceName,
        broadcast_id
    } = req.query;

    // ig.state.generateDevice(deviceName);
    const r = await ig.live.endBroadcast(broadcast_id);

    res.send(r || 'ok')
}
// const getCommon

const getCommon = async function(req, res) {
    const {
        broadcast_id: broadcastId
    } = req.query;

    const { comments } = await ig.live.getComment({ broadcastId, lastCommentTs: 0 });

    res.send(comments)
}

const postCommon = async function(req, res) {
    const {
        broadcast_id, common = 'default comm'
    } = req.query;

    await ig.live.comment(broadcast_id, common);

    res.send('ok')
}

module.exports = {
    login,
    prepareLive,
    startLive,
    endLive,
    getCommon,
    postCommon
}