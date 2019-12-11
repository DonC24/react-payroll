A React Payroll app

## Technologies

- React (v16)
- Express.js (v4) as production and development server
- Webpack 4 (production and development configurations)
- SCSS support (+ sanitize.css included)
- ES2015+
- PostgreSql

## Features
- preconfigured eslint and Prettier code formatter
- React Hot Loader
- Linux/MacOS/Windows

## Usage

### Make sure you have nodemon installed globally
```
npm install -g nodemon
```

### Installation
```bash
Clone this repository onto your local machine
npm install
createdb DATABASE_NAME -U USERNAME
psql -d DATABASE_NAME -U USERNAME -f tables.sql
psql -d DATABASE_NAME -U USERNAME -f seed.sql
```

### Scripts
```bash
# run development mode
npm run dev

# run production mode
npm run build
npm start

# run prettier
npm run prettier

# run lint
npm run lint

# run on a different port
HTTP_PORT=3001 npm run dev
```

### Note
- User password for seeded users are "pw" + NAME (eg: "pwbatman" for user named batman. Only the user named Captain America's password is "pwcapam")

### Unsolved Issues
- Have yet to create a route to show employees, contracts, and payroll.
- Learnt about react-admin too late, did not implement, but I think it would be good to use.

### Deploy

Some operating systems do not copy the server files to the build directory.

See the documentation here: [https://github.com/calvinmetcalf/copyfiles/blob/master/readme.md](https://github.com/calvinmetcalf/copyfiles/blob/master/readme.md)