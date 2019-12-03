CREATE TABLE IF NOT EXISTS COMPANY (
  id SERIAL PRIMARY KEY,
  name TEXT,
  logo TEXT);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT,
  name TEXT,
  email TEXT,
  password TEXT,
  nationality TEXT,
  ethnic TEXT,
  birthdate DATE,
  admin BOOLEAN,
  company_id INTEGER,
  FOREIGN KEY (company_id) REFERENCES company(id));

CREATE TABLE IF NOT EXISTS company_employees (
	id SERIAL PRIMARY KEY,
	company_id INTEGER,
	user_id INTEGER,
  FOREIGN KEY (company_id) REFERENCES company(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
	);

CREATE TABLE IF NOT EXISTS contracts (
  id SERIAL PRIMARY KEY,
  basicsalary INTEGER,
  basichours DECIMAL,
  hourlyrate DECIMAL,
  daysperwk DECIMAL,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id));

CREATE TABLE IF NOT EXISTS payroll (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  month DATE,
  allowance DECIMAL,
  grosssalary DECIMAL,
  ethnicamt DECIMAL,
  companyrate DECIMAL,
  companycpf INTEGER,
  employeerate DECIMAL,
  employeecpf INTEGER,
  totalcpf INTEGER,
  totalded DECIMAL,
  netsalary DECIMAL,
  FOREIGN KEY (user_id) REFERENCES users(id));