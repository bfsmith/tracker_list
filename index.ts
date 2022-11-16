import axios from 'axios';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function getAppTrackers()
{
  const result = await axios({
    method: 'get',
    url: 'https://raw.githubusercontent.com/duckduckgo/tracker-blocklists/main/app/android-tds.json',
  });
  return Object.keys(result.data.trackers);
}

async function getWebTrackers()
{
  const appleTrackersResult = await axios({
    method: 'get',
    url: 'https://raw.githubusercontent.com/duckduckgo/tracker-blocklists/main/web/apple-tds.json',
  });

  const webTrackersResult = await axios({
    method: 'get',
    url: 'https://raw.githubusercontent.com/duckduckgo/tracker-blocklists/main/web/tds.json',
  });
  return [...Object.keys(appleTrackersResult.data.trackers), ...Object.keys(webTrackersResult.data.trackers)];
}

async function run() {
  const [appTrackers, webTrackers] = await Promise.all([getAppTrackers(), getWebTrackers()]);
  const uniqueTrackers = new Set([...appTrackers, ...webTrackers]);
  console.log('uniqueTrackers', uniqueTrackers);
}

run();
