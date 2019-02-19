// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  DIRPATH:'http://192.168.1.224:5000',
  APIURL:'http://192.168.1.224:5000/api/v1/user',
  APIURL_ETH:'http://192.168.1.224:5000/api/v1/eth',
  FILEPATH : 'http://192.168.1.224:5000',
  CAPTCHA:{
    // siteKey:'6Lcr9HYUAAAAAI2LGYuA5LApmuAnQdJV1EHjP62i'
    siteKey:'6LfkqX4UAAAAAGdbf5sMDBjwMl3c5-qfFggtGAv0'
  }
};
