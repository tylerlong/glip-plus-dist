# Notes for developers


## Setup

Get `dsa_priv.pem` and place it into `appdmg/` folder. Files ending with *.pem should NOT be committed into git.

Download https://sparkle-project.org/ and unzip it. Place `sign_update` file into `appdmg/` folder.

Run command `npm install` to install all node dependencies.


## Release new version

Develop the new version in XCode. 

Archive and "Export a Developer ID-signed Application".

Copy exported `Glip Plus.app/` into `appdmg/`.

npm run release <version> <build>

Copy paste terminal output to `appcast.xml`, edit it properly.

Create and edit `releases/<version>.md`.

Commit and push to GitHub.


## todo

Make it auto create `releases/<version>.md`.
