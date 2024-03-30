# K6 Loading Test
Manage test scenarios & scripts for API Load-Testing

## Environment
### K6
    - k6 v0.36.0
    - Node v16.13.0
    - npm

## Directory Structure
```bash
.
├── aws_s3_update.js
├── config
│   └── config.js
├── load_test
│   ├── *.js
│   └── *.js.map
├── env_sample.json
├── .env.json
├── package-lock.json
├── package.json
├── report
│   ├── .gitkeep
│   └── *.html
├── tests
│   ├── faker.js
│   ├── load-test.test.js
│   └── utils.js
└── webpack.config.js
```

## Environment Variables
1. You can follow `env_sample.json` to mantain variables which is use in your project.
### Install
1. Install package: `$ npm i`
2. Install [k6](<https://k6.io/docs/get-started/installation/>): `$ brew install k6`

### Execution Load Test
> You can fin another execute scripts in `package.json`.
```
$ cd api_load_test
$ npm run load-test
```
