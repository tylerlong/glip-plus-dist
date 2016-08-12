const exec = require('child_process').exec;

const version = process.argv[2];
const build = process.argv[3];
const filePath = `releases/Glip-Plus-${version}.dmg`;

// generate dmg
exec(`appdmg appdmg/appdmg.json ${filePath}`, function(error, stdout, stderr) {
    // get file size
    const fs = require('fs');
    const fileSize = fs.statSync(filePath)['size'];

    // get date string
    const moment = require('moment');
    const dateStr = moment().format('ddd, DD MMM Y HH:mm:ss +0000');

    // get dsa signature
    exec(`appdmg/sign_update ${filePath} appdmg/dsa_priv.pem`, function(error, stdout, stderr) {
        const dsaSignature = stdout.trim();
        console.log(`
    <item>
        <title>Version ${version} (2 breaking changes, 2 new features, 2 bug fixes)</title>
        <sparkle:releaseNotesLink>
            https://raw.githubusercontent.com/tylerlong/glip-plus-dist/gh-pages/releases/${version}.md
        </sparkle:releaseNotesLink>
        <pubDate>${dateStr}</pubDate>
        <enclosure url="https://tylerlong.github.io/glip-plus-dist/releases/Glip-Plus-${version}.dmg" sparkle:version="${build}" sparkle:shortVersionString="${version}" length="${fileSize}"
            type="application/octet-stream" sparkle:dsaSignature="${dsaSignature}" />
        <sparkle:minimumSystemVersion>10.10</sparkle:minimumSystemVersion>
    </item>
    `);
    });
});
